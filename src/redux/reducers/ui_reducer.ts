import { THEMES } from "../../constants/theme-constants";
import { IUiState } from "../../types";
import {
  SET_SEARCH_STATUS,
  SET_THEME,
  TOGGLE_LOADING,
  TOGGLE_MODAL,
  TOGGLE_TOOLBAR,
} from "../action-types";

const initialState = {
  theme: THEMES.LIGHT,
  searchStatus: false,
  selectedTab: "All",
  isLoading: false,
  modalInfo: {
    text: "",
    showModal: false,
  },
};

const getInitialState = () => {
  const localState = localStorage.getItem("localState");
  if (localState) {
    const parsed = JSON.parse(localState);
    const { ui } = parsed;
    return ui;
  }
  return initialState;
};

const uiReducer = (state: IUiState = getInitialState(), action: any) => {
  switch (action.type) {
    case SET_THEME: {
      const { theme } = action;
      return {
        ...state,
        theme,
      };
    }
    case SET_SEARCH_STATUS: {
      const { searchStatus } = action;
      return {
        ...state,
        searchStatus,
      };
    }
    case TOGGLE_MODAL: {
      const { modalInfo } = action;
      return {
        ...state,
        modalInfo,
      };
    }
    case TOGGLE_TOOLBAR: {
      const { tab } = action;
      return {
        ...state,
        selectedTab: tab,
      };
    }
    case TOGGLE_LOADING: {
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    }
    default: {
      return state;
    }
  }
};

export default uiReducer;
