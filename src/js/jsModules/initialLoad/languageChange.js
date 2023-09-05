import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from '../../../translations.json';

const elementsToTranslate = document.querySelectorAll('[data-translation]');
const languageButtons = document.querySelectorAll('[data-lng]');
i18next.use(LanguageDetector).init({
   detection: {
      order: ['navigator', 'localStorage', 'sessionStorage', 'querystring'],
   },
   fallbackLng: {
      'ru-RU': ['uk'],
      default: ['en'],
   },
   resources: translations,
});

i18next.changeLanguage().then((t) => {
   languageButtonToggle(null, i18next.resolvedLanguage);
   elementsToTranslate.forEach((element) => {
      if (element.dataset.translation.includes('$')) {
         element.innerHTML = t(element.dataset.translation, {
            ns: 'innerHTML',
         });
      } else if (element.dataset.translation.includes('plh-')) {
         element.placeholder = t(element.dataset.translation, {
            ns: 'placeholders',
         });
      } else {
         element.textContent = t(element.dataset.translation, {
            ns: 'text',
         });
      }
   });
});

function languageButtonToggle(e, activeLng) {
   languageButtons.forEach((button) => {
      if (!activeLng) {
         if (button.classList.contains('active')) {
            button.classList.remove('active');
         }
         e.target.classList.add('active');
      } else {
         if (button.dataset.lng !== activeLng) {
            button.classList.remove('active');
         } else {
            button.classList.add('active');
         }
      }
   });
}

export function translateSite(e) {
   languageButtonToggle(e);
   i18next.changeLanguage(e.target.dataset.lng).then((t) => {
      elementsToTranslate.forEach((element) => {
         element.style.opacity = 0;
         if (element.dataset.translation.includes('$')) {
            setTimeout(() => {
               element.innerHTML = t(element.dataset.translation, {
                  ns: 'innerHTML',
               });
               element.style.opacity = 1;
            }, 300);
         } else if (element.dataset.translation.includes('plh-')) {
            setTimeout(() => {
               element.placeholder = t(element.dataset.translation, {
                  ns: 'placeholders',
               });
               element.style.opacity = 1;
            }, 300);
         } else {
            setTimeout(() => {
               element.textContent = t(element.dataset.translation, {
                  ns: 'text',
               });
               element.style.opacity = 1;
            }, 300);
         }
      });
   });
}
