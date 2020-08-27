import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import BookModal from "./BookModal";
import "./style/Book.scss";

const Book = ({ isbn, title, author, contents, publisher, percentage, image, tableOfContents, username }) => {
    const [showModal, setShowModal] = useState(false);

    const sliceTitle = (title) => {
        let newTitle = title.split("(");
        return newTitle[0];
    };
    return (
        <div className="Book">
            <div className="book-container" onClick={() => setShowModal(true)}>
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
            </div>
            {showModal ? (
                <BookModal
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    tableOfContents={tableOfContents}
                    title={title}
                    isbn={isbn}
                    username={username}
                />
            ) : null}
        </div>
    );
};

export default Book;
