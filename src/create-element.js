
export const createElement = ({id, type, templateId}) => {

    const template = document.getElementById(templateId);
    const templateClone = template.cloneNode(true);
    const li = document.createElement('li');

    li.setAttribute("class", "task__item task__item__child");
    li.setAttribute("data-value", id);
    li.setAttribute('data-type', type);

    li.innerHTML = templateClone.innerHTML;

    return li;
}