import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../components/Home/Home.jsx";
import AllProducts from "../components/AllProducts/AllProducts.jsx";

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
            }
        ]
    },
]);

export default Router;