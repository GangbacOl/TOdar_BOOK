import React from "react";
import BookList from "../components/book/BookList";

const BookPage = ({ username, isLogin }) => {
    return (
        <div className="BookPage">
            <BookList username={username} isLogin={isLogin} />
        </div>
    );
};

export default BookPage;
