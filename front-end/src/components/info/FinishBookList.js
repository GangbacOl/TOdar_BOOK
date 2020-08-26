import React, { useState, useEffect } from "react";
import axios from "axios";
import FinishBook from "./FinishBook";
import "./style/FinishBookList.scss";

const FinishBookList = ({ username }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/books/loadBooksRead", { params: { username }, withCredentials: true }).then((res) => {
            setBooks(res.data.booksRead);
        });
    }, [username]);

    return (
        <div className="FinishBookList">
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
    );
};

export default FinishBookList;
