import React, { useState } from "react";
import axios from "axios";
import SearchingItem from "../search/SearchingItem";
import config from "../../config/config";
import "./style/SearchingArea.scss";

const SearchingArea = ({ isLogin, username }) => {
    const [title, setTitle] = useState("");
    const [books, setBooks] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);

    const searchBookTitle = async (title) => {
        if (title === "") {
            setIsEmpty(true);
        } else {
            const {
                data: { documents },
            } = await axios.get(`https://dapi.kakao.com/v3/search/book?query=${title}`, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: `KakaoAK ${config.apiKey}`,
                },
            });
            setBooks(documents);
            setIsEmpty(false);
        }
    };

    const checkIsNull = (book) => {
        // title, author, contents, thumbnail중 데이터가 한개라도 ""(undefined가 아님)이라면 false를 리턴.
        if (book.title === "" || book.author === "" || book.contents === "" || book.thumbnail === "") return false;
        return true;
    };

    return (
        <div className="SearchingArea">
            <div className="SearchSide">
                <input
                    className="SearchBox"
                    type="search"
                    placeholder="책제목을 입력하세요."
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) searchBookTitle(title);
                    }}
                    value={title}
                />
                <input className="SearchBtn" type="button" value="검색" onClick={() => searchBookTitle(title)} />
            </div>
            <div className="SearchList">
                {isEmpty ? (
                    <h2>책의 제목을 입력해주세요.</h2>
                ) : books.length ? (
                    books.map((book) => {
                        if (checkIsNull(book)) {
                            return (
                                <SearchingItem
                                    isLogin={isLogin}
                                    title={book.title}
                                    author={book.authors[0]}
                                    contents={book.contents}
                                    thumbnail={book.thumbnail}
                                    isbn={book.isbn}
                                    username={username}
                                    key={book.isbn}
                                />
                            );
                        } else {
                            return null;
                        }
                    })
                ) : (
                    <h2>키워드와 관련된 책을 찾지 못했습니다.</h2>
                )}
            </div>
        </div>
    );
};

export default SearchingArea;
