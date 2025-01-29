import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../context";
import { Create } from "../Dialogs";
import styles from "./actions.module.scss";

const Actions = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { search, setSearch } = useAppContext();

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.actions_wrapper}>
      <div className={styles.title}>Products</div>

      <div className={styles.actions_block}>
        <TextField
          id="outlined-basic"
          label="Type in here to search..."
          variant="standard"
          size="small"
          fullWidth
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className={styles.input}
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={handleOpen}
          className={styles.button}
        >
          Add new
        </Button>

        <Create open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Actions;
