import Trash from './icons/delete.svg';
import Edit from './icons/pencil.svg';
import './style-home.css';
import { deleteProjectButtonClick, selectProjectClick, deleteItemButtonClick, editItemButtonClick, changeCheckboxClick, selectItemClick } from './projectsEvents'

// 1) Adding projects and items
// a) Adds a new project (as an li element) to the left side
function addNewProject(projectName, projectId, arrayPosition) {
    const li = document.createElement('li');
    // remembers the project's unique id
    li.setAttribute('data-no', projectId);
    // remebers the item's position in the array of projects
    li.setAttribute('data-project-no', arrayPosition);
    const aTitle = document.createElement('div');
    aTitle.classList = 'project-title';
    aTitle.textContent = projectName;
    const aTrash = document.createElement('div');
    aTrash.classList = 'project-trash';
    const trashIcon = document.createElement('img');
    trashIcon.src = Trash;
    trashIcon.alt = 'Delete Project';

    li.appendChild(aTitle);
    aTrash.appendChild(trashIcon);
    li.appendChild(aTrash);

    return li;
}

// b) Adds a new item (as a div) to the right side
function addNewItem(title, desc, date, priority, checkStatus, arrayPosition) {
    const listItem = document.createElement('div');
    listItem.classList = 'list-item';
    // remebers the item's position in the array of items
    listItem.setAttribute('data-item-no', arrayPosition);

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList = 'list-item-check';
    checkbox.checked = checkStatus;

    // Content
    const itemContent = document.createElement('div');
    itemContent.classList = 'list-item-content';
    // adds the strikethrough effect if checkStatus is true (i.e. checkbox is checked)
    strikethroughIfChecked(itemContent, checkStatus);

    const itemContentTitle = document.createElement('div');
    itemContentTitle.classList = 'list-item-title';
    itemContentTitle.textContent = title;

    const itemContentBottom = document.createElement('div');
    itemContentBottom.classList = 'list-item-content-bottom';

    const itemDesc = document.createElement('div');
    itemDesc.classList = 'list-item-desc';
    itemDesc.textContent = desc;

    const itemDate = document.createElement('div');
    itemDate.classList = 'list-item-date';
    itemDate.textContent = date;

    const itemPriority = document.createElement('div');
    itemPriority.classList = 'list-item-priority';
    itemPriority.textContent = priority;

    // Icons
    const itemIcons = document.createElement('div');
    itemIcons.classList = 'list-item-icons';

    const aEdit = document.createElement('div');
    aEdit.classList = 'item-edit';
    const editIcon = document.createElement('img');
    editIcon.src = Edit;
    editIcon.alt = 'Edit Item';

    const aTrash = document.createElement('div');
    aTrash.classList = 'item-trash';
    const trashIcon = document.createElement('img');
    trashIcon.src = Trash;
    trashIcon.alt = 'Delete Item';

    // Append
    aEdit.appendChild(editIcon);
    aTrash.appendChild(trashIcon);
    itemIcons.appendChild(aEdit);
    itemIcons.appendChild(aTrash);

    itemContentBottom.appendChild(itemDesc);
    itemContentBottom.appendChild(itemDate);
    itemContentBottom.appendChild(itemPriority);

    itemContent.appendChild(itemContentTitle);
    itemContent.appendChild(itemContentBottom);
    itemContent.appendChild(itemContentBottom);

    listItem.appendChild(checkbox);
    listItem.appendChild(itemContent);
    listItem.appendChild(itemIcons);

    return listItem;
}

// Adds strikethrough text effect to the item's elements
function strikethroughIfChecked(element, ifCkecked) {
    if (ifCkecked == true) {
        element.classList = 'strikethrough';
    }
}

// 2) Refresh / generate content
// a) Refreshes projects and items
function refreshProjectsItems(projectID, projectsArray, itemsArray) {
    // Populates projects on the left (adds them as li elements to the projects-ul container)
    const projectsList = document.getElementById('projects-ul');
    clearElements(projectsList); // Clears exisitng project elements first to avoid duplicates
    populateProjectsList(projectsList, projectsArray);

    // Deletes a project after clicking the trash icon
    const deleteProjectButton = document.querySelectorAll('.project-trash');
    deleteProjectButton.forEach(trash => trash.addEventListener('click', deleteProjectButtonClick));
    
    // Selects a project after clicking on one
    const selectProject = document.querySelectorAll('.project-title');
    selectProject.forEach(select => select.addEventListener('click', selectProjectClick));

    // Highlights the selected / active project
    const highlightProject = document.querySelector(`[data-no="${projectID}"]`);
    if (highlightProject !== null) {
        highlightProject.classList = 'highlighted-project';
        // when the site loads for the first time
    } else if (projectsArray[0] !== undefined) {
        const highlightLastProject = document.querySelector(`[data-no="${projectsArray[0].id}"]`);
        highlightLastProject.classList = 'highlighted-project';
    }

    // Populates items on the right
    const itemsList = document.getElementById('items-div');
    clearElements(itemsList);
    if (projectID !== undefined) {
        populateItemsList(itemsList, itemsArray);
    }
    
    // Deletes an item after clicking the trash icon
    const deleteItemButton = document.querySelectorAll('.item-trash');
    deleteItemButton.forEach(trash => trash.addEventListener('click', deleteItemButtonClick));

    // Checks / unchecks items
    const changeCheckbox = document.querySelectorAll('.list-item-check');
    changeCheckbox.forEach(box => box.addEventListener('click', changeCheckboxClick));

    // Displays the edit popup that lets the user make changes to an item after clicking the pencil icon
    const editItemButton = document.querySelectorAll('.item-edit');
    editItemButton.forEach(edit => edit.addEventListener('click', editItemButtonClick));

    // Displays a popup with an item's content
    const selectItem = document.querySelectorAll('.list-item-content');
    selectItem.forEach(select => select.addEventListener('click', selectItemClick));
}

// b) Removes existing elements (projects or items) from the container
function clearElements(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}

// c) Iterates through the array of projects and adds them (as li elements) to the ul container
function populateProjectsList(ULelement, array) {
    for (let i = 0; i < array.length; i++) {
        ULelement.appendChild(addNewProject(array[i].name, array[i].id, i));
    }
}

// d) Iterates through the array of items and adds them (as divs) to the div container
function populateItemsList(divParent, items) {
    if (items === undefined) {
        return;
    }

    for (let i = 0; i < items.length; i++) {
        divParent.appendChild(addNewItem(items[i].title, items[i].desc, items[i].date, items[i].priority, items[i].checkbox, i));
    }
}

export { refreshProjectsItems }