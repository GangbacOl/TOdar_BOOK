import React, { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import ReadingBook from "./ReadingBook";

const Book = ({ isbn, title, author, publisher, percentage, image, tableOfContents, username }) => {
    const [showTableContents, setShowTableContents] = useState(false);

    const showContents = () => setShowTableContents(!showTableContents);

    const cancelRead = (isbn, username) => {
        axios.delete("http://localhost:5000/books/delete", { data: { isbn, username }, withCredentials: true }).catch((err) => console.log(err));
        window.location.reload();
    };

    return (
        <div className="Book">
            <div>
                <h2>{title}</h2>
                <span>
                    저자: <b>{author}</b>
                </span>
                <br />
                <span>
                    출판사: <b>{publisher}</b>
                </span>
                <br />
                <ProgressBar now={percentage} label={`${percentage}%`} />
                <br />
                <img src={image} alt="" />
                {showTableContents ? (
                    <input type="button" value="닫기" onClick={showContents} />
                ) : (
                    <div>
                        <input type="button" value="체크하러 가기" onClick={showContents} />
                        <input
                            type="button"
                            value="이책 안읽을래요."
                            onClick={() => {
                                cancelRead(isbn, username);
                            }}
                        />
                    </div>
                )}
            </div>
            {showTableContents ? <ReadingBook tableOfContents={tableOfContents} isbn={isbn} username={username} /> : null}
        </div>
    );
};

export default Book;
