import { useContext, createContext, useEffect, useState } from "react";
import { categories, context, product } from "../data/interface";
import { PER_PAGE } from "../pages/Home";

const DEFAULT_VALUES = {
  products: [],
  filtered: [],
  categories: {
    all: 0,
  },
  setCategories: () => {},
  activeCategory: "all",
  setActiveCategory: () => {},
  setTriggerFetch: () => {},
  search: "",
  setSearch: () => {},
  editID: null,
  setEditID: () => {},
  setPage: () => {},
};

const GlobalContext = createContext<context>(DEFAULT_VALUES);
const useAppContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }: { children: any }) => {
  const [products, setProducts] = useState<product[]>([]);
  const [filtered, setFiltered] = useState<product[]>([]);
  const [categories, setCategories] = useState<categories>({
    all: 0,
  });
  const [triggerFetch, setTriggerFetch] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [editID, setEditID] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);

  function fetchProducts() {
    fetch("http://localhost:2288/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setActiveCategory("all");
        let temp: categories = { all: result.length };
        result.forEach(({ category }: product) => {
          temp[category] >= 1 ? ++temp[category] : (temp[category] = 1);
        });
        setCategories(temp);
      });
  }

  // fetcher
  useEffect(() => {
    fetchProducts();
  }, [triggerFetch]);

  // category
  useEffect(() => {
    setFiltered(() =>
      products.filter(({ category }) =>
        activeCategory === "all" ? true : category === activeCategory
      )
    );
  }, [products, activeCategory]);

  // search
  useEffect(() => {
    setActiveCategory("all");
    setFiltered(() =>
      products.filter(
        ({ name, description }) =>
          (search.length > 0 &&
            name.toLowerCase().includes(search.toLowerCase())) ||
          description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  // pagination
  useEffect(() => {
    setFiltered(
      products.filter(
        (_, index) => index >= page * PER_PAGE && index < (page + 1) * PER_PAGE
      )
    );
  }, [page, products]);

  return (
    <GlobalContext.Provider
      value={{
        products,
        filtered,
        categories,
        setCategories,
        activeCategory,
        setActiveCategory,
        setTriggerFetch,
        search,
        setSearch,
        editID,
        setEditID,
        setPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useAppContext, GlobalContextProvider };
