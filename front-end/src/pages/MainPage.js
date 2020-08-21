import React from "react";
import Header from "../components/header/Header";
import SearchingArea from "../components/search/SearchingArea";

const MainPage = ({ setIsLogin, isLogin, initializeState, username }) => {
    return (
        <div className="MainPage">
            <Header setIsLogin={setIsLogin} isLogin={isLogin} initializeState={initializeState} username={username} />
            <SearchingArea isLogin={isLogin} username={username} />
        </div>
    );
};

export default MainPage;
