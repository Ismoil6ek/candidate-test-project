import { Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
    </Routes>
  );
}

export default App;
