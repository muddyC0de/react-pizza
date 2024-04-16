import React from "react";
import styles from "./SupplementCard.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setSelectedSupplements } from "../../redux/slices/fullPizzaSlice";
import { addSupplement } from "../../redux/slices/fullPizzaSlice";

type SupplementCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  selected: boolean;
};

const SupplementCard: React.FC<SupplementCardProps> = ({
  id,
  imageUrl,
  title,
  price,
  selected,
}) => {
  const dispatch = useDispatch();

  const cardClasses = classNames(styles.SupplementCard, {
    [styles.selected]: selected,
  });
  return (
    <div
      onClick={() => {
        dispatch(addSupplement({ title, price }));
        dispatch(setSelectedSupplements(title));
      }}
      className={cardClasses}
    >
      <svg
        className={selected ? "" : styles.hidden}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`.cls-1{fill:rgb(255, 105, 0);}`}</style>
        </defs>
        <g data-name="Layer 28" id="Layer_28">
          <path
            className="cls-1"
            d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
          />
          <path
            className="cls-1"
            d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
          />
        </g>
      </svg>
      <img src={imageUrl} alt="" />
      <p>{title}</p>
      <span>{price} ₴</span>
    </div>
  );
};

export default SupplementCard;
