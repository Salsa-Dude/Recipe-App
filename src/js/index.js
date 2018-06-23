
import * as searchView from './views/searchView';
import Search from './models/Search';
import { renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/

const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // Get query from view
  const query = searchView.getInput();

  
  if(query) {
    // New search object and add to state
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(document.querySelector('.results'));

    try {
      // Search for results
      await state.search.getResults();

      // Render results on the UI
      clearLoader();
      searchView.renderResults(state.search.result)
    } catch(err) {
      alert('Something went wrong with the search');
      clearLoader();
    }
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

document.querySelector('.results__pages').addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  
  
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage)
    
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create new Recipe object
    state.recipe = new Recipe(id);
    
    
    try {
      // Get recipe data and parse Ingredients
      await state.recipe.getRecipe();
     
      state.recipe.parseIngredients();
      
      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServing();

      // Render recipe
     
     
    } catch(err) {
      alert('Error processing recipe!!');
      console.log(err);
    }
    
    
  }
};

 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));








