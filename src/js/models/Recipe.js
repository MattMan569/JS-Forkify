// Recipe model

import axios from 'axios'
import { baseURL, recipeURL, appID, appKey } from './../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`${baseURL}/search?r=${recipeURL + this.id}&app_id=${appID}&app_key=${appKey}`);
            const recipe = result.data[0];
            console.log(recipe);
            this.title = recipe.label;
            this.author = recipe.source;
            this.image = recipe.image;
            this.url = recipe.url;
            this.ingredients = recipe.ingredients;
        } catch (error) {
            console.error(error);
        }
    }

    calcTime() {
        // Assuming that every 3 ingredients requires 15 minutes
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}
