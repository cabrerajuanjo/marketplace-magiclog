import React, { useEffect, useState } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText} from "@mui/material";
import ProductMatrix from "./Products";
import { getOnwProducts, Product, SearchFilter } from "../services/product.service";

const Seller: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async (filter: SearchFilter) => {
        const result = await getOnwProducts();
        if (result.products) {
            setProducts(result.products)
        }
    }
    useEffect(() => {
        fetchProducts({})
    }, [])

    const [selectedView, setSelectedView] = useState('addProduct');

    const handleSelection = (view: string) => {
        setSelectedView(view);
    }

    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                <List>
                    <ListItem onClick={() => handleSelection('addProduct')} >
                        <ListItemText primary="Add Product" />
                    </ListItem>
                    <ListItem
                        onClick={() => handleSelection('inventory')}
                        component="button"
                    >
                        <ListItemText primary="Mis productos" />
                <ProductMatrix products={products}/>
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
};

export default Seller;
