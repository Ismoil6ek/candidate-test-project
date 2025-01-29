import { Dialog, Button } from "@mui/material";
import { useAppContext } from "../../context";
import styles from "./styles.module.scss";

interface deleteProps {
  deleteID: number | null;
  setDeleteID: (newValue: number | null) => void;
}

const Delete = ({ deleteID, setDeleteID }: deleteProps) => {
  const { filtered, setProducts } = useAppContext();

  async function handleDelete() {
    // Get existing products from localStorage
    const storedProducts = JSON.parse(
      localStorage.getItem("products_data") || "[]"
    );

    // Filter out the deleted product
    const updatedProducts = storedProducts.filter(
      (product: { id: number }) => product.id !== deleteID
    );

    // Update localStorage
    localStorage.setItem("products_data", JSON.stringify(updatedProducts));

    // Update global state to trigger a re-render
    setProducts(updatedProducts);
    setDeleteID(null);
  }

  return (
    <Dialog
      open={Boolean(deleteID)}
      onClose={() => setDeleteID(null)}
      maxWidth="xs"
      fullWidth
    >
      <div className={styles.dialog_block}>
        <div className={styles.title}>
          Are you sure you want to delete{" "}
          {filtered.find(({ id }) => deleteID === id)?.name}?
        </div>

        <div className={styles.actions}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setDeleteID(null)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Delete;
