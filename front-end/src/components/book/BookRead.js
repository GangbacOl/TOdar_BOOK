import React from "react";

const BookRead = ({ thumbnail, author, title }) => {
    return (
        <div className="BookRead">
            <h2>{title}</h2>
            <span>{author}</span>
            <img src={thumbnail} alt="" />
        </div>
    );
};

export default BookRead;
