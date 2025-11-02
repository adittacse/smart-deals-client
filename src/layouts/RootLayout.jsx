import Navbar from "../components/Navbar/Navbar.jsx";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer.jsx";

const RootLayout = () => {
    return (
        <div className="font-inter bg-[#AAACBB15]">
            <div className="bg-base-100 shadow-sm">
                <Navbar />
            </div>
            <div className="max-w-7xl mx-auto">
                <Outlet />
            </div>
            <div className="bg-secondary">
                <Footer />
            </div>
        </div>
    );
};

export default RootLayout;