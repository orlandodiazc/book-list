/* global luxon */

const bookListSection = document.querySelector('.book-list');
const addBookSection = document.querySelector('.add-book');
const contactSection = document.querySelector('.contact');
const navList = document.querySelector('.nav-list');
const dateNow = document.querySelector('.date-now');
let currentLink = 'list-link';

const { DateTime } = luxon;
const now = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
dateNow.innerText = now;

navList.addEventListener('click', (e) => {
  if (e.target.id !== currentLink && e.target.tagName === 'A') {
    if (e.target.id === 'list-link') {
      bookListSection.classList.remove('hidden');
      addBookSection.classList.add('hidden');
      contactSection.classList.add('hidden');
    } else if (e.target.id === 'add-book-link') {
      bookListSection.classList.add('hidden');
      addBookSection.classList.remove('hidden');
      contactSection.classList.add('hidden');
    } else {
      bookListSection.classList.add('hidden');
      addBookSection.classList.add('hidden');
      contactSection.classList.remove('hidden');
    }
    currentLink = e.target.id;
  }
});
