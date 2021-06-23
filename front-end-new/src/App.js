import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";

import BookPage from "./pages/BookPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import InfoPage from "./pages/InfoPage";

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <RecoilRoot>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/book" component={BookPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact paht="/infomation" component={InfoPage} />
                    </Switch>
                </RecoilRoot>
            </BrowserRouter>
        );
    }
}

export default Main;
