import React, {useEffect, useState} from "react";

const MyProducts = () => {
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        fetch(``)
    }, []);

    return (
        <div>
            <h2 className="text-center text-5xl font-bold mt-20">My Products: <span className="primary-text">{myProducts.length}</span></h2>
        </div>
    );
};

export default MyProducts;