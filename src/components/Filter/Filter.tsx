import { Link } from "react-router-dom";
import { useAppContext } from "../../context";
import styles from "./filter.module.scss";

const Filter = () => {
  const { categories, activeCategory, setActiveCategory } = useAppContext();

  return (
    <div className={styles.categories_wrapper}>
      {Object.entries(categories).map(([category, count], index) => (
        <Link
          to="#filter"
          className={styles.category_chip}
          key={index}
          data-active={activeCategory === category}
          onClick={() => setActiveCategory(category)}
        >
          {category} [{count}]
        </Link>
      ))}
    </div>
  );
};

export default Filter;
