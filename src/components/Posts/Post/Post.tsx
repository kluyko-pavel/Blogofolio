import { IPost } from "../../../types";
import { POST_VIEWS } from "../../../constants/posts-constants";
import { getDate } from "../../../utils";
import { NavLink } from "react-router-dom";
import "./Post.css";
import { useSelector } from "react-redux";
import { IStoreState } from "../../../types";
import { THEMES } from "../../../constants/theme-constants";
import { ActionsLine } from "./ActionsLine";

const Post = ({ view, postInfo }: IPost) => {
  const theme = useSelector((state: IStoreState) => state.ui.theme);
  const { image, text, date, title } = postInfo;
  const resultDate = (
    <time className="post-date" dateTime={date}>
      {getDate(date)}
    </time>
  );

  if (view === POST_VIEWS.VIEW1)
    return (
      <div className="post-wrapper view1-wrapper">
        <div className="post-main-content view1-main-content">
          <div className="view1-post-info">
            {resultDate}
            <NavLink to={`/posts/${postInfo.id}`}>
              <h2
                className={
                  theme === THEMES.LIGHT
                    ? "post-title view1-post-info__title"
                    : "post-title dark view1-post-info__title"
                }
              >
                {title}
              </h2>
            </NavLink>
            <p className="view1-post-info__text">{text}</p>
          </div>
          <div className="view1-post-image">
            <img className="view1-post-image-img" src={image} alt="post-img" />
          </div>
        </div>
        <ActionsLine post={postInfo} />
      </div>
    );
  else if (view === POST_VIEWS.VIEW2) {
    return (
      <div className="post-wrapper  view2-wrapper">
        <div className="post-main-content view2-main-content">
          <div className="view2-post-image">
            <img className="view2-post-image-img" src={image} alt="post-img" />
          </div>
          {resultDate}
          <NavLink to={`/posts/${postInfo.id}`}>
            <h3
              className={
                theme === THEMES.LIGHT
                  ? "post-title view2-post-info__title"
                  : "post-title dark view2-post-info__title"
              }
            >
              {title}
            </h3>
          </NavLink>
        </div>
        <ActionsLine post={postInfo} />
      </div>
    );
  } else {
    return (
      <div className="post-wrapper view3-wrapper">
        <div className="post-main-content view3-main-content">
          <div className="view3-post-info">
            {resultDate}
            <NavLink to={`/posts/${postInfo.id}`}>
              <h3
                className={
                  theme === THEMES.LIGHT
                    ? "post-title view3-post-info__title"
                    : "post-title dark view3-post-info__title"
                }
              >
                {title}
              </h3>
            </NavLink>
          </div>
          <div className="view3-post-image">
            <img className="view3-post-image-img" src={image} alt="post-img" />
          </div>
        </div>
        <ActionsLine post={postInfo} />
      </div>
    );
  }
};

export default Post;
