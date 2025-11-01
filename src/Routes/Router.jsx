import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../components/Home/Home.jsx";
import AllProducts from "../components/AllProducts/AllProducts.jsx";
import Register from "../components/Register/Register.jsx";
import Login from "../components/Login/Login.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "all-products",
                element: <AllProducts />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },
]);

export default Router;