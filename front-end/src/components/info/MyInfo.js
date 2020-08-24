import React, { useState, useEffect } from "react";
import axios from "axios";

const MyInfo = ({ username }) => {
    const [numberOfBooks, setNumberOfBooks] = useState(0);
    useEffect(() => {
        axios
            .post("http://localhost:5000/books/countNmbrBooksRead", { username }, { withCredentials: true })
            .then((res) => setNumberOfBooks(res.data.numberOfBooks));
    });
    return (
        <div className="MyInfo">
            <h1>GangbacOl</h1>
            <hr />
            <span>
                읽은 책: <b>{numberOfBooks}권</b>
            </span>
            <span>
                가입 일: <b>34일</b>
            </span>
        </div>
    );
};

export default MyInfo;
