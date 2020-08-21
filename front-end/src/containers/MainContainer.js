import React from "react";
import { connect } from "react-redux";
import MainPage from "../pages/MainPage";
import { setIsLogin, initializeState } from "../store/modules/user";

const MainContainer = ({ setIsLogin, isLogin, initializeState, username }) => {
    return <MainPage setIsLogin={setIsLogin} isLogin={isLogin} username={username} initializeState={initializeState} />;
};

const mapStateToProps = ({ username, isLogin }) => ({
    username,
    isLogin,
});

const mapDispatchToProps = { setIsLogin, initializeState };

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
