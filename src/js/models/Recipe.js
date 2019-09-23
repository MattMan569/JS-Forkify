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
            this.title = recipe.label;
            this.author = recipe.source;
            this.image = recipe.image;
            this.url = recipe.url;
            this.ingredients = recipe.ingredients.map((ingredient) => ingredient.text);
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

    parseIngredients() {
        // NOTE: always put plural first
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound', 'grams', 'gram'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lbs', 'lbs', 'g', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            // 3. Parse ingredients into count, unit, and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => unitsShort.includes(el));

            let objIng;

            if (unitIndex > -1) {
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex); // Eg. 4 1/2 cups => [4, 1/2]
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+')) // Eg. "4+1/2" => 4.5
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            } else if (parseInt(arrIng[0], 10)) {
                // There is no unit, but there is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                // There is no unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
}
