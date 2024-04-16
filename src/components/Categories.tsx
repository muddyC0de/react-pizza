import React from "react";
type CategoriesProps = {
  currentCategory: number;
  setCurrentCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ currentCategory, setCurrentCategory }) => {
    const categories = ["Все", "Мясные", "Гриль", "Острые", "Закрытые"];

    const onClickCategory = (index: number) => {
      setCurrentCategory(index);
    };

    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              key={category}
              onClick={() => onClickCategory(index)}
              className={currentCategory === index ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
