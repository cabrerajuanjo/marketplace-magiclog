import React from "react";
import {
    Box,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Divider,
    List,
    ListItem,
} from "@mui/material";

const ProductsFilter: React.FC = () => {
    return (
        <div style={{ padding: 20 }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Filters</Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                    <ListItem>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Category A"
                        />
                    </ListItem>
                    <ListItem>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Category B"
                        />
                    </ListItem>
                    <ListItem>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Category C"
                        />
                    </ListItem>
                </List>
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    Apply Filters
                </Button>
            </Box>
        </div>
    );
};

export default ProductsFilter;
