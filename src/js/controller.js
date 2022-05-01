import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// PARCEL -> SAVE STATE
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultView.update(model.getResultPerPage());

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpinner();

    await model.loadSearchRecipe(query);

    controlPagination();
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getResultPerPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  model.updateServing(newServing);
  recipeView.update(model.state.recipe);
};

const controlBookmarker = function () {
  const isSaved = model.state.recipe.bookmarked;

  if (isSaved) model.removeBookmarker(model.state.recipe.id);
  else model.addBookmarker(model.state.recipe);

  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerBookmarker(controlBookmarker);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();
