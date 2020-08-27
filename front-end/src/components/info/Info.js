import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import FinishBookList from "./FinishBookList";
import MyInfo from "./MyInfo";
import "./style/Info.scss";

const Info = ({ username, isLogin }) => {
    const history = useHistory();

    return (
        <div className="Info">
            <Link to="/">메인으로</Link>
            {isLogin ? (
                <div className="InfoMain">
                    <MyInfo username={username} />
                    <FinishBookList username={username} />
                </div>
            ) : (
                history.push("/login")
            )}
        </div>
    );
};

export default Info;
