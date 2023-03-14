import { Actions, EditDialog, Filter, Products } from "../components";
import { Pagination } from "@mui/material";
import { useAppContext } from "../context";
import styles from "./products.module.scss";

export const PER_PAGE = 10;

const Home = () => {
  const { products, setPage, activeCategory, search } = useAppContext();

  return (
    <div className={styles.wrapper}>
      <Actions />
      <Filter />
      <Products />
      <EditDialog />

      {activeCategory === "all" && search.length === 0 ? (
        <Pagination
          count={Math.ceil(products.length / PER_PAGE)}
          onChange={(_, page) => setPage(page - 1)}
        />
      ) : null}
    </div>
  );
};

export default Home;
