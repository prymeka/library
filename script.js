const r = document.querySelector(':root');
const rs = getComputedStyle(r);
const booksGrid = document.querySelector("#books-grid");
const addBookBtn = document.querySelector("#new-book-btn");

let myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.info = function() {
    return `{this.title} by {this.author}, {this.pages} pages, {this.readStatus}`;
}

function toggleReadStatusCallback(e) {
  const currentStatus = e.currentTarget.textContent;
  if (currentStatus === "Read") {
    e.currentTarget.style.backgroundColor = rs.getPropertyValue("--not-read-color");
    e.currentTarget.textContent = "Not read";
  } else if (currentStatus === "Not read") {
    e.currentTarget.style.backgroundColor = rs.getPropertyValue("--read-color");
    e.currentTarget.textContent = "Read";
  } else {
    console.log("Warning!");
  }
}

function removeBookCallback(e) {
  e.target.removeEventListener("click", removeBookCallback); 
  booksGrid.removeChild(e.target.parentNode);
}

function addBookToLibrary(book) {
  // book card children
  let title = document.createElement("p");
  title.textContent = book.title;
  title.classList.add("title");
  let author = document.createElement("p");
  author.textContent = book.author;
  author.classList.add("author");
  let pages = document.createElement("p");
  pages.textContent = book.pages+" pages";
  pages.classList.add("pages");
  let readStatusBtn = document.createElement("button");
  readStatusBtn.textContent = book.readStatus[0].toUpperCase() + book.readStatus.slice(1);
  readStatusBtn.classList.add("read-status-btn");
  readStatusBtn.addEventListener("click", toggleReadStatusCallback);
  readStatusBtn.style.backgroundColor = readStatusBtn.textContent === "Read" ? rs.getPropertyValue("--read-color") : rs.getPropertyValue("--not-read-color");
  let removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", removeBookCallback);
  // book card
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readStatusBtn);
  bookCard.appendChild(removeBtn);

  booksGrid.appendChild(bookCard);
}

function addBooksToLibrary() {
  for (let i=0; i<myLibrary.length; i++) {
    addBookToLibrary(myLibrary[i]);
  }
}

let modal = document.getElementById("new-book-modal");
let addNewBookBtn = document.getElementById("new-book-btn");
let span = document.getElementsByClassName("close")[0];
let titleInput = document.getElementById("title-input");
let authorInput = document.getElementById("author-input");
let pagesInput = document.getElementById("pages-input");
addNewBookBtn.onclick = function() {
  modal.style.display = "block";
  let ogBorderColor = rs.getPropertyValue("--input-border-color")
  titleInput.value = "";
  titleInput.style.borderColor = ogBorderColor;
  authorInput.value = "";
  authorInput.style.borderColor = ogBorderColor;
  pagesInput.value = "";
  pagesInput.style.borderColor = ogBorderColor;
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let submitButton = document.getElementById("submit-btn");
let notReadInput = document.getElementById("not-read-input");
let readInput = document.getElementById("read-input");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (titleInput.value === "") {
    titleInput.style.borderColor = "red";
    return;
  } else if (authorInput.value === "") {
    authorInput.style.borderColor = "red";
    return;
  } else if (pagesInput.value === "") {
    pagesInput.style.borderColor = "red";
    return;
  }
  modal.style.display = "none";
  let book = new Book(
    titleInput.value, 
    authorInput.value, 
    pagesInput.value,
    Boolean(notReadInput.checked) ? notReadInput.value : readInput.value
  )
  myLibrary.push(book);
  addBookToLibrary(book);
});

myLibrary.push(new Book("The Lord of the Rings", "J. R. R. Tolkien", "700", "not read"));
myLibrary.push(new Book("The Hobbit", "J. R. R. Tolkien", "500", "not read"));
myLibrary.push(new Book("The Book of the New Sun", "Gene Wolfe", "1000", "read"));
myLibrary.push(new Book("Apology", "Plato", "100", "not read"));
myLibrary.push(new Book("Crito", "Plato", "120", "read"));

addBooksToLibrary();
