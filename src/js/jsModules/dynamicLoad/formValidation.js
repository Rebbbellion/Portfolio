const inputsToValidate = document.querySelectorAll('input[pattern]');
const submitButton = document.querySelector('button[type="submit"]');

inputsToValidate.forEach((input) => {
   input.onpaste = (e) => e.preventDefault();
   input.oninput = () => {
      const regExp = new RegExp(input.pattern, 'g');
      const inputField = input.value.match(regExp) ?? [];
      input.value = inputField.join('');
      setTimeout(() => {
         if (input.value.length < input.minLength || !input.validity.valid) {
            input.classList.add('error');
            input.nextElementSibling.lastChild.textContent = input.minLength;
         }
      }, 2000);
      if (input.classList.contains('error')) {
         if (input.value.length >= input.minLength) {
            input.classList.remove('error');
         }
      }
      submitBtnToggle();
   };
});

function submitBtnToggle() {
   let isValid = false;

   for (let i = 0; i < inputsToValidate.length; i++) {
      if (
         inputsToValidate[i].value.length < inputsToValidate[i].minLength ||
         !inputsToValidate[i].validity.valid
      ) {
         isValid = false;
         break;
      } else {
         isValid = true;
      }
   }

   if (isValid) {
      submitButton.disabled = false;
   } else {
      submitButton.disabled = true;
   }
}
