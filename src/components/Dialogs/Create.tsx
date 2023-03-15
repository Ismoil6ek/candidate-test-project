import { useRef, FormEvent } from "react";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  Dialog,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useAppContext } from "../../context";
import styles from "./styles.module.scss";
import { base_url } from "../../data";

const Create = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (newValue: boolean) => void;
}) => {
  const { setTriggerFetch } = useAppContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      name: nameRef.current?.value,
      description: aboutRef.current?.value,
      price: priceRef.current?.value,
      category: categoryRef.current?.value?.toLowerCase(),
      imageSrc: imageRef.current?.value,
    };

    await fetch(`${base_url}/products`, {
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
          <FormControl variant="outlined" required>
            <InputLabel htmlFor="outlined-adornment-password">Price</InputLabel>
            <OutlinedInput
              id="outlined-multiline-flexible"
              label="Price"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              type="number"
              inputRef={priceRef}
              required
            />
          </FormControl>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            inputRef={aboutRef}
            required
          />
        </div>

        <div className={styles.actions}>
          <Button variant="outlined" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success" fullWidth>
            Create
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default Create;
