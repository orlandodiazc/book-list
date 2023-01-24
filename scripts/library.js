const bookForm = document.querySelector('.book-form');
const bookContainer = document.querySelector('.book-container');
const bookRowTemplate = document.getElementById('book-row-template');

class Book {
  constructor(title = 'unknown', author = 'unknown') {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [];
  };

  addBook(newBook) {
    this.books.push(newBook);
  };

  removeBook(currentTitle, currentAuthor) {
    this.books = this.books.filter(book => (book.title.toLowerCase() !== currentTitle.toLowerCase())
      && (book.author.toLowerCase() !== currentAuthor.toLowerCase()));
  };

  isBookInLibrary(currentBook) {
    return this.books.some((book) => book.title === currentBook.title
      && book.author === currentBook.author);
  }
}

const library = new Library();

function addBook(e) {
  e.preventDefault();
  const title = bookForm.querySelector('#title').value;
  const author = bookForm.querySelector('#author').value;
  const newBook = new Book(title, author);
  if (!library.isBookInLibrary(newBook) && !(title.length === 0) && !(author.length === 0)) {
    library.addBook(newBook);
    storageSaveLocal();
    displayAddBook(newBook);
  }
}

function removeBook(e) {
  if (e.target.className === 'remove-row') {
    const currentBook = e.target.parentNode;
    const bookTitle = currentBook.querySelector('.book-title').innerText;
    const bookAuthor = currentBook.querySelector('.book-author').innerText;
    library.removeBook(bookTitle, bookAuthor);
    e.target.parentNode.remove();
    storageSaveLocal();
  }
}

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
if (localStorage.getItem('bookLibrary')) {
  storageLoadSession();
}

DisplayLoadBooks(library.books);
bookContainer.addEventListener('click', removeBook);
bookForm.querySelector('.btn-add-book').addEventListener('click', addBook);