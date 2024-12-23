import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ProductsFilter from "./ProductsFilter";
import Products from "./Products";

const Admin: React.FC = () => {
    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Panel de administrador
                </Typography>
                <Container sx={{ display: "flex" }}>
                    <ProductsFilter />
                    <Products />
                </Container>
            </Box>
        </Container>
    );
};

export default Admin;

