import React from "react";
import { connect } from "react-redux";
import BookList from "../components/book/BookList";

const BookContainer = ({ username }) => {
  return <BookList username={username} />;
};

const mapStateToProps = ({ username }) => ({
  username,
});

export default connect(mapStateToProps)(BookContainer);
