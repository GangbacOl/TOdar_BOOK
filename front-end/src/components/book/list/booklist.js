import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorPage from "../../error/error";
import Book from "./book";

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
      .catch((err, { response }) => {
        console.log(err);
        if (response.status === 401) {
          setErrorContent({ statusText: response.statusText, errorMessage: response.data.message });
          setIsLogin(false);
        }
      });
  }, [username]);
  return (
    <div className="BookList">
      {isLogin ? (
        <div>
          {books.map((book) => (
            <Book
              isbn={book.isbn}
              title={book.title}
              author={book.author}
              publisher={book.publisher}
              percentage={book.amount_read}
              image={book.image}
              key={book.isbn}
            />
          ))}
        </div>
      ) : (
        <ErrorPage
          statusText={errorContent.statusText}
          errorMessage={errorContent.errorMessage}
          redirectUrl="/signin"
          redirectMessage="로그인하러 가기"
        />
      )}
    </div>
  );
};

export default BookList;
