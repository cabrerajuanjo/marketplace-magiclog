import React, { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Box,
    Container,
    Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../services/user.service";
import { INVALID_EMAIL_MESSAGE, MISMATCHED_PASSWORD_MESSAGE, SERVER_ERROR_MESSAGE, USER_ALREADY_EXISTS_MESSAGE } from "../constants/messages.constant";
import FormErrorDetail from "./FormErrorDetail";

function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const passwordConfirm = data.get("password-confirm");
        // const confirm = document.querySelector('input[name=password-confirm]');

        if (password !== passwordConfirm) {
            return setErrorMessage(MISMATCHED_PASSWORD_MESSAGE);
        }

        const result = await createAccount(email, password);
        if (result === 201) {
            navigate('/')
        } else if (result === 400) {
            setErrorMessage(INVALID_EMAIL_MESSAGE);
        } else if (result === 409) {
            setErrorMessage(USER_ALREADY_EXISTS_MESSAGE);
        } else {
            setErrorMessage(SERVER_ERROR_MESSAGE);
        }
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
                    autoFocus
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
                    name="password-confirm"
                    label="Confirmar contraseña"
                    type="password"
                    id="password-confirm"
                    autoComplete="new-password"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Crear cuenta
                </Button>

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Ya tienes cuenta?{" "}
                    <MuiLink component={Link} to="/signin" underline="hover">
                        Ingrese
                    </MuiLink>
                </Typography>
                <FormErrorDetail errorMessage={errorMessage} />
            </Box>
        </Container>
    );
}

export default SignUp;
