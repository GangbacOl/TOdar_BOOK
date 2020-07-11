import React, { useState } from "react";

const BookRead = ({ thumbnail, author, title }) => {
    return (
        <div>
            <h2>{title}</h2>
            <span>{author}</span>
            <img src={thumbnail} alt="" />
        </div>
    );
};

export default BookRead;
