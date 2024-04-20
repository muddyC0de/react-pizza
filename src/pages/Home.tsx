import React from "react";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { RootState } from "../redux/store";
import { CurrentSort } from "../redux/slices/filterSlice";
import {
  setCurrentCategory,
  setCurrentSort,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentCategory, currentSort, currentPage, searchValue } =
    useSelector((state: RootState) => state.filterSlice);
  const { items, status } = useSelector((state: RootState) => state.pizzaSlice);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCurrentCategory(id));
  }, []);

  const onChangeSort = (sortType: CurrentSort) => {
    dispatch(setCurrentSort(sortType));
  };
  React.useEffect(() => {
    async function fetchData() {
      const sortBy = currentSort.sortProperty.replace("-", "");
      const order = currentSort.sortProperty.includes("-") ? "asc" : "desc";
      const category = !currentCategory ? "" : `&category=${currentCategory}`;
      const search = searchValue ? `&search=${searchValue}` : "";
      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: String(currentPage),
        })
      );

      window.scrollTo(0, 0);
    }
    fetchData();
  }, [currentCategory, currentSort, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          currentCategory={currentCategory}
          setCurrentCategory={onChangeCategory}
        />
        <Sort currentSort={currentSort} setCurrentSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((item) => (
                <PizzaBlock
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  price={item.price}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default Home;
