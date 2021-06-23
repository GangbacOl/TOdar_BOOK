import React from "react";
import { useRecoilState } from "recoil";

import { usernameState, isLoginState } from "../atoms";
import Header from "../components/common/Header";
import SearchingArea from "../components/search/SearchingArea";

const MainPage = () => {
    const [username, setUsername] = useRecoilState(usernameState);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);

    return (
        <div className="MainPage">
            <Header setIsLogin={setIsLogin} isLogin={isLogin} username={username} setUsername={setUsername} />
            <SearchingArea isLogin={isLogin} username={username} />
        </div>
    );
};

export default MainPage;
