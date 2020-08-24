import React from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import "./style/Header.scss";

const Header = ({ setIsLogin, isLogin, initializeState, username }) => {
    const logout = () => {
        cookie.remove("user");
        initializeState();
        setIsLogin(false);
        window.location.reload();
    };
    return (
        <div className="Header">
            <h1>TODAR BOOK</h1>
            <div>
                {isLogin ? (
                    <div>
                        <Link to="/book">내 책</Link>
                        <Link to="/booksread">내 정보</Link>
                        <div>
                            <span>{username}님, 안녕하세요</span>
                            <input type="button" value="로그아웃" onClick={() => logout()} />
                        </div>
                    </div>
                ) : (
                    <Link to="/login">로그인 / 회원가입</Link>
                )}
            </div>
        </div>
    );
};

export default Header;
