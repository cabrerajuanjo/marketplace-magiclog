import React from "react";
import {
    Container,
    Box,
    Typography,
    Button,
    FormControlLabel,
    Divider,
    List,
    ListItem,
    Input,
    Slider,
} from "@mui/material";
import Products from "./Products";

const sampleProducts = [
    { id: 1, sku: "A", name: "Product A", price: 10 },
    { id: 2, sku: "B", name: "Product B", price: 20 },
    { id: 3, sku: "C", name: "Product C", price: 30 },
];

const ProductsView: React.FC = () => {
    return (
        <Container sx={{ display: "flex" }}>
            <div style={{ padding: 20 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Filters</Typography>
                    <Divider sx={{ my: 2 }} />
                    <List>
                        <ListItem>
                            <FormControlLabel
                                label="Nombre"
                                control={<Input />}
                                labelPlacement="start"
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                label="Sku"
                                control={<Input />}
                                labelPlacement="start"
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                label="Rango de precio"
                                sx={{ width: "100%" }}
                                labelPlacement="start"
                                control={
                                    <Slider
                                        value={[10, 90]}
                                        valueLabelDisplay="auto"
                                    />
                                }
                            />
                        </ListItem>
                    </List>
                    <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                        Apply Filters
                    </Button>
                </Box>
            </div>
            <Products products={sampleProducts} />
        </Container>
    );
};

export default ProductsView;
