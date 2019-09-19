// Search model

import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const baseURL = 'http://cors-anywhere.herokuapp.com/https://api.edamam.com';
        const appID = '89493e1c';
        const appKey = '31f281936793cf572e8e05458969fc98';
    
        try {
            const result = await axios(`${baseURL}/search?q=${this.query}&app_id=${appID}&app_key=${appKey}`);
            this.result = result.data.hits;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}
