import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSearchStatus } from "../../redux/action-creators";
import { IStoreState } from "../../types";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const searchStatus = useSelector(
    (state: IStoreState) => state.ui.searchStatus
  );
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    if (e.code === "Enter") {
      e.preventDefault();
      navigate("/posts/search");
      dispatch(setSearch(searchValue));
    }
  };
  const handleClose = () => {
    dispatch(setSearchStatus(false));
    setSearchValue("");
    navigate("/posts");
  };
  return (
    <form
      style={searchStatus ? { display: "flex" } : { display: "none" }}
      action="#"
      className="main-header__search-form"
      name="search-form"
      onKeyDown={handleSubmit}
    >
      <input
        className="main-header__search-input"
        type="text"
        name="search-input"
        placeholder="Search..."
        value={searchValue}
        onChange={(e: any) => setSearchValue(e.target.value)}
      />
      <button
        className="main-header__search-close-btn"
        type="button"
        onClick={handleClose}
      ></button>
    </form>
  );
};

export default SearchForm;
