import '../css/style.css';

const initialLoad = import.meta.glob('./jsModules/initialLoad/*.js', {
   eager: true,
});
const dynamicLoad = import.meta.glob('./jsModules/dynamicLoad/*.js');
//Dynamic Adaptive
const dynamicAdaptiveModule =
   initialLoad['./jsModules/initialLoad/dynamicAdaptive.js'];
const dynad = new dynamicAdaptiveModule.DynamicAdapt('min');
dynad.init()
