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
            <span>저자: {author}</span>
            <div className="date">
                <div>
                    <span>읽기 시작한 날짜 </span>
                    <span>{startOfRead.slice(0, 10) + " " + startOfRead.slice(11, 19)}</span>
                </div>
                <div>
                    <span>다 읽은 날짜 </span>
                    <span>{finishOfRead.slice(0, 10) + " " + finishOfRead.slice(11, 19)}</span>
                </div>
            </div>
        </div>
    );
};

export default FinishBook;
