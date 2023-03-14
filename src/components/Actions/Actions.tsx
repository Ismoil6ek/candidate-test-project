import { TextField, Dialog, Button } from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import { useAppContext } from "../../context";
import styles from "./actions.module.scss";

const Actions = () => {
  const [open, setOpen] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const { setTriggerFetch } = useAppContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      name: nameRef.current?.value,
      description: aboutRef.current?.value,
      price: priceRef.current?.value,
      category: categoryRef.current?.value?.toLowerCase(),
      imageSrc: imageRef.current?.value,
    };

    await fetch("http://localhost:2288/products", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    setOpen(false);
    setTriggerFetch(Math.random());
  }

  return (
    <>
      <div className={styles.actions_wrapper}>
        <input
          className={styles.search_input}
          placeholder="Type in here to search..."
        />
        <button className={styles.create_button} onClick={handleOpen}>
          Add new
        </button>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <form className={styles.dialog_block} onSubmit={handleFormSubmit}>
          <div className={styles.title}>Create Product</div>
          <div className={styles.inputs_wrapper}>
            <TextField
              id="outlined-basic"
              label="Paste link to product image"
              variant="outlined"
              inputRef={imageRef}
              required
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              inputRef={nameRef}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Category"
              inputRef={categoryRef}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Price"
              type="number"
              inputRef={priceRef}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              inputRef={aboutRef}
              required
            />
          </div>

          <div className={styles.actions}>
            <Button variant="outlined" fullWidth>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Create
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Actions;
