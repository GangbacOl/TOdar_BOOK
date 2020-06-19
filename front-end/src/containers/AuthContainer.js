import React from "react";
import { connect } from "react-redux";
import Signin from "../components/auth/signin";
import { setUsername } from "../store/modules/user";

const AuthContainer = ({ setUsername, username }) => {
  return <Signin username={username} setUsername={setUsername} />;
};

const mapStateToProps = ({ username }) => ({
  username,
});

const mapDispatchToProps = { setUsername };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
