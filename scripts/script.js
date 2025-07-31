const bookshelf = document.querySelector("#bookshelf");

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

  addBookDisplay();
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
  myLibrary.push(new Book(name, author, pageCount, read));
}

function addBookDisplay() {
  let display = document.createElement("div");
  let titleDisplay = document.createElement("div");
  let authorDisplay = document.createElement("div");
  let pageCountDisplay = document.createElement("div");
  let toggleReadButton = document.createElement("div");
  let removeButton = document.createElement("div");

  display.classList.add("books");
  titleDisplay.classList.add("title", "centerize");
  authorDisplay.classList.add("author", "pad");
  pageCountDisplay.classList.add("page-count", "pad");
  toggleReadButton.classList.add("toggle-read", "centerize");
  removeButton.classList.add("remove", "centerize");

  lastBook = myLibrary[myLibrary.length - 1];
  titleString = `"${lastBook.title}"`;
  pageCountString = `${lastBook.pageCount} pages`;

  titleDisplay.textContent = titleString;
  authorDisplay.textContent = lastBook.author;
  pageCountDisplay.textContent = pageCountString;

  display.appendChild(titleDisplay);
  display.appendChild(authorDisplay);
  display.appendChild(pageCountDisplay);
  display.appendChild(toggleReadButton);
  display.appendChild(removeButton);

  bookshelf.appendChild(display);
}
