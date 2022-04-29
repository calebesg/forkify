import { getJSON } from './helpers.js';
import { API_URL } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    state.recipe = {
      id: data.recipe.id,
      title: data.recipe.title,
      cookingTime: data.recipe.cooking_time,
      publisher: data.recipe.publisher,
      servings: data.recipe.servings,
      ingredients: data.recipe.ingredients,
      image: data.recipe.image_url,
      souceUrl: data.recipe.source_url,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchRecipe = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.result = data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
