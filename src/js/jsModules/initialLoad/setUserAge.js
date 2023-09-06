import i18next from 'i18next';

const USER_DOB = '2002-09-27';
function setUserAge(date) {
   setTimeout(() => {
      const ageElement = document.getElementById('age');
      const diff = Date.now() - new Date(date).getTime();
      const ageDate = new Date(diff);
      ageElement.textContent = Math.abs(ageDate.getUTCFullYear() - 1970);
   }, 310);
}
setUserAge(USER_DOB);

i18next.on('languageChanged', () => {
   setUserAge(USER_DOB);
});
