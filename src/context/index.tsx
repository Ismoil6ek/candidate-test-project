import { useContext, createContext, useEffect, useState } from "react";
import { categories, context, product } from "../data/interface";
import { PER_PAGE } from "../pages/Home";

const LOCAL_STORAGE_KEY = "products_data";

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "PUMA | SUEDE CLASSIC REGAL",
    description:
      "First introduced in 1968, the Puma Suede Classic is Puma's most epic sneaker with its athletic inspired design and smooth suede. The Puma Suede Classic Regal Red/White is constructed with a suede upper and contrasting low profile rubber sole, and fat laces, the classic continues to make its mark on the streets today.",
    price: 10.99,
    category: "shoes",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0718/4754/3105/products/e7a2b189514d134630552681e4c8bc07.jpg?v=1677779725",
  },
  {
    id: 2,
    name: "ADIDAS | KID'S STAN SMITH",
    description:
      "The Stan Smith owned the tennis court in the '70s. Today it runs the streets with the same clean, classic style. These kids' shoes preserve the iconic look of the original, made in leather with punched 3-Stripes, heel and tongue logos and lightweight step-in cushioning.",
    price: 15.99,
    category: "shoes",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0718/4754/3105/products/7883dc186e15bf29dad696e1e989e914.jpg?v=1677779862",
  },
  {
    id: 3,
    name: "Radlee Dress",
    description:
      "Get some compliments. The Perry is slim fitting throughout with a lettuce hem at the sleeve opening and skirt hem. It's soft and stretchy for an extra comfortable feel.",
    price: 23.99,
    category: "dress",
    imageSrc:
      "https://boxrec.com/images/thumb/9/94/MikeTysonHeadshot2.jpg/200px-MikeTysonHeadshot2.jpg",
  },
];

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
  const [products, setProducts] = useState<product[]>(
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
      : DEFAULT_PRODUCTS
  );
  const [filtered, setFiltered] = useState<product[]>([]);
  const [categories, setCategories] = useState<categories>({ all: 0 });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [editID, setEditID] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    let temp: categories = { all: products.length };
    products.forEach(({ category }: product) => {
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
