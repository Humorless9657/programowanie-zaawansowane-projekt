import Plus from './icons/plus.svg';
import Account from './icons/account-circle.svg';
import Mail from './icons/mail.svg';
import Password from './icons/password.svg';

function loginAccount() {
    const content = document.getElementById('content');

    const loginContainer = document.createElement('div');
    loginContainer.id = 'form-login-container';

    const loginTitle = document.createElement('span');
    loginTitle.id = 'form-login-title';
    loginTitle.textContent = 'Login';

    const loginForm = document.createElement('form');
    loginForm.action = '#';
    const loginFormEmail = document.createElement('div');
    loginFormEmail.classList = 'form-login-input';
    const loginFormEmailInput = document.createElement('input');
    loginFormEmailInput.id = 'form-login-email-input';
    loginFormEmailInput.type = 'text';
    loginFormEmailInput.placeholder = 'Enter your email';
    loginFormEmailInput.required = true;
    const loginFormEmailImage = document.createElement('img');
    loginFormEmailImage.src = Mail;
    loginFormEmailImage.alt = 'email';

    const loginFormPassword = document.createElement('div');
    loginFormPassword.classList = 'form-login-input';
    const loginFormPasswordInput = document.createElement('input');
    loginFormPasswordInput.id = 'form-login-password-input';
    loginFormPasswordInput.type = 'password';
    loginFormPasswordInput.placeholder = 'Enter your password';
    loginFormPasswordInput.required = true;
    const loginFormPasswordImage = document.createElement('img');
    loginFormPasswordImage.src = Password;
    loginFormPasswordImage.alt = 'password';

    const loginFormButton = document.createElement('div');
    loginFormButton.classList = 'form-login-input';
    loginFormButton.id = 'form-login-button';
    const loginFormButtonInput = document.createElement('input');
    loginFormButtonInput.id = 'form-login-input-button';
    loginFormButtonInput.type = 'button';
    loginFormButtonInput.value = 'Login';

    const signupText = document.createElement('div');
    signupText.id = 'form-login-signup'
    const signupTextSpan = document.createElement('span');
    signupTextSpan.textContent = 'Not a member? ';
    const signupTextSpanAnchor = document.createElement('a');
    signupTextSpanAnchor.id = 'form-login-signup-a';
    signupTextSpanAnchor.href = '#';
    signupTextSpanAnchor.textContent = 'Sign up now!';

    const errorText = document.createElement('div');
    errorText.id = 'form-login-error';

    // Append
    loginContainer.appendChild(loginTitle);
    loginFormEmail.appendChild(loginFormEmailInput);
    loginFormEmail.appendChild(loginFormEmailImage);
    loginFormPassword.appendChild(loginFormPasswordInput);
    loginFormPassword.appendChild(loginFormPasswordImage);
    loginFormButton.appendChild(loginFormButtonInput);
    loginForm.appendChild(loginFormEmail);
    loginForm.appendChild(loginFormPassword);
    loginForm.appendChild(loginFormButton);
    signupTextSpan.appendChild(signupTextSpanAnchor);
    signupText.appendChild(signupTextSpan);
    loginContainer.appendChild(loginForm);
    loginContainer.appendChild(signupText);
    loginContainer.appendChild(errorText);
    content.appendChild(loginContainer);
}

function registerAccount() {
    const content = document.getElementById('content');

    const registerContainer = document.createElement('div');
    registerContainer.id = 'form-register-container';

    const registerTitle = document.createElement('span');
    registerTitle.id = 'form-register-title';
    registerTitle.textContent = 'Sign Up';

    const registerForm = document.createElement('form');
    registerForm.action = '#';
    const registerFormEmail = document.createElement('div');
    registerFormEmail.classList = 'form-register-input';
    const registerFormEmailInput = document.createElement('input');
    registerFormEmailInput.id = 'form-register-email-input';
    registerFormEmailInput.type = 'text';
    registerFormEmailInput.placeholder = 'Enter your email';
    registerFormEmailInput.required = true;
    const registerFormEmailImage = document.createElement('img');
    registerFormEmailImage.src = Mail;
    registerFormEmailImage.alt = 'email';

    const registerFormPassword = document.createElement('div');
    registerFormPassword.classList = 'form-register-input';
    const registerFormPasswordInput = document.createElement('input');
    registerFormPasswordInput.id = 'form-register-password-input';
    registerFormPasswordInput.type = 'password';
    registerFormPasswordInput.placeholder = 'Create a password';
    registerFormPasswordInput.required = true;
    const registerFormPasswordImage = document.createElement('img');
    registerFormPasswordImage.src = Password;
    registerFormPasswordImage.alt = 'password';

    const registerFormButton = document.createElement('div');
    registerFormButton.classList = 'form-register-input';
    registerFormButton.id = 'form-register-button';
    const registerFormButtonInput = document.createElement('input');
    registerFormButtonInput.id = 'form-register-input-button';
    registerFormButtonInput.type = 'button';
    registerFormButtonInput.value = 'Sign Up';

    const errorText = document.createElement('div');
    errorText.id = 'form-register-error';

    // Append
    registerContainer.appendChild(registerTitle);
    registerFormEmail.appendChild(registerFormEmailInput);
    registerFormEmail.appendChild(registerFormEmailImage);
    registerFormPassword.appendChild(registerFormPasswordInput);
    registerFormPassword.appendChild(registerFormPasswordImage);
    registerFormButton.appendChild(registerFormButtonInput);
    registerForm.appendChild(registerFormEmail);
    registerForm.appendChild(registerFormPassword);
    registerForm.appendChild(registerFormButton);
    registerContainer.appendChild(registerForm);
    registerContainer.appendChild(errorText);
    content.appendChild(registerContainer);
}

function leftSide() {
    const content = document.getElementById('content');
    
    // 1) Left container
    const leftContainer = document.createElement('div');
    leftContainer.id = 'left-container';

    // 2) 'Todo List' text
    const leftContainerH1 = document.createElement('h1');
    leftContainerH1.textContent = 'Todo List';

    // 3) 'Projects' text & 'Plus' icon
    const projectsDiv = document.createElement('div');
    projectsDiv.id = 'projects-div';
    
    const projectsH2 = document.createElement('h2');
    projectsH2.textContent = 'Projects';
    
    const projectsAdd = document.createElement('div');
    projectsAdd.id = 'projects-add';
    
    const plusIcon = document.createElement('img');
    plusIcon.src = Plus;
    plusIcon.alt = 'Add Project'
    
    // 4) Projects created by the user
    const projectsList = document.createElement('ul');
    projectsList.id = 'projects-ul';

    // 5) Append
    projectsAdd.appendChild(plusIcon);
    projectsDiv.appendChild(projectsH2);
    projectsDiv.appendChild(projectsAdd);

    leftContainer.appendChild(leftContainerH1);
    leftContainer.appendChild(projectsDiv);
    leftContainer.appendChild(projectsList);

    content.appendChild(leftContainer);
}

function rightSide() {
    const content = document.getElementById('content');

    // 1) Right container
    const rightContainer = document.createElement('div');
    rightContainer.id = 'right-container';

    // 2) Headers
    const header = document.createElement('div');
    header.classList = 'header';
    const headerLeft = document.createElement('div');
    headerLeft.classList = 'header-left';
    const accountimage = document.createElement('img');
    accountimage.alt = 'Account';
    accountimage.src = Account;
    const headerHi = document.createElement('div');
    headerHi.classList = 'header-hi';
    const headerHi1 = document.createElement('div');
    headerHi1.textContent = 'Welcome back and good luck.';
    const headerHi2 = document.createElement('div');
    headerHi2.textContent = 'Morgan Oakley';
    headerHi2.id = 'header-user-name';
    const logoutButton2 = document.createElement('button');
    logoutButton2.id = 'logout';
    logoutButton2.textContent = 'Logout';

    // 3) Buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList = 'header-buttons';
    // a) 'Add Item' button
    const addButton = document.createElement('button');
    addButton.id = 'button-input';
    addButton.textContent = 'Add Item';
    // b) 'Clear Checked' button
    const removeCheckedButton = document.createElement('button');
    removeCheckedButton.id = 'button-remove';
    removeCheckedButton.textContent = 'Clear Checked';

    // 4) Items created by the user
    const itemsDiv = document.createElement('div');
    itemsDiv.id = 'items-div';

    // 5) Append
    headerHi.appendChild(headerHi1);
    headerHi.appendChild(headerHi2);
    headerLeft.appendChild(accountimage);
    headerLeft.appendChild(headerHi);
    headerLeft.appendChild(logoutButton2);
    buttonsDiv.appendChild(addButton);
    buttonsDiv.appendChild(removeCheckedButton);
    header.appendChild(headerLeft);
    header.appendChild(buttonsDiv);
    rightContainer.appendChild(header);
    rightContainer.appendChild(itemsDiv);
    content.appendChild(rightContainer);
}

function createProjectPopup() {
    const content = document.getElementById('content');

    const container = document.createElement('div');
    container.id = 'popup-container-project';

    const title = document.createElement('h4');
    title.textContent = 'Project name';
    const divProjectName = document.createElement('input');
    divProjectName.id = 'add-bar';
    divProjectName.type = 'text';

    // Buttons
    const button = document.createElement('button');
    button.id = 'project-button';
    button.textContent = 'Create';

    // Append
    container.appendChild(title);
    container.appendChild(divProjectName);
    container.appendChild(button);
    content.appendChild(container);

    if (document.getElementById('overlay') == undefined) {
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        content.appendChild(overlay);
    }
}

function createItemPopup() {
    const content = document.getElementById('content');

    const container = document.createElement('div');
    container.id = 'popup-container-item';

    // Add Item text
    const divTitle = document.createElement('div');
    divTitle.textContent = 'Add Item';
    divTitle.id = 'popup-title-item';

    const divContent = document.createElement('div');
    divContent.id = 'popup-input-container-item';

    // Text and date inputs
    const popupTitle = createInput('title', 'text', 'item-input-div', 'item-input');
    const popupDesc = createInput('description', 'text', 'item-input-div', 'item-input');
    const popupDate = createInput('date', 'date', 'item-input-div', 'item-input');

    // Select inputs
    const selectOptionsArray = ['Low', 'Medium', 'High'];
    const popupPriority = createSelectInputs('Priority', 'item-input-div', 'item-input', selectOptionsArray);

    // Buttons
    const button = document.createElement('button');
    button.id = 'popup-button-item';
    button.textContent = 'Add';

    // Append
    divContent.appendChild(popupTitle);
    divContent.appendChild(popupDesc);
    divContent.appendChild(popupDate);
    divContent.appendChild(popupPriority);

    container.appendChild(divTitle);
    container.appendChild(divContent);
    container.appendChild(button);
    content.appendChild(container);
    
    if (document.getElementById('overlay') == undefined) {
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        content.appendChild(overlay);
    }
}

function editItemPopup() {
    const content = document.getElementById('content');

    const container = document.createElement('div');
    container.id = 'popup-container-edit';

    const divTitle = document.createElement('div');
    divTitle.textContent = 'Edit Item';
    divTitle.id = 'popup-title-edit';

    const divContent = document.createElement('div');
    divContent.id = 'popup-input-container-edit';

    // Create text and date inputs
    const popupTitle = createInput('title', 'text', 'input-item-popup', 'edit-popup-input');
    const popupDesc = createInput('description', 'text', 'input-item-popup', 'edit-popup-input');
    const popupDate = createInput('date', 'date', 'input-item-popup', 'edit-popup-input');

    // Create select input
    const selectOptionsArray = ['Low', 'Medium', 'High'];
    const popupPriority = createSelectInputs('Priority', 'input-item-popup', 'edit-popup-input', selectOptionsArray);

    // Buttons
    const button = document.createElement('button');
    button.id = 'popup-button-edit';
    button.textContent = 'Update';

    // Append
    divContent.appendChild(popupTitle);
    divContent.appendChild(popupDesc);
    divContent.appendChild(popupDate);
    divContent.appendChild(popupPriority);

    container.appendChild(divTitle);
    container.appendChild(divContent);
    container.appendChild(button);
    content.appendChild(container);

    if (document.getElementById('overlay') == undefined) {
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        content.appendChild(overlay);
    }
}

function selectItemPopup(title, desc, date, priority, createdAt) {
    const content = document.getElementById('content');

    const container = document.createElement('div');
    container.id = 'popup-container-select';

    // inputs
    const h4Title = document.createElement('h4');
    h4Title.textContent = 'Title';
    const divTitle = document.createElement('div');
    divTitle.textContent = title;
    divTitle.id = 'popup-title';

    const h4Desc = document.createElement('h4');
    h4Desc.textContent = 'Description';
    const divDesc = document.createElement('div');
    divDesc.textContent = desc;

    const h4Date = document.createElement('h4');
    h4Date.textContent = 'Finish by Date';
    const divDate = document.createElement('div');
    divDate.textContent = date;

    const h4Priority = document.createElement('h4');
    h4Priority.textContent = 'Priority';
    const divPriority = document.createElement('div');
    divPriority.textContent = priority;

    const h4DateCreated = document.createElement('h4');
    h4DateCreated.textContent = 'Created on';
    const divDateCreated = document.createElement('div');
    divDateCreated.textContent = createdAt;

    // Append
    container.appendChild(h4Title);
    container.appendChild(divTitle);
    container.appendChild(h4Desc);
    container.appendChild(divDesc);
    container.appendChild(h4Date);
    container.appendChild(divDate);
    container.appendChild(h4Priority);
    container.appendChild(divPriority);
    container.appendChild(h4DateCreated);
    container.appendChild(divDateCreated);
    content.appendChild(container);

    if (document.getElementById('overlay') == undefined) {
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        content.appendChild(overlay);
    }
}

// Creates text or date inputs
function createInput(name, type, divClass, inputClass) {
    const div = document.createElement('div');
    div.classList = divClass;

    const label = document.createElement('label');
    label.textContent = capitalizeFirstLetter(name);

    const input = document.createElement('input');
    input.type = type;
    input.classList = inputClass;

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

// Creates a select input
function createSelectInputs(labelName, divClassName, inputClassName, optionsArray) {
    const div = document.createElement('div');
    div.classList = divClassName;
    const label = document.createElement('label');
    label.textContent = labelName;
    const select = document.createElement('select');
    select.name = labelName;
    select.classList = inputClassName;

    for (let i = 0; i < optionsArray.length; i++) {
        const option = document.createElement('option');
        option.value = optionsArray[i];
        option.textContent = optionsArray[i];
        select.appendChild(option);
    }

    div.appendChild(label);
    div.appendChild(select);

    return div;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { leftSide, rightSide, editItemPopup, selectItemPopup, createProjectPopup, createItemPopup, loginAccount, registerAccount }