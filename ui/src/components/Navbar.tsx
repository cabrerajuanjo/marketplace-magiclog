import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface NavbarProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogout }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Marketplace
                </Typography>

                <Button color="inherit" component={Link} to="/">
                    Comprar
                </Button>

                <Button color="inherit" component={Link} to="/seller">
                    Vender
                </Button>

                <Button color="inherit" component={Link} to="/admin">
                    Administrar
                </Button>

                {isLoggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>
                        Salir
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/signin">
                        Entrar
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
