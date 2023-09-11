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
//Swiper
if (document.documentElement.classList.contains('mobile')) {
   dynamicLoad['./jsModules/dynamicLoad/swiper.js']();
}
//EventListeners,Observers and Callbacks
document.addEventListener('click', clickCallbacks);
document.addEventListener('transitionend', transitionEndCallbacks);

function clickCallbacks(e) {
   if (e.target.closest('#burger')) {
      dynamicLoad['./jsModules/dynamicLoad/burger.js']().then(
         (burgerModule) => {
            burgerModule.menuToggle();
         }
      );
   }
   if (e.target.closest('#theme-pick')) {
      document.documentElement.classList.toggle('dark');
      document.removeEventListener('click', clickCallbacks);
   }
   if (e.target.closest('[data-lng]') && !e.target.closest('.active')) {
      languageChangeModule.translateSite(e.target);
		document.removeEventListener('click', clickCallbacks);
   }
   if (e.target.closest('#contact')) {
      dynamicLoad['./jsModules/dynamicLoad/popup.js']().then((popupModule) => {
         popupModule.popupOpen();
      });
      dynamicLoad['./jsModules/dynamicLoad/formHandler.js']();
   }
   if (e.target.closest('#filters>button')) {
      dynamicLoad['./jsModules/dynamicLoad/filter.js']().then(
         (filtersModule) => {
            filtersModule.filterButtonToggle(e.target);
         }
      );
      document.removeEventListener('click', clickCallbacks);
   }
}

function transitionEndCallbacks(e) {
   if (e.target.closest('svg.top-0') || e.target.closest('[data-lng="uk"]')) {
      document.addEventListener('click', clickCallbacks);
   }
   if (e.target.closest('#filters>button')) {
      document.addEventListener('click', clickCallbacks);
   }
}
