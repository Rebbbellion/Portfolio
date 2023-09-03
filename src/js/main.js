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
   matchMedia('prefers-color-scheme:dark').matches ||
   new Date().getHours() >= 18 ||
   new Date().getHours() <= 8
) {
   document.documentElement.classList.add('dark');
}
//Language Change
const languageChangeModule =
   initialLoad['./jsModules/initialLoad/languageChange.js'];
//EventListeners and Callbacks
document.addEventListener('click', clickCallbacks);
document.addEventListener('transitionend', transitionEndCallbacks);
window.addEventListener('resize', bodyLockHandler);

function clickCallbacks(e) {
   if (e.target.closest('#burger')) {
      dynamicLoad['./jsModules/dynamicLoad/bodyLock.js']().then(
         (bodyLockModule) => {
            if (bodyLockModule.bodyLockStatus) {
               bodyLockModule.bodyLockToggle();
               document.documentElement.classList.toggle('menu-open');
            }
         }
      );
   }
   if (e.target.closest('#theme-pick')) {
      document.documentElement.classList.toggle('dark');
      document.removeEventListener('click', clickCallbacks);
   }
   if (e.target.closest('[data-lng]') && !e.target.closest('active')) {
      languageChangeModule.translateSite(e);
   }
}
function transitionEndCallbacks(e) {
   if (e.target.closest('svg.top-0') || e.target.closest('[data-lng="uk"]')) {
      document.addEventListener('click', clickCallbacks);
   }
}
function bodyLockHandler() {
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
}
