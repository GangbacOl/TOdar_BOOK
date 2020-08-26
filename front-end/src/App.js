import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import BookContainer from "./containers/BookContainer";
import AuthContainer from "./containers/AuthContainer";
import MainContainer from "./containers/MainContainer";
import RegisterPage from "./pages/RegisterPage";
import InfoContainer from "./containers/InfoContainer";
import configureStore from "./store/index";

class Main extends Component {
    render() {
        const { store, persistor } = configureStore();
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Switch>
                            <Route exact path="/" component={MainContainer} />
                            <Route exact path="/book" component={BookContainer} />
                            <Route exact path="/login" component={AuthContainer} />
                            <Route exact path="/register" component={RegisterPage} />
                            <Route exact paht="/booksRead" component={InfoContainer} />
                        </Switch>
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default Main;
