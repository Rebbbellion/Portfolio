import { bodyLock,bodyUnlock } from './bodyLock';

const popup = document.getElementById('popup');
const popupWrapper = document.getElementById('popup-wrapper');
const popupContent = document.getElementById('popup-content');

function popupOpen() {
   bodyLock();
   popup.classList.add('active');
   popup.removeEventListener('click', popupClose);
   document.removeEventListener('keydown', popupClose);
}

function popupClose(e) {
   if (
      e.target.closest('#close-button') ||
      e.target === popupWrapper ||
      e.key === 'Escape'
   ) {
      popup.classList.remove('active');
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
