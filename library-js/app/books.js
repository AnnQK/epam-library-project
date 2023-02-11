const books = [];

function Book(bookData) {
  this.id = bookData.id;
  this.title = bookData.title;
  this.author = bookData.author;
  this.raiting = bookData.raiting;
  this.image = bookData.image;
  this.tags = bookData.tags;
}

function addUserBook(newBookData) {
  const newBook = new Book({
    id: "sh" + books.length,
    ...newBookData,
  });
  books = [...books, newBook];
  console.log("added new book", newBook);
}

function setRaiting(bookId, newRaiting) {
  books[bookId].raiting = newRaiting;
  console.log(`${books[bookId].raiting} set to ${newRaiting}`);
}

function setBooksData(booksData) {
  for (let book of booksData) {
    const updatedBook = {
      id: book.id,
      title: book.title,
      author: book.authors[0],
      raiting: 0,
      image: book.formats["image/jpeg"],
      tags: [],
    };
  }
}
