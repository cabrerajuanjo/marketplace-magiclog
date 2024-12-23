import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ProductsView from "./ProductsView";

const Seller: React.FC = () => {
    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Seller Dashboard
                </Typography>
                <ProductsView />
            </Box>
        </Container>
    );
};

export default Seller;
