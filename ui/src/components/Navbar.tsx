import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogout }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? { fontWeight: 'bold', color: 'orange' } : {};

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Marketplace
                </Typography>

                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={isActive('/')}
                >
                    Comprar
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/seller"
                    sx={isActive('/seller')}
                >
                    Vender
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/admin"
                    sx={isActive('/admin')}
                >
                    Administrar
                </Button>

                {isLoggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>
                        Salir
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/signin" sx={isActive('/signin')}>
                        Entrar
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

