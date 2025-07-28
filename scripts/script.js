const myLibrary = [];

function Book(name) {
  if (!new.target) {
    throw Error(
      "Instance Error: Constructor was called without the 'new' operator.",
    );
  }

  this.name = name;
  this.id = crypto.randomUUID();
}

function addToLibrary(book_name) {
  let book = new Book(book_name);
  console.log(book);
  myLibrary.push(book);
}

let displayText = "";

function displayBooks(book, index) {
  displayText += book.name + " - ";
}
