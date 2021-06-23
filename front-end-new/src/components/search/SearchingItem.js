import React from "react";
import axios from "axios";
import { getTableOfContents } from "../../middlewares/middlewares";
import "./style/SearchingItem.scss";

const SearchingItem = ({ isLogin, title, author, contents, thumbnail, isbn, username }) => {
    const addBook = (isbn, percentage, username) => {
        const tableOfContents = getTableOfContents();

        axios
            .post("http://localhost:5000/books/add", { isbn, percentage, username, tableOfContents }, { withCredentials: true })
            .catch(({ response }) => {
                if (response.status === 401) console.log("로그인을 먼저 하세요.");
            });
    };
    return (
        <div className="SearchingItem">
            <div className="SearchingContainer">
                <img src={thumbnail} alt="not found" />
                <div className="text">
                    <h3>{title}</h3>
                    <span>저자: {author}</span>
                    {isLogin ? <input type="button" value="pick" onClick={() => addBook(isbn, 0, username)} /> : null}
                    <p>{contents.slice(0, 100)}...</p>
                </div>
            </div>
        </div>
    );
};

export default SearchingItem;
