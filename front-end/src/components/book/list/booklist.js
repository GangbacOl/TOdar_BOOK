import React, { useState, useEffect } from "react";
import axios from "axios";

const BookList = ({ username }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5000/books/read", { username }).then((res) => setBooks(res.data.response));
  }, [username]);
  console.log(books[0]);
  const searchBookByIsbn = (isbn) => {
    axios
      .get(`https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=${isbn}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Naver-Client-Id": "iB8LdjGuHwSuDU_5ZR6Q",
          "X-Naver-Client-Secret": "Bno7XltwqA",
        },
      })
      .then((res) => console.log(res));
  };
  // axios.get(`https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=${books[0].isbn}`).then((res) => console.log(res));
  return (
    <div className="BookList">
      <ul>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{searchBookByIsbn(book.isbn)}</h2>
            <span>{book.amount_read}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
