import { createStore } from "redux";
import user from "./user";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const enhancedReducer = persistReducer(persistConfig, user);

export default function configureStore() {
  const store = createStore(enhancedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}
