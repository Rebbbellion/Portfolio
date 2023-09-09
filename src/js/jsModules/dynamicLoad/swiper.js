import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
   modules: [Pagination],
   spaceBetween: 30,
   breakpoints: {
      640: {
         slidesPerView: 2,
         slidesPerGroup: 2,
      },
      960: {
         slidesPerView: 3,
         slidesPerGroup: 3,
      },
   },
   pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
   },
});
