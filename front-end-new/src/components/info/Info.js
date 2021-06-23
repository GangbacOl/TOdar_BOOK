import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import FinishBookList from "./FinishBookList";
import MyInfo from "./MyInfo";
import "./style/Info.scss";

const Info = ({ username, isLogin }) => {
    const history = useHistory();

    useLayoutEffect(() => {
        if (isLogin) history.push("/login");
    }, []);
    return (
        <div className="Info">
            <Link to="/">메인으로</Link>
            <div className="InfoMain">
                <MyInfo username={username} />
                <FinishBookList username={username} />
            </div>
        </div>
    );
};

export default Info;
