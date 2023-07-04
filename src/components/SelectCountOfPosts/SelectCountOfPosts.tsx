import { useDispatch } from "react-redux";
import "./SelectCountOfPosts.css";
import { setLimitPosts } from "../../redux/action-creators";

export const SelectCountOfPosts = () => {
  const dispatch = useDispatch();

  const handlerSwitchNumPosts = (e: any) => {
    dispatch(setLimitPosts(e.target.value));
  };
  return (
    <div>
      <span>posts per page</span>
      <select
        className="drop-down-list"
        name="posts-per-page"
        onChange={(e) => handlerSwitchNumPosts(e)}
      >
        <option value={15}>15</option>
        <option value={10}>10</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
};
