import { useSelector } from "react-redux";
import { Pagination } from "../../components/Pagination";
import { PostsGrid } from "../../components/Posts";
import { Tabs } from "../../components/Tabs";
import "./MainPage.css";
import { IStoreState } from "../../types";

const MainPage = () => {
  const selectedTab = useSelector((state: IStoreState) => state.ui.selectedTab);

  return (
    <section className="main-page">
      <div className="container">
        <h1 className="main-page__title">Blog</h1>
        <Tabs />
        <PostsGrid />
        {selectedTab === "All" && <Pagination />}
      </div>
    </section>
  );
};

export default MainPage;
