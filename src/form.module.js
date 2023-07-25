import {addTaskToList, changeContentOpacity, clearTasks} from "./list.module";

export const formModule = () => {
    const formTask = document.getElementById('form-task');
    const btnDisplayForm = document.getElementById('btn-display');
    const btnCloseForm = document.getElementById("btn-close");
    const btnClear = document.getElementById("btn-clear");
    const btnSubmit = document.getElementById("btn-submit");

    /**
     * show form on the page
     */
    const showForm = () => {
        formTask.style.visibility = "visible";
        btnDisplayForm.style.visibility = "hidden";
        changeContentOpacity('.task__item__child', 20);
    }

    /**
     * Hiding task form
     */
    const hideForm = () => {
        formTask.style.visibility = "hidden";
        changeContentOpacity('.task__item__child', 100);
        btnSubmit.textContent = "Add";
        formTask.reset();
        btnDisplayForm.style.visibility = "visible";
    }

    /**
     * Handle form submission
     *
     * @param {HTMLFormElement} form
     */
    const handleFormSubmit = (form) => {
        const name = form.title.value;
        const type = form.category.value;
        const description = form.description.value;
        const date = form.data.value;

        try {
            addTaskToList({
                form,
                submit: btnSubmit,
                name,
                type,
                description,
                date
            });
            hideForm();
        } catch (e) {
            console.log(e);
            alert(e);

        }
    }

    /**
     * Adding show and hide listeners
     */
    const addEventListeners = () => {
        btnDisplayForm.addEventListener('click', showForm);
        btnCloseForm.addEventListener("click", hideForm);
        btnClear.addEventListener("click", clearTasks);
        formTask.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            handleFormSubmit(form);
        });
    }

    const init = () => {
        addEventListeners();
    }

    init();
}