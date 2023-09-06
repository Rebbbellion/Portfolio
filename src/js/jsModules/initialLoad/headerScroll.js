const header = document.querySelector('header');
const wrapper = document.getElementById('wrapper');
const options = {
   root: wrapper,
   rootMargin: '-50px 0px 0px 0px',
   threshold: 1.0,
};

function callBack(entries, observer) {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         header.classList.add('scrolled');
      } else {
         header.classList.remove('scrolled');
      }
   });
}

const observer = new IntersectionObserver(callBack, options);

observer.observe(header);
