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

                {/* Public route for products */}
                <Button color="inherit" component={Link} to="/">
                    Catalogo
                </Button>

                {/* Protected route for seller */}
                <Button color="inherit" component={Link} to="/seller">
                    Vender
                </Button>

                {/* Protected route for admin */}
                <Button color="inherit" component={Link} to="/admin">
                    Administrar
                </Button>

                {/* Authentication buttons */}
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
