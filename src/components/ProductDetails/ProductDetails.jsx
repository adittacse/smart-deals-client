import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import AuthContext from "../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const [bids, setBids] = useState([]);
    const product = useLoaderData();
    const {_id: productId} = product;
    const bidModalRef = useRef(null);
    const { user } = useContext(AuthContext);
    // console.log(product);

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                setBids(data);
            });
    }, [productId]);

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

        fetch("http://localhost:3000/bids", {
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
            <div>
                <div>
                    //
                </div>

                <div>
                    <button onClick={handleBidModalOpen} className="btn btn-primary">I want Buy This Product</button>

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
            {/* bids for this product */}
            <div>
                <h3 className="font-bold text-5xl my-10">Bids For This Products: <span
                    className="primary-text">{bids.length}</span></h3>
                <div className="overflow-x-auto mb-[100px]">
                    <table className="table">
                        {/* head */}
                        <thead>
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