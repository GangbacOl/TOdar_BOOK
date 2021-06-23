import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import setUserCfg from "./modules/user";

const persistConfig = {
    key: "root",
    storage,
};
const enhancedReducer = persistReducer(persistConfig, setUserCfg);
const logger = createLogger();

export default function configureStore() {
    const store = createStore(enhancedReducer, applyMiddleware(logger));
    const persistor = persistStore(store);
    return { store, persistor };
}
