import React from "react";
import MyInfo from "../components/info/MyInfo";
import FinishBookList from "../components/info/FinishBookList";

const InfoPage = ({ username, isLogin }) => {
    return (
        <div className="InfoPage">
            <MyInfo username={username} />
            <FinishBookList username={username} isLogin={isLogin} />
        </div>
    );
};

export default InfoPage;
