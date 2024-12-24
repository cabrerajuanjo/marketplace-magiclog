import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { addProduct } from "../services/product.service";
import { INVALID_FIELD, SERVER_ERROR_MESSAGE } from "../constants/messages.constant";
import FormErrorDetail from "./FormErrorDetail";

// Define types for the form data
interface ProductFormData {
    sku: string;
    name: string;
    price: number;
    quantity: number;
}

const AddProduct: React.FC<{triggerUpdate: () => void}> = ({triggerUpdate}) => {
    // State for form fields
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProductFormData>({
        sku: "",
        name: "",
        price: 0,
        quantity: 0,
    });

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "quantity" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Product data submitted:", formData);
        const responseCode = await addProduct(formData)
        if (responseCode === 201) {
            triggerUpdate()
        } else if (responseCode === 400) {
            setErrorMessage(INVALID_FIELD);
        } else {
            setErrorMessage(SERVER_ERROR_MESSAGE);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto" }}
        >
            <TextField
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
            />
            <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                InputProps={{ inputProps: { min: 0 } }}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Product
            </Button>
            <FormErrorDetail errorMessage={errorMessage} />
        </Box>
    );
};

export default AddProduct;

