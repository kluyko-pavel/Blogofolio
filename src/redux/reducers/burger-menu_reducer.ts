import { IBurgerMenuState } from "../../types";
import { SET_SHOW_OR_HIDE, SET_VISIBLE } from "../action-types";

const initialState = { isVisible: false, showOrHide: {} };

const burgerMenuReducer = (
  state: IBurgerMenuState = initialState,
  action: any
) => {
  switch (action.type) {
    case SET_VISIBLE: {
      const { isVisible } = action;
      return {
        ...state,
        isVisible,
      };
    }
    case SET_SHOW_OR_HIDE: {
      const { showOrHide } = action;
      return {
        ...state,
        showOrHide,
      };
    }
    default: {
      return state;
    }
  }
};

export default burgerMenuReducer;
