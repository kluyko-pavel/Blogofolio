import { useDispatch, useSelector } from "react-redux";
import { IStoreState, IUser } from "../../types";
import { ThemeToggler } from "../ThemeToggler";
import { Username } from "../Username";
import { THEMES } from "../../constants/theme-constants";
import { NavLink, useNavigate } from "react-router-dom";
import {
  deleteDisliked,
  deleteFavorites,
  deleteLiked,
  setMyPosts,
  setShowOrHide,
  setUserInfo,
  setVisible,
} from "../../redux/action-creators";
import { LogInIcon } from "../Icons";
import { useClickOutside } from "../../utils";
import { useRef } from "react";

const BurgerMenu = () => {
  const refMenu = useRef<any>();
  const refMenuBtn = useRef<any>();
  const navigate = useNavigate();
  const currentUser = useSelector((state: IStoreState) => state.user.user);
  const isAuthorized = !!currentUser?.id;
  const theme = useSelector((state: IStoreState) => state.ui.theme);
  const userName =
    useSelector((state: IStoreState) => state.user.user.username) || "";
  const isVisible = useSelector(
    (state: IStoreState) => state.burgerMenu.isVisible
  );
  const showOrHide = useSelector(
    (state: IStoreState) => state.burgerMenu.showOrHide
  );
  const dispatch = useDispatch();

  const handlerToggleMenu = () => {
    dispatch(setVisible(!isVisible));
    isVisible
      ? dispatch(setShowOrHide({}))
      : dispatch(setShowOrHide({ visibility: "visible" }));
  };

  const handleLogOut = () => {
    dispatch(setUserInfo({} as IUser));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(deleteFavorites());
    dispatch(deleteLiked());
    dispatch(deleteDisliked());
    dispatch(setMyPosts([]));
    navigate("/sign-in");
  };

  const handleClickOutside = (e: any) => {
    if (refMenuBtn.current.contains(e.target)) {
      return;
    } else {
      dispatch(setVisible(false));
      dispatch(setShowOrHide({}));
    }
  };

  useClickOutside(refMenu, handleClickOutside);

  return (
    <>
      <button
        className={
          isVisible
            ? "main-header__menu-btn close-burger"
            : "main-header__menu-btn"
        }
        onClick={handlerToggleMenu}
        ref={refMenuBtn}
      >
        <span className="main-header__menu-btn-line "></span>
      </button>
      <ul
        className={
          isVisible
            ? theme === THEMES.LIGHT
              ? "main-header__menu active"
              : "main-header__menu active dark"
            : "main-header__menu"
        }
        ref={refMenu}
        style={showOrHide}
      >
        <NavLink to={isAuthorized ? "/posts" : "/sign-in"}>
          <li className="main-header__menu-link main-header__menu-link-username">
            <div className="main-header__menu-link-username-logo">
              {isAuthorized ? (
                <Username username={userName} />
              ) : (
                <div className="main-header__log-in-btn main-header__menu-link-username-logo">
                  <LogInIcon />
                </div>
              )}
            </div>
          </li>
        </NavLink>
        <NavLink to="/posts">
          <li
            className={
              theme === THEMES.LIGHT
                ? "main-header__menu-link"
                : "main-header__menu-link dark"
            }
          >
            <span>Home</span>
          </li>
        </NavLink>
        <NavLink to="/posts/addPost">
          <li
            className={
              theme === THEMES.LIGHT
                ? "main-header__menu-link"
                : "main-header__menu-link dark"
            }
          >
            <span>Add post</span>
          </li>
        </NavLink>
        <NavLink to={"/posts/myPosts"}>
          <li
            className={
              theme === THEMES.LIGHT
                ? "main-header__menu-link"
                : "main-header__menu-link dark"
            }
          >
            <span>My posts</span>
          </li>
        </NavLink>
        <li>
          <ThemeToggler />
        </li>
        <li
          className="main-header__menu-link main-header__menu-link-log-out"
          onClick={isAuthorized ? handleLogOut : () => navigate("/sign-in")}
        >
          <span className="main-header__menu-log-out">
            {isAuthorized ? "Log Out" : "Log in"}
          </span>
        </li>
      </ul>
    </>
  );
};

export default BurgerMenu;
