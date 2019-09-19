// Search view

import { elements } from './base';

export const getInput = () => elements.searchInput.value; // Implicit return

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    console.log(recipe);

    const getID = (uri) => uri.split('#')[1];
    const markup = `
        <li>
            <a class="results__link" href="#${getID(recipe.recipe.uri)}">
                <figure class="results__fig">
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.recipe.label)}</h4>
                    <p class="results__author">${recipe.recipe.source}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};
