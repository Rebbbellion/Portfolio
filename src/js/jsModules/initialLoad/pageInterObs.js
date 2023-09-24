const pageLinks = document.querySelectorAll('.header-link');
const blocksOnPage = document.querySelectorAll('section');
const intersectionPoints = document.querySelectorAll('.intersection-point');
const linksObsOptions = {
   root: null,
   rootMargin: '-80px 0px 0px 0px',
   threshold: 0,
};
const blocksObsOptions = {
   root: null,
   rootMargin: '-80px 0px 0px 0px',
   threshold: 0.1,
};

function createObserver(obsOptions, callBack, target) {
   const observer = new IntersectionObserver(callBack, obsOptions);
   target.forEach((el) => {
      observer.observe(el);
   });
}

function linksObsCallBack(entries) {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         linkActivate(entry.target.parentElement);
      } else {
         linkDeActivate(entry.target.parentElement);
      }
   });
}
function linkDeActivate(targetEl) {
   pageLinks.forEach((link) => {
      if (link.href.split('#')[1] === targetEl.id) {
         link.classList.remove('active');
         link.setAttribute('aria-pressed', false);
      }
   });
}
function linkActivate(targetEl) {
   pageLinks.forEach((link) => {
      if (link.href.split('#')[1] === targetEl.id) {
         link.classList.add('active');
         link.setAttribute('aria-pressed', true);
      }
   });
}

createObserver(linksObsOptions, linksObsCallBack, intersectionPoints);

function blocksObsCallBack(entries) {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         blockShow(entry.target);
      }
   });
}
function blockShow(targetEl) {
   blocksOnPage.forEach((blockEl) => {
      if (blockEl === targetEl) {
         blockEl.style.animationPlayState = 'running';
         if (blockEl.previousElementSibling) {
            blockEl.previousElementSibling.style.animationPlayState = 'running';
         }
      }
   });
}

createObserver(blocksObsOptions, blocksObsCallBack, blocksOnPage);
