const BASE_URL = "https://gutendex.com";

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

export async function getPopularBooks() {
  try {
    const response = await fetch(`${BASE_URL}/books?sort=ascending`);
    const data = await response.json();
    const books = data.results;
    return books;
  } catch (e) {
    console.log(e);
  }
}

export async function getRecentBooks() {
  try {
    const response = await fetch(`${BASE_URL}/books?author_year_start=1970`);
    const data = await response.json();
    const books = data.results;
    return books;
  } catch (e) {
    console.log(e);
  }
}

export async function getFreeBooks() {
  try {
    const response = await fetch(`${BASE_URL}/books?copyright=true`);
    const data = await response.json();
    const books = data.results;
    return books;
  } catch (e) {
    console.log(e);
  }
}
