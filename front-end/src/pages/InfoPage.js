import React from "react";
import Info from "../components/info/Info";

const InfoPage = ({ username, isLogin }) => {
    return (
        <div className="InfoPage">
            <Info username={username} isLogin={isLogin} />
        </div>
    );
};

export default InfoPage;
