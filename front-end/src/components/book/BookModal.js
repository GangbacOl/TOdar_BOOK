import React, { useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./style/BookModal.scss";

const BookModal = ({ showModal, handleClose, tableOfContents, title, isbn, username }) => {
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
            if (content.checked) tempPercentage++;
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

export default BookModal;
