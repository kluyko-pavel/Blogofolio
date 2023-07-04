import {
  SET_COUNT_OF_FOUND_POSTS,
  SET_COUNT_OF_MY_POSTS,
  SET_COUNT_OF_POSTS,
  SET_CURRENT_PAGE,
  SET_FOUND_POSTS,
  SET_FOUND_POSTS_CURRENT_PAGE,
  SET_FOUND_POSTS_LIMIT,
  SET_LIMIT_POSTS,
  SET_MY_POSTS,
  SET_MY_POSTS_CURRENT_PAGE,
  SET_MY_POSTS_LIMIT,
  SET_ORDER_PARAM,
  SET_POSTS,
  SET_SEARCH,
  SET_SELECTED_POST,
} from "../action-types";
import { IPostInfo, IPostsState } from "../../types";

const initialState = {
  posts: [] as IPostInfo[],
  myPosts: [] as IPostInfo[],
  foundPosts: [] as IPostInfo[],
  search: "",
  limit: 15,
  myPostsLimit: 15,
  foundPostsLimit: 15,
  selectedPost: {} as IPostInfo,
  countOfPosts: 0,
  countOfMyPosts: 0,
  countOfFoundPosts: 0,
  currentPage: 1,
  myPostsCurrentPage: 1,
  foundPostsCurrentPage: 1,
  orderParam: "id",
};

const postsReducer = (state: IPostsState = initialState, action: any) => {
  switch (action.type) {
    case SET_POSTS: {
      const { posts } = action;
      return {
        ...state,
        posts,
      };
    }
    case SET_SEARCH: {
      const { search } = action;
      return {
        ...state,
        search,
      };
    }
    case SET_MY_POSTS: {
      const { myPosts } = action;
      return {
        ...state,
        myPosts,
      };
    }
    case SET_FOUND_POSTS: {
      const { foundPosts } = action;
      return {
        ...state,
        foundPosts,
      };
    }
    case SET_SELECTED_POST: {
      const { selectedPost } = action;
      return {
        ...state,
        selectedPost,
      };
    }
    case SET_COUNT_OF_POSTS: {
      const { countOfPosts } = action;
      return {
        ...state,
        countOfPosts,
      };
    }
    case SET_COUNT_OF_MY_POSTS: {
      const { countOfMyPosts } = action;
      return {
        ...state,
        countOfMyPosts,
      };
    }
    case SET_COUNT_OF_FOUND_POSTS: {
      const { countOfFoundPosts } = action;
      return {
        ...state,
        countOfFoundPosts,
      };
    }
    case SET_CURRENT_PAGE: {
      const { currentPage } = action;
      return {
        ...state,
        currentPage,
      };
    }
    case SET_MY_POSTS_CURRENT_PAGE: {
      const { myPostsCurrentPage } = action;
      return {
        ...state,
        myPostsCurrentPage,
      };
    }
    case SET_FOUND_POSTS_CURRENT_PAGE: {
      const { foundPostsCurrentPage } = action;
      return {
        ...state,
        foundPostsCurrentPage,
      };
    }
    case SET_LIMIT_POSTS: {
      const { limit } = action;
      return {
        ...state,
        limit,
      };
    }
    case SET_MY_POSTS_LIMIT: {
      const { myPostsLimit } = action;
      return {
        ...state,
        myPostsLimit,
      };
    }
    case SET_FOUND_POSTS_LIMIT: {
      const { foundPostsLimit } = action;
      return {
        ...state,
        foundPostsLimit,
      };
    }
    case SET_ORDER_PARAM: {
      const { orderParam } = action;
      return {
        ...state,
        orderParam,
      };
    }
    default: {
      return state;
    }
  }
};

export default postsReducer;
