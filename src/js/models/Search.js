
import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '48d3fe39a857ced9e3769ab9799d9d94';
    try {
      const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch(err) {
      alert(err);
    }
  }
}