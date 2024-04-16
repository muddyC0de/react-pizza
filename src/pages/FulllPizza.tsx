import axios from "axios";
import React from "react";
import { addItem } from "../redux/slices/cartSlice";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";
import SupplementCard from "../components/SupplementCard/SupplementCard";
import {
  clearSelectedSupplements,
  setCurrentSize,
  setCurrentType,
} from "../redux/slices/fullPizzaSlice";
import { Loader } from "../components/Loader";
const typesNames = ["Тонкое", "Традиционное"];

const optionNames: Record<string, string> = {
  Тонкое: "thin",
  Традиционное: "tradition",
  26: "small",
  30: "average",
  40: "large",
};

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    types: number[];
    sizes: number[];
  }>({
    title: "",
    imageUrl: "",
    description: "",
    price: 0,
    types: [1, 2],
    sizes: [26, 30, 40],
  });
  const [supplements, setSupplements] =
    React.useState<
      { id: number; title: string; imageUrl: string; price: number }[]
    >();
  const dispatch = useDispatch();
  const {
    selectedSupplements,
    currentType,
    currentSize,
    totalSupplementsPrice,
  } = useSelector((state: RootState) => state.fullPizzaSlice);

  const { id } = useParams();

  const addToCart = () => {
    const item: CartItem = {
      id: Number(id),
      newId: "",
      title: pizza.title,
      imageUrl: pizza.imageUrl,
      price: pizza.price + totalSupplementsPrice,
      type: currentType,
      description: pizza.description,
      size: currentSize,
      supplements: selectedSupplements,
      count: 0,
    };
    dispatch(addItem(item));
  };

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const pizzasData = await axios.get(
          "https://65e460ee3070132b3b24a7a1.mockapi.io/items/" + id
        );

        const supplementsData = await axios.get(
          "https://65e460ee3070132b3b24a7a1.mockapi.io/extra-supplements"
        );
        setPizza(pizzasData.data);
        setSupplements(supplementsData.data);
        dispatch(setCurrentType(typesNames[pizzasData.data.types[0]]));
        dispatch(setCurrentSize(pizzasData.data.sizes[0]));
      } catch (error) {
        console.error("Ошибка при получении пиццы:", error);
        alert("Ошибка при получении пиццы!");
      }
    }

    fetchPizzas();
  }, []);

  if (!pizza || !supplements) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="full-pizza">
        <div className="full-pizza__img-block">
          <img height={512} src={pizza.imageUrl} alt="" />
        </div>
        <div className="full-pizza__info-container">
          <div className="full-pizza__info">
            <h2 className="full-pizza__title">{pizza.title}</h2>
            <p className="full-pizza__description">{pizza.description}</p>

            {
              <div className="pizza-block__selector">
                <ul>
                  <div className={`toggle ${optionNames[currentType]}`}></div>

                  {pizza.types.map((type: number) => (
                    <li
                      key={type}
                      onClick={() => dispatch(setCurrentType(typesNames[type]))}
                      className={
                        currentType === typesNames[type] ? "active" : ""
                      }
                    >
                      {typesNames[type]}
                    </li>
                  ))}
                </ul>
                <ul>
                  <div className={`toggle ${optionNames[currentSize]}`}></div>
                  {pizza.sizes.map((size) => (
                    <li
                      key={size}
                      onClick={() => dispatch(setCurrentSize(size))}
                      className={currentSize === size ? "active" : ""}
                    >
                      {size} см.
                    </li>
                  ))}
                </ul>
              </div>
            }
            <h3 className="full-pizza__extra-title">Добавить по вкусу</h3>
            <div className="full-pizza__supplement-cards">
              {supplements.map((elem) => (
                <SupplementCard
                  key={elem.id}
                  selected={selectedSupplements.includes(elem.title)}
                  id={elem.id}
                  imageUrl={elem.imageUrl}
                  title={elem.title}
                  price={elem.price}
                />
              ))}
            </div>
          </div>
          <Link to={"/"}>
            <button
              onClick={() => {
                addToCart();
                dispatch(clearSelectedSupplements());
              }}
              className="full-pizza__button button"
            >
              Добавить в корзину за {pizza.price + totalSupplementsPrice} ₴
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
