import React from "react";
import { connect } from "react-redux";
import BooksRead from "../components/book/BooksRead";

const BooksReadContainer = ({ username }) => {
    return <BooksRead username={username} />;
};

const mapStateToProps = ({ username }) => ({
    username,
});

export default connect(mapStateToProps)(BooksReadContainer);
