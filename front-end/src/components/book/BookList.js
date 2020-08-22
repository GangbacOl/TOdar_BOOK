import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../error/ErrorPage";
import Book from "./Book";
import "./style/BookList.scss";

const BookList = ({ username, isLogin }) => {
    const [books, setBooks] = useState([]);
    const [errorContent, setErrorContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
                <p>Loading...</p>
            ) : isLogin ? (
                <div className="booklist-container-first">
                    <Link to="/">메인으로</Link>
                    <div className="booklist-container-second">
                        {books.map((book) => (
                            <Book
                                isbn={book.isbn}
                                title={book.title}
                                author={book.authors[0]}
                                contents={book.contents}
                                publisher={book.publisher}
                                percentage={book.percentage}
                                image={book.thumbnail}
                                tableOfContents={book.tableOfContents}
                                key={book.isbn}
                                username={username}
                            />
                        ))}
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

export default BookList;
