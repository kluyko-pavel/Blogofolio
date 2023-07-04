import { ActionsLine } from "../../components/Posts/Post/ActionsLine";
import { IPostInfo, IStoreState } from "../../types";
import { getDate } from "../../utils";
import { NavLink } from "react-router-dom";
import { THEMES } from "../../constants/theme-constants";
import { useSelector } from "react-redux";

export const SearchResPost = ({
  searchPostInfo,
}: {
  searchPostInfo: IPostInfo;
}) => {
  const { title, image, date } = searchPostInfo;
  const theme = useSelector((state: IStoreState) => state.ui.theme);

  return (
    <div className="search-post">
      <div className="search-post__content">
        <img
          className="search-post__content-img"
          src={image}
          alt="search post img"
        />
        <div className="search-post__content-info">
          <time
            className="post-date search-post__content-info-date"
            dateTime={date}
          >
            {getDate(date)}
          </time>
          <NavLink to={`/posts/${searchPostInfo.id}`}>
            <h3
              className={
                theme === THEMES.LIGHT
                  ? "search-post__content-info-title"
                  : "search-post__content-info-title dark"
              }
            >
              {title}
            </h3>
          </NavLink>
        </div>
      </div>
      <ActionsLine post={searchPostInfo} />
    </div>
  );
};
