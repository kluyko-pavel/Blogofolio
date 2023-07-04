import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  burgerMenuReducer,
  postsReducer,
  uiReducer,
  userReducer,
} from "./reducers";

import createSagaMiddleware from "redux-saga";
import { watcherPost } from "./action-creators/posts-action_creators";
import { all } from "redux-saga/effects";
import { watcherUser } from "./action-creators";

const sagaMiddleware = createSagaMiddleware();
function* rootSaga() {
  yield all([watcherPost(), watcherUser()]);
}

const store = createStore(
  combineReducers({
    posts: postsReducer,
    ui: uiReducer,
    user: userReducer,
    burgerMenu: burgerMenuReducer,
  }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

const handleChange = () => {
  localStorage.setItem("localState", JSON.stringify(store.getState()));
};

store.subscribe(() => handleChange());

export default store;
