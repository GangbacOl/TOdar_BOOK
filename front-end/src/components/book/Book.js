import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./style/Book.scss";
import "./style/ReadingBookModal.scss";

const ReadingBookModal = ({ showModal, handleClose, tableOfContents, title, isbn, username }) => {
    useEffect(() => {
        readCheckingToggle(tableOfContents);
    });
    const readCheckingToggle = (tableOfContents) => {
        const checkList = document.getElementsByClassName("isRead");
        tableOfContents.contents.map((content, index) => {
            checkList.item(index).checked = content.checked;
        });
    };

    const sendData = async (tableOfContents) => {
        let newTableOfContents = tableOfContents;
        console.log(tableOfContents);
        const checkList = document.getElementsByClassName("isRead");

        newTableOfContents.contents.map((content, index) => {
            content.checked = checkList.item(index).checked;
        });

        const percentage = setReadPercentage(newTableOfContents);
        await axios
            .post("http://localhost:5000/books/update", { newTableOfContents, percentage, isbn, username }, { withCredentials: true })
            .catch((err) => console.log(err));
        window.location.reload();
    };

    const setReadPercentage = (newTableOfContents) => {
        let tempPercentage = 0,
            tempCount = 0;
        newTableOfContents.contents.map((content) => {
            if (content.checked === true) tempPercentage++;
            tempCount++;
        });
        return (tempPercentage / tempCount) * 100;
    };

    const cancelRead = async (isbn, username) => {
        await axios
            .delete("http://localhost:5000/books/delete", { data: { isbn, username }, withCredentials: true })
            .catch((err) => console.log(err));
        window.location.reload();
    };
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {tableOfContents.contents.map((item, index) => (
                    <div key={index}>
                        <li>{item.name}</li>
                        <input className="isRead" type="checkbox" />
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => cancelRead(isbn, username)}>
                    책 삭제
                </Button>
                <Button variant="primary" onClick={() => sendData(tableOfContents)}>
                    업데이트
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

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
                <ReadingBookModal
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
