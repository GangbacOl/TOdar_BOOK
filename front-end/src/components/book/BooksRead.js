import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import BookRead from "./BookRead";
import ErrorPage from "../error/ErrorPage";

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
                <Loader type="Oval" color="#000000" height="50" width="50" />
            ) : isLogin ? (
                <div>
                    <input type="button" onClick={() => history.push("/")} value="메인으로" />
                    {books.map((book) => {
                        return <BookRead thumbnail={book.image} author={book.author} title={book.title} key={book.isbn} />;
                    })}
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
