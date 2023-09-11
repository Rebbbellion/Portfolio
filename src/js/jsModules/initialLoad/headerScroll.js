const header = document.querySelector('header');
const wrapper = document.getElementById('wrapper');
const options = {
   root: wrapper,
   rootMargin: '-50px 0px 0px 0px',
   threshold: 1.0,
};
const observer = new IntersectionObserver(callBack, options);

function callBack(entries) {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         header.classList.add('scrolled');
      } else {
         header.classList.remove('scrolled');
      }
   });
}

observer.observe(header);
