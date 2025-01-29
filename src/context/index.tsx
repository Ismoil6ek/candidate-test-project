import { useContext, createContext, useEffect, useState } from "react";
import { ICategories, context, IProduct } from "../data/interface";
import { PER_PAGE } from "../pages/Home";
import { DEFAULT_PRODUCTS } from "../data/defaultProducts";

const LOCAL_STORAGE_KEY = "products_data";

const DEFAULT_VALUES = {
  products: [],
  filtered: [],
  categories: { all: 0 },
  setCategories: () => {},
  activeCategory: "all",
  setActiveCategory: () => {},
  setProducts: () => {},
  search: "",
  setSearch: () => {},
  editID: null,
  setEditID: () => {},
  setPage: () => {},
};

const GlobalContext = createContext<context>(DEFAULT_VALUES);
const useAppContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }: { children: any }) => {
  const [products, setProducts] = useState<IProduct[]>(
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
      : DEFAULT_PRODUCTS
  );
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories>({ all: 0 });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [editID, setEditID] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    let temp: ICategories = { all: products.length };
    products.forEach(({ category }: IProduct) => {
      temp[category] = (temp[category] || 0) + 1;
    });
    setCategories(temp);
  }, [products]);

  useEffect(() => {
    setFiltered(() =>
      products.filter(({ category }) =>
        activeCategory === "all" ? true : category === activeCategory
      )
    );
  }, [products, activeCategory]);

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
        setProducts,
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
