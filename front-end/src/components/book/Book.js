import React, { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import ReadingBook from "./ReadingBook";
import "./style/Book.scss";

const Book = ({ isbn, title, author, contents, publisher, percentage, image, tableOfContents, username }) => {
    const [showTableContents, setShowTableContents] = useState(false);

    const showContents = () => setShowTableContents(!showTableContents);

    const cancelRead = async (isbn, username) => {
        await axios
            .delete("http://localhost:5000/books/delete", { data: { isbn, username }, withCredentials: true })
            .catch((err) => console.log(err));
        window.location.reload();
    };

    const sliceTitle = (title) => {
        let newTitle = title.split("(");
        return newTitle[0];
    };
    return (
        <div className="Book">
            <div className="book-container">
                <h3>{sliceTitle(title)}</h3>
                <div className="main-contents">
                    <img src={image} alt="" />
                    <div className="author-publisher-contents">
                        <span>
                            저자: <b>{author}</b>
                        </span>
                        <br />
                        <span>
                            출판사: <b>{publisher}</b>
                        </span>
                        <p>{contents}</p>
                    </div>
                </div>
                <ProgressBar now={percentage} />
                {showTableContents ? (
                    <input type="button" value="닫기" onClick={showContents} />
                ) : (
                    <div className="button-container">
                        <input type="button" value="체크하러 가기" onClick={showContents} />
                        <input
                            type="button"
                            value="책 삭제하기"
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
