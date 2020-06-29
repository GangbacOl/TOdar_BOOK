import React from "react";
import { connect } from "react-redux";
import SignIn from "../components/auth/SignIn";
import { setUsername } from "../store/modules/user";

const AuthContainer = ({ setUsername, username }) => {
  return <SignIn username={username} setUsername={setUsername} />;
};

const mapStateToProps = ({ username }) => ({
  username,
});

const mapDispatchToProps = { setUsername };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
