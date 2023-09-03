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
