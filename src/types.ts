import { ImageType } from "react-images-uploading";

export interface IButton {
  content: string;
  isActive: boolean;
  callback: Function;
  buttonStyle: any;
  children?: any;
}
export interface ITabArr {
  id: number;
  label: string;
  disabled?: boolean;
}
export interface IPostInfo {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  author: number;
}

export interface IPost {
  postInfo: IPostInfo;
  view: string;
}

export interface IPostsState {
  posts: IPostInfo[];
  foundPosts: IPostInfo[];
  search: string;
  myPosts: IPostInfo[];
  limit: number;
  myPostsLimit: number;
  foundPostsLimit: number;
  orderParam: string;
  selectedPost: IPostInfo;
  countOfPosts: number;
  countOfMyPosts: number;
  countOfFoundPosts: number;
  currentPage: number;
  myPostsCurrentPage: number;
  foundPostsCurrentPage: number;
}

export interface IUiState {
  theme: string;
  searchStatus: boolean;
  selectedTab: string;
  isLoading: boolean;
  modalInfo: IModal;
}

export interface IUserState {
  user: IUser;
  favorites: IPostInfo[];
  likedPosts: IPostInfo[];
  dislikedPosts: IPostInfo[];
}

export interface IBurgerMenuState {
  isVisible: boolean;
  showOrHide: Object;
}

export interface IStoreState {
  posts: IPostsState;
  ui: IUiState;
  user: IUserState;
  burgerMenu: IBurgerMenuState;
}

export interface ISearchInfo {
  limit: number;
  currentPage: number;
  orderParam?: string;
  search?: string;
}

export interface IPostsResponse {
  count: number;
  next: string;
  previous: any;
  results: IPostInfo[];
}

export interface IUserTokensResponse {
  access: string;
  refresh: string;
}

export interface IUserResponse {
  username: string;
  id: number;
  email: string;
}

export interface IUser {
  username?: string;
  email: string;
  password?: string;
  id?: number;
}

export interface IModal {
  text?: string;
  showModal: boolean;
}

export interface IActivation {
  uid: string;
  token: string;
}

export type ImageUploaderType = {
  image: ImageType;
  onChange: Function;
  onRemove: Function;
};
