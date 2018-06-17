
import * as searchView from './views/searchView';
import Search from './models/Search';
import { renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/

const state = {};

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

    // Search for results
    await state.search.getResults();

    // Render results on the UI
    clearLoader();
    searchView.renderResults(state.search.result)
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});






