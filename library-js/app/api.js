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
