import React from "react";
import { connect } from "react-redux";
import SignIn from "../components/auth/Signin";
import { setUsername, setIsLogin } from "../store/modules/user";

const AuthContainer = ({ setIsLogin, setUsername, username }) => {
    return <SignIn setIsLogin={setIsLogin} setUsername={setUsername} username={username} />;
};

const mapStateToProps = ({ username }) => ({
    username,
});

const mapDispatchToProps = { setUsername, setIsLogin };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
