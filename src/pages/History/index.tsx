import { useSelector } from "react-redux";
import styles from "./History.module.scss";
import React from "react";
import { RootState } from "../../redux/store";
import HistoryItem from "../../components/HistoryItem";
import { useAppDispatch } from "../../redux/store";
import { fetchHistory } from "../../redux/slices/historySlice";

const History: React.FC = () => {
  const { historyItems } = useSelector(
    (state: RootState) => state.historySlice
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchHistory());
  }, []);
  return (
    <div className="container container--cart">
      <h2 className={styles.root}>
        <img src="/img/history.svg" alt="" />
        История заказов
      </h2>

      <div className="historyItems">
        {historyItems.map((item) => (
          <HistoryItem
            newId={item.newId}
            title={item.title}
            imageUrl={item.imageUrl}
            type={item.type}
            size={item.size}
            count={item.count}
            price={item.price}
            description={item.description}
            supplements={item.supplements}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
