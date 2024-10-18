import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import "../assets/navbar.css";

const NavbarComponent = () => {
    const apiUrl = import.meta.env.VITE_BaseUrl;
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [activeLink, setActiveLink] = useState(""); // State for the active link
    const user = localStorage.getItem("user");

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const removeActive = () => {
        setIsActive(false);
    };

    const handlesubmit = async () => {
        try {
            const response = await axios.get(`${apiUrl}/logout`, { withCredentials: true });
            if (response.data.success) {
                toast.success("Logout Successfully done 😃!", {
                    position: "top-center",
                });
              await localStorage.removeItem("user");
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    const handleLinkClick = (link) => {
        setActiveLink(link); // Set the active link state
    };

    return (
        <div className="App">
            <header className="App-header">
                <nav className="navbar">
                    <div className="logo">Dev.</div>
                    <ul className={`navMenu ${isActive ? 'active' : ''}`}>
                        {!user && (
                            <>
                                <li onClick={() => { removeActive(); handleLinkClick("home"); }}>
                                    <NavLink to="/" className={`navLink ${activeLink === "home" ? 'active' : ''}`}>Home</NavLink>
                                </li>
                                <li onClick={() => { removeActive(); handleLinkClick("signup"); }}>
                                    <NavLink to="/signup" className={`navLink ${activeLink === "signup" ? 'active' : ''}`}>Sign Up</NavLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li onClick={() => { removeActive(); handleLinkClick("dashboard"); }}>
                                    <NavLink to="/dashboard" className={`navLink ${activeLink === "dashboard" ? 'active' : ''}`}>Dashboard</NavLink>
                                </li>
                                <li onClick={removeActive}>
                                    <button onClick={handlesubmit}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavbarComponent;
