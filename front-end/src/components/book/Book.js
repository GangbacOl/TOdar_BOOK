import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import ReadingBook from "./ReadingBook";

const Book = ({ isbn, title, author, publisher, percentage, image, tableOfContents, username }) => {
  const [showTableContents, setShowTableContents] = useState(false);
  const onClick = () => setShowTableContents(!showTableContents);
  return (
    <div>
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
          <input type="button" value="닫기" onClick={onClick} />
        ) : (
          <input type="button" value="체크하러 가기" onClick={onClick} />
        )}
      </div>
      {showTableContents ? <ReadingBook tableOfContents={tableOfContents} isbn={isbn} username={username} /> : null}
    </div>
  );
};

export default Book;
