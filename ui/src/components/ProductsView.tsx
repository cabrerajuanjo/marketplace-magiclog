import React from "react";
import {
    Box,
    Container,
} from "@mui/material";
import Products from "./Products";
import ProductsFilter from "./ProductsFilter";

const sampleProducts = [
    { id: 1, name: "Product A", price: "$10", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product B", price: "$20", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product C", price: "$30", image: "https://via.placeholder.com/150" },
];

const ProductsView: React.FC = () => {
    return (
        <Container sx={{ display: "flex" }}>
            <ProductsFilter />
            <Products />
        </Container>
    );
};

export default ProductsView;
