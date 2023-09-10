const elementsParent = document.querySelector('#filter-elements');
const elementsToFilter = [...elementsParent.children];
const activeFilters = [
   ['type:', new Set()],
   ['year:', new Set()],
];
function filterElements(elements) {
   const noMatchEl = document.getElementById('no-match');
   const matchingElements = getMatchingElements(elements, activeFilters);
   const existingElements = [...elementsParent.children];
   if (matchingElements.length === 0) {
      noMatchEl.style.display = 'block';
      setTimeout(() => {
         noMatchEl.style.opacity = 1;
      }, 300);
   } else {
      noMatchEl.style.opacity = 0;
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

export function filterButtonToggle(e) {
   const filterButtons = document.querySelectorAll('#filters>button');
   const allButton = document.querySelector('[data-filter="all"]');
   if (e.target !== allButton) {
      allButton.classList.remove('active');
      e.target.classList.toggle('active');
   }
   const activeButtons = document.querySelectorAll('#filters>button.active');
   if (e.target === allButton || activeButtons.length === 0) {
      filterButtons.forEach((btn) => {
         if (btn.classList.contains('active')) {
            btn.classList.remove('active');
         }
      });
      allButton.classList.add('active');
   }
   filterButtons.forEach((btn) => {
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
   filterElements(elementsToFilter);
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
