import '../css/style.css';

const initialLoad = import.meta.glob('./jsModules/initialLoad/*.js', {
   eager: true,
});
const dynamicLoad = import.meta.glob('./jsModules/dynamicLoad/*.js');
//Dynamic Adaptive
const dynamicAdaptiveModule =
   initialLoad['./jsModules/initialLoad/dynamicAdaptive.js'];
const dynad = new dynamicAdaptiveModule.DynamicAdapt('min');
dynad.init();
//Theme Change
if (
   matchMedia('(prefers-color-scheme: dark)').matches ||
   new Date().getHours() >= 18 ||
   new Date().getHours() <= 8
) {
   document.documentElement.classList.add('dark');
}
//Language Change
const languageChangeModule =
   initialLoad['./jsModules/initialLoad/languageChange.js'];
//Popup
const popup = document.getElementById('popup');
const popupWrapper = document.getElementById('popup-wrapper');
const popupContent = document.getElementById('popup-content');
//ContactForm
const contactFormElement = document.getElementById('contact-form');
contactFormElement.onsubmit = (e) => {
   e.preventDefault();
   dynamicLoad['./jsModules/dynamicLoad/formHandler.js']().then(
      (formHandlerModule) => {
         formHandlerModule.sendForm(e.target);
      }
   );
};
//Swiper
if (document.documentElement.classList.contains('mobile')) {
   dynamicLoad['./jsModules/dynamicLoad/swiper.js']();
}
//EventListeners,Observers and Callbacks
document.addEventListener('click', clickCallbacks);
document.addEventListener('transitionend', transitionEndCallbacks);
window.addEventListener('resize', () => {
   if (
      matchMedia('(min-width:64rem)').matches &&
      document.documentElement.classList.contains('menu-open')
   ) {
      dynamicLoad['./jsModules/dynamicLoad/bodyLock.js']().then(
         (bodyLockModule) => {
            bodyLockModule.bodyUnlock();
            document.documentElement.classList.remove('menu-open');
         }
      );
   }
});
popup.addEventListener('click', popupClose);
document.addEventListener('keydown', popupClose);

function clickCallbacks(e) {
   if (e.target.closest('#burger')) {
      dynamicLoad['./jsModules/dynamicLoad/bodyLock.js']().then(
         (bodyLockModule) => {
            if (bodyLockModule.bodyLockStatus) {
               bodyLockModule.bodyLockToggle();
            }
         }
      );
      document.documentElement.classList.toggle('menu-open');
   }
   if (e.target.closest('#theme-pick')) {
      document.documentElement.classList.toggle('dark');
      document.removeEventListener('click', clickCallbacks);
   }
   if (e.target.closest('[data-lng]') && !e.target.closest('active')) {
      languageChangeModule.translateSite(e);
   }
   if (e.target.closest('#contact')) {
      dynamicLoad['./jsModules/dynamicLoad/bodyLock.js']().then(
         (bodyLockModule) => {
            if (bodyLockModule.bodyLockStatus) {
               if (!document.documentElement.classList.contains('lock')) {
                  bodyLockModule.bodyLock();
               }
            }
         }
      );
      dynamicLoad['./jsModules/dynamicLoad/formHandler.js']();
      popup.classList.add('active');
      popup.removeEventListener('click', popupClose);
      document.removeEventListener('keydown', popupClose);
   }
   if (e.target.closest('#filters>button')) {
      dynamicLoad['./jsModules/dynamicLoad/filter.js']().then(
         (filtersModule) => {
            filtersModule.filterButtonToggle(e);
         }
      );
      document.removeEventListener('click', clickCallbacks);
   }
}
function transitionEndCallbacks(e) {
   if (e.target.closest('svg.top-0') || e.target.closest('[data-lng="uk"]')) {
      document.addEventListener('click', clickCallbacks);
   }
   if (e.target === popupContent) {
      popup.addEventListener('click', popupClose);
      document.addEventListener('keydown', popupClose);
   }
   if (e.target.closest('#filters>button')) {
      document.addEventListener('click', clickCallbacks);
   }
}
function popupClose(e) {
   if (
      e.target.closest('#close-button') ||
      e.target === popupWrapper ||
      e.key === 'Escape'
   ) {
      popup.classList.remove('active');
      if (!document.documentElement.classList.contains('menu-open')) {
         dynamicLoad['./jsModules/dynamicLoad/bodyLock.js']().then(
            (bodyLockModule) => {
               if (bodyLockModule.bodyLockStatus) {
                  bodyLockModule.bodyUnlock();
               }
            }
         );
      }
   }
}
