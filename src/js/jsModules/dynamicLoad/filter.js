import i18next from 'i18next';

const elementsParent = document.querySelector('#filter-elements');
const elementsToFilter = [...elementsParent.children];
const activeFilters = [
   ['type:', new Set()],
   ['year:', new Set()],
];

function filterButtonToggle(targetEl) {
   const filterButtons = document.querySelectorAll('#filters>button');
   const allButton = document.querySelector('[data-filter="all"]');
   if (targetEl !== allButton) {
      allButton.classList.remove('active');
      targetEl.classList.toggle('active');
   }
   const activeButtons = document.querySelectorAll('#filters>button.active');
   if (targetEl === allButton || activeButtons.length === 0) {
      filterButtons.forEach((btn) => {
         if (btn.classList.contains('active')) {
            btn.classList.remove('active');
         }
      });
      allButton.classList.add('active');
   }
   setActiveFilters(filterButtons);
   filterElements(elementsToFilter);
}

function setActiveFilters(filterButtons) {
   filterButtons.forEach((btn) => {
      if (btn.classList.contains('active')) {
         btn.setAttribute('aria-pressed', true);
      } else {
         btn.setAttribute('aria-pressed', false);
      }
      activeFilters.forEach(([filter, set]) => {
         if (
            btn.classList.contains('active') &&
            btn.dataset.filter.includes(filter)
         ) {
            set.add(btn.dataset.filter);
         } else {
            set.delete(btn.dataset.filter);
         }
      });
   });
}

function filterElements(elements) {
   const noMatchEl = document.getElementById('no-match');
   const matchingElements = getMatchingElements(elements, activeFilters);
   const existingElements = [...elementsParent.children];
   if (matchingElements.length === 0) {
      noMatchEl.style.height = getComputedStyle(elementsParent).height;
      setTimeout(() => {
         noMatchEl.style.display = 'block';
         noMatchEl.textContent = i18next.t('no-match', { ns: 'text' });
         setTimeout(() => {
            noMatchEl.style.opacity = 1;
         }, 100);
      }, 300);
   } else {
      noMatchEl.style.opacity = 0;
      noMatchEl.textContent = '';
      setTimeout(() => {
         noMatchEl.style.display = 'none';
      }, 300);
   }

   elements.forEach((elem) => {
      if (matchingElements.includes(elem)) {
         if (!existingElements.includes(elem)) {
            elementsParent.appendChild(elem);
            setTimeout(() => {
               elem.firstElementChild.style.opacity = 1;
            }, 500);
         }
      } else {
         elem.firstElementChild.style.opacity = 0;
         setTimeout(() => {
            elem.remove();
         }, 500);
      }
   });
}

function getMatchingElements(elements, filters, filterNumber = 0) {
   if (filters[filterNumber] === undefined) {
      return elements;
   }

   const setArray = [...filters[filterNumber][1].keys()];
   const temp = elements.filter((el) => {
      if (setArray.length === 0) {
         return true;
      }
      for (let i = 0; i < setArray.length; i++) {
         if (el.dataset.filter?.includes(setArray[i])) {
            return true;
         }
      }
   });

   return getMatchingElements(temp, filters, ++filterNumber);
}

export { filterButtonToggle };
