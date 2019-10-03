/* Global VAriables */
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


const createRandChar = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  const char = String.fromCharCode(arr[randIndex]);
  console.log(char);
}

/* Load event listeners */
document.getElementById('defaultCheck1').addEventListener('click', handleCheck);
document.getElementById('defaultCheck2').addEventListener('click', handleCheck);
document.getElementById('defaultCheck3').addEventListener('click', handleCheck);
document.getElementById('defaultCheck4').addEventListener('click', handleCheck);

loadLetters();
createRandChar(passwordArr);