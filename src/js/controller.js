'use strict';

import { MODAL_CLOSE_SEC } from './config.js';

import * as model from './model.js';
import recipeViews from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // render spinner
    recipeViews.renderSpinner();

    // update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // loading recipe
    await model.loadRecipe(id);

    // rendering recipe
    recipeViews.render(model.state.recipe);

    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeViews.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render search results
    resultsView.render(model.getSearchResultsPage(1));

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // render search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newservings) {
  // update the recipe servings (in state)
  model.updateServings(newservings);
  // // update the recipe view
  // recipeViews.render(model.state.recipe);

  recipeViews.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeViews.update(model.state.recipe);

  // render bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // upload recipe and render it
    await model.uploadRecipe(newRecipe);
    recipeViews.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    // close form window
    setTimeout(function () {
      addRecipeView._toggleWindow();
      addRecipeView.renderForm();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeViews.addHandlerRender(controlRecipes);
  recipeViews.addHandlerUpdateServings(controlServings);
  recipeViews.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
