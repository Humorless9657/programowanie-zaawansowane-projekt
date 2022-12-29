import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, orderBy, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { refreshProjectsItems } from './domFunctions.js';
import { leftSide, rightSide, loginAccount, registerAccount } from './home.js';
import { addProjectButtonClick, addItemButtonClick, removeCheckedButtonClick } from './projectsEvents';
import './style-index.css';

// Initialize Firebase App
initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore();
const auth = getAuth();

// Global variables storing collection references
let colRefProjects;
let colRefItems;

// Global variables storing ids, projects and items
let userId;
let currentProjectId;
let projectsArrayFirebase = [];
let itemsArrayFirebase = [];

// Generate html
loginAccount();
registerAccount();
leftSide();
rightSide();

const loginContainer = document.getElementById('form-login-container');
const registerContainer = document.getElementById('form-register-container');
const leftContainer = document.getElementById('left-container');
const rightContainer = document.getElementById('right-container');

// Set display to none if the user is not logged in
leftContainer.style.display = 'none';
rightContainer.style.display = 'none';
registerContainer.style.display = 'none';

const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Signing users up
const signUpText = document.getElementById('form-login-signup-a');
signUpText.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
    const signUp = document.getElementById('form-register-input-button');
    signUp.addEventListener('click', signUpButtonClick);

    function signUpButtonClick() {
        const registerEmail = document.getElementById('form-register-email-input');
        const registerPassword = document.getElementById('form-register-password-input');
        const registerError = document.getElementById('form-register-error');

        if (registerEmail.value.length === 0) {
            registerError.textContent = 'Email cannot be empty.';
        } else if (emailRegEx.test(registerEmail.value) === false) {
            registerError.textContent = 'Enter a valid email address.';
        } else if (registerPassword.value.length === 0) {
            registerError.textContent = 'Password cannot be empty.';
        } else if (registerPassword.value.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters long.';
        } else {
            // Takes email and password. Automatically logs the user in.
            createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
            .then((cred) => {
                // Creates a new document inside the 'users' collection with uid as its id
                setDoc(doc(db, 'users', cred.user.uid), {
                })
                // Empties inputs and hides the register container
                registerEmail.value = '';
                registerPassword.value = '';
                registerError.textContent = '';
                registerContainer.style.display = 'none';
            })
            .catch((err) => {
                registerError.textContent = err.message;
            })
        }
    }
})

// Logging in
const loginButton = document.getElementById('form-login-input-button');
loginButton.addEventListener('click', () => {
    const loginEmail = document.getElementById('form-login-email-input');
    const loginPassword = document.getElementById('form-login-password-input');
    const loginError = document.getElementById('form-login-error');

    if (loginEmail.value.length === 0) {
        loginError.textContent = 'Email cannot be empty.';
    } else if (emailRegEx.test(loginEmail.value) === false) {
        loginError.textContent = 'Enter a valid email address.';
    } else if (loginPassword.value.length === 0) {
        loginError.textContent = 'Password cannot be empty.';
    } else if (loginPassword.value.length < 6) {
        loginError.textContent = 'Password must be at least 6 characters long.';
    } else {
        signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then(() =>{
           loginEmail.value = '';
           loginPassword.value = '';
           loginError.textContent = '';
        })
        .catch((err) => {
           loginError.textContent = err.message;
        })
    }
})

// Subscribes to auth changes. Fires off every time there's an authentication change.
onAuthStateChanged(auth, (user) => {
    console.log('user status change: ', user)
    if (user !== null) {
        // Hides the login container and displays projets and items after logging in
        loginContainer.style.display = 'none';
        leftContainer.style.display = 'flex';
        rightContainer.style.display = 'flex';

        const userName = user.email.substring(0, user.email.indexOf('@'));
        const welcomeName = document.getElementById('header-user-name');
        welcomeName.textContent = userName;

        // Adding a new project
        const addProjectButton = document.getElementById('projects-add');
        addProjectButton.addEventListener('click', addProjectButtonClick);

        // Adding a new item
        const addItemButton = document.getElementById('button-input');
        addItemButton.addEventListener('click', addItemButtonClick);

        // Clearing checked items
        const removeCheckedButton = document.getElementById('button-remove');
        removeCheckedButton.addEventListener('click', removeCheckedButtonClick);
        
        userId = user.uid;
        colRefProjects = collection(db, 'users', userId, 'projects');
        let colRefProjectsOrderedByDate = query(colRefProjects, orderBy('createdAt'));
        
        // Real-time listener for projects. Runs once first and sends a new snapshot every time there's a change.
        onSnapshot(colRefProjectsOrderedByDate, (querySnapshot) => {
            projectsArrayFirebase = [];
            querySnapshot.forEach((doc) => {
                projectsArrayFirebase.push({...doc.data(), id: doc.id});
            });
            console.log(projectsArrayFirebase);
            refreshProjectsItems(currentProjectId, projectsArrayFirebase, itemsArrayFirebase);

            // Selects the first project as active when the site first loads
            if (currentProjectId === undefined && projectsArrayFirebase[0] !== undefined) {
                itemsSnapshot(projectsArrayFirebase[0].id);
            }
        })

        // Logging out
        const logoutButton = document.getElementById('logout');
        logoutButton.addEventListener('click', () => {
            signOut(auth)
            .then(() => {
                leftContainer.style.display = 'none';
                rightContainer.style.display = 'none';
                loginContainer.style.display = 'block';
                projectsArrayFirebase = [];
                itemsArrayFirebase = [];
                userId = undefined;
                currentProjectId = undefined;
            })
            .catch((err) => {
                console.log(err.message);
            })
        })
    }
})

// Real-time listener for items
function itemsSnapshot(projectID) {
    if (userId !== undefined && projectID !== undefined) {
        colRefItems = collection(db, 'users', userId, 'projects', projectID, 'items');
        let colRefItemsOrderedByDate = query(colRefItems, orderBy('createdAt'));
        onSnapshot(colRefItemsOrderedByDate, (querySnapshot) => {
            itemsArrayFirebase = [];
            querySnapshot.forEach((doc) => {
                itemsArrayFirebase.push({...doc.data(), id: doc.id});
        });
        console.log(itemsArrayFirebase);
        currentProjectId = projectID;
        refreshProjectsItems(projectID, projectsArrayFirebase, itemsArrayFirebase);
        });
    }
}

function changeCurrentProjectId(newId) {
    currentProjectId = newId;
}

export { db, colRefProjects, colRefItems, projectsArrayFirebase, itemsArrayFirebase, userId, currentProjectId, itemsSnapshot, changeCurrentProjectId }