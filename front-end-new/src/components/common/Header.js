import React from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

import "./style/Header.scss";

const Header = ({ setIsLogin, isLogin, username, setUsername }) => {
    const handleLogout = () => {
        cookie.remove("user");
        setUsername("");
        setIsLogin(false);
        window.location.reload();
    };

    return (
        <div className="Header">
            <h1>TODAR BOOK</h1>
            <div>
                <div>
                    <Link to="/book">내 책</Link>
                    <Link to="/infomation">내 정보</Link>
                    {isLogin ? (
                        <div>
                            <span>{username}님, 안녕하세요</span>
                            <input type="button" value="로그아웃" onClick={handleLogout} />
                        </div>
                    ) : (
                        <Link to="/login">로그인 / 회원가입</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
