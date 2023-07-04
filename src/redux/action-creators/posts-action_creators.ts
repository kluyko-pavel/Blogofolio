import { IPostInfo, IPostsResponse, ISearchInfo } from "../../types";
import { getAccessToken } from "../../utils";
import {
  LOAD_SELECTED_POST,
  LOAD_POSTS,
  SET_COUNT_OF_POSTS,
  SET_CURRENT_PAGE,
  SET_LIMIT_POSTS,
  SET_POSTS,
  SET_SELECTED_POST,
  SET_ORDER_PARAM,
  ADD_POST,
  LOAD_MY_POSTS,
  SET_COUNT_OF_MY_POSTS,
  SET_MY_POSTS,
  SET_MY_POSTS_CURRENT_PAGE,
  SET_MY_POSTS_LIMIT,
  SET_SEARCH,
  SET_FOUND_POSTS,
  LOAD_FOUND_POSTS,
  SET_COUNT_OF_FOUND_POSTS,
  SET_FOUND_POSTS_LIMIT,
  SET_FOUND_POSTS_CURRENT_PAGE,
} from "../action-types";
import { takeEvery, put } from "redux-saga/effects";
import { toggleLoading } from "./ui-action_creators";

export const setPosts = (posts: IPostInfo[]) => ({
  type: SET_POSTS,
  posts,
});

export const setMyPosts = (myPosts: IPostInfo[]) => ({
  type: SET_MY_POSTS,
  myPosts,
});

export const setFoundPosts = (foundPosts: IPostInfo[]) => ({
  type: SET_FOUND_POSTS,
  foundPosts,
});

export const setSelectedPost = (selectedPost: IPostInfo) => ({
  type: SET_SELECTED_POST,
  selectedPost,
});

export const loadSelectedPost = (id: string) => ({
  type: LOAD_SELECTED_POST,
  id,
});

export const loadPosts = (searchInfo: ISearchInfo) => ({
  type: LOAD_POSTS,
  searchInfo,
});

export const loadMyPosts = (searchInfo: ISearchInfo) => ({
  type: LOAD_MY_POSTS,
  searchInfo,
});

export const loadFoundPosts = (searchInfo: ISearchInfo) => ({
  type: LOAD_FOUND_POSTS,
  searchInfo,
});

export const setCountOfPosts = (countOfPosts: number) => ({
  type: SET_COUNT_OF_POSTS,
  countOfPosts,
});

export const setCountOfMyPosts = (countOfMyPosts: number) => ({
  type: SET_COUNT_OF_MY_POSTS,
  countOfMyPosts,
});

export const setCountOfFoundPosts = (countOfFoundPosts: number) => ({
  type: SET_COUNT_OF_FOUND_POSTS,
  countOfFoundPosts,
});

export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setMyPostsCurrentPage = (myPostsCurrentPage: number) => ({
  type: SET_MY_POSTS_CURRENT_PAGE,
  myPostsCurrentPage,
});

export const setFoundPostsCurrentPage = (foundPostsCurrentPage: number) => ({
  type: SET_FOUND_POSTS_CURRENT_PAGE,
  foundPostsCurrentPage,
});

export const setLimitPosts = (limit: number) => ({
  type: SET_LIMIT_POSTS,
  limit,
});

export const setSearch = (search: string) => ({
  type: SET_SEARCH,
  search,
});

export const setMyPostsLimit = (myPostsLimit: number) => ({
  type: SET_MY_POSTS_LIMIT,
  myPostsLimit,
});

export const setFoundPostsLimit = (foundPostsLimit: number) => ({
  type: SET_FOUND_POSTS_LIMIT,
  foundPostsLimit,
});

export const setOrderParam = (orderParam: string) => ({
  type: SET_ORDER_PARAM,
  orderParam,
});

export const addPost = (postInfo: any) => ({
  type: ADD_POST,
  postInfo,
});

function* fetchPosts(action: any) {
  yield put(toggleLoading(true));
  try {
    const { limit, currentPage, orderParam } = action.searchInfo;
    const resp: Response = yield fetch(
      `https://studapi.teachmeskills.by/blog/posts/?limit=${limit}&offset=${
        (currentPage - 1) * limit
      }&ordering=${orderParam}`
    );
    const res: IPostsResponse = yield resp.json();
    yield put(setPosts(res.results));
    yield put(setCountOfPosts(res.count));
  } catch (error) {
    console.warn(error);
  } finally {
    yield put(toggleLoading(false));
  }
}

function* fetchMyPosts(action: any) {
  yield put(toggleLoading(true));
  try {
    const token: string = yield getAccessToken();
    const { limit, currentPage } = action.searchInfo;
    const resp: Response = yield fetch(
      `https://studapi.teachmeskills.by/blog/posts/my_posts/?limit=${limit}&offset=${
        (currentPage - 1) * limit
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res: IPostsResponse = yield resp.json();
    yield put(setMyPosts(res.results));
    yield put(setCountOfMyPosts(res.count));
  } catch (error) {
    console.warn(error);
  } finally {
    yield put(toggleLoading(false));
  }
}

function* fetchFoundPosts(action: any) {
  yield put(toggleLoading(true));
  try {
    const { limit, currentPage, search } = action.searchInfo;
    const resp: Response = yield fetch(
      `https://studapi.teachmeskills.by/blog/posts/?limit=${limit}&offset=${
        (currentPage - 1) * limit
      }&search=${search}`,
      {
        method: "GET",
      }
    );
    const res: IPostsResponse = yield resp.json();
    yield put(setFoundPosts(res.results));
    yield put(setCountOfFoundPosts(res.count));
  } catch (error) {
    console.warn(error);
  } finally {
    yield put(toggleLoading(false));
  }
}

function* fetchSelectedPost(action: any) {
  yield put(toggleLoading(true));
  try {
    const { id } = action;
    const resp: Response = yield fetch(
      `https://studapi.teachmeskills.by/blog/posts/${id}/`
    );
    const res: IPostInfo = yield resp.json();
    yield put(setSelectedPost(res));
  } catch (error) {
    console.warn(error);
  } finally {
    yield put(toggleLoading(false));
  }
}

function* fetchAddPost(action: any) {
  yield put(toggleLoading(true));
  const token: string = yield getAccessToken();
  const { postInfo } = action;
  const formData = new FormData();
  Object.entries(postInfo).forEach(([key, value]) =>
    formData.append(key, value as any)
  );
  const resp: Response = yield fetch(
    `https://studapi.teachmeskills.by/blog/posts/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  if (resp.status === 201) {
    const res: IPostInfo = yield resp.json();
    window.location.pathname = `/posts/${res.id}`;
  }
  yield put(toggleLoading(false));
}

export function* watcherPost() {
  yield takeEvery(LOAD_POSTS, fetchPosts);
  yield takeEvery(LOAD_MY_POSTS, fetchMyPosts);
  yield takeEvery(LOAD_FOUND_POSTS, fetchFoundPosts);
  yield takeEvery(LOAD_SELECTED_POST, fetchSelectedPost);
  yield takeEvery(ADD_POST, fetchAddPost);
}
