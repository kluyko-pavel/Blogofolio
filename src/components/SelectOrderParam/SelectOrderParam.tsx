import { useDispatch } from "react-redux";
import { setOrderParam } from "../../redux/action-creators";

export const SelectOrderParam = () => {
  const dispatch = useDispatch();

  const handlerSwitchOrderParam = (e: any) => {
    dispatch(setOrderParam(e.target.value));
  };
  return (
    <div>
      <span>type of sorting</span>
      <select
        className="drop-down-list"
        name="order-field"
        onChange={(e) => handlerSwitchOrderParam(e)}
      >
        <option value={"id"}>id</option>
        <option value={"title"}>title</option>
        <option value={"date"}>date</option>
      </select>
    </div>
  );
};
