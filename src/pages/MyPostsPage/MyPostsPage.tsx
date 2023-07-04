import { MyPostsPagination } from "../../components/Pagination";
import MyPostsGrid from "./MyPostsGrid";
import "./MyPostsPage.css";

const MyPostsPage = () => {
  return (
    <section className="my-posts-page">
      <div className="container">
        <h1 className="my-posts-page__title">My posts</h1>
        <MyPostsGrid />
        <MyPostsPagination />
      </div>
    </section>
  );
};

export default MyPostsPage;
