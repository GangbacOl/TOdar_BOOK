import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import BookRead from "./BookRead";
import ErrorPage from "../error/ErrorPage";
import "./style/BooksRead.scss";

const BooksRead = ({ username, isLogin }) => {
    const [books, setBooks] = useState([]);
    const [errorContent, setErrorContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios
            .get("http://localhost:5000/books/loadBooksRead", {
                params: {
                    username,
                },
                withCredentials: true,
            })
            .then((res) => {
                setBooks(res.data.booksRead);
                setIsLoading(false);
            })
            .catch(({ response }) => {
                if (response.status === 401) {
                    setErrorContent({ statusText: response.statusText, errorMessage: response.data.message });
                    setIsLoading(false);
                }
            });
    }, [username]);

    return (
        <div className="BooksRead">
            {isLoading ? (
                <p>Loading...</p>
            ) : isLogin ? (
                <div className="booksread-container-first">
                    <input type="button" onClick={() => history.push("/")} value="메인으로" />
                    <div className="booksread-container-second">
                        {books.map((book) => {
                            return (
                                <BookRead
                                    thumbnail={book.thumbnail}
                                    author={book.authors[0]}
                                    title={book.title}
                                    startOfRead={book.startOfRead}
                                    finishOfRead={book.finishOfRead}
                                    key={book.isbn}
                                />
                            );
                        })}
                    </div>
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

export default BooksRead;
