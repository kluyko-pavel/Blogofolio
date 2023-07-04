import { put, takeEvery } from "redux-saga/effects";
import {
  IActivation,
  IPostInfo,
  IUser,
  IUserResponse,
  IUserTokensResponse,
} from "../../types";
import {
  DELETE_DISLIKED,
  DELETE_FAVORITES,
  DELETE_LIKED,
  GET_USER_INFO,
  SET_USER_INFO,
  SIGN_IN,
  SIGN_UP,
  SIGN_UP_ACTIVATION,
  TOGGLE_DISLIKE,
  TOGGLE_FAVORITES,
  TOGGLE_LIKE,
} from "../action-types";
import { getAccessToken } from "../../utils";
import { toggleLoading, toggleModal } from "./ui-action_creators";

export const signUp = (user: IUser) => ({
  type: SIGN_UP,
  user,
});

export const toggleFavorites = (post: IPostInfo) => ({
  type: TOGGLE_FAVORITES,
  post,
});

export const toggleLike = (post: IPostInfo) => ({
  type: TOGGLE_LIKE,
  post,
});

export const toggleDislike = (post: IPostInfo) => ({
  type: TOGGLE_DISLIKE,
  post,
});

export const deleteFavorites = () => ({
  type: DELETE_FAVORITES,
});

export const deleteLiked = () => ({
  type: DELETE_LIKED,
});

export const deleteDisliked = () => ({
  type: DELETE_DISLIKED,
});

export const signIn = (user: IUser) => ({
  type: SIGN_IN,
  user,
});

export const getUserInfo = () => ({
  type: GET_USER_INFO,
});

export const setUserInfo = (user: IUser) => ({
  type: SET_USER_INFO,
  user,
});

export const signUpActivation = (activationData: IActivation) => ({
  type: SIGN_UP_ACTIVATION,
  activationData,
});

function* fetchActivation(action: any) {
  yield put(toggleLoading(true));
  const resp: Response = yield fetch(
    "https://studapi.teachmeskills.by/auth/users/activation/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.activationData),
    }
  );
  if (resp.status === 204) {
    window.location.pathname = "/sign-up/reg-success";
  }
  yield put(toggleLoading(false));
}

function* fetchSignUp(action: any) {
  yield put(toggleLoading(true));
  const { user } = action;
  const resp: Response = yield fetch(
    "https://studapi.teachmeskills.by/auth/users/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  if (resp.status === 201) {
    window.location.pathname = "/sign-up/reg-confirm";
  } else {
    const res: {} = yield resp.json();
    yield put(
      toggleModal({
        showModal: true,
        text: `${Object.values(res).join("\n")}`,
      })
    );
  }
  yield put(toggleLoading(false));
}

function* fetchSignIn(action: any) {
  yield put(toggleLoading(true));

  const { user } = action;
  const resp: Response = yield fetch(
    "https://studapi.teachmeskills.by/auth/jwt/create/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  if (resp.status === 200) {
    const res: IUserTokensResponse = yield resp.json();
    localStorage.setItem("accessToken", res.access);
    localStorage.setItem("refreshToken", res.refresh);
    yield put(getUserInfo());
  } else {
    const res: {} = yield resp.json();
    yield put(
      toggleModal({
        showModal: true,
        text: `${Object.values(res).join("\n")}`,
      })
    );
  }
  yield put(toggleLoading(false));
}

function* fetchGetUserInfo() {
  try {
    const token: string = yield getAccessToken();
    const resp: Response = yield fetch(
      "https://studapi.teachmeskills.by/auth/users/me/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res: IUserResponse = yield resp.json();
    yield put(setUserInfo(res));
    window.location.pathname = "/posts";
  } catch (error) {
    console.warn(error);
  }
}

export function* watcherUser() {
  yield takeEvery(SIGN_UP, fetchSignUp);
  yield takeEvery(SIGN_IN, fetchSignIn);
  yield takeEvery(SIGN_UP_ACTIVATION, fetchActivation);
  yield takeEvery(GET_USER_INFO, fetchGetUserInfo);
}
