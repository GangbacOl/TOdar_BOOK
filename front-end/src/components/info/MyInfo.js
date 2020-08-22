import React from "react";
import axios from "axios";

const MyInfo = ({ username }) => {
    return (
        <div className="MyInfo">
            <h1>GangbacOl</h1>
            <hr />
            <span>
                읽은 책: <b>10권</b>
            </span>
            <span>
                가입 일: <b>34일</b>
            </span>
        </div>
    );
};

export default MyInfo;
