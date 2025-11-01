import React from 'react';
import { Link } from "react-router";

const Product = ({ product }) => {
    const { _id, image, title, price_min, price_max } = product;

    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="rounded-lg">
                <img className="w-full h-[200px] rounded-lg p-4" src={image} alt="product image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="primary-text">${price_min}-{price_max}</p>
                <div className="card-actions justify-end">
                    <Link to="/login" className="btn btn-secondary w-full mr-2">
                        <span className="primary">View Details</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;