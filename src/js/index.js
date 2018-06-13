
import axios from 'axios';

async function getResults(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const key = '48d3fe39a857ced9e3769ab9799d9d94';
  try {
    const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch(err) {
    alert(err);
  }
  
}

getResults('chicken');


