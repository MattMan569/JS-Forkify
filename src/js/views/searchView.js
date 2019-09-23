// Search view

import { elements } from './base';

export const getInput = () => elements.searchInput.value; // Implicit return

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
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

/**
 * @param {number} page Current page
 * @param {('prev' | 'next')} type Type of button, either 'prev' or 'next'
 * @returns {string} Resulting markup for the button
 */
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    if (pages === 1) {
        return;
    }

    let button;

    if (page === 1) {
        // Button for next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Button for next and previous pages
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages) {
        // Button for previous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};