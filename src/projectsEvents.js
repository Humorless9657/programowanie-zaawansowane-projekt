import { editItemPopup, selectItemPopup, createProjectPopup, createItemPopup } from './home.js'
import { addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, colRefProjects, colRefItems, projectsArrayFirebase, itemsArrayFirebase, userId, itemsSnapshot, currentProjectId, changeCurrentProjectId } from './index.js'

// I PROJECTS
// 1) addProjectButton event (index.js)
// a) First it displays the 'Add Project' popup window
function addProjectButtonClick() {
    if (document.getElementById('popup-container-project') == undefined) {
        createProjectPopup();
    }
    const popup = document.getElementById('popup-container-project');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    const confirmCreate = document.getElementById('project-button');
    confirmCreate.addEventListener('click', confirmCreateClick);

    closePopupOverlay(popup, overlay);
}

// b) then it takes user inputs and adds a new document to Firebase
function confirmCreateClick() {
    const popup = document.getElementById('popup-container-project');
    const addProjectInput = document.getElementById('add-bar');
    
    if (checkInputValue(addProjectInput.value, 'Project name cannot be empty.') === true) {
        return;
    }
    
    const newProjectData = {
        name: addProjectInput.value,
        createdAt: serverTimestamp()
    }
    // looks into the projects collection and adds the new document
    addDoc(colRefProjects, newProjectData);

    popup.classList.remove('active');
    overlay.classList.remove('active');
    addProjectInput.value = '';
}

// 2) deleteProjectButton event (domFunctions.js -> refreshProjectsItems function)
// a) Removes a project
function deleteProjectButtonClick(e) {
    // goes to the parent node (li element) and gets the data-no value (which corresponds to the document's id)
    let dataNo = e.currentTarget.parentNode.getAttribute('data-no');
    // similar but gets another value that corresponds to the position in the array of projects
    let positionInArray = e.currentTarget.parentNode.getAttribute('data-project-no');
    determineNewActiveProject(projectsArrayFirebase, dataNo, positionInArray);
    const docRef = doc(db, 'users', userId, 'projects', dataNo);
    deleteDoc(docRef);
}

// c) Determines which project should be active next in case of deleting the currently selected one
function determineNewActiveProject(array, IDvalue, position) {
    if (currentProjectId === IDvalue && array.length > 1) {
        // sets the project above as the active one (i.e previous project in the array if there is one)
        if (array[position - 1] !== undefined) {
            itemsSnapshot(array[position - 1].id);
        // If the selected project is the first one (no other projects above it) then the project below will become active 
        } else {
            // second item in the array since it'll become first (position 0) after the refresh function runs
            itemsSnapshot(array[1].id);
        }
    // prevents creating new items if the last project was deleted
    } else if (currentProjectId === IDvalue && array.length <= 1) {
        changeCurrentProjectId(undefined);
    }
}

// 3) selectProjectClick event (domFunctions.js -> refreshProjectsItems function)
// Activates a real-time listener for items belonging to the active project, so that all its items can show up etc.
function selectProjectClick(e) {
    let id = e.currentTarget.parentNode.getAttribute('data-no');
    itemsSnapshot(id);
}

// II ITEMS
// 1) addItemButton event (index.js)
// a) First it displays the 'Add Item' popup window
function addItemButtonClick() {
    // there has to be at least one project
    if (itemsArrayFirebase === undefined || projectsArrayFirebase.length == 0) {
         return;
    }

    if (document.getElementById('popup-container-item') == undefined) {
        createItemPopup();
    }
    const popup = document.getElementById('popup-container-item');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    const addItem = document.getElementById('popup-button-item');
    addItem.addEventListener('click', addItemClick);

    closePopupOverlay(popup, overlay);
}

// b) then it takes user inputs and creates a new document
function addItemClick() {
    const popup = document.getElementById('popup-container-item');
    const overlay = document.getElementById('overlay');

    const allInputs = document.querySelectorAll('.item-input');
    if (checkInputValue(allInputs[0].value, 'Values cannot be empty.') || checkInputValue(allInputs[1].value, 'Values cannot be empty.') || checkInputValue(allInputs[2].value, 'Values cannot be empty.') || checkInputValue(allInputs[3].value, 'Values cannot be empty.')) {
        //console.log('wrong value')
    } else {
        popup.classList.remove('active');
        overlay.classList.remove('active');

        const newItemData = {
            title: allInputs[0].value, 
            desc: allInputs[1].value, 
            date: allInputs[2].value, 
            priority: allInputs[3].value, 
            checkbox: false, 
            createdAt: new Date()
        }
        addDoc(colRefItems, newItemData);
        
        for (let i = 0; i < allInputs.length; i++) {
            allInputs[i].value = '';
        }
    }
}

// 2) deleteItemButton event (domFunctions.js -> refreshProjectsItems function)
// Deletes an item
function deleteItemButtonClick(e) {
    //data-item-no attribute == position in the items array
    let positionInArray = parseInt(e.currentTarget.parentNode.parentNode.getAttribute('data-item-no'));
    let itemId = itemsArrayFirebase[positionInArray].id;
    const docRef = doc(db, 'users', userId, 'projects', currentProjectId, 'items', itemId);
    deleteDoc(docRef);
}

// 3) changeCheckbox event (domFunctions.js -> refreshProjectsItems function)
// Sets the checkbox property to either true or false
function changeCheckboxClick(e) {
    let positionInArray = parseInt(e.currentTarget.parentNode.getAttribute('data-item-no'));
    let itemId = itemsArrayFirebase[positionInArray].id;
    let itemCheckboxValue = itemsArrayFirebase[positionInArray].checkbox;
    const docRef = doc(db, 'users', userId, 'projects', currentProjectId, 'items', itemId);

    if (itemCheckboxValue == false) {
        // toggle on
        updateDoc(docRef, {
            checkbox: true
        })
    } else {
        // toggle off
        updateDoc(docRef, {
            checkbox: false
        })
    }
}

// 4) editItemButton event (domFunctions.js -> refreshProjectsItems function)
// a) Displays the 'Edit Item' popup window and fills the inputs with existing data
let editItemNo;
function editItemButtonClick(e) {
    editItemNo = parseInt(e.currentTarget.parentNode.parentNode.getAttribute('data-item-no'));
    if (document.getElementById('popup-container-edit') == undefined) {
        editItemPopup();
    }

    const allInputs = document.querySelectorAll('.edit-popup-input');
    fillEditPopupInputs(allInputs, itemsArrayFirebase, editItemNo);
    const popup = document.getElementById('popup-container-edit');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    const confirmChange = document.getElementById('popup-button-edit');
    confirmChange.addEventListener('click', confirmChangeClick);

    closePopupOverlay(popup, overlay);
}

// b) then it takes user inputs and updates the document
function confirmChangeClick() {
    const popup = document.getElementById('popup-container-edit');
    const overlay = document.getElementById('overlay');
    let itemId = itemsArrayFirebase[editItemNo].id;
    const docRef = doc(db, 'users', userId, 'projects', currentProjectId, 'items', itemId);

    const allInputs = document.querySelectorAll('.edit-popup-input');
    if (checkInputValue(allInputs[0].value, 'Values cannot be empty.') || checkInputValue(allInputs[1].value, 'Values cannot be empty.') || checkInputValue(allInputs[2].value, 'Values cannot be empty.') || checkInputValue(allInputs[3].value, 'Values cannot be empty.')) {
        //console.log('wrong value')
    } else {
        updateDoc(docRef, {
            title: allInputs[0].value,
            desc: allInputs[1].value,
            date: allInputs[2].value,
            priority: allInputs[3].value
        })
        popup.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// c) Fills the 'Edit Item' popup inputs with existing data
function fillEditPopupInputs(inputs, array, position) {
    const items = array[position];
    inputs[0].value = items.title;
    inputs[1].value = items.desc;
    inputs[2].value = items.date;
    inputs[3].value = items.priority;
}

// 5) selectItem event (domFunctions.js -> refreshProjectsItems function)
// Displays the popup window with all the details
function selectItemClick(e) {
    let positionInArray = parseInt(e.currentTarget.parentNode.getAttribute('data-item-no'));
    let itemData = itemsArrayFirebase[positionInArray];

    selectItemPopup(itemData.title, itemData.desc, itemData.date, itemData.priority, convertTimestamp(itemData.createdAt));

    const popup = document.getElementById('popup-container-select');
    popup.classList = 'active';

    const overlay = document.getElementById('overlay');
    overlay.classList = 'active';

    closePopupOverlay(popup, overlay);
}

// III MISC. 
// 1) removeCheckedButton event (index.js)
// Removes all checked items with the 'Clear Checked' button
function removeCheckedButtonClick() {
    for (let i = 0; i < itemsArrayFirebase.length; i++) {
        if (itemsArrayFirebase[i].checkbox == true) {
            let itemId = itemsArrayFirebase[i].id;
            const docRef = doc(db, 'users', userId, 'projects', currentProjectId, 'items', itemId);
            deleteDoc(docRef);
        }
    }
}

// 2) Checks if an input value is empty or starts with an empty string
function checkInputValue(element, message) {
    if (element == '' || element.startsWith(' ')) {
        alert(message);
        return true;
    }
}

// 3) Removes the popup window when the user clicks outside of it
function closePopupOverlay(popup, overlay) {
    overlay.addEventListener('click', closePopup);
    function closePopup() {
        popup.remove();
        overlay.remove();
    }
}

// 4) Converts a timestamp to a readable date format
function convertTimestamp(timestamp) {
    const milliseconds = timestamp.seconds * 1000; 
    const dateObject = new Date(milliseconds);
    const dateFormat = dateObject.toLocaleString();
    return dateFormat;
}

export { addProjectButtonClick, deleteProjectButtonClick, addItemButtonClick, selectProjectClick, deleteItemButtonClick, editItemButtonClick, changeCheckboxClick, removeCheckedButtonClick, selectItemClick }