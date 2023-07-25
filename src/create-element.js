import {createId} from "./create-id.module";

export const LIST_ITEM_TEMPLATE = 'list__item__element';
export const LIST_ITEM_TEMPLATE_TOTAL = 'total-tasks';

// /**
//  * Create a list item element
//  * @param {String} id
//  * @param {String} type
//  * @param {String} templateId
//  * @returns {HTMLLIElement}
//  */

export const createElement = ({id, type, templateId, attr}) => {

    const template = document.getElementById(templateId);
    const templateClone = template.cloneNode(true);
    const li = document.createElement('li');


    li.setAttribute("class", `task__item + ${attr}`);

    if (id) {
        li.setAttribute("data-value", id.toString());
    }

    li.setAttribute('data-type', type);

    li.innerHTML = templateClone.innerHTML;

    return li;
}

export const chooseIcon = (type) => {
    let result;
    switch (type) {
        case 'idea':
            result = "fa-sharp fa-solid fa-lightbulb"
            break;
        case 'random-thought':
            result = "fa-solid fa-head-side-virus";
            break;
        case 'task':
            result = "fa-sharp fa-solid fa-basket-shopping";
            break;
    }

    return result;
}
