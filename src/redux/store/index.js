import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to AsyncStorage for react-native
import thunk from "redux-thunk";

import reducers from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "likes",
    "dislikes",
    "likeStatus",
    "vehicleStatus",
    "onboardingStatus",
    "swipe",
    "vehicles",
    "locale"
  ] // only likes, dislikes, likeStatus... will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = createStore(
    persistedReducer,
    {}, // default state of application
    compose(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
