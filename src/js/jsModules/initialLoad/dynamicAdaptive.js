export class DynamicAdapt {
   #type;
   #оbjects;
   #movedElClass;
   #nodes;
   #mediaQueries;
   constructor(type) {
      this.#type = type;
   }

   init() {
      this.#оbjects = [];
      this.#movedElClass = 'moved';
      this.#nodes = [...document.querySelectorAll('[data-dynad]')];
      this.#nodes.forEach((node) => {
         const data = node.dataset.dynad.trim();
         const dataArray = data.split(',');
         const оbject = {};
         оbject.element = node;
         оbject.parent = node.parentNode;
         оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
         оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '48';
         оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
         оbject.index = this.#indexInParent(оbject.parent, оbject.element);
         this.#оbjects.push(оbject);
      });

      this.#mediaQueries = this.#оbjects
         .map(
            ({ breakpoint }) =>
               `(${this.#type}-width: ${breakpoint}em),${breakpoint}`
         )
         .filter((item, index, self) => self.indexOf(item) === index);
      this.#mediaQueries.forEach((media) => {
         const mediaSplit = media.split(',');
         const matchMedia = window.matchMedia(mediaSplit[0]);
         const mediaBreakpoint = mediaSplit[1];

         const оbjectsFilter = this.#оbjects.filter(
            ({ breakpoint }) => breakpoint === mediaBreakpoint
         );
         matchMedia.addEventListener('change', () => {
            this.#mediaHandler(matchMedia, оbjectsFilter);
         });
         this.#mediaHandler(matchMedia, оbjectsFilter);
      });
   }

   #mediaHandler(matchMedia, оbjects) {
      if (matchMedia.matches) {
         оbjects.forEach((оbject) => {
            // оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.#moveTo(оbject.place, оbject.element, оbject.destination);
         });
      } else {
         оbjects.forEach(({ parent, element, index }) => {
            if (element.classList.contains(this.#movedElClass)) {
               this.#moveBack(parent, element, index);
            }
         });
      }
   }

   #moveTo(place, element, destination) {
      element.classList.add(this.#movedElClass);
      if (place === 'last' || place >= destination.children.length) {
         destination.append(element);
         return;
      }
      if (place === 'first') {
         destination.prepend(element);
         return;
      }
      destination.children[place].before(element);
   }

   #moveBack(parent, element, index) {
      element.classList.remove(this.#movedElClass);
      if (parent.children[index] !== undefined) {
         parent.children[index].before(element);
      } else {
         parent.append(element);
      }
   }

   #indexInParent(parent, element) {
      return [...parent.children].indexOf(element);
   }
}
