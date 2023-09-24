//Menu Burger
const navigationBodyEl = document.getElementById('navigation-body');
const mainElement = document.querySelector('main');
const menuMediaQuery = matchMedia('(max-width:64rem');
const menuButton = document.getElementById('burger');

function menuInertToggle() {
   if (menuMediaQuery.matches) {
      if (document.documentElement.classList.contains('menu-open')) {
         mainElement.inert = true;
         navigationBodyEl.inert = false;
         menuButton.setAttribute('aria-expanded', true);
      } else {
         menuButton.setAttribute('aria-expanded', false);
         mainElement.inert = false;
         navigationBodyEl.inert = true;
      }
   } else {
      mainElement.inert = false;
      navigationBodyEl.inert = false;
   }
}

menuInertToggle();

menuMediaQuery.onchange = () => {
   menuInertToggle();
};
//Popup
const popup = document.getElementById('popup');
const wrapper = document.getElementById('wrapper');
function popupInertToggle() {
   if (popup.classList.contains('active')) {
      wrapper.inert = true;
      popup.inert = false;
   } else {
      wrapper.inert = false;
      popup.inert = true;
   }
}
popupInertToggle();

export { menuInertToggle, popupInertToggle };
