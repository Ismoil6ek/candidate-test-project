export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: null | string;
}

export interface ICategories {
  all: number;
  [key: string]: number;
}

export interface context {
  products: IProduct[];
  filtered: IProduct[];
  categories: ICategories;
  setCategories: React.Dispatch<React.SetStateAction<ICategories>>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  editID: number | null;
  setEditID: React.Dispatch<React.SetStateAction<number | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
