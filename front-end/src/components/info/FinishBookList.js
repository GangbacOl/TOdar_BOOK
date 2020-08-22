import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FinishBook from "./FinishBook";
import ErrorPage from "../error/ErrorPage";
import "./style/FinishBookList.scss";

const FinishBookList = ({ username, isLogin }) => {
    const [books, setBooks] = useState([]);
    const [errorContent, setErrorContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
        <div className="FinishBookList">
            {isLoading ? (
                <p>Loading...</p>
            ) : isLogin ? (
                <div className="FinishBookListFirst">
                    <Link to="/">메인으로</Link>
                    <div className="FinishBookListSecond">
                        {books.map((book) => {
                            return (
                                <FinishBook
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

export default FinishBookList;
