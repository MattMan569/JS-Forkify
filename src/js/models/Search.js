// Search model

import axios from 'axios';
import { baseURL, appID, appKey } from './../config'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const result = await axios(`${baseURL}/search?q=${this.query}&from=0&to=100&app_id=${appID}&app_key=${appKey}`);
            this.result = result.data.hits;
        } catch (error) {
            console.error(error);
        }
    }
}
