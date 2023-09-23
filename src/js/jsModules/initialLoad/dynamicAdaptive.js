export class DynamicAdapt {
   #type;
   #objects;
   #nodes;
   #currentBreakPointData;
   constructor(type) {
      this.#type = type;
   }

   init() {
      this.#objects = [];
      this.#nodes = [...document.querySelectorAll('[data-dynad]')];
      this.#nodes.forEach((node) => {
         const dataArray = node.dataset.dynad.trim().split(';');
         dataArray.forEach((data) => {
            const dataSplit = data.split(',');
            const object = {};
            object.element = node;
            object.parent = node.parentNode;
            object.destination = document.querySelector(
               `${dataSplit[0].trim()}`
            );
            object.breakpoint = dataSplit[1] ? dataSplit[1].trim() : '48';
            object.mediaQuery = matchMedia(
               `(${this.#type}-width:${object.breakpoint}rem)`
            );
            object.place = dataSplit[2] ? dataSplit[2].trim() : 'last';
            object.index = this.#indexInParent(object.parent, object.element);
            this.#objects.push(object);
         });
      });

      this.#arraySort(this.#objects);
      this.#objects.forEach(({ mediaQuery }) => {
         mediaQuery.onchange = () => {
            this.#elementsHandler(this.#objects);
         };
      });
      this.#elementsHandler(this.#objects);
   }

   #arraySort(arr) {
      arr.sort((a, b) => {
         if (a.element === b.element) {
            if (this.#type === 'min') {
               return a.breakpoint - b.breakpoint;
            } else {
               return b.breakpoint - a.breakpoint;
            }
         }
      });
   }

   #elementsHandler(objects) {
      objects.forEach((object, index) => {
         if (object.mediaQuery.matches) {
            this.#moveTo(object.place, object.element, object.destination);
         } else if (object.element === objects[index - 1]?.element) {
            return;
         } else {
            this.#moveBack(object.parent, object.element, object.index);
         }
      });
   }

   #moveTo(place, element, destination) {
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
