import React from 'react';
import LatestProducts from "../LatestProducts/LatestProducts.jsx";

const latestProductsPromise = fetch("https://smart-deals-server-bvmm.onrender.com/latest-products").then((res) => res.json());

const Home = () => {
    return (
        <div>
            <h1>Home page</h1>
            <LatestProducts latestProductsPromise={latestProductsPromise} />
        </div>
    );
};

export default Home;