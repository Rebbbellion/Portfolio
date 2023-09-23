import { popupInertToggle } from '../initialLoad/accessibility';
import { bodyLock, bodyUnlock } from './bodyLock';

const popup = document.getElementById('popup');
const popupWrapper = document.getElementById('popup-wrapper');
const popupContent = document.getElementById('popup-content');
const closeButton = document.getElementById('close-button');
const contactButton = document.getElementById('contact');

function popupOpen() {
   bodyLock();
   popup.classList.add('active');
   popupInertToggle();
   setTimeout(() => {
      closeButton.focus();
   }, 300);
   popup.removeEventListener('click', popupClose);
   document.removeEventListener('keydown', popupClose);
}

function popupClose(e) {
   if (
      (e.target.closest('#close-button') && e.type === 'click') ||
      e.target === popupWrapper ||
      e.key === 'Escape'
   ) {
      popup.classList.remove('active');
      popupInertToggle();
      contactButton.focus();

      if (!document.documentElement.classList.contains('menu-open')) {
         bodyUnlock();
      }
   }
}

popupContent.ontransitionend = () => {
   popup.addEventListener('click', popupClose);
   document.addEventListener('keydown', popupClose);
};

popup.addEventListener('click', popupClose);
document.addEventListener('keydown', popupClose);

export { popupOpen };
