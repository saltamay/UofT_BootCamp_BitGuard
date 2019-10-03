/* Global VAriables */
let passwordArr = [];
let capitalLetters = [];
let smallLetters = [];
const specialChars = [33, 35, 36, 37, 38, 42, 64, 94];
const numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
// DOM elements

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

// Add or remove optional char codes from the password array
const toggleOptions = (event, arr) => {
  if (event.target.checked === true) {
    passwordArr = [...passwordArr, ...arr];
  } else {
    passwordArr.splice(passwordArr.indexOf(arr[0]), arr.length);
  }
}

// Toggles character codes from password arr when checked/unchecked
const handleCheck = (event) => {
  const targetId = event.target.id;
  switch (targetId) {
    case 'defaultCheck1':
      toggleOptions(event, capitalLetters);
      break;
    case 'defaultCheck2':
      toggleOptions(event, smallLetters);
      break;
    case 'defaultCheck3':
      document.getElementById('inputNumber').disabled = !document.getElementById('inputNumber').disabled;
      toggleOptions(event, numbers);
      break;
    case 'defaultCheck4':
      document.getElementById('inputSpecial').disabled = !document.getElementById('inputSpecial').disabled;
      toggleOptions(event, specialChars);
      break;
  }
}

// Creates random character from an arr that holds ASCII codes 
const createRandChar = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  
  return String.fromCharCode(arr[randIndex]);
}

// Generate password
const generatePass = (arr) => {
  const passLength = document.getElementById('passLength').value;
  let password = "";
  for (let i = 0; i < passLength; i++) {
    const char = createRandChar(arr);
    password += char;    
  }
  console.log(password);
  return password;
}

// Display password
const displayPass = (arr) => {
  const password = generatePass(arr);
  document.getElementById('passDisplay').value = password;
  // Enable copy to clipnoard button
  document.getElementById('copyPass').disabled = false;
}

// Copy to clipboard
const copy = () => {
  /* Get the text field */
  const passCopy = document.getElementById("passDisplay");

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

  // Add event listener to close alert
  document.getElementById('alertClose').addEventListener('click', alertClose);
}

// Close alert
const alertClose = () => {
  document.querySelector('.alert').classList.toggle('alert-copy');
} 

/* Load event listeners */
// Add event listeners to the option selections
document.getElementById('defaultCheck1').addEventListener('click', handleCheck);
document.getElementById('defaultCheck2').addEventListener('click', handleCheck);
document.getElementById('defaultCheck3').addEventListener('click', handleCheck);
document.getElementById('defaultCheck4').addEventListener('click', handleCheck);
// Add event listener to the password generate button
document.getElementById('generatePass').addEventListener('click', () => {displayPass(passwordArr)});
// Add event listener to copy to clipboard button
document.getElementById('copyPass').addEventListener('click', copy);


loadLetters();
