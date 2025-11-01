import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../components/Home/Home.jsx";
import AllProducts from "../components/AllProducts/AllProducts.jsx";
import Register from "../components/Register/Register.jsx";
import Login from "../components/Login/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import MyProducts from "../components/MyProducts/MyProducts.jsx";
import MyBids from "../components/MyBids/MyBids.jsx";
import CreateProduct from "../components/CreateProduct/CreateProduct.jsx";
import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";

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
            },
            {
                path: "product-details/:id",
                loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
                element: <ProductDetails />
            },
            {
                path: "my-products",
                element: <PrivateRoute><MyProducts /></PrivateRoute>
            },
            {
                path: "my-bids",
                element: <PrivateRoute><MyBids /></PrivateRoute>
            },
            {
                path: "create-product",
                element: <PrivateRoute><CreateProduct /></PrivateRoute>
            },
        ]
    },
]);

export default Router;