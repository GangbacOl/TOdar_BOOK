import React, { useState } from "react";
import axios from "axios";
import "./style/searchItem.scss";

function SearchItem({ title, author, contents, thumbnail, isbn, username }) {
  const [isFocus, setIsFocus] = useState(false);
  const addBook = (isbn, percentage = 0, username) => {
    axios
      .post("http://localhost:5000/books/add", { isbn, percentage, username })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="item-wrapper">
      {isFocus ? (
        <div className="focus-container">
          <img src={thumbnail} alt="not found" />
          <h3>{title}</h3>
          <input
            type="button"
            value="Back"
            onClick={() => {
              setIsFocus(false);
            }}
          />
          <span>저자: {author[0]}</span>
          <br />
          <p>{contents}</p>
        </div>
      ) : (
        <div className="container">
          <img src={thumbnail} alt="not found" />
          <div className="text">
            <h3>{title}</h3>
            <div className="button-wrapper">
              <input
                type="button"
                value="Detail"
                onClick={() => {
                  setIsFocus(true);
                }}
              />
              <input
                type="button"
                value="Pick"
                onClick={() => {
                  addBook(isbn, undefined, username);
                }}
              />
            </div>
            <span>저자: {author[0]}</span>
            <br />
            <p>{contents.slice(0, 100)}...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchItem;
