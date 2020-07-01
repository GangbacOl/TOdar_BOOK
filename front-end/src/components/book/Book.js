import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";

const Book = ({ isbn, title, author, publisher, percentage, image, tableOfContents }) => {
  const [showTableContents, setShowTableContents] = useState(false);
  const onClick = () => setShowTableContents(true);
  // console.log(tableOfContents);
  return (
    <div key={isbn}>
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
        <a href="/book/read" onClick={onClick}>
          체크하러 가기
        </a>
      </div>
      {/* {showTableContents ? } */}
    </div>
  );
};

export default Book;
