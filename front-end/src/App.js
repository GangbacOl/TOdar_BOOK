import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import BookContainer from "./containers/BookContainer";
import { Bestbook } from "./components/book/best";
import AuthContainer from "./containers/AuthContainer";
import MainContainer from "./containers/MainContainer";
import { SignUp } from "./components/auth";

import { Provider } from "react-redux";
import setUserCfg from "./store/modules/user";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

class Main extends Component {
  render() {
    const persistConfig = {
      key: "root",
      storage,
    };
    const enhancedReducer = persistReducer(persistConfig, setUserCfg);
    const logger = createLogger();
    const store = createStore(enhancedReducer, applyMiddleware(logger));
    const persistor = persistStore(store);

    return (
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Switch>
              <Route exact path="/" component={MainContainer} />
              <Route exact path="/booklist" component={BookContainer} />
              <Route exact path="/bestbook" component={Bestbook} />
              <Route exact path="/signin" component={AuthContainer} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default Main;
