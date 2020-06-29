import React, { useState } from "react";
import axios from "axios";
import SearchingItem from "./SearchingItem";
import Header from "../header/Header";
import "./style/home.scss";

const _apiKey = "830abcdf4f4174ae428b50d1997d5167";

const Home = ({ username, initializeState }) => {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  let SearchingBookTitle = async (title) => {
    if (title === "") {
      setIsEmpty(true);
    } else {
      const {
        data: { documents },
      } = await axios.get(`https://dapi.kakao.com/v3/search/book?query=${title}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `KakaoAK ${_apiKey}`,
        },
      });
      setBooks(documents);
      setIsEmpty(false);
    }
  };

  const checkIsNull = (book) => {
    if (book.title === "") return false;
    if (book.author === "") return false;
    if (book.contents === "") return false;
    if (book.thumbnail === "") return false;
    return true;
  };

  return (
    <div className="search-wrapper">
      <Header username={username} initializeState={initializeState} />
      <div className="Searching">
        <div className="SearchSide">
          <input
            className="SearchBox"
            type="search"
            placeholder="책제목을 입력하세요."
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) SearchingBookTitle(title);
            }}
            value={title}
          />
          <input className="SearchBtn" type="button" value="검색" onClick={() => SearchingBookTitle(title)} />
        </div>
        <div className="SearchList">
          {isEmpty ? (
            <h2>책의 제목을 입력해주세요.</h2>
          ) : books.length ? (
            books.map((book) => {
              if (checkIsNull(book)) {
                return (
                  <SearchingItem
                    title={book.title}
                    author={book.authors}
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
    </div>
  );
};

export default Home;
