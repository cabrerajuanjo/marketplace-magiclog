import React, { SyntheticEvent } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";

function SignUp() {
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <Container maxWidth="xs">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5">Crear cuenta</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="repeat-password"
                    label="Confirmar contraseña"
                    type="password"
                    id="repeat-password"
                    autoComplete="new-password"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Crear cuenta
                </Button>
            </Box>
        </Container>
    );
}

export default SignUp;
