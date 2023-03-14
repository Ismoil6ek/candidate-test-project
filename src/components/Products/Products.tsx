import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NoImage from "../../assets/images/no-image.png";
import styles from "./products.module.scss";
import Filter from "../Filter/Filter";
import { useAppContext } from "../../context";
import Actions from "../Actions/Actions";
import { nFormatter } from "../../utils/numberFormat";

const Products = () => {
  const { filtered, setActiveCategory } = useAppContext();

  return (
    <div className={styles.wrapper}>
      <Actions />
      <Filter />

      <div className={styles.products_wrapper}>
        <AnimatePresence>
          {filtered.map(
            ({ id, category, description, imageSrc, name, price }) => (
              <motion.div
                key={id}
                className={styles.product_block}
                layout
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <img src={imageSrc ?? NoImage} alt={name} />

                <div className={styles.data_wrapper}>
                  <div className={styles.title}>{name}</div>
                  <div className={styles.description}>{description}</div>
                  <div className={styles.info}>
                    <Link
                      to="#filter"
                      className={styles.category}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Link>
                    <div className={styles.price}>${nFormatter(price)}</div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
