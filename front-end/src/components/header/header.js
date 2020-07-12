import React from "react";
import cookie from "react-cookies";
import "./style/header.scss";

const Header = ({ setIsLogin, isLogin, initializeState, username }) => {
    const logout = () => {
        cookie.remove("user");
        initializeState();
        setIsLogin(false);
        window.location.reload();
    };
    return (
        <div className="header">
            <h1>TODAR BOOK</h1>
            <div>
                <a href="/book">내 책</a>
                <a href="/booksRead">내가 읽은 책</a>
                {isLogin ? (
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
