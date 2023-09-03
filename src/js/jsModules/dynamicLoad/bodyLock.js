export function bodyLock(delay = 500) {
   if (bodyLockStatus) {
      let body = document.body;
      body.style.paddingRight =
         window.innerWidth -
         document.querySelector('#wrapper').offsetWidth +
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
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove('lock');
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