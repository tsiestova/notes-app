/**
 * @typedef {Object} TaskParams
 * @property {HTMLFormElement} form - task form
 * @property {HTMLButtonElement} submit - form submit button
 * @property {String} type - type of the task
 * @property {String} name - name of the task
 * @property {String} description - task description
 * @property {String} date - due date
 * @property {Number|undefined} id
 */

import {formModule} from "./form.module";

export const application = () => {

    /**
     *
     * @param list
     * @returns {{archived: *, id: *, type: *}}
     */

    const init = () => {
        formModule();
    }

    init();
}
