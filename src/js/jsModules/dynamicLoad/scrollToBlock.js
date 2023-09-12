import { menuToggle } from './burger';

const blocksOnPage = document.getElementsByTagName('section');

function scrollToBlock(targetEl) {
   if (document.documentElement.classList.contains('menu-open')) {
      menuToggle();
   }
   const element = blocksOnPage.namedItem(targetEl.href.split('#')[1]);
   element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export { scrollToBlock };
