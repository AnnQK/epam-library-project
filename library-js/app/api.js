const BASE_URL = "https://gutendex.com/";

export async function getBooks() {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    const data = await response.json();
    const books = data.results;
    return books;
  } catch (e) {
    console.log(e);
  }
}

export async function searchBooks(searchValue) {
  try {
    const response = await fetch(`${BASE_URL}/books?search=${searchValue}`);
    const data = await response.json();
    const books = data.results;
    return books;
  } catch (e) {
    console.log(e);
  }
}

export async function sortBooks(sortType = "") {
  let option;
  if (sortType) {
    option = `=${sortType}`;
  }
  try {
    const response = await fetch(`${BASE_URL}/books?sort${option}`);
    const data = await response.json();
    const books = data.results;
    return books;
  } catch (e) {
    console.log(e);
  }
}

export async function getFreeBooks() {
  try {
    const response = await fetch(`${BASE_URL}/books?copyright=false`);
    const data = await response.json();
    const books = data.results;
    return books;
  } catch (e) {
    console.log(e);
  }
}
