import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const products = [
    { id: 1, name: "Product 1", sku: "1", price: "$10" },
    { id: 2, name: "Product 2", sku: "2", price: "$20" },
    { id: 3, name: "Product 3", sku: "3", price: "$30" },
    { id: 4, name: "Product 4", sku: "4", price: "$40" },
    { id: 5, name: "Product 5", sku: "4", price: "$40" },
];

function ProductMatrix() {
    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography display="inline" variant="h6">{product.name}</Typography>
                                &nbsp;
                                <Typography display="inline" color="text.secondary">(SKU: {product.sku})</Typography>
                                <Typography color="text.secondary">{product.price}</Typography>
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

