const addBookButton = document.querySelector("#add-book");
const dialog = document.querySelector("dialog");
const newBookForm = document.querySelector("form");
const confirmBookButton = document.querySelector("#confirm-book");

const myLibrary = [];

// Events
addBookButton.addEventListener("click", (e) => {
  dialog.showModal();
});

confirmBookButton.addEventListener("click", (e) => {
  if (!newBookForm.reportValidity()) {
    return;
  }

  const bookForm = new FormData(newBookForm);

  addToLibrary(
    bookForm.get("title"),
    bookForm.get("author"),
    bookForm.get("page-count"),
    bookForm.get("read-status"),
  );

  dialog.close();
  newBookForm.reset();

  e.preventDefault();

  for (let item of myLibrary) {
    console.log(item);
  }
});

function Book(title, author, pageCount, read) {
  if (!new.target) {
    throw Error(
      "Instance Error: Constructor was called without the 'new' operator.",
    );
  }

  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addToLibrary(name, author, pageCount, read) {
  let book = new Book(name, author, pageCount, read);
  myLibrary.push(book);
}
