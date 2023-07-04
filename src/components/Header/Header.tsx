import "./Header.css";
import BurgerMenu from "./BurgerMenu";
import { LogInIcon, SearchIcon } from "../Icons";
import { Username } from "../Username";
import SearchForm from "./SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../types";
import { useNavigate } from "react-router-dom";
import { setSearchStatus, toggleModal } from "../../redux/action-creators";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: IStoreState) => state.user.user);
  const isAuthorized = !!currentUser?.id;
  const userName =
    useSelector((state: IStoreState) => state.user.user.username) || "";
  const searchStatus = useSelector(
    (state: IStoreState) => state.ui.searchStatus
  );
  const handleSearch = () => {
    !searchStatus && dispatch(setSearchStatus(true));
  };
  return (
    <header className="main-header">
      <div className="main-header__inner">
        <BurgerMenu />
        <SearchForm />
        <div className="main-header__tools">
          <button
            className="main-header__search-btn"
            type="button"
            onClick={handleSearch}
          >
            <SearchIcon fill="#fff" />
          </button>
          <div className="main-header__username">
            {isAuthorized ? (
              <Username username={userName} />
            ) : (
              <button
                className="main-header__log-in-btn"
                onClick={() => navigate("/sign-in")}
              >
                <LogInIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
