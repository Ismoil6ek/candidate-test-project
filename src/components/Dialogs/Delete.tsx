import { Dialog, Button } from "@mui/material";
import { useAppContext } from "../../context";
import { base_url } from "../../data";
import styles from "./styles.module.scss";

interface deleteProps {
  deleteID: number | null;
  setDeleteID: (newValue: number | null) => void;
}

const Delete = ({ deleteID, setDeleteID }: deleteProps) => {
  const { filtered, setTriggerFetch } = useAppContext();

  async function handleDelete() {
    await fetch(`${base_url}/products/${deleteID}`, {
      method: "DELETE",
    });

    setDeleteID(null);
    setTriggerFetch(Math.random());
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
