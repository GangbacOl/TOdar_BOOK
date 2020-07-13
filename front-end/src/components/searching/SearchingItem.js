import React from "react";
import axios from "axios";
import getTableOfContents from "../../middlewares/getTableContents";
import "./style/searchItem.scss";

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
            <div className="Searching-container">
                <img src={thumbnail} alt="not found" />
                <div className="text">
                    <h3>{title}</h3>
                    <div className="button-wrapper">
                        {isLogin ? <input type="button" value="Pick" onClick={() => addBook(isbn, 0, username)} /> : null}
                    </div>
                    <span>저자: {author[0]}</span>
                    <br />
                    <p>{contents.slice(0, 100)}...</p>
                </div>
            </div>
        </div>
    );
};

export default SearchingItem;
