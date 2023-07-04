import { IModal } from "../../types";
import {
  SET_SEARCH_STATUS,
  SET_THEME,
  TOGGLE_LOADING,
  TOGGLE_MODAL,
  TOGGLE_TOOLBAR,
} from "../action-types";

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  theme,
});
export const setSearchStatus = (searchStatus: boolean) => ({
  type: SET_SEARCH_STATUS,
  searchStatus,
});
export const toggleToolbar = (tab: string) => ({
  type: TOGGLE_TOOLBAR,
  tab,
});
export const toggleLoading = (isLoading: boolean) => ({
  type: TOGGLE_LOADING,
  isLoading,
});
export const toggleModal = (modalInfo: IModal) => ({
  type: TOGGLE_MODAL,
  modalInfo,
});
