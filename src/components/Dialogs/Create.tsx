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

const Create = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (newValue: boolean) => void;
}) => {
  const { setProducts } = useAppContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get existing products from localStorage
    const storedProducts = JSON.parse(
      localStorage.getItem("products_data") || "[]"
    );

    const newProduct = {
      id: Date.now(), // Unique ID for the product
      name: nameRef.current?.value || "",
      description: aboutRef.current?.value || "",
      price: parseFloat(priceRef.current?.value || "0"),
      category: categoryRef.current?.value?.toLowerCase() || "uncategorized",
      imageSrc: imageRef.current?.value || "",
    };

    // Update localStorage
    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem("products_data", JSON.stringify(updatedProducts));

    // Update global state to trigger a re-render
    setProducts(updatedProducts);

    setOpen(false);
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
