import Navbar from "../components/Navbar/Navbar.jsx";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <div className="font-inter max-w-7xl mx-auto">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default RootLayout;