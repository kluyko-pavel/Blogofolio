import { IPostInfo, IUser, IUserState } from "../../types";
import {
  DELETE_DISLIKED,
  DELETE_FAVORITES,
  DELETE_LIKED,
  SET_USER_INFO,
  TOGGLE_DISLIKE,
  TOGGLE_FAVORITES,
  TOGGLE_LIKE,
} from "../action-types";

const initialState = {
  user: {} as IUser,
  favorites: [] as IPostInfo[],
  likedPosts: [] as IPostInfo[],
  dislikedPosts: [] as IPostInfo[],
};

const getInitialState = () => {
  const localState = localStorage.getItem("localState");
  if (localState) {
    const parsed = JSON.parse(localState);
    const { user } = parsed;
    return user;
  }
  return initialState;
};

const userReducer = (state: IUserState = getInitialState(), action: any) => {
  switch (action.type) {
    case SET_USER_INFO: {
      const { user } = action;
      return {
        ...state,
        user,
      };
    }
    case TOGGLE_FAVORITES: {
      const { post } = action;
      const index = state.favorites.findIndex((el) => el.id === post.id);
      const newFavorites = [...state.favorites] || [];
      if (index === -1) {
        newFavorites.push(post);
      } else {
        newFavorites.splice(index, 1);
      }
      return {
        ...state,
        favorites: newFavorites,
      };
    }
    case DELETE_FAVORITES: {
      return {
        ...state,
        favorites: [],
      };
    }
    case TOGGLE_LIKE: {
      const { post } = action;
      const index = state.likedPosts.findIndex((el) => el.id === post.id);
      const newLikedPosts = [...state.likedPosts] || [];
      if (index === -1) {
        newLikedPosts.push(post);
      } else {
        newLikedPosts.splice(index, 1);
      }
      return {
        ...state,
        likedPosts: newLikedPosts,
      };
    }
    case TOGGLE_DISLIKE: {
      const { post } = action;
      const index = state.dislikedPosts.findIndex((el) => el.id === post.id);
      const newDislikedPosts = [...state.dislikedPosts] || [];
      if (index === -1) {
        newDislikedPosts.push(post);
      } else {
        newDislikedPosts.splice(index, 1);
      }
      return {
        ...state,
        dislikedPosts: newDislikedPosts,
      };
    }
    case DELETE_LIKED: {
      return {
        ...state,
        likedPosts: [],
      };
    }
    case DELETE_DISLIKED: {
      return {
        ...state,
        dislikedPosts: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
