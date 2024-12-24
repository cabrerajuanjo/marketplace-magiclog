import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Seller from "./components/Seller";
import Admin from "./components/Admin";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProductsView from "./components/ProductsView";
import { Box } from "@mui/material";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentRole, setRole] = useState<string>('');

    const handleLogin = (role: string) => {
        setIsLoggedIn(true);
        setRole(role)
        
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Box>
                <Routes>
                    {/* Default route for viewing products */}
                    <Route path="/" element={<ProductsView />} />

                    {/* Seller route (requires login) */}
                    <Route
                        path="/seller"
                        element={isLoggedIn && currentRole === 'user'? <Seller /> : <Navigate to="/signin" />}
                    />

                    {/* Admin route (requires login) */}
                    <Route
                        path="/admin"
                        element={isLoggedIn && currentRole === 'admin'? <Admin /> : <Navigate to="/signin" />}
                    />

                    {/* Sign-in route */}
                    <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Box>
        </Router>
    );
};

export default App;

