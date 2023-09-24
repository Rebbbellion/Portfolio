import { menuInertToggle } from '../initialLoad/accessibility';
import { bodyLockToggle, bodyUnlock } from './bodyLock';
function menuToggle() {
   bodyLockToggle();
   document.documentElement.classList.toggle('menu-open');
   menuInertToggle();
}

window.addEventListener('resize', () => {
   if (
      matchMedia('(min-width:64rem)').matches &&
      document.documentElement.classList.contains('menu-open')
   ) {
      bodyUnlock();
      document.documentElement.classList.remove('menu-open');
   }
});

export { menuToggle };
