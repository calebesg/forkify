import { getJSON } from './helpers.js';
import { API_URL } from './config.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

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
