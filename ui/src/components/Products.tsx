import { Grid, Card, CardContent, Typography, Button, Hidden } from "@mui/material";
import React from "react";
import { Product } from "../services/product.service";

interface ProductsProps {
    products: Product[]
}

const ProductMatrix: React.FC<ProductsProps> = ({products}) => {
    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card sx={{height: '15rem', minWidth: '50px', overflow: 'hidden'}}>
                            <CardContent>
                                <Typography display="inline" variant="h6">{product.name}</Typography>
                                &nbsp;
                                <Typography display="inline" color="text.secondary">(SKU: {product.sku})</Typography>
                                <Typography color="text.secondary">$ {product.price}</Typography>
                                <Typography color="text.secondary">quantity: {product.quantity}</Typography>
                                <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductMatrix;

