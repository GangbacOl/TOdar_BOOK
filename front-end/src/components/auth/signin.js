import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./style.scss";

const SignIn = ({ setIsLogin, setUsername, username }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const signIn = (id, password) => {
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
        <div className="signin-wrapper">
            <div className="signin">
                <h1>TODAR BOOK</h1>
                <input type="text" placeholder="계정을 입력해주세요." name="account" onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) signIn(email, password);
                    }}
                />
                <input type="button" className="submit" value="submit" onClick={() => signIn(email, password)} />
                <a href="/signup">TODAR BOOK이 처음이세요?</a>
                <a href="/">메인메뉴로 돌아가기</a>
            </div>
        </div>
    );
};

export default SignIn;
