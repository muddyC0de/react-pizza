import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useInView } from "react-intersection-observer";
import ImgSkeleton from "./imgSkeleton";
type PizzaBlockProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  description,
  imageUrl,
  price,
}) => {
  const addedCount = useSelector((state: RootState) =>
    state.cartSlice.items
      .filter((obj: { title: string }) => obj.title === title)
      .reduce((sum: number, obj: { count: number }) => sum + obj.count, 0)
  );

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          {inView ? (
            <img className="pizza-block__image" src={imageUrl} alt={title} />
          ) : (
            <ImgSkeleton />
          )}

          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <p className="pizza-block__description">{description}</p>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₴</div>
          <Link to={`/pizza/${id}`}>
            <button className="button button--outline button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {addedCount > 0 ? <i>{addedCount}</i> : null}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
