import {createId} from "./create-id.module";
import {createElement, chooseIcon, LIST_ITEM_TEMPLATE, LIST_ITEM_TEMPLATE_TOTAL} from "./create-element";

const totalArrOfTasks = [];
const arrOfTypes = [];

/**
/**
 * Get task list
 *
 * @returns {HTMLLIElement}
 */
export const getTaskList = () => document.getElementById('task-list');

const getTotalList = () => document.getElementById('task-list-total');

/**
 * Add a task to the list
 *
 * @param {TaskParams} params
 */
export const addTaskToList = (params) => {

    if (!params.type || !params.type.length) {
        throw new Error("Category can not be empty")
    }

    const input = document.querySelector('[data-id="task-item-id"]');

    const taskList =  getTaskList();
    let li;

    if (input.value) {
        li = taskList.querySelector(`[data-value="${input.value}"]`);
    } else {
        const id = createId();
        li = createElement({id: id.toString(), type: params.type, templateId: LIST_ITEM_TEMPLATE, attr: "task__item__child"});
        taskList.appendChild(li);
    }

        createElementContent(li, params);
        addTaskItemListeners(li, params);

        getTotal({type: `${li.getAttribute("data-type")}`});

        toggleVisibility(taskList);
}

/**
 * Add events to the taks items
 * @param {HTMLLIElement} li
 * @param {TaskParams} params
 */
const addTaskItemListeners = (li, params) => {

    const btnEdit = li.querySelector('#btn-edit');
    const btnRemove = li.querySelector('#btn-delete');
    const btnArchive = li.querySelector('#btn-archived');

    btnArchive.addEventListener('click', () => {
        getTotal({archived: `${li.getAttribute("data-type")}`});
        archivedItem(li, btnArchive);

    });
    btnRemove.addEventListener('click', () => {

        getTotal({removed: `${li.getAttribute("data-type")}`});
        removeItem(li);

        const taskList = getTaskList();
        toggleVisibility(taskList);

    });
    btnEdit.addEventListener('click', () => {
        const id = parseInt(li.getAttribute("data-value"), 10);
        editItem({...params, id});
    });
}

/**
 * Make an element to be invisible
 *
 * @param {HTMLLIElement} li
 */
const archivedItem = (li, btnArchive) => {

    li.toggleAttribute("data-archive");
    li.style.display = "none";
    li.style.background = "orange";
    btnArchive.style.color = "orange";
    btnArchive.style.transform = "rotate(180deg)";

    if (li.hasAttribute("data-archive")) {
        btnArchive.addEventListener('click', ()=> {
            li.style.display = "grid";

        })
    }

    const taskList = getTaskList();
    toggleVisibility(taskList);

    btnToggle.addEventListener('click', () => {
        li.style.display = "grid";

        const taskList = getTaskList();
        toggleVisibility(taskList);
    })
}

const getTotal = (params) => {
    // const type = params.type;
    // const archived = params.archived;
    // const removed = params.removed;
    //
    // const totalList = getTotalList();
    // const li = createElement({type: type, templateId: LIST_ITEM_TEMPLATE_TOTAL, attr: "task__item__total task__item__total--child"});
    //
    // if (removed) {
    //     const li = totalList.querySelector(`[data-type= ${removed}]`);
    //     const totalActive = li.querySelector('[data-id="render-number-active"]');
    //     totalActive.textContent = (Number(totalActive.textContent) - 1).toString();
    //     return;
    // }
    //
    // if (archived) {
    //     const li = totalList.querySelector(`[data-type= ${archived}]`);
    //     const totalArchived = li.querySelector('[data-id="render-number-arch"]');
    //     totalArchived.textContent = (Number(totalArchived.textContent) + 1).toString();
    //
    //
    //     const totalActive = li.querySelector('[data-id="render-number-active"]');
    //     totalActive.textContent = (Number(totalActive.textContent) - 1).toString();
    //     return;
    // }
    //
    // if (!arrOfTypes.includes(type)) {
    //     const category = li.querySelector('[data-id="render-type-total"]');
    //     category.textContent = type;
    //
    //     const icon = li.querySelector('[data-id="render-icon-value-total"]');
    //     icon.className = chooseIcon(type);
    //
    //     const totalActive = li.querySelector('[data-id="render-number-active"]');
    //     totalActive.textContent = "1";
    //
    //     const totalArchived = li.querySelector('[data-id="render-number-arch"]');
    //     totalArchived.textContent = "0";
    //
    //     totalList.appendChild(li);
    //
    //     arrOfTypes.push(type);
    //
    // } else {
    //     const li = totalList.querySelector(`[data-type= ${type}]`);
    //     const totalActive = li.querySelector('[data-id="render-number-active"]');
    //     totalActive.textContent = (Number(totalActive.textContent) + 1).toString();
    // }
}

/**
 *
 * @param {HTMLLIElement} li
 */
const removeItem = (li) => {
    // const taskList = getTaskList();
    // toggleVisibility(taskList);

    li.remove();
}

/**
 * Changing the element visibility
 *
 * @param {String} id
 * @param {Number} opacity
 */
export const changeContentOpacity = (el, opacity) => {
    const listItems = Array.from(document.querySelectorAll(`${el}`));
    listItems.forEach((el) => {
        el.style.opacity = `${opacity}%`;
    })
}

/**
 * Edit a taks item
 *
 * @param {TaskParams} params
 */
const editItem = (params) => {
    changeContentOpacity('.task__item__child', 40);

    const name = params.name;
    const type = params.type;
    const description = params.description;
    const date = params.date;
    const input = document.querySelector('[data-id="task-item-id"]');
    input.value = params.id;

    params.submit.innerHTML = "Edit";
    params.form.style.visibility = "visible";

    const inputTaskName = document.getElementById('task-name');
    inputTaskName.value = name;

    const taskType = document.getElementById('task-type');
    taskType.value = type;

    const contextValue = document.getElementById('task-description');
    contextValue.value = description;

    const dateValue = document.getElementById('task-date');
    dateValue.value = date;



}

const clearTasksFromList = (list, attr) => {
    const arr = list.querySelectorAll(attr);

    for (let i = 0; i < arr.length; i++) {
        arr[i].parentElement.removeChild(arr[i]);
    }

    const taskList = getTaskList();
    toggleVisibility(taskList);
}
/**
 * Remove all tasks from the list
 */
export const clearTasks = () => {
    const taskList = getTaskList();
    clearTasksFromList(taskList, ".task__item__child");

    const totalList = getTotalList();

    //buttonToggleModule(taskList);
    clearTasksFromList(totalList, ".task__item__total--child");
}

/**
 * Set element content
 *
 * @param {HTMLLIElement} li
 * @param {TaskParams} params
 */
const createElementContent = (li, params) => {
    const type = params.type;
    const name = params.name;
    const description = params.description;
    const date = params.date;

    const icon = li.querySelector('[data-id="render-icon-value"]');
    icon.className = chooseIcon(type);

    const title = li.querySelector('[data-id="render-title-value"]');
    title.textContent = name;

    const category = li.querySelector('[data-id="render-category-value"]');
    category.textContent = type;

    const text = li.querySelector('[data-id="render-description"]');
    text.textContent = description;

    const dataTime = li.querySelector('[data-id="render-dates-value"]');
    dataTime.textContent = date;

    const time = li.querySelector('[data-id="render-time-value"]');
    time.innerHTML = formatDateTime(new Date());

    //totalArrOfTasks[params.type] = {id: id, name: name, active: true};
}

/**
 * Format the date
 *
 * @param {Date} date
 * @returns {string} - formatted date time
 */
const formatDateTime = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return [months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()].join('')
}


const btnToggle = document.querySelector('#btn-toggle');


const toggleVisibility = (list) => {

    if (list.querySelectorAll('.task__item__child').length) {
        btnToggle.removeAttribute("disabled");

    } else {
        btnToggle.setAttribute("disabled", "");
    }

    const archiveTask = list.querySelector("[data-archive]");

    if (archiveTask) {
        btnToggle.innerHTML = 'Show archived';
        btnToggle.setAttribute("class", "btn-toggle__active-style");
    }

    if (!archiveTask) {
        btnToggle.removeAttribute("class");
        btnToggle.innerHTML = 'Show active';
    }
}


