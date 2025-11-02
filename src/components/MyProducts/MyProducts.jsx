import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";

const MyProducts = () => {
    const [myProducts, setMyProducts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/products?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyProducts(data);
                });
        }
    }, [user?.email]);

    return (
        <div>
            <h2 className="text-center text-5xl font-bold mt-20">My Products: <span className="primary-text">{myProducts.length}</span></h2>
            <div className="overflow-x-auto mt-10 mb-20">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myProducts.map((product, index) => <tr key={product._id}>
                            <th>{index+1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask w-[60px] h-10">
                                        <img src={product?.image} alt="product image"/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="font-bold">{product?.title}</div>
                            </td>
                            <td>
                                <div className="font-bold">{product?.category}</div>
                            </td>
                            <td>${product?.price_min}-{product?.price_max}</td>
                            <td>
                                {
                                    product?.status === "pending" ? <div className="badge badge-warning">Pending</div>
                                        : <div className="badge badge-success">Accepted</div>
                                }
                            </td>
                            <th className="flex items-center gap-2">
                                <button className="btn btn-outline btn-primary">Edit</button>
                                <button className="btn btn-outline btn-error">Delete</button>
                                <button className="btn btn-outline btn-success">Make Sold</button>
                            </th>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;