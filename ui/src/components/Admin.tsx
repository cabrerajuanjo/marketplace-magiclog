import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Products from "./Products";
import { getAllProducts, Product } from "../services/product.service";

const Admin: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const email = 'asd'
        const result = await getAllProducts(email);
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
                <Typography variant="h4" align="center" gutterBottom>
                    Panel de administrador
                </Typography>
                <Container sx={{ display: "flex" }}>
                    <Products products={products} hideBuyButton={true}/>
                </Container>
            </Box>
        </Container>
    );
};

export default Admin;

