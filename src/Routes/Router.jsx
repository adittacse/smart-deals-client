import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../components/Home/Home.jsx";
import AllProducts from "../components/AllProducts/AllProducts.jsx";
import Register from "../components/Register/Register.jsx";

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
            }
        ]
    },
]);

export default Router;