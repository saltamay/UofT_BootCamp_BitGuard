// import activate from './utils';

const handleCheck = (event) => {
  const targetId = event.target.id;
  if (targetId === 'defaultCheck3') {
    document.getElementById('inputNumber').disabled = !document.getElementById('inputNumber').disabled;
  } else {
    document.getElementById('inputSpecial').disabled = !document.getElementById('inputSpecial').disabled;
  }
}


document.getElementById('defaultCheck3').addEventListener('click', handleCheck);
document.getElementById('defaultCheck4').addEventListener('click', handleCheck);