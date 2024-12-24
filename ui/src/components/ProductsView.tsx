import React, { useEffect, useState } from "react";
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
import { searchProducts, Product, SearchFilter, getMinMaxPrice } from "../services/product.service";
import ProductMatrix from "./Products";



const ProductsView: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = React.useState<string>();
    const [sku, setSku] = React.useState<string>();
    const [minmax, setMinMax] = React.useState<number[]>([0, 1337]);
    const [minmaxInit, setMinMaxInit] = React.useState<number[]>([0, 0]);
    const updateName = (e) => {
        setName(e.target.value);
    }
    const updateSku = (e) => {
        setSku(e.target.value);
    }
    const updateMinMax = (event: Event, newValue: number | number[]) => {
        setMinMax(newValue as number[]);
    }

    useEffect(() => {
        fetchProducts({})
    }, [])
    useEffect(() => {
        fetchMinMax()
    }, [])

    const fetchMinMax = async () => {
        const result = await getMinMaxPrice();
        if (result) {
            setMinMaxInit([result.smallestPrice, result.highestPrice])
        }
    }

    const fetchProducts = async (filter: SearchFilter) => {
        const result = await searchProducts(filter);
        if (result.products) {
            setProducts(result.products)
        }
    }


    const search = async () => {
        console.log(name, sku, minmax[0], minmax[1])
        fetchProducts({ sku, name: name, minPrice: minmax[0], maxPrice: minmax[1] });

    };

    return (
        <Container sx={{ display: "flex", gap: 1 }}>
            <div style={{ padding: 20 }}>
                <Box
                    sx={{ p: 2 }}>
                    <Typography variant="h6">Filters</Typography>
                    <Divider sx={{ my: 2 }} />
                    <List>
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", flexFlow: 'column', alignItems: "center", width: "100%" }}>
                                <Typography id="input-slider" gutterBottom>
                                    Nombre
                                </Typography>
                                <Input name="name"
                                    onChange={updateName}
                                    sx={{ flex: 1 }} />
                            </Box>
                        </ListItem>
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", flexFlow: 'column', alignItems: "center", width: "100%" }}>
                                <Typography id="input-slider" gutterBottom>
                                    Sku
                                </Typography>
                                <Input
                                    onChange={updateSku}
                                    name="sku" sx={{ flex: 1 }} />
                            </Box>
                        </ListItem>
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", flexFlow: 'column', alignItems: "center", width: "100%" }}>
                                <Typography id="input-slider" gutterBottom>
                                    Rango de precios
                                </Typography>
                                <Slider
                                    sx={{ flex: 1 }}
                                    onChange={updateMinMax}
                                    value={minmax}
                                    name="minmax"
                                    min={minmaxInit[0]}
                                    max={minmaxInit[1]}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        </ListItem>
                    </List>
                    <Button onClick={search} variant="contained" fullWidth sx={{ mt: 2 }}>
                        Apply Filters
                    </Button>
                </Box>
            </div>
            <Container sx={{p:5}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, boxShadow: 1, borderRadius: 1 }}>
                    <ProductMatrix products={products} />
                </Box>
            </Container>
        </Container>
    );
};

export default ProductsView;
