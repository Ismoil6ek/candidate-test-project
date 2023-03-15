import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NoImage from "../../assets/images/no-image.png";
import { useAppContext } from "../../context";
import { nFormatter } from "../../utils/numberFormat";
import { DeleteOutlineRounded, EditRounded } from "@mui/icons-material";
import { useState } from "react";
import Delete from "../Dialogs/Delete";
import styles from "./products.module.scss";

const Products = () => {
  const [deleteID, setDeleteID] = useState<number | null>(null);
  const { filtered, setActiveCategory, setEditID } = useAppContext();

  return (
    <div className={styles.products}>
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
                <img
                  src={imageSrc ?? NoImage}
                  alt={name}
                  onError={(event) => (event.currentTarget.src = NoImage)}
                />

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

                <div className={styles.actions_block}>
                  <div
                    className={styles.icon_block}
                    data-edit
                    onClick={() => {
                      setEditID(id);
                    }}
                  >
                    <EditRounded className={styles.icon} />
                  </div>
                  <div
                    className={styles.icon_block}
                    data-delete
                    onClick={() => {
                      setDeleteID(id);
                    }}
                  >
                    <DeleteOutlineRounded className={styles.icon} />
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <Delete deleteID={deleteID} setDeleteID={setDeleteID} />
    </div>
  );
};

export default Products;
