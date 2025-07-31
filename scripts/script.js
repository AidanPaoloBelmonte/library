const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#add-book");

const myLibrary = [];

// Events
addBookButton.addEventListener("click", () => {
  dialog.showModal();
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
