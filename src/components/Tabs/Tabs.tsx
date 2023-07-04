import Tab from "./Tab";
import "./Tabs.css";
import { IStoreState, ITabArr } from "../../types";
import { SelectOrderParam } from "../SelectOrderParam";
import { useDispatch, useSelector } from "react-redux";
import { toggleToolbar } from "../../redux/action-creators";

const tabsArr: ITabArr[] = [
  { id: 1, label: "All" },
  {
    id: 2,
    label: "My favorites",
  },
];

const Tabs = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state: IStoreState) => state.ui.selectedTab);

  return (
    <div className="container">
      <ul className="tabs">
        {tabsArr.map((el: ITabArr) => (
          <Tab
            key={el.id}
            label={el.label}
            active={selectedTab}
            disabled={el.disabled}
            handlerClick={() => dispatch(toggleToolbar(el.label))}
          />
        ))}
        <li className="sorting">
          {selectedTab === "All" && <SelectOrderParam />}
        </li>
      </ul>
    </div>
  );
};
export default Tabs;
