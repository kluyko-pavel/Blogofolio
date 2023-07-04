import { IStoreState } from "../../types";
import { SearchResPost } from "./SearchResPost";
import "./SearchResPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadFoundPosts } from "../../redux/action-creators";
import { SearchPagination } from "../../components/Pagination";
import { Loader } from "../../components";

export const SearchResPage = () => {
  const limit = useSelector(
    (state: IStoreState) => state.posts.foundPostsLimit
  );
  const search = useSelector((state: IStoreState) => state.posts.search);
  const foundPosts = useSelector(
    (state: IStoreState) => state.posts.foundPosts
  );
  const currentPage = useSelector(
    (state: IStoreState) => state.posts.foundPostsCurrentPage
  );
  const isLoading = useSelector((state: IStoreState) => state.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFoundPosts({ limit, currentPage, search }));
  }, [limit, currentPage, search]);
  return isLoading ? (
    <Loader />
  ) : (
    <section className="search-page">
      <div className="container">
        <h1 className="search-page__title">Search results {search}</h1>
        <div className="search-page__posts">
          {foundPosts.length !== 0 ? (
            foundPosts.map((el) => (
              <SearchResPost key={el.id} searchPostInfo={el} />
            ))
          ) : (
            <p className="search-page__not-found">
              Unfortunately nothing was found
            </p>
          )}
        </div>
        {foundPosts.length !== 0 ? <SearchPagination /> : <></>}
      </div>
    </section>
  );
};
