import React, { useState, useEffect } from "react";
import axios from "axios";

const BookList = ({ username }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5000/books/read", { username }).then((res) => setBooks(res.data.booksInfo.items));
  }, [username]);
  console.log(books);
  return (
    <div className="BookList">
      <ul>
        {books.map((book) => (
          <div key={book.isbn}>
            <h2>{book.title}</h2>
            <span>
              저자: <b>{book.author}</b>
            </span>
            <br />
            <span>
              {" "}
              출판사: <b>{book.publisher}</b>
            </span>
            <br />
            <img src={book.image} alt="" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
