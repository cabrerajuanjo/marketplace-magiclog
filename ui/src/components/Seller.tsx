import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ProductMatrix from "./Products";

const Seller: React.FC = () => {
    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Mis productos
                </Typography>
                <ProductMatrix />
            </Box>
        </Container>
    );
};

export default Seller;
