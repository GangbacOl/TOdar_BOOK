import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./style.scss";

const Login = ({ setIsLogin, isLogin, setUsername }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    useEffect(() => {
        if (isLogin) history.push("/");
    });
    const login = (id, password) => {
        axios
            .post(
                "http://localhost:5000/auth/signin",
                {
                    id,
                    password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                setUsername(res.data.userData.username);
                setIsLogin(true);
                history.push("/");
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    return (
        <div className="Login">
            <h1>TODAR BOOK</h1>
            <input type="text" placeholder="계정을 입력해주세요." name="account" onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) login(email, password);
                }}
            />
            <input type="button" className="submit" value="submit" onClick={() => login(email, password)} />
            <a href="/register">TODAR BOOK이 처음이세요?</a>
            <a href="/">메인메뉴로 돌아가기</a>
        </div>
    );
};

export default Login;
