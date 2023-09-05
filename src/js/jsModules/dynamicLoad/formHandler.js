import i18next from 'i18next';

const submittedCoverElement = document.getElementById('submitted-cover');
const LOAD_GIF_URL =
   'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZxOGMxNzVqaHBxZWdoMWx5ODhqcXN3b2pndWtjeWl4bjc3dWp1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/FgH5xSNjGHZsiYPWAX/giphy.gif';

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

export function sendForm(form) {
   const data = new FormData(form);
   const imgElement = document.createElement('img');
   imgElement.style.cssText =
      'position:absolute; z-index:10; top:50%;left:50%; transform:translate(-50%,-50%);width:150px;heigth:150px';
   imgElement.src = LOAD_GIF_URL;
   submittedCoverElement.classList.add('submitted');
   submittedCoverElement.insertAdjacentElement('beforebegin', imgElement);
   fetch(form.action, {
      method: form.method,
      headers: {
         Accept: 'application/json',
      },
      body: data,
   }).then((response) => {
      if (response.ok) {
         setTimeout(() => {
            imgElement.remove();
            submittedCoverElement.textContent = i18next.t('status-yes', {
               ns: 'text',
            });
            form.reset();
            submitBtnToggle();
            setTimeout(() => {
               submittedCoverElement.classList.remove('submitted');
					submittedCoverElement.textContent = '';
            }, 3000);
         }, 2000);
      } else {
         setTimeout(() => {
            imgElement.remove();
            submittedCoverElement.textContent = i18next.t('status-no', {
               ns: 'text',
            });
            submitBtnToggle();
            setTimeout(() => {
               submittedCoverElement.classList.remove('submitted');
               submittedCoverElement.textContent = '';
            }, 3000);
         }, 2000);
      }
   });
}
