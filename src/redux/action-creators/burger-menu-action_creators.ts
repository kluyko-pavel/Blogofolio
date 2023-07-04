import { SET_SHOW_OR_HIDE, SET_VISIBLE } from "../action-types";

export const setVisible = (isVisible: boolean) => ({
  type: SET_VISIBLE,
  isVisible,
});

export const setShowOrHide = (showOrHide: Object) => ({
  type: SET_SHOW_OR_HIDE,
  showOrHide,
});
