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

  let readStatus = bookForm.get("read-status") == "on";

  addToLibrary(
    bookForm.get("title"),
    bookForm.get("author"),
    bookForm.get("page-count"),
    readStatus,
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

function removeBook(e) {
  let display = e.target.parentElement.parentElement;
  let bookID = display.dataset.bookId;

  for (let l = 0; l < myLibrary.length; l++) {
    if (myLibrary[l].id == bookID) {
      myLibrary.splice(l, 1);
      break;
    }
  }

  display.parentElement.removeChild(display);
}

function toggleRead(e) {
  let button = e.target;
  let display = button.parentElement.parentElement;
  let bookID = display.dataset.bookId;

  let status = false;
  for (let l = 0; l < myLibrary.length; l++) {
    if (myLibrary[l].id == bookID) {
      status = !myLibrary[l].read;
      myLibrary[l].read = status;
      break;
    }
  }

  if (status) {
    button.setAttribute("src", "./images/book-check.svg");
  } else {
    button.setAttribute("src", "./images/book-clock.svg");
  }
}

function addBookDisplay() {
  let display = document.createElement("div");

  let titleDisplay = document.createElement("div");
  let authorDisplay = document.createElement("div");
  let pageCountDisplay = document.createElement("div");
  let toggleReadContainer = document.createElement("div");
  let removeContainer = document.createElement("div");

  let toggleReadButton = document.createElement("input");
  let removeButton = document.createElement("input");

  display.classList.add("books");

  titleDisplay.classList.add("title", "centerize");
  authorDisplay.classList.add("author", "pad");
  pageCountDisplay.classList.add("page-count", "pad");
  removeContainer.classList.add("remove", "centerize");
  toggleReadContainer.classList.add("toggle-read", "centerize");

  toggleReadButton.classList.add("book-action");
  toggleReadButton.setAttribute("type", "image");
  removeButton.classList.add("book-action");
  removeButton.setAttribute("type", "image");

  lastBook = myLibrary[myLibrary.length - 1];
  titleString = `"${lastBook.title}"`;
  pageCountString = `${lastBook.pageCount} pages`;
  readIcon = "./images/";

  if (lastBook.read === "on") {
    readIcon += "book-check.svg";
  } else {
    readIcon += "book-clock.svg";
  }

  display.setAttribute("data-book-id", lastBook.id);
  titleDisplay.textContent = titleString;
  authorDisplay.textContent = lastBook.author;
  pageCountDisplay.textContent = pageCountString;

  toggleReadButton.setAttribute("src", readIcon);
  removeButton.setAttribute("src", "./images/minus.svg");

  removeButton.addEventListener("click", removeBook);
  toggleReadButton.addEventListener("click", toggleRead);

  removeContainer.appendChild(removeButton);
  toggleReadContainer.appendChild(toggleReadButton);

  display.appendChild(titleDisplay);
  display.appendChild(authorDisplay);
  display.appendChild(pageCountDisplay);
  display.appendChild(removeContainer);
  display.appendChild(toggleReadContainer);

  bookshelf.appendChild(display);
}
