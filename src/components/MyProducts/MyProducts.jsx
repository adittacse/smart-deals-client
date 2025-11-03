import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading.jsx";

const MyProducts = () => {
    const [myProducts, setMyProducts] = useState([]);
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/products?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyProducts(data);
                    const map = {};
                    for (const p of data) {
                        map[p._id] = (p.status || "pending").toLowerCase();
                    }
                    setStatus(map);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleProductDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/products/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
                                icon: "success"
                            });
                            // remaining products
                            const remainingProducts = myProducts.filter(product => product._id !== _id);
                            setMyProducts(remainingProducts);
                        }
                    })
            }
        });
    }

    const handleMakeSold = (_id) => {
        const status = "sold";

        fetch(`http://localhost:3000/products/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: status})
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setStatus(prev => ({ ...prev, [_id]: "sold" }));
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your product has been sold",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    const handleMakePending = (_id) => {
        const status = "pending";

        fetch(`http://localhost:3000/products/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: status})
        })
        .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setStatus(prev => ({ ...prev, [_id]: "pending" }));
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your product has been pending now",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className="text-center text-5xl font-bold mt-20">My Products: <span className="primary-text">{myProducts.length}</span></h2>
            <div className="overflow-x-auto bg-white mt-10 mb-20">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#AAACBB07]">
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
                                <p className="font-medium text-secondary">
                                    <Link to={`/product-details/${product?._id}`}>{product?.title}</Link>
                                </p>
                            </td>
                            <td>
                                <p className="font-medium text-secondary">{product?.category}</p>
                            </td>
                            <td>
                                <p className="font-medium text-secondary">${product?.price_min}-{product?.price_max}</p>
                            </td>

                            <td>
                                {(() => {
                                    const cur = (status[product._id] ?? product.status ?? "pending").toLowerCase();
                                    return cur === "sold"
                                        ? <div className="badge badge-success">Sold</div>
                                        : <div className="badge badge-warning">Pending</div>;
                                })()}
                            </td>
                            <th className="flex items-center gap-2">
                                <Link to={`/edit-product/${product._id}`} className="btn btn-outline btn-primary">Edit</Link>
                                <button onClick={() => handleProductDelete(product._id)} className="btn btn-outline btn-error">Delete</button>
                                {(() => {
                                    const cur = (status[product._id] ?? product.status ?? "pending").toLowerCase();
                                    return cur === "sold"
                                        ? <button onClick={() => handleMakePending(product._id)} className="btn btn-outline btn-warning">Make Pending</button>
                                        : <button onClick={() => handleMakeSold(product._id)} className="btn btn-outline btn-success">Make Sold</button>;
                                })()}
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