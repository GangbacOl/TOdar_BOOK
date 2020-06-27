import React from "react";
import { ProgressBar } from "react-bootstrap";

const Book = ({ isbn, title, author, publisher, percentage, image }) => {
  return (
    <div key={isbn}>
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
    </div>
  );
};

export default Book;
