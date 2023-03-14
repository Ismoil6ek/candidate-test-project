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
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { product } from "../../data/interface";
import styles from "./editDailog.module.scss";

const EditDialog = () => {
  const { editID, setEditID, products, setTriggerFetch } = useAppContext();
  const [product, setProduct] = useState<product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    category: "",
    imageSrc: null,
  });

  useEffect(() => {
    setProduct(products.find(({ id }) => id === editID)!);
  }, [editID]);

  function handleClose() {
    setEditID(null);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch(`http://localhost:2288/products/${editID}`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(product),
    });

    handleClose();
    setTriggerFetch(Math.random());
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Dialog
      open={Boolean(editID)}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <form className={styles.dialog_block} onSubmit={handleFormSubmit}>
        <div className={styles.title}>Edit Product</div>
        <div className={styles.inputs_wrapper}>
          <TextField
            id="outlined-basic"
            label="Paste link to product image"
            variant="outlined"
            value={product?.imageSrc}
            name="imageSrc"
            onChange={handleChange}
            required
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={product?.name}
            onChange={handleChange}
            name="name"
            required
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Category"
            value={product?.category}
            onChange={handleChange}
            name="category"
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
              name="price"
              value={product?.price}
              onChange={handleChange}
              required
            />
          </FormControl>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            name="description"
            value={product?.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.actions}>
          <Button variant="outlined" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success" fullWidth>
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default EditDialog;
