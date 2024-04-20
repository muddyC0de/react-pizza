import React from "react";
import styles from "./Historyitem.module.scss";

type HistoryItemProps = {
  newId: string;
  title: string;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  price: number;
  description: string;
  supplements: string[];
  date: number;
};

const HistoryItem: React.FC<HistoryItemProps> = ({
  newId,
  title,
  imageUrl,
  type,
  size,
  count,
  price,
  description,
  supplements,
  date,
}) => {
  const timestamp = date;
  const dateInfo = new Date(timestamp * 1000);

  const day = dateInfo.getDate();
  const month = dateInfo.getMonth() + 1;
  const year = dateInfo.getFullYear();
  return (
    <div className={styles.root}>
      <div className={styles.itemBlock}>
        <div className={styles.itemImg}>
          <img className={styles.image} src={imageUrl} alt="Pizza" />
        </div>
        <div className={styles.info}>
          <h3>{title}</h3>

          <p>
            {type}, {size} см.
          </p>
          <div className="cart__supplements">
            {supplements.length ? (
              <>
                {" "}
                <p>+</p>
                {supplements.map((elem, index) => (
                  <p key={index} className="cart__supplement">
                    {" "}
                    {elem.toLowerCase()}
                    {index === supplements.length - 1 ? "" : ","}
                  </p>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <b>{count} шт.</b>
      <div className={styles.price}>
        <b>{price * count} ₴</b>
      </div>
      <p className={styles.date}>{`${day}.${
        String(month).length >= 1 ? "0" + month : month + 1
      }.${year}`}</p>
    </div>
  );
};

export default HistoryItem;
