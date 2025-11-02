import Navbar from "../components/Navbar/Navbar.jsx";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <div className="bg-[#AAACBB15]">
            <div className="font-inter max-w-7xl mx-auto">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default RootLayout;