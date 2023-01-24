const bookLibrary = [];
const bookForm = document.querySelector('.book-form');
const bookContainer = document.querySelector('.book-container');
const bookRowTemplate = document.getElementById('book-row-template');

const Book = (title, author) => ({
  title, author
});

function libraryFilter(title, author) {
  return bookLibrary.filter(book => book.title.toLowerCase() === title.toLowerCase()
    && book.author.toLowerCase() === author.toLowerCase());
}

function addBook(e) {
  const dataTitle = bookForm.querySelector('#title').value;
  const dataAuthor = bookForm.querySelector('#author').value;
  currentFilter = libraryFilter(dataTitle, dataAuthor);
  if (currentFilter.length === 0) {
    currentBook = Book(dataTitle, dataAuthor);
    bookLibrary.push(currentBook);
    addBookFn(currentBook);
  }
  e.preventDefault();
}

function removeBook(e) {
  const currentBook = e.target.parentNode;
  if (e.target.className === 'remove-row') {
    const bookTitle = currentBook.querySelector('.book-title').innerText;
    const bookAuthor = currentBook.querySelector('.book-author').innerText;
    currentFilter = libraryFilter(bookTitle, bookAuthor);
    bookLibrary.splice(bookLibrary.indexOf(currentFilter[0]), 1);
    e.target.parentNode.remove();
  }
}

function addBookFn(book) {
  const bookClone = bookRowTemplate.content.cloneNode(true);
  bookClone.querySelector('.book-title').innerText = book.title;
  bookClone.querySelector('.book-author').innerText = book.author;
  bookContainer.appendChild(bookClone);
}

function displayBooks(books) {
  books.forEach((book) => {
    addBookFn(book);
  });
}

displayBooks(bookLibrary);

bookContainer.addEventListener('click', removeBook);
bookForm.querySelector('.btn-add-book').addEventListener('click', addBook);