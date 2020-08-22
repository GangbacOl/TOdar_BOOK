import React from "react";
import { connect } from "react-redux";
import InfoPage from "../pages/InfoPage";

const InfoContainer = ({ username, isLogin }) => {
    return <InfoPage username={username} isLogin={isLogin} />;
};

const mapStateToProps = ({ username, isLogin }) => ({
    username,
    isLogin,
});

export default connect(mapStateToProps)(InfoContainer);
