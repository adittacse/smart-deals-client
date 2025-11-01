import { useContext } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../../contexts/AuthContext.jsx";

const Navbar = () => {
    const { user, userSignOut } = useContext(AuthContext);

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-products">All products</NavLink></li>
        {
            user && <>
                <li><NavLink to="/my-products">My Products</NavLink></li>
                <li><NavLink to="/my-bids">My Bids</NavLink></li>
                <li><NavLink to="/create-product">Create Product</NavLink></li>
            </>
        }
    </>;

    const handleLogout = () => {
        userSignOut()
            .then(() => {
                console.log("User signed out");
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Smart<span className="primary">Deals</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal justify-between px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    !user ? <>
                        <Link to="/login" className="btn gradient-border primary mr-2">Login</Link>
                        <Link to="/register" className="btn text-white bg-[linear-gradient(90deg,#632EE3_0%,#9F62F2_100%)]">Register</Link>
                    </> : <>
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            <img className="rounded-full border w-10 h-10 mr-3" src={user?.photoURL || user?.providerData?.[0]?.photoURL} alt="User image"/>
                        </div>
                        <button onClick={handleLogout} className="btn gradient-border primary mr-2">Logout</button>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;