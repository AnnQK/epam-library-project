import { getBooks, getFreeBooks, getPopularBooks, getRecentBooks } from "./api";
// variables
const booksContainer = document.querySelector(".section__books");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const bookPlaceholder = "https://galapagos-pro.com/wp-content/uploads/2021/03/book-placeholder.jpg";

// INPUTS VARIABLES
const searchFilter = document.querySelector(".input-keywords");
const inputBookTitle = document.querySelector(".modal__form__input-title");
const inputBookAuthor = document.querySelector(".modal__form__input-author");
const inputBookCover = document.querySelector(".modal__form__input-cover");

// BUTTONS VARIABLES
const addBookBtn = document.querySelector(".add-book-btn");
const closeModalBtn = document.querySelector(".modal__btn-close");
const submitBookBtn = document.querySelector(".modal__btn-submit");
const filterBtnContainer = document.querySelector(".filter-btns");

// books on display
let displayBooks = [];

const prepareBooks = (books) => {
  displayBooks = books;
  renderBooks(displayBooks);
  console.log(displayBooks);
};
// RATING STARS

function raiting(e) {
  if (e.target.classList.contains("raiting-btn")) {
    // find stars in clicked books container
    const stars = Array.from(
      e.target.closest(".book-container__stats").querySelectorAll(".raiting-btn")
    );

    // stars container
    const starsContainer = e.target.closest(".book-container__stats");
    const clickedStarIdx = stars.indexOf(e.target);
    starsContainer.dataset.raiting = clickedStarIdx + 1;
    // find book in array
    const containerTitle = Array.from(starsContainer.parentElement.childNodes)[3].textContent;

    // update display books array
    displayBooks.map((book) => {
      if (book.title === containerTitle) {
        // eslint-disable-next-line no-param-reassign
        book.raiting = starsContainer.dataset.raiting;
        return book;
      }
      return book;
    });
  }
  // eslint-disable-next-line no-use-before-define
  renderBooks(displayBooks);
}

function renderRaiting() {
  const starsContainers = document.querySelectorAll(".book-container__stats");
  Array.from(starsContainers).forEach((container) => {
    const stars = container.querySelectorAll(".raiting-btn");
    // check default raiting from api
    const checkedIdx = container.dataset.raiting;
    stars.forEach((item, i) => {
      // remove active class from all stars
      item.parentElement.classList.remove("active-raiting-btn");
      // set this raiting to stars
      if (i <= checkedIdx - 1) {
        item.parentElement.classList.add("active-raiting-btn");
      }
    });
  });
  // event delegation
  starsContainers.forEach((item) => {
    item.addEventListener("click", raiting);
  });
}

// creating a container for every book
function renderBooks(booksArr) {
  booksContainer.innerHTML = "";
  booksArr.map((book) =>
    booksContainer.insertAdjacentHTML(
      "afterBegin",
      `<div class="book-container">
      <div class="image-box">
      <img src="${book.formats["image/jpeg"]}" alt="${book.title}" class="book-container__image" /></div>
      <h3 class="book-container__title">${book.title}</h3>
      <h4 class="book-container__author">${book.authors[0]?.name}</h4>
      <div class="book-container__stats" data-raiting="${book.raiting}">
        <svg id="" class="svg-logo stats-star">
          <use href="#star" class="raiting-btn"></use>
        </svg>
        <svg id="" class="svg-logo stats-star">
          <use href="#star" class="raiting-btn"></use>
        </svg>
        <svg id="" class="svg-logo stats-star">
           <use href="#star" class="raiting-btn"></use>
        </svg>
        <svg id="" class="svg-logo stats-star">
          <use href="#star" class="raiting-btn"></use>
        </svg>
        <svg id="" class="svg-logo stats-star">
          <use href="#star" class="raiting-btn"></use>
        </svg>
    </div>`
    )
  );
  renderRaiting();
}

// MODAL ADD BOOK

function showModal() {
  inputBookAuthor.value = "";
  inputBookTitle.value = "";
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.classList.add("stop-scroll");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.classList.remove("stop-scroll");
}

function addBookInfo(e) {
  e.preventDefault();
  if (inputBookTitle.value === undefined || inputBookTitle.value === "") return;
  const uploadImage = inputBookCover.files[0];
  const imageURL =
    uploadImage === undefined || uploadImage == null
      ? bookPlaceholder
      : URL.createObjectURL(uploadImage);
  const addedBook = {
    title: inputBookTitle.value,
    authors: [{ name: inputBookAuthor.value }],
    formats: { "image/jpeg": imageURL },
  };
  prepareBooks([...displayBooks, addedBook]);
  closeModal();
}

// SEARCH BAR

function searchBook(e) {
  const isEmplty = e.target.value.trim().lenght === 0;
  if (isEmplty) {
    prepareBooks(displayBooks);
    return;
  }
  const searchValue = e.target.value.toLowerCase();
  const filteredBooks = displayBooks.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.authors[0].name.toLowerCase().includes(searchValue)
  );
  renderBooks(filteredBooks);
}

// FETCHING BOOKS
async function showDefaultBooks() {
  const defaultBooks = await getBooks();
  prepareBooks(defaultBooks);
}

async function showPopularBooks() {
  const popularBooks = await getPopularBooks();
  prepareBooks(popularBooks);
}

async function showFreeBooks() {
  const freeBooks = await getFreeBooks();
  prepareBooks(freeBooks);
}

async function showRecentBooks() {
  const recentBooks = await getRecentBooks();
  prepareBooks(recentBooks);
}

// event delegation
filterBtnContainer.addEventListener("click", (e) => {
  if (e.target.dataset.func) {
    const clickedBtn = e.target;
    // change visual active btn
    Array.from(filterBtnContainer.querySelectorAll("[data-func]")).forEach((item) =>
      item.classList.remove("active-filter-btn")
    );
    clickedBtn.classList.add("active-filter-btn");

    if (clickedBtn.dataset.func === "recentSort") {
      return showRecentBooks();
    }
    if (clickedBtn.dataset.func === "popularSort") {
      return showPopularBooks();
    }
    if (clickedBtn.dataset.func === "freeSort") {
      return showFreeBooks();
    }
    if (clickedBtn.dataset.func === "all") {
      return showDefaultBooks();
    }

    return showDefaultBooks();
  }
  return {};
});

submitBookBtn.addEventListener("click", addBookInfo);
searchFilter.addEventListener("input", searchBook);
addBookBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

getBooks().then((res) => prepareBooks(res));
