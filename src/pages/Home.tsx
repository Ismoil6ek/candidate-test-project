import { Pagination } from "@mui/material";

import { Actions, Filter, Products } from "../components";
import { useAppContext } from "../context";
import { Edit } from "../components/Dialogs";
import styles from "./products.module.scss";

export const PER_PAGE = 10;

const Home = () => {
  const { products, setPage, activeCategory, search } = useAppContext();

  return (
    <div className={styles.wrapper}>
      <Actions />
      <Filter />
      <Products />
      <Edit />
      {activeCategory === "all" && !search.length ? (
        <Pagination
          count={Math.ceil(products.length / PER_PAGE)}
          onChange={(_, page) => setPage(page - 1)}
        />
      ) : null}
    </div>
  );
};

export default Home;
