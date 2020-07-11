import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import BookRead from "./BookRead";

const BooksRead = ({ username }) => {
    const [books, setBooks] = useState([]);
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
            });
    }, [username]);
    return (
        <div>
            {isLoading ? (
                <Loader type="Oval" color="#000000" height="50" width="50" />
            ) : (
                books.map((book) => {
                    return <BookRead thumbnail={book.image} author={book.author} title={book.title} key={book.isbn} />;
                })
            )}
            }
        </div>
    );
};

export default BooksRead;
