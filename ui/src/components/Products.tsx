import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

interface ProductsProps {
    products: { name: string; sku: string; price: number; quantity: number }[];
    hideBuyButton?: boolean;  // Add the prop to control button visibility
}

const ProductMatrix: React.FC<ProductsProps> = ({ products, hideBuyButton = false }) => {
    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.sku}>
                        <Card sx={{ height: '15rem', minWidth: 'fit-content', overflow: 'hidden' }}>
                            <CardContent>
                                <Typography display="inline" variant="h6">{product.name}</Typography>
                                &nbsp;
                                <Typography display="inline" color="text.secondary">(SKU: {product.sku})</Typography>
                                <Typography color="text.secondary">$ {product.price}</Typography>
                                <Typography color="text.secondary">quantity: {product.quantity}</Typography>
                                {!hideBuyButton && (
                                    <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                                        Comprar
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductMatrix;

