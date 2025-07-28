const myLibrary = [];

function Book(title, author, pageCount, read) {
  if (!new.target) {
    throw Error(
      "Instance Error: Constructor was called without the 'new' operator.",
    );
  }

  this.title = title;
  this.id = crypto.randomUUID();
}

function addToLibrary(name, author, pageCount, read) {
  let book = new Book(name, author, pageCount, read);
  myLibrary.push(book);
}

let displayText = "";
