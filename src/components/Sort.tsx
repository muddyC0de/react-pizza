import React from "react";
import { CurrentSort } from "../redux/slices/filterSlice";
type SortProps = {
  currentSort: CurrentSort;
  setCurrentSort: (sortType: CurrentSort) => void;
};

const Sort: React.FC<SortProps> = React.memo(
  ({ currentSort, setCurrentSort }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const sortRef = React.useRef<HTMLDivElement>(null);

    const sortList: CurrentSort[] = [
      { name: "популярности (DESC)", sortProperty: "rating" },
      { name: "популярности (ASC)", sortProperty: "-rating" },
      { name: "цене (DESC)", sortProperty: "price" },
      { name: "цене (ASC)", sortProperty: "-price" },
    ];

    const onClickSort = (sortType: CurrentSort) => {
      setCurrentSort(sortType);
    };
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sortRef.current &&
          !event.composedPath().includes(sortRef.current)
        ) {
          setIsOpen(false);
        }
      };
      document.body.addEventListener("click", handleClickOutside);

      return () =>
        document.body.removeEventListener("click", handleClickOutside);
    }, []);
    return (
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setIsOpen(!isOpen)}>{currentSort.name}</span>
        </div>
        {isOpen && (
          <div className="sort__popup">
            <ul>
              {sortList.map((sort, index) => (
                <li
                  onClick={() => {
                    onClickSort(sort);
                    setIsOpen(false);
                  }}
                  className={currentSort.name === sort.name ? "active" : ""}
                >
                  {sort.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export default Sort;
