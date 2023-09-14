window.onload = () => {
   const loader = document.getElementById('loader');
   setTimeout(() => {
      document.body.style.overflow = '';
      loader.style.opacity = 0;
      loader.style.visibility = 'hidden';
   }, 600);
};
