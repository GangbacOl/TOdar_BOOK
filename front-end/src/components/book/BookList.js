import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import ErrorPage from "../error/ErrorPage";
import Book from "./Book";

const BookList = ({ username, isLogin }) => {
    const [books, setBooks] = useState([]);
    const [errorContent, setErrorContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios
            .get("http://localhost:5000/books/read", { params: { username }, withCredentials: true })
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
        <div className="BookList">
            {isLoading ? (
                <Loader type="Oval" color="#000000" height="50" width="50" />
            ) : isLogin ? (
                <div>
                    <input type="button" onClick={() => history.push("/")} value="메인으로" />
                    {books.map((book) => (
                        <Book
                            isbn={book.isbn}
                            title={book.title}
                            author={book.author}
                            publisher={book.publisher}
                            percentage={book.percentage}
                            image={book.image}
                            tableOfContents={book.tableOfContents}
                            key={book.isbn}
                            username={username}
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
