import { createId } from './create-id.module'
import { createElement } from './create-element.js'
import { findCurrentElement } from './find-element.module'

document.addEventListener("DOMContentLoaded", () => {
    const formTask = document.getElementById('form-task');
    const taskList = document.getElementById('task-list');
    const taskTotal = document.getElementById('total-tasks');
    const taskListTotal = document.getElementById('task-list-total');
    const btnDisplayForm = document.getElementById('btn-display');
    const btnCloseForm = document.getElementById("btn-close");
    const btnClear = document.getElementById("btn-clear");
    const btnSubmit = document.getElementById("btn-submit");
    const totalArrOfTasks = [];

    createId();

    const displayOrHideForm = () => {
        btnDisplayForm.addEventListener('click', () => {
            formTask.style.visibility = "visible";
        });

        btnCloseForm.addEventListener("click", () => {
            formTask.style.visibility = "hidden";
            changeContentOpacity('.task__item__child', 100);
            btnSubmit.innerHTML = "Add";
            formTask.reset();
        })
    }

    const clearTasks = () => {
        btnClear.addEventListener("click", () => {
            const arr = taskList.querySelectorAll(".task__item__child");

            for (let i = 0; i < arr.length; i++) {

                arr[i].parentElement.removeChild(arr[i]);
            }

            formTask.style.visibility = "hidden";
        })
    }

    displayOrHideForm();
    clearTasks();

    const getValueFromForm = () => {
        formTask.addEventListener('submit', (e) => {
            e.preventDefault();

            const form = e.target;
            const name = form.title.value;
            const type = form.category.value;
            const description = form.description.value;
            const date = form.data.value;

            setFormValue({form, name, type, description, date});
        });
    }

    const setFormValue = (params) => {

        try {
            addTaskToList(params);
            formTask.reset();
            formTask.style.visibility = "hidden";
            changeContentOpacity('.task__item__child', 100);

        } catch (e) {
            alert(e.message);
        }
    }

    getValueFromForm();

    const addTaskToList = (params) => {
        if (!params.type || !params.type.length) {
            throw new Error("Category can not be empty")
        }

        const id = createId();
        const li = createElementContext(id, params);
        li.setAttribute("data-value", id);

        const btnEdit = li.querySelector('#btn-edit');
        const btnRemove = li.querySelector('#btn-delete');
        const btnArchive = li.querySelector('#btn-archived');

        taskList.appendChild(li);

        addEditEvent({taskList, btnEdit, li, id, params});

        addRemoveEvent({taskList, btnRemove, li, id});
        addArchiveEvent({taskList, btnArchive, li, id});

        getTotalData(taskList);

        return taskList;
    }

    const addArchiveEvent = (params) => {
        params.btnArchive.addEventListener('click', () => {
            params.li.setAttribute("data-archive", "true");
            params.li.style.display = "none";
        })
    }

    const renderTime = (date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return [months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()].join('')
    }

    const changeContentOpacity = (id, opacity) => {
        const listItems = Array.from(document.querySelectorAll(`${id}`));
        listItems.forEach((el) => {
            el.style.opacity = `${opacity}%`;
        })
    }

    const editItem = (params) => {
        changeContentOpacity('.task__item__child', 40);

        const name = params.name;
        const type = params.type;
        const description = params.description;
        const date = params.date;

        btnSubmit.innerHTML = "Edit";
        formTask.style.visibility = "visible";
        setFormValue({name, type, description, date});

        const InputTaskName = document.getElementById('task-name');
        InputTaskName.value = name;

        const taskType = document.getElementById('task-type');
        taskType.value = type;

        const contextValue = document.getElementById('task-description');
        contextValue.value = description;

        const dateValue = document.getElementById('task-date');
        dateValue.value = date;

    }

    const removeItem = (el) => {
        el.remove();
    }

    const addRemoveEvent = (params) => {
        params.btnRemove.addEventListener('click', () => {
            removeItem(params.li);
        });

      return params.taskList;
    }

    const addEditEvent = (params) => {
        params.btnEdit.addEventListener('click', () => {
            editItem(params);
        });
    }

    const chooseIcon = (type) => {
        let result;

        switch (type) {
            case 'idea':
                result = `<i class="fa-sharp fa-solid fa-lightbulb"></i>`
                break;
            case 'random-thought':
                result = `<i class="fa-solid fa-head-side-virus"></i>`;
                break;
            case 'task':
                result = `<i class="fa-sharp fa-solid fa-basket-shopping"></i>`;
                break;
        }
        return result;
    }

    const createElementContext = (id, params) => {
        const type = params.type;
        const templateId = 'list__item__element';
        const li = createElement({id, type, templateId});

        const icon = li.querySelector('[data-id="render-icon-value"]');
        icon.innerHTML = chooseIcon(params.type);

        const title = li.querySelector('[data-id="render-title-value"]');
        title.textContent = params.name;

        const category = li.querySelector('[data-id="render-category-value"]');
        category.textContent = params.type;

        const text = li.querySelector('[data-id="render-description"]');
        text.textContent = params.description;

        const dataTime = li.querySelector('[data-id="render-dates-value"]');
        dataTime.textContent = params.date;

        const time = li.querySelector('[data-id="render-time-value"]');
        time.innerHTML = renderTime(new Date());

        totalArrOfTasks[params.type] = {id: id, name: params.name, active: true};

        return li;
    }

    const setTypeDataValue = (type) => {
        let result;

        switch (type) {
            case 'idea':
                result = 'idea';
                break;
            case 'random-thought':
                result = 'random-thought';
                break;
            case 'task':
                result = 'task';
                break;
        }

        return result;
    }

    const getTotalData = (list) => {
        const taskElements = Array.from(list.querySelectorAll('.task__item__child'));

        const taskArr = taskElements.map((el) => {
            const id = el.getAttribute('data-value');
            const type = el.getAttribute('data-type');
            const archived = el.getAttribute('data-archive')

            return {
                id: id,
                type: type,
                archived: archived
            }
        });
        console.log(taskArr);

        const totalData = taskArr.reduce((total, el) => {
            const templateId = 'total-tasks';

            if (!total[el.type]) {
                total[el.type] = {active: 0, archived: 0}
                const type = el.type;
                const li = createElement({type, templateId});
                taskListTotal.appendChild(li);

                const icon = li.querySelector('[data-id="render-icon-value-total"]');
                icon.innerHTML = chooseIcon(type);

                const category = li.querySelector('[data-id="render-type-total"]');
                category.textContent = type;

                const totalActive = li.querySelector('[data-id="render-number-active"]');
                totalActive.textContent = '0';

                const totalArchived = li.querySelector('[data-id="render-number-arch"]');
                 totalArchived.textContent = '0';

            }
            if (el.archived) {
                total[el.type].archived++

            } else {
                total[el.type].active++

            }

            return total;
        }, {});


        return totalData;
    }



});