import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";

const BookList = ({ username }) => {
  const [books, setBooks] = useState([]);
  const [errorContent, setErrorContent] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:5000/books/read", { username }, { withCredentials: true })
      .then((res) => {
        setBooks(res.data.booksInfo.items);
        setIsLogin(true);
      })
      .catch(({ response }) => {
        setErrorContent({ statusText: response.statusText, errorMessage: response.data.message });
        if (response.status === 401) {
          setIsLogin(false);
        }
      });
  }, [username]);
  return (
    <div className="BookList">
      {isLogin ? (
        <div>
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
              <ProgressBar now={book.amount_read} label={`${book.amount_read}%`} />
              <br />
              <img src={book.image} alt="" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>{errorContent.statusText}</h2>
          <p>{errorContent.errorMessage}</p>
          <a href="/signin">로그인하러 가기</a>
        </div>
      )}
    </div>
  );
};

export default BookList;
