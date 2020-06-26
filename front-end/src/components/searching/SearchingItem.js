import React, { useState } from "react";
import axios from "axios";
import "./style/searchItem.scss";

function SearchingItem({ title, author, contents, thumbnail, isbn, username }) {
  const addBook = (isbn, percentage = 0, username) => {
    axios
      .post("http://localhost:5000/books/add", { isbn, percentage, username })
      .then((res) => {
        console.log(res);
      })
      .catch(({ response }) => {
        if (response.status === 401) console.log("로그인을 먼저 하세요.");
      });
  };
  return (
    <div className="item-wrapper">
      <div className="container">
        <img src={thumbnail} alt="not found" />
        <div className="text">
          <h3>{title}</h3>
          <div className="button-wrapper">
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
    </div>
  );
}

export default SearchingItem;
