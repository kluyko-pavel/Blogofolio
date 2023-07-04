import { useDispatch, useSelector } from "react-redux";
import { IPostInfo, IStoreState } from "../../../types";
import { LikeIcon, DislikeIcon, BookmarkIcon } from "../../Icons";
import {
  toggleDislike,
  toggleFavorites,
  toggleLike,
  toggleModal,
} from "../../../redux/action-creators";

export const ActionsLine = ({ post }: { post: IPostInfo }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IStoreState) => state.user.user);
  const isAuthorized = !!currentUser?.id;
  const favorites = useSelector((state: IStoreState) => state.user.favorites);
  const isFavorite = favorites.find((el) => el.id === post.id);

  const likedPosts = useSelector((state: IStoreState) => state.user.likedPosts);
  const isLiked = likedPosts.find((el) => el.id === post.id);

  const dislikedPosts = useSelector(
    (state: IStoreState) => state.user.dislikedPosts
  );
  const isDisliked = dislikedPosts.find((el) => el.id === post.id);

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
    <div className="post-actions">
      <div className="post-actions__estimation">
        <button
          className="post-actions__button post-actions__estimation-like"
          onClick={() => handleToggleLike(post)}
          onTouchEnd={() => handleToggleLike(post)}
        >
          <LikeIcon fill={isLiked ? "#5360cd" : "#4C4B5E"} />
        </button>
        <button
          className="post-actions__button post-actions__estimation-dislike"
          onClick={() => handleToggleDislike(post)}
          onTouchEnd={() => handleToggleDislike(post)}
        >
          <DislikeIcon fill={isDisliked ? "#fd3419" : "#4C4B5E"} />
        </button>
      </div>
      <div className="post-actions__other">
        <button
          className="post-actions__button post-actions__other-bookmark"
          type="button"
          onClick={() => handleAddToFavorites(post)}
          onTouchEnd={() => handleAddToFavorites(post)}
        >
          <BookmarkIcon fill={isFavorite ? "blue" : "#4C4B5E"} />
        </button>
      </div>
    </div>
  );
};
