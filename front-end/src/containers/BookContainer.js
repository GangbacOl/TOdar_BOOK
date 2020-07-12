import React from "react";
import { connect } from "react-redux";
import BookList from "../components/book/BookList";

const BookContainer = ({ username, isLogin }) => {
    return <BookList username={username} isLogin={isLogin} />;
};

const mapStateToProps = ({ username, isLogin }) => ({
    username,
    isLogin,
});

export default connect(mapStateToProps)(BookContainer);
