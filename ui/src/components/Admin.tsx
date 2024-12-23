import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Admin: React.FC = () => {
    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Dashboard
                </Typography>
                {/* Add admin-specific functionality */}
            </Box>
        </Container>
    );
};

export default Admin;

