import React, { useState, useEffect } from "react";
import axios from "axios";

const MyInfo = ({ username }) => {
    const [nmbrBooksRead, setNumberOfBooks] = useState(0);
    const [nmbrJoinDays, setNmbrJoinDays] = useState(0);
    useEffect(() => {
        axios
            .post("http://localhost:5000/books/countNmbrBooksRead", { username }, { withCredentials: true })
            .then((res) => setNumberOfBooks(res.data.nmbrBooksRead));
        axios
            .post("http://localhost:5000/user/countNmbrJoinDays", { username }, { withCredentials: true })
            .then((res) => setNmbrJoinDays(res.data.nmbrJoinDays));
    });
    return (
        <div className="MyInfo">
            <h1>{username}</h1>
            <hr />
            <span>
                읽은 책: <b>{nmbrBooksRead}권</b>
            </span>
            <span>
                가입 일: <b>{nmbrJoinDays}일</b>
            </span>
        </div>
    );
};

export default MyInfo;
