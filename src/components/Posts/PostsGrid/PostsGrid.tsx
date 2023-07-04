import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IPostInfo, IStoreState } from "../../../types";
import { getSplitted } from "../../../utils";
import PostsRow from "./PostsRow";

import "./PostsGrid.css";
import { loadPosts } from "../../../redux/action-creators";
import { Loader } from "../../Loader";

const PostsGrid = () => {
  const selectedTab = useSelector((state: IStoreState) => state.ui.selectedTab);
  const favorites = useSelector((state: IStoreState) => state.user.favorites);
  const posts = useSelector((state: IStoreState) => state.posts.posts);
  const limit = useSelector((state: IStoreState) => state.posts.limit);
  const currentUser = useSelector((state: IStoreState) => state.user.user);
  const isAuthorized = !!currentUser?.id;
  const isLoading = useSelector((state: IStoreState) => state.ui.isLoading);
  const orderParam = useSelector(
    (state: IStoreState) => state.posts.orderParam
  );
  const currentPage = useSelector(
    (state: IStoreState) => state.posts.currentPage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts({ limit, currentPage, orderParam }));
  }, [limit, currentPage, orderParam]);

  const splittedArrs = getSplitted(selectedTab === "All" ? posts : favorites);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="posts-grid">
        {selectedTab === "All" ? (
          splittedArrs.map((el: IPostInfo[]) => (
            <PostsRow key={el[0].id} arr={el} />
          ))
        ) : isAuthorized ? (
          favorites.length ? (
            splittedArrs.map((el: IPostInfo[]) => (
              <PostsRow key={el[0].id} arr={el} />
            ))
          ) : (
            <p className="empty-favorites">It's still empty here...</p>
          )
        ) : (
          <p className="empty-favorites">
            Please, log in to view your favorites
          </p>
        )}
      </div>
    </div>
  );
};
export default PostsGrid;
