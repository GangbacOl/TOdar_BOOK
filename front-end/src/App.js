import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import BookContainer from "./containers/BookContainer";
import AuthContainer from "./containers/AuthContainer";
import MainContainer from "./containers/MainContainer";
import SignUp from "./components/auth/Signup";
import BooksReadContainer from "./containers/BooksReadContainer";
import configureStore from "./store/modules/index";

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
                            <Route exact path="/signin" component={AuthContainer} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact paht="/booksRead" component={BooksReadContainer} />
                        </Switch>
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default Main;
