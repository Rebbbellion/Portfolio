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

function translateSite(targetEl) {
   i18next.changeLanguage(targetEl?.dataset.lng).then((t) => {
      if (!targetEl) {
         languageButtonToggle(null, i18next.resolvedLanguage);
         document.documentElement.lang = i18next.resolvedLanguage;
      } else {
         languageButtonToggle(targetEl);
         document.documentElement.lang = targetEl.dataset.lng;
      }
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
         } else if (element.dataset.translation.includes('aria-')) {
            element.setAttribute(
               'aria-label',
               t(element.dataset.translation, { ns: 'aria-labels' })
            );
            element.style.opacity = 1;
         } else if(element.dataset.translation.includes('alt-')){
				element.setAttribute(
               'alt',
               t(element.dataset.translation, { ns: 'alt-text' })
            );
            element.style.opacity = 1;
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

function languageButtonToggle(targetEl, activeLng) {
   languageButtons.forEach((button) => {
      if (!activeLng) {
         if (button.classList.contains('active')) {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', false);
         }
         targetEl.classList.add('active');
         targetEl.setAttribute('aria-pressed', true);
      } else {
         if (button.dataset.lng !== activeLng) {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', false);
         } else {
            button.classList.add('active');
            button.setAttribute('aria-pressed', true);
         }
      }
   });
}

translateSite();

export { translateSite };
