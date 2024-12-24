import React, { useEffect, useState } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import ProductMatrix from "./Products";
import { getOnwProducts, Product, SearchFilter } from "../services/product.service";
import AddProduct from "./AddProduct";

const Seller: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const result = await getOnwProducts();
        if (result.products) {
            setProducts(result.products)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, boxShadow: 1, borderRadius: 1 }}>
                        <Typography variant="h6">Mis productos</Typography>
                        <ProductMatrix products={products} hideBuyButton={true}/>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, boxShadow: 1, borderRadius: 1 }}>
                        <Typography variant="h6">Add Product</Typography>
                        <AddProduct triggerUpdate={fetchProducts} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Seller;
