import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../types";
import { setMyPostsCurrentPage } from "../../redux/action-creators";
import { LeftArrowIcon } from "../Icons/LeftArrowIcon";
import { THEMES } from "../../constants/theme-constants";
import { SelectCountOfMyPosts } from "../SelectCountOfPosts";
import { RightArrowIcon } from "../Icons/RightArrowIcon";
import { useState } from "react";

const MyPostsPagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: IStoreState) => state.posts.myPostsCurrentPage
  );
  const countOfPosts = useSelector(
    (state: IStoreState) => state.posts.countOfMyPosts
  );
  const limit = useSelector((state: IStoreState) => state.posts.myPostsLimit);
  const theme = useSelector((state: IStoreState) => state.ui.theme);

  const pageNumsArr = [];
  for (let i = 1; i <= Math.ceil(countOfPosts / limit); i++) {
    pageNumsArr.push(i);
  }

  const [pageNumberLimit] = useState(4);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  const handlerSetCurrentPage = (currentPage: number) => {
    dispatch(setMyPostsCurrentPage(currentPage));
    if (currentPage === 1) {
      setMinPageNumberLimit(1);
      setMaxPageNumberLimit(pageNumberLimit);
    } else if (currentPage === pageNumsArr.length) {
      setMinPageNumberLimit(pageNumsArr.length - (pageNumberLimit - 1));
      setMaxPageNumberLimit(pageNumsArr.length);
    }
  };

  const handleSwitchNextPage = () => {
    dispatch(setMyPostsCurrentPage(currentPage + 1));
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handleSwitchPrevPage = () => {
    dispatch(setMyPostsCurrentPage(currentPage - 1));
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleSwitchMaxPageNumber = () => {
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  };
  const handleSwitchMinPageNumber = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };

  const PageIncrementBtn = () => {
    return pageNumsArr.length > maxPageNumberLimit ? (
      <button
        className="pagination__nums-num"
        onClick={handleSwitchMaxPageNumber}
      >
        ...
      </button>
    ) : null;
  };

  const PageDecrementBtn = () => {
    return minPageNumberLimit > 1 ? (
      <button
        className="pagination__nums-num"
        onClick={handleSwitchMinPageNumber}
      >
        ...
      </button>
    ) : null;
  };

  return (
    <div className="pagination">
      <button
        className="pagination__btn pagination__prev-btn"
        disabled={currentPage === 1}
        onClick={handleSwitchPrevPage}
        type="button"
      >
        <LeftArrowIcon fill={theme === THEMES.LIGHT ? "#313037" : "#ffff"} />
        <span
          className={
            theme === THEMES.LIGHT
              ? "pagination__prev-btn-text"
              : "pagination__prev-btn-text dark"
          }
        >
          Prev
        </span>
      </button>

      <SelectCountOfMyPosts />
      <div className="pagination__nums">
        {minPageNumberLimit > 1 && minPageNumberLimit !== 1 ? (
          <button
            className={
              currentPage === 1
                ? "pagination__nums-num active"
                : "pagination__nums-num"
            }
            type="button"
            onClick={() => handlerSetCurrentPage(1)}
          >
            1
          </button>
        ) : null}
        <PageDecrementBtn />
        {pageNumsArr.map((el) =>
          el <= maxPageNumberLimit && el >= minPageNumberLimit ? (
            <button
              key={el}
              className={
                el === currentPage
                  ? "pagination__nums-num active"
                  : "pagination__nums-num"
              }
              onClick={() => handlerSetCurrentPage(el)}
            >
              {el}
            </button>
          ) : null
        )}
        <PageIncrementBtn />
        {maxPageNumberLimit !== pageNumsArr.length &&
        maxPageNumberLimit < pageNumsArr.length ? (
          <button
            className={
              currentPage === pageNumsArr.length
                ? "pagination__nums-num active"
                : "pagination__nums-num"
            }
            type="button"
            onClick={() => handlerSetCurrentPage(pageNumsArr.length)}
          >
            {pageNumsArr.length}
          </button>
        ) : null}
      </div>
      <button
        className="pagination__btn pagination__next-btn"
        disabled={currentPage === Math.ceil(countOfPosts / limit)}
        onClick={handleSwitchNextPage}
        type="button"
      >
        <span
          className={
            theme === THEMES.LIGHT
              ? "pagination__next-btn-text"
              : "pagination__next-btn-text dark"
          }
        >
          Next
        </span>
        <RightArrowIcon fill={theme === THEMES.LIGHT ? "#313037" : "#ffff"} />
      </button>
    </div>
  );
};

export default MyPostsPagination;
