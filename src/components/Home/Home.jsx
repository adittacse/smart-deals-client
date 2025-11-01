import React from 'react';
import LatestProducts from "../LatestProducts/LatestProducts.jsx";

const latestProductsPromise = fetch("http://localhost:3000/latest-products").then((res) => res.json());

const Home = () => {
    return (
        <div>
            <h1>Home page</h1>
            <LatestProducts latestProductsPromise={latestProductsPromise} />
        </div>
    );
};

export default Home;