import React from "react";
import { connect } from "react-redux";
import LoginPage from "../pages/LoginPage";
import { setUsername, setIsLogin } from "../store/modules/user";

const AuthContainer = ({ setIsLogin, isLogin, setUsername, username }) => {
    return <LoginPage setIsLogin={setIsLogin} isLogin={isLogin} setUsername={setUsername} username={username} />;
};

const mapStateToProps = ({ username, isLogin }) => ({
    username,
    isLogin,
});

const mapDispatchToProps = { setUsername, setIsLogin };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
