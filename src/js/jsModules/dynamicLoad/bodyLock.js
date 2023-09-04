export function bodyLock(delay = 500) {
   if (bodyLockStatus) {
      let body = document.body;
      const lockElements = document.querySelectorAll('[data-lock]');
      setTimeout(() => {
         lockElements.forEach((element) => {
            element.style.paddingRight =
               window.innerWidth -
               document.getElementById('wrapper').offsetWidth +
               'px';
         });
      }, delay);
      body.style.paddingRight =
         window.innerWidth -
         document.getElementById('wrapper').offsetWidth +
         'px';
      document.documentElement.classList.add('lock');
      bodyLockStatus = false;
      setTimeout(() => {
         bodyLockStatus = true;
      }, delay);
   }
}
export function bodyUnlock(delay = 500) {
   if (bodyLockStatus) {
      let body = document.body;
      const lockElements = document.querySelectorAll('[data-lock]');
      setTimeout(() => {
         lockElements.forEach((element) => {
            element.style.paddingRight = '0px';
         });
         body.style.paddingRight = '0px';
         document.documentElement.classList.remove('lock');
      }, delay);

      bodyLockStatus = false;
      setTimeout(() => {
         bodyLockStatus = true;
      }, delay);
   }
}
export let bodyLockStatus = true;
export function bodyLockToggle(delay = 500) {
   if (document.documentElement.classList.contains('lock')) {
      bodyUnlock(delay);
   } else {
      bodyLock(delay);
   }
}
