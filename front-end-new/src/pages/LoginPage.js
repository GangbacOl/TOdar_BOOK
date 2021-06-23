import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { usernameState, isLoginState } from "../atoms";
import Login from "../components/auth/Login";

const LoginPage = () => {
    const setUsername = useSetRecoilState(usernameState);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);

    return (
        <div className="LoginPage">
            <Login setIsLogin={setIsLogin} isLogin={isLogin} setUsername={setUsername} />
        </div>
    );
};

export default LoginPage;
