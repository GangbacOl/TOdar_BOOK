import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import "./style/style.scss";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const register = (username, id, password) => {
        axios
            .post("http://localhost:5000/auth/signup", {
                username,
                id,
                password,
            })
            .then(() => {
                history.push("/login");
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    return (
        <div className="Register">
            <h1>TODAR BOOK</h1>
            <input type="text" placeholder="닉네임을 입력해주세요." name="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="계정을 입력해주세요." name="account" onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) register(username, email, password);
                }}
            />
            <input type="button" className="submit" value="submit" onClick={() => register(username, email, password)} />
            <Link to="/login">로그인하러 가기</Link>
            <Link to="/">메인메뉴로 돌아가기</Link>
        </div>
    );
};

export default Register;
