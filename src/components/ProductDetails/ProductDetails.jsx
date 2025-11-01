import { useLoaderData } from "react-router";
import { useContext, useRef } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";

const ProductDetails = () => {
    const product = useLoaderData();
    const { _id: productId } = product;
    const bidModalRef = useRef(null);
    const { user } = useContext(AuthContext);
    console.log(product);
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

        const newBid ={
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
                    alert("Bid Success");
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
                                            <input name="name" type="text" className="input" defaultValue={user?.displayName} readOnly />
                                        </div>
                                        {/* email */}
                                        <div>
                                            <label className="label">Buyer Email</label>
                                            <input name="email" type="email" className="input" defaultValue={user?.email} readOnly />
                                        </div>
                                    </div>
                                    {/* image url */}
                                    <label className="label">Buyer Image URL</label>
                                    <input name="photo" type="text" className="input w-full" defaultValue={user?.photoURL} readOnly />
                                    {/* price */}
                                    <label className="label">Place your Price</label>
                                    <input name="price" type="text" className="input w-full" placeholder="$600" />
                                    {/* contact info */}
                                    <label className="label">Contact Info</label>
                                    <input name="contact" type="text" className="input w-full" placeholder="e.g. +1-555-1234" />
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
        </div>
    );
};

export default ProductDetails;