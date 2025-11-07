import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import AuthContext from "../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";
import { FaArrowLeftLong } from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import axios from "axios";

const ProductDetails = () => {
    const [bids, setBids] = useState([]);
    const product = useLoaderData();
    const { _id: productId } = product;
    const bidModalRef = useRef(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            axios.get(`https://smart-deals-server-bvmm.onrender.com/products/bids/${productId}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(data => {
                    console.log("after axios get:", data.data);
                    setBids(data.data);
                })
        }
    }, [productId, user]);

    // useEffect(() => {
    //     fetch(`https://smart-deals-server-bvmm.onrender.com/products/bids/${productId}`, {
    //         headers: {
    //             authorization: `Bearer ${user.accessToken}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setBids(data);
    //         });
    // }, [productId, user]);

    const formatDate = (value) => {
        if (!value) {
            return "";
        }
        const dt = typeof value === "string" ? parseISO(value) : value;
        return format(dt, "dd/MM/yyyy");
    };

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const price = e.target.price.value;
        const contact = e.target.contact.value;

        const newBid = {
            product: productId,
            buyer_image: photo,
            buyer_name: name,
            buyer_contact: contact,
            buyer_email: email,
            bid_price: price,
            status: "pending"
        };

        fetch("https://smart-deals-server-bvmm.onrender.com/bids", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log("after placing bid", data);
                if (data.insertedId) {
                    bidModalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bid has been placed.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // add the new bid id to the state
                    // newBid._id = data.insertedId;
                    // const newBids = [...bids, newBid];
                    // newBids.sort((a, b) => b.bid_price - a.bid_price);
                    // setBids(newBids);
                    const enriched = {
                        ...newBid,
                        _id: data.insertedId,
                        product_image: product.image,
                        product_title: product.title,
                        product_price_min: product.price_min,
                        product_price_max: product.price_max,
                    };
                    setBids(bids => {
                        const arr = [...bids, enriched];
                        arr.sort((a, b) => b.bid_price -a.bid_price);
                        return arr;
                    });
                }
            })
    }

    return (
        <div>
            {/* product info */}
            <div className="my-20">
                <div className="flex  gap-10">
                    <div className="w-5/12">
                        <img className="rounded-lg mb-[30px]" src={product?.image} alt="product image" />
                        <div className="card bg-white shadow-lg p-6">
                            <h3 className="text-2xl font-semibold mb-6">Product Description</h3>
                            <div className="flex items-center justify-between font-semibold mb-3">
                                <p><span className="primary-text">Condition</span>: {product?.condition}</p>
                                <p><span className="primary-text">Usage Time</span>: {product?.usage}</p>
                            </div>
                            <hr className="mb-6" />
                            <p className="font-medium">{product?.description}</p>
                        </div>
                    </div>

                    <div className="w-7/12">
                        <div className="mb-6">
                            <h4 className="text-[20px] font-medium text-secondary mb-4">
                                <Link className="flex items-center gap-2" to="/all-products"><FaArrowLeftLong /> Back To Products</Link>
                            </h4>
                            <h2 className="text-5xl text-secondary font-bold mb-[22px]">{product?.title}</h2>
                            <div className="badge badge-info">{product?.category}</div>
                        </div>

                        <div className="bg-white shadow-lg p-6 mb-6">
                            <h4 className="font-bold text-[28px] text-[#4CAF50]">${product.price_min} - {product.price_max}</h4>
                            <p className="text-secondary mt-2">Price starts from</p>
                        </div>

                        <div className="bg-white shadow-lg p-6 mb-6">
                            <h4 className="font-semibold text-2xl text-secondary mb-6">Product Details</h4>
                            <p className="text-secondary mb-3"><span className="font-semibold">Product ID:</span> {product?._id}</p>
                            <p className="text-secondary"><span className="font-semibold">Posted:</span> {formatDate(product?.created_at)}</p>
                        </div>

                        <div className="bg-white shadow-lg p-6 mb-6">
                            <h4 className="font-semibold text-2xl text-secondary mb-6">Seller Information</h4>
                            <div className="flex items-center gap-4 mb-4">
                                <img className="w-[56px] h-[56px] rounded-full" src={product?.seller_image} alt="seller image"/>
                                <div>
                                    <p className="font-semibold">{product?.seller_name}</p>
                                    <p>{product?.email}</p>
                                </div>
                            </div>
                            <p className="text-secondary mb-3"><span className="font-semibold">Location:</span> {product?.location}</p>
                            <p className="text-secondary mb-3"><span className="font-semibold">Contact:</span> {product?.seller_contact}</p>
                            <p className="text-secondary"><span className="font-semibold">Status:</span> <span className="badge badge-warning">{product?.status}</span></p>
                        </div>

                        <button onClick={handleBidModalOpen} className="btn btn-primary w-full">I want Buy This Product</button>

                        <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-2xl text-center">Give Seller Your Offered Price</h3>

                                <form onSubmit={handleBidSubmit}>
                                    <fieldset className="fieldset">
                                        <div className="flex gap-4">
                                            {/* name */}
                                            <div>
                                                <label className="label">Buyer Name</label>
                                                <input name="name" type="text" className="input"
                                                       defaultValue={user?.displayName} readOnly/>
                                            </div>
                                            {/* email */}
                                            <div>
                                                <label className="label">Buyer Email</label>
                                                <input name="email" type="email" className="input"
                                                       defaultValue={user?.email} readOnly/>
                                            </div>
                                        </div>
                                        {/* image url */}
                                        <label className="label">Buyer Image URL</label>
                                        <input name="photo" type="text" className="input w-full"
                                               defaultValue={user?.photoURL} readOnly/>
                                        {/* price */}
                                        <label className="label">Place your Price</label>
                                        <input name="price" type="text" className="input w-full" placeholder="$600"/>
                                        {/* contact info */}
                                        <label className="label">Contact Info</label>
                                        <input name="contact" type="text" className="input w-full"
                                               placeholder="e.g. +1-555-1234"/>
                                        <button className="btn btn-primary mt-4">Submit Bid</button>
                                    </fieldset>
                                </form>

                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-secondary mr-4">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>

            {/* bids for this product */}
            <div>
                <h3 className="font-bold text-5xl my-10">Bids For This Products: <span
                    className="primary-text">{bids.length}</span></h3>
                <div className="overflow-x-auto bg-white mb-[100px]">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#AAACBB07]">
                            <tr>
                                <th>SL No.</th>
                                <th>Product</th>
                                <th>Bider</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            bids.map((bid, index) => <tr key={bid._id}>
                                <th>{index+1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={bid?.product_image}
                                                    alt="product image"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid?.product_title}</div>
                                            <div className="text-sm opacity-50">${bid?.product_price_min}-{bid?.product_price_max}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={bid?.buyer_image}
                                                    alt="product image"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid?.buyer_name}</div>
                                            <div className="text-sm opacity-50">{bid?.buyer_email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${bid?.bid_price}</td>
                                <th>
                                    <button className="btn btn-outline btn-success mr-2">Accept Offer</button>
                                    <button className="btn btn-outline btn-error">Reject Offer</button>
                                </th>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;