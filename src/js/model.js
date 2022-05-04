import { AJAX } from './helpers.js';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  return {
    id: data.recipe.id,
    title: data.recipe.title,
    cookingTime: data.recipe.cooking_time,
    publisher: data.recipe.publisher,
    servings: data.recipe.servings,
    ingredients: data.recipe.ingredients,
    image: data.recipe.image_url,
    sourceUrl: data.recipe.source_url,
    ...(data.recipe.key && { key: data.recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(book => book.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchRecipe = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.result = data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });

    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getResultPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.result.slice(start, end);
};

export const updateServing = function (newServing) {
  const updatedQt = state.recipe.ingredients.map(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
    return ing;
  });

  state.recipe.ingredients = updatedQt;
  state.recipe.servings = newServing;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmarker = function (recipe) {
  state.bookmarks.push(recipe);

  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const removeBookmarker = function (id) {
  const index = state.bookmarks.findIndex(item => item.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const loadBookmarks = function () {
  const data = localStorage.getItem('bookmarks');

  if (!data) return;

  state.bookmarks = JSON.parse(data);
};
loadBookmarks();

const clearLocalStorage = function () {
  localStorage.clear('bookmarks');
};

// clearLocalStorage();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        entry => entry.at(0).startsWith('ingredient') && entry.at(1) !== ''
      )
      .map(ing => {
        const ingArr = ing.at(1).replaceAll(' ', '').split(',');

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredients format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      cooking_time: +newRecipe.cookingTime,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      image_url: newRecipe.image,
      source_url: newRecipe.sourceUrl,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    console.log(data);

    state.recipe = createRecipeObject(data);
    addBookmarker(state.recipe);
  } catch (error) {
    throw error;
  }
};
