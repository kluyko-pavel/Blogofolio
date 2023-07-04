import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPostInfo, IStoreState } from "../../types";
import { THEMES } from "../../constants/theme-constants";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "../../components/Icons";
import { useParams, NavLink } from "react-router-dom";
import "./ContentPage.css";
import {
  loadSelectedPost,
  toggleDislike,
  toggleFavorites,
  toggleLike,
  toggleModal,
} from "../../redux/action-creators";

const ContentPage = () => {
  const { postId = "" } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((state: IStoreState) => state.ui.theme);
  const currentUser = useSelector((state: IStoreState) => state.user.user);
  const isAuthorized = !!currentUser?.id;
  const selectedPost = useSelector(
    (state: IStoreState) => state.posts.selectedPost
  );
  const favorites = useSelector((state: IStoreState) => state.user.favorites);
  const isFavorite = favorites.find((el) => el.id === +postId);

  const handleAddToFavorites = (post: IPostInfo) => {
    isAuthorized
      ? dispatch(toggleFavorites(post))
      : dispatch(
          toggleModal({
            showModal: true,
            text: "For this action, you need to log in!",
          })
        );
  };

  useEffect(() => {
    dispatch(loadSelectedPost(postId));
  }, []);

  const likedPosts = useSelector((state: IStoreState) => state.user.likedPosts);
  const isLiked = likedPosts.find((el) => el.id === +postId);

  const dislikedPosts = useSelector(
    (state: IStoreState) => state.user.dislikedPosts
  );
  const isDisliked = dislikedPosts.find((el) => el.id === +postId);

  const handleToggleLike = (post: IPostInfo) => {
    if (isAuthorized) {
      dispatch(toggleLike(post));
      isDisliked && dispatch(toggleDislike(post));
    } else {
      dispatch(
        toggleModal({
          showModal: true,
          text: "For this action, you need to log in!",
        })
      );
    }
  };

  const handleToggleDislike = (post: IPostInfo) => {
    if (isAuthorized) {
      dispatch(toggleDislike(post));
      isLiked && dispatch(toggleLike(post));
    } else {
      dispatch(
        toggleModal({
          showModal: true,
          text: "For this action, you need to log in!",
        })
      );
    }
  };

  return (
    <section className="content-page">
      <div className="container">
        <div className="content-page__content">
          <nav className="content-page__navigation">
            <NavLink to={"/posts"}>
              <span
                className={
                  theme === THEMES.LIGHT
                    ? "content-page__navigation-home"
                    : "content-page__navigation-home dark"
                }
              >
                Home
              </span>
            </NavLink>
            <span className="content-page__navigation-line"></span>
            <p className="content-page__navigation-post-num">
              Post {selectedPost.id}
            </p>
          </nav>
          <h1 className="content-page__title">{selectedPost.title}</h1>
          <div className="content-page__main-content">
            <img
              className="content-page__content-image"
              src={selectedPost.image}
              alt="post-img"
            />
            <p className="content-page__content-text">{selectedPost.text}</p>
            <div className="post-actions content-page__content-actions">
              <div className="post-actions__estimation">
                <button
                  className="post-actions__button post-actions__estimation-like content-page__content-actions-btn content-page__content-actions-like-btn"
                  style={{ backgroundColor: isLiked && "#5360cd" }}
                  onClick={() => handleToggleLike(selectedPost)}
                  onTouchEnd={() => handleToggleLike(selectedPost)}
                >
                  <LikeIcon fill={isLiked ? "#fff" : "#4C4B5E"} />
                </button>
                <button
                  className="post-actions__button post-actions__estimation-dislike content-page__content-actions-btn content-page__content-actions-dislike-btn"
                  style={{ backgroundColor: isDisliked && "#fd3419" }}
                  onClick={() => handleToggleDislike(selectedPost)}
                  onTouchEnd={() => handleToggleDislike(selectedPost)}
                >
                  <DislikeIcon fill={isDisliked ? "#fff" : "#4C4B5E"} />
                </button>
              </div>
              <div className="post-actions__other">
                <button
                  className="post-actions__button post-actions__other-bookmark content-page__content-actions-btn content-page__content-actions-bookmark-btn"
                  onClick={() => handleAddToFavorites(selectedPost)}
                  onTouchEnd={() => handleAddToFavorites(selectedPost)}
                >
                  <BookmarkIcon fill="#4C4B5E" />
                  <span className="content-page__content-actions-bookmark-text">
                    {isFavorite ? "Delete from favorites" : "Add to favorites"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentPage;
