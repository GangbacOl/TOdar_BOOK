import React from "react";
import { connect } from "react-redux";
import Home from "../components/searching/Home";
import { initializeState } from "../store/modules/user";

const MainContainer = ({ username, initializeState }) => {
    return <Home username={username} initializeState={initializeState} />;
};

const mapStateToProps = ({ username }) => ({
    username,
});

const mapDispatchToProps = { initializeState };

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
