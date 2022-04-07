
const form = document.querySelector('form');
const pwd = document.querySelector('#pwd');
const pwd2 = document.querySelector('#pwd2');

/* console.log(email.matches(':hover')); */


/* Prueba seleccionando todos para un add event listener */
const inputs = document.querySelectorAll('.input');
inputs.forEach((fillInput) => {
  const inputError = fillInput.nextElementSibling;
  fillInput.addEventListener('input', () => {
    inputValidation(fillInput, inputError);
  });

  fillInput.addEventListener('focusin', () => {
    showAndHideErrorMessage(fillInput, true);
  });

  fillInput.addEventListener('focusout', () => {
    showAndHideErrorMessage(fillInput, false);
  });
});

function inputValidation(inputValue, inputError) {
  const spanRequired = inputValue.previousElementSibling.firstElementChild.firstElementChild;
  const pattern = /^\+([1-9]{3}(\-|\s)?){2}([1-9]{3})$/;

  /* console.log(inputValue.value);
  console.log(pattern.test(inputValue.value)); */

  if ((inputValue.id === 'pwd2') && (pwd.value !== pwd2.value)) {
    if (spanRequired) {
      spanRequired.textContent = '*'
    }
    showPasswordConfirmationError(inputValue, inputValue.nextElementSibling);
    showAndHideErrorMessage(inputValue, true);
  } else if ((inputValue.id === 'phone') && !(pattern.test(inputValue.value))) {
    showError(inputValue, inputError);
    showAndHideErrorMessage(inputValue, true);

  } else if (inputValue.validity.valid) {
    if (spanRequired) {
      spanRequired.style.color = 'blue';
    }

    inputError.textContent = '';
    showAndHideErrorMessage(inputValue);
    inputError.className = 'error';
  } else {
    if (spanRequired) {
      spanRequired.style.color = 'red'
    }
    showError(inputValue, inputError);
    showAndHideErrorMessage(inputValue, true);
  }
}

function showAndHideErrorMessage(inputValue = null, flag = false) {
  const errorActive = document.querySelector(`#${inputValue.id} + .error.active`);
  if (errorActive) {
    if (flag) {
      errorActive.style.display = 'inline-block';
    } else {
      errorActive.style.display = 'none';
    }
  }
}

form.addEventListener('submit', (event) => {
  for (let fillInput of inputs) {
    if ((fillInput === pwd2) && (pwd.value !== pwd2.value)) {
      showPasswordConfirmationError(fillInput, fillInput.nextElementSibling);
      showAndHideErrorMessage(fillInput, true);
      event.preventDefault();
    } else if (!fillInput.validity.valid) {
      showError(fillInput, fillInput.nextElementSibling);
      showAndHideErrorMessage(fillInput, true);
      event.preventDefault();
      break;
    }
  };
});

function showError(inputValue, inputError) {
  if (inputValue.validity.valueMissing) {
    switch (inputValue.id) {
      case 'name':
        inputError.textContent = 'You need to enter your first name.';
        break;

      case 'last-name':
        inputError.textContent = 'You need to enter your last name.';
        break;

      case 'email':
        inputError.textContent = 'You need to enter an e-mail address.';
        break;

      case 'phone':
        inputError.textContent = 'You need to enter your phone number.';
        break;

      case 'pwd':
        inputError.textContent = 'You need to enter a password.';
        break;

      case 'pwd2':
        inputError.textContent = 'You need to confirm your password.';
        break;

      default:
        break;
    }

  } else if (inputValue.validity.typeMismatch) {
    if (inputValue.id === 'email') {
      inputError.textContent = 'Entered value needs to be an e-mail address.';
    } else {
      console.log(`Error: ${inputValue}`);
    }

  } else if (inputValue.validity.patternMismatch) {
    if (inputValue.id === 'pwd') {
      inputError.textContent = `Your password must be at least ${inputValue.minLength} characters as well as contain at least one uppercase, one lowercase, and one number.`;
    } else {
      console.log(`Error: ${inputValue}`);
    }

  } else if (inputValue.validity.tooShort) {
    switch (inputValue.id) {
      case 'name':
        inputError.textContent = `First name should be at least ${inputValue.minLength} characters; you entered ${inputValue.value.length}.`;
        break;

      case 'last-name':
        inputError.textContent = `Last name should be at least ${inputValue.minLength} characters; you entered ${inputValue.value.length}.`;
        break;

      case 'email':
        inputError.textContent = `Your email should be at least ${inputValue.minLength} characters; you entered ${inputValue.value.length}.`;
        break;

      case 'phone':
        inputError.textContent = `Your phone number should be at least ${inputValue.minLength} characters; you entered ${inputValue.value.length}.`;
        break;

      case 'pwd':
        inputError.textContent = `Your password should be at least ${inputValue.minLength} characters; you entered ${inputValue.value.length}.`;
        break;

      default:
        break;
    }

  } else if (inputValue.validity.tooLong) {
    if (inputValue.id === 'pwd') {
      inputError.textContent = `Your password should be at most ${inputValue.maxLength} characters; you entered ${inputValue.value.length}.`;;
    }
  } else if (inputValue.id === 'phone') {
    inputError.textContent = 'Your phone number must be in this format: +123-123-123.';
  }

  inputError.className = 'error active';
}

function showPasswordConfirmationError(inputValue, inputError) {
  if (pwd.value !== inputValue.value) {
    inputError.textContent = `Your password confirmation is not correct.`;
    inputError.className = 'error active';
  }
}