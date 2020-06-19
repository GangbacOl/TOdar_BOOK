import React from "react";
import cookie from "react-cookies";
import "./style/header.scss";

const Header = ({ username, initializeState }) => {
  const checkIsLogin = () => {
    return cookie.load("user");
  };
  const logout = () => {
    cookie.remove("user");
    initializeState();
    window.location.reload(false);
  };
  console.log(username);
  return (
    <div className="header">
      <h1>TODAR BOOK</h1>
      <div>
        <a href="/booklist">내 책</a>
        <a href="/bestbook">베스트 셀러</a>
        {checkIsLogin() ? (
          <div>
            <span>{username}님, 안녕하세요</span>
            <input type="button" value="로그아웃" onClick={() => logout()} />
          </div>
        ) : (
          <a href="/signin">로그인 / 회원가입</a>
        )}
      </div>
    </div>
  );
};

export default Header;
