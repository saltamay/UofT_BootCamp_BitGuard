/* Global Variables */
const newListArr = [];

const defaultLength = 12;
let passwordArr = [];
let capitalLetters = [];
let smallLetters = [];
const specialChars = [33, 35, 36, 37, 38, 42, 64, 94];
const numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

/* Utility Functions */
// Load the password array with ASCII codes for A-Z and a-z
const loadLetters = () => {
  // load charecter codes for capital letters
  for (let i = 65; i <= 90; i++) {
    capitalLetters.push(i);
  }
  // load charecter codes for small letters
  for (let i = 97; i <= 122; i++) {
    smallLetters.push(i);
  }
  // Push the default codes to the password arr
  passwordArr = [...capitalLetters, ...smallLetters];
  // console.log(passwordArr);
}

// Creates random character from an arr that holds ASCII codes 
const createRandChar = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);

  return String.fromCharCode(arr[randIndex]);
}

// Generate password
const generatePass = (arr) => {
  // const passLength = document.getElementById('passLength').value;
  let password = "";
  for (let i = 0; i < defaultLength; i++) {
    const char = createRandChar(arr);
    password += char;
  }
  console.log(password);
  return password;
}

const displayPassword = (arr) => {
  
  const password = generatePass(arr);

  document.getElementById('modalPassword').value = password;
}

const togglePassword = () => {

  const passInput = document.getElementById('modalPassword');
  
  if (passInput.type === 'password') {
    
    passInput.type = 'text';

    const eyeIcon = document.querySelector('.fa-eye');
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');

  } else {
    
    passInput.type = 'password';

    const eyeIcon = document.querySelector('.fa-eye-slash');
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
  }
}

// Copy to clipboard
const copy = () => {
  /* Get the text field */
  const passCopy = document.getElementById("modalPassword");

  /* Select the text field */
  passCopy.select();
  passCopy.blur();
  passCopy.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  // Confirm that password copied
  alertCopy();
}

// Display a meesage to confirm password is copied to clipboard
const alertCopy = () => {

  const div = document.createElement('div');

  // List of bootstrap classes
  const cls = ["alert", "alert-dismissible", "fade", "show", "alert-copy"];

  div.classList.add(...cls);

  div.innerHTML = `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span id="alertClose" aria-hidden="true" class="text-white">&times;</span>
                  </button>
                  <span class="pr-5"><i class="fas fa-info-circle pr-2"></i>Password copied</span>`


  document.querySelector('#alert-container').appendChild(div);

  // Delete the alert after 3 seconds
  setTimeout(() => {
    div.remove();
  }, 3000);
}

const savePassword = () => {

  const name = document.getElementById('passName').value;
  const userName = document.getElementById('userName').value;
  const url = document.getElementById('url').value;
  const password = document.getElementById('modalPassword').value;

  const passLog = {
    name,
    userName,
    url,
    password
  }

  // console.log(passLog);

  $('#exampleModal').modal('toggle');
  
  displayNewList(passLog);
  addToLocalStorage(passLog);
  displayPassList();

  return passLog;
}

const addToList = (password) => {

  const emptyMessage = document.querySelector('.empty-list');

  if (emptyMessage) {
    emptyMessage.remove();
  }

  const li = document.createElement('li');
  
  li.classList.add('list-group-item', 'p-0', 'border-0');

  li.innerHTML = `<div class="card border-left-0 border-right-0 rounded-0 " style="width: 100%;">
                    <div class="card-body p-2">
                      <a href="${password.url}" class="card-link">${password.name}</a>
                      <p class="card-text">${password.userName}</p>
                    </div>
                  </div>`;

  document.querySelectorAll('.password-list')[1].appendChild(li);
}

const displayNewList = (password) => {
  
  newListArr.push(password);

  const sortedArr = sortByName(newListArr);

  sortedArr.forEach(element => {
    const li = document.createElement('li');

    li.classList.add('list-group-item', 'p-0', 'border-0');

    li.innerHTML = `<div class="card border-left-0 border-right-0 rounded-0 " style="width: 100%;">
                    <div class="card-body p-2">
                      <a href="${password.url}" class="card-link">${password.name}</a>
                      <p class="card-text">${password.userName}</p>
                    </div>
                  </div>`;

    document.querySelector('.new.password-list').appendChild(li);
    
  });
  document.querySelector('.new-list').style.display = 'block';
}

const addToLocalStorage = (password) => {

  let passArr = JSON.parse(localStorage.getItem('passwords'));
  
  if (passArr) {
    passArr.push(password);
  } else {
    passArr = [];
    passArr.push(password);
  }

  localStorage.setItem('passwords', JSON.stringify(passArr));

}

// Sort an array of objects by name property
const sortByName = (arr) => {
  arr.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB)
      return -1
    if (nameA > nameB)
      return 1
    return 0
  });

  return arr;
}

const displayPassList = () => {

  // const passList = document.querySelector('.password-list li');

  let passArr = JSON.parse(localStorage.getItem('passwords'));

  console.log(passArr);

  if (passArr === null) {
    
    const div = document.createElement('div');
    div.innerHTML = '<h5 class="empty-list mt-5 text-center">Your vault is empty</h5>'
    document.querySelector('.vault-section').appendChild(div);

  } else {
    while (document.querySelectorAll('.password-list')[1].hasChildNodes()) {
      document.querySelectorAll('.password-list')[1].firstChild.remove();
    }
    // Sort passwords by passwords name
    passArr = sortByName(passArr);
    // Loop through the passwords array and display them as list items
    passArr.forEach(element => {
      // console.log(typeof element);
      addToList(element);
    });
  }
}


// Add event listener to the password generate button
document.getElementById('createPass').addEventListener('click', () => { displayPassword(passwordArr) });
document.getElementById('togglePassword').addEventListener('click', togglePassword);
document.getElementById('copyPassword').addEventListener('click', copy);
document.getElementById('save').addEventListener('click', savePassword);


displayPassList();
loadLetters();