import React, { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Box,
    Container,
    Link as MuiLink,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/user.service";
import { SERVER_ERROR_MESSAGE, WRONG_CREDENTIALS_MESSAGE } from "../constants/messages.constant";
import FormErrorDetail from "./FormErrorDetail";

interface SignInProps {
    onLogin: (role: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const { tokenPayload, responseCode } = await login(email, password);
        if (tokenPayload) {
            onLogin(tokenPayload.role)
            console.log(window.location.pathname)
            navigate('/')
        } else if (responseCode === 401) {
            //TODO: makeit better
            setErrorMessage(WRONG_CREDENTIALS_MESSAGE);
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
                <Typography variant="h5">Ingresar</Typography>
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
                    autoComplete="current-password"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Ingresar
                </Button>

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Aun no tienes cuenta?{" "}
                    <MuiLink component={Link} to="/signup" underline="hover">
                        Cree una
                    </MuiLink>
                </Typography>
                <FormErrorDetail errorMessage={errorMessage} />
            </Box>
        </Container>
    );
}

export default SignIn;
