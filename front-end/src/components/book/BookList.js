import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import Book from "./Book";
import "./style/BookList.scss";

const BookList = ({ username, isLogin }) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (!isLogin) history.push("/login");
        axios
            .get("http://localhost:5000/books/read", { params: { username }, withCredentials: true })
            .then((res) => {
                setBooks(res.data.booksRead);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [username]);
    return (
        <div className="BookList">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="booklist-container-first">
                    <Link to="/">메인으로</Link>
                    <div className="booklist-container-second">
                        {books.length ? (
                            books.map((book) => (
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
                            ))
                        ) : (
                            <p>추가한 책이 없습니다.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
