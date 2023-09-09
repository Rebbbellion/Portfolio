export function filterButtonToggle(e) {
   const filterButtons = document.querySelectorAll('#filters>button');
   filterButtons.forEach((button) => {
      if (button.classList.contains('active')) {
         button.classList.remove('active');
      }
      e.target.classList.add('active');
   });
}
