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

//EventListeners and Callbacks
document.addEventListener('click', clickCallbacks);
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
