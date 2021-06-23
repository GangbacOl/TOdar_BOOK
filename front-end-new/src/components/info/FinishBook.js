import React from "react";
import "./style/FinishBook.scss";

const FinishBook = ({ thumbnail, author, title, startOfRead, finishOfRead }) => {
    const sliceTitle = (title) => {
        let newTitle = title.split("(");
        return newTitle[0];
    };
    return (
        <div className="FinishBook">
            <h3>{sliceTitle(title)}</h3>
            <img src={thumbnail} alt="" />
            <br />
            <span>저자: {author}</span>
            <div className="date">
                <div>
                    <span>Started at: </span>
                    <span>{startOfRead.slice(0, 10) + " " + startOfRead.slice(11, 19)}</span>
                </div>
                <div>
                    <span>Finished at: </span>
                    <span>{finishOfRead.slice(0, 10) + " " + finishOfRead.slice(11, 19)}</span>
                </div>
            </div>
        </div>
    );
};

export default FinishBook;
