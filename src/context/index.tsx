import { useContext, createContext, useEffect, useState } from "react";
import { categories, context, product } from "../data/interface";

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

  function fetchProducts() {
    fetch("http://localhost:2288/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        let temp: categories = { all: result.length };
        result.forEach(({ category }: product) => {
          temp[category] >= 1 ? ++temp[category] : (temp[category] = 1);
        });
        setCategories(temp);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, [triggerFetch]);

  useEffect(() => {
    if (activeCategory === "all") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter(({ category }) => category === activeCategory)
      );
    }
  }, [products, activeCategory]);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useAppContext, GlobalContextProvider };
