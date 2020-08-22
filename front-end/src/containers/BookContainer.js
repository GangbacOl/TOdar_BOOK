import React from "react";
import { connect } from "react-redux";
import BookPage from "../pages/BookPage";

const BookContainer = ({ username, isLogin }) => {
    return <BookPage username={username} isLogin={isLogin} />;
};

const mapStateToProps = ({ username, isLogin }) => ({
    username,
    isLogin,
});

export default connect(mapStateToProps)(BookContainer);
