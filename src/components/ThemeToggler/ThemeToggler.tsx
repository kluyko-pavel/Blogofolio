import { THEMES } from "../../constants/theme-constants";
import { DarkThemeIcon, LightThemeIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";

import "./ThemeToggler.css";
import { setTheme } from "../../redux/action-creators";
import { IStoreState } from "../../types";

const ThemeToggler = () => {
  const theme = useSelector((state: IStoreState) => state.ui.theme);
  const dispatch = useDispatch();
  const handleTheme = (theme: string) => {
    dispatch(setTheme(theme));
  };
  return (
    <div className="theme-toggler">
      <button
        className="theme-toggler__btn"
        onClick={() => {
          handleTheme(THEMES.LIGHT);
        }}
      >
        <LightThemeIcon fill={theme === THEMES.LIGHT ? "#313037" : "#8d8e97"} />
      </button>
      <button
        className="theme-toggler__btn"
        onClick={() => {
          handleTheme(THEMES.DARK);
        }}
      >
        <DarkThemeIcon fill={theme === THEMES.LIGHT ? "#DADADA" : "#ffff"} />
      </button>
    </div>
  );
};

export default ThemeToggler;
