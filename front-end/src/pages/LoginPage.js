import React from "react";
import Login from "../components/auth/Login";

const LoginPage = ({ setIsLogin, isLogin, setUsername }) => {
    return (
        <div className="LoginPage">
            <Login setIsLogin={setIsLogin} isLogin={isLogin} setUsername={setUsername} />
        </div>
    );
};

export default LoginPage;
