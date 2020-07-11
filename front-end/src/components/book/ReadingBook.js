import React, { useEffect } from "react";
import axios from "axios";

const ReadingBook = ({ tableOfContents, isbn, username }) => {
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
        console.log(percentage);
        await axios
            .post("http://localhost:5000/books/update", { newTableOfContents, percentage, isbn, username }, { withCredentials: true })
            .then((res) => console.log(res));

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

    return (
        <div>
            <h1>Table of contents</h1>
            {tableOfContents.contents.map((item, index) => (
                <div key={index}>
                    <li>{item.name}</li>
                    <input className="isRead" type="checkbox" />
                </div>
            ))}
            <input
                type="button"
                value="저장하기"
                onClick={() => {
                    sendData(tableOfContents);
                }}
            />
        </div>
    );
};

export default ReadingBook;
