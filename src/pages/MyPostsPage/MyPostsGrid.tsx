import { useDispatch, useSelector } from "react-redux";
import { IPostInfo, IStoreState } from "../../types";
import { useEffect } from "react";
import { loadMyPosts } from "../../redux/action-creators";
import { getSplitted } from "../../utils";
import PostsRow from "../../components/Posts/PostsGrid/PostsRow";
import { Loader } from "../../components";

const MyPostsGrid = () => {
  const myPosts = useSelector((state: IStoreState) => state.posts.myPosts);
  const limit = useSelector((state: IStoreState) => state.posts.myPostsLimit);
  const isLoading = useSelector((state: IStoreState) => state.ui.isLoading);
  const currentPage = useSelector(
    (state: IStoreState) => state.posts.myPostsCurrentPage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyPosts({ limit, currentPage }));
  }, [limit, currentPage]);

  const splittedArrs = getSplitted(myPosts);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="posts-grid">
        {splittedArrs.map((el: IPostInfo[]) => (
          <PostsRow key={el[0].id} arr={el} />
        ))}
      </div>
    </div>
  );
};
export default MyPostsGrid;
