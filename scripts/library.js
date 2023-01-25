import Book from './book.js';

const bookForm = document.querySelector('.book-form');
const bookContainer = document.querySelector('.book-container');
const bookRowTemplate = document.getElementById('book-row-template');
const libraryInfo = document.querySelector('.library-info');

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  removeBook(currentTitle, currentAuthor) {
    this.books = this.books.filter(
      (book) => book.title.toLowerCase() !== currentTitle.toLowerCase()
      && book.author.toLowerCase() !== currentAuthor.toLowerCase(),
    );
  }

  isBookInLibrary(currentBook) {
    return this.books.some(
      (book) => book.title === currentBook.title && book.author === currentBook.author,
    );
  }
}

const library = new Library();

function storageSaveLocal() {
  localStorage.setItem('bookLibrary', JSON.stringify(library.books));
}

function storageLoadSession() {
  library.books = JSON.parse(localStorage.getItem('bookLibrary'));
}

function displayAddBook(book) {
  const bookClone = bookRowTemplate.content.cloneNode(true);
  bookClone.querySelector('.book-title').innerText = book.title;
  bookClone.querySelector('.book-author').innerText = book.author;
  bookContainer.appendChild(bookClone);
}

function DisplayLoadBooks(books) {
  books.forEach((book) => {
    displayAddBook(book);
  });
}

function addBook(e) {
  e.preventDefault();
  const title = bookForm.querySelector('#title').value;
  const author = bookForm.querySelector('#author').value;
  const newBook = new Book(title, author);
  if (!library.isBookInLibrary(newBook) && title.length > 0 && author.length > 0) {
    library.addBook(newBook);
    storageSaveLocal();
    libraryInfo.classList.add('hidden');
    displayAddBook(newBook);
  }
  bookForm.reset();
}

function removeBook(e) {
  if (e.target.className === 'remove-row') {
    const currentBook = e.target.parentNode;
    const bookTitle = currentBook.querySelector('.book-title').innerText;
    const bookAuthor = currentBook.querySelector('.book-author').innerText;
    library.removeBook(bookTitle, bookAuthor);
    e.target.parentNode.remove();
    storageSaveLocal();
    if (library.books.length === 0) {
      localStorage.removeItem('bookLibrary');
      libraryInfo.classList.remove('hidden');
    }
  }
}

if (localStorage.getItem('bookLibrary')) {
  storageLoadSession();
} else {
  libraryInfo.classList.remove('hidden');
}

DisplayLoadBooks(library.books);
bookContainer.addEventListener('click', removeBook);
bookForm.querySelector('.btn-add-book').addEventListener('click', addBook);
