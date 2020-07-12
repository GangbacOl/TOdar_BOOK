import React from "react";
import { connect } from "react-redux";
import BooksRead from "../components/book/BooksRead";

const BooksReadContainer = ({ username, isLogin }) => {
    return <BooksRead username={username} isLogin={isLogin} />;
};

const mapStateToProps = ({ username, isLogin }) => ({
    username,
    isLogin,
});

export default connect(mapStateToProps)(BooksReadContainer);
