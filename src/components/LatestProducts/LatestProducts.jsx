import { use } from "react";
import Product from "../Product/Product.jsx";
import {Link} from "react-router";

const LatestProducts = ({ latestProductsPromise }) => {
    const latestProducts = use(latestProductsPromise);

    return (
        <div className="py-20">
            <h3 className="text-center text-5xl font-bold">Recent <span className="primary-text">Products</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                {
                    latestProducts.map(product => <Product key={product._id} product={product} />)
                }
            </div>
            <div className="text-center">
                <Link to="/all-products" className="btn btn-primary">Show All</Link>
            </div>
        </div>
    );
};

export default LatestProducts;