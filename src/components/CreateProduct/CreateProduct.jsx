import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Swal from "sweetalert2";

const CreateProduct = () => {
    const [condition, setCondition] = useState("fresh");

    const handleCreateProduct = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;
        const minPrice = e.target.price_min.value;
        const maxPrice = e.target.price_max.value;
        const condition = e.target.condition.value;
        const usageTime = e.target.product_usage_time.value;
        const productPhotoURL = e.target.product_image_url.value;
        const sellerName = e.target.seller_name.value;
        const sellerEmail = e.target.seller_email.value;
        const sellerContact = e.target.seller_contact.value;
        const sellerPhotoURL = e.target.seller_image_url.value;
        const location = e.target.location.value;
        const description = e.target.description.value;

        const newProduct = {
            title,
            category,
            minPrice,
            maxPrice,
            condition,
            usageTime,
            productPhotoURL,
            sellerName,
            sellerEmail,
            sellerContact,
            sellerPhotoURL,
            location,
            description
        };

        fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your product has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    return (
        <div className="my-20">
            <h4 className="text-[20px] font-medium flex items-center gap-2 justify-center mb-4"><FaArrowLeftLong /> Back To Products</h4>
            <h2 className="text-center text-5xl font-bold mb-10">Create <span className="primary-text">A Product</span></h2>
            <div className="card bg-base-100 w-full max-w-3xl shrink-0 shadow-2xl mx-auto">
                <div className="card-body">
                    <form onSubmit={handleCreateProduct}>
                        <fieldset className="fieldset">
                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* Title */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Title</span>
                                    </label>
                                    <input name="title" type="text" className="input input-bordered w-full"
                                           placeholder="e.g. Yamaha Fz Guitar for Sale" required/>
                                </div>

                                {/* Category (use label, not legend) */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Category</span>
                                    </label>
                                    <select name="category" defaultValue="" className="select select-bordered w-full">
                                        <option value="" disabled>Select a Category</option>
                                        <option>Laptop</option>
                                        <option>Phone</option>
                                        <option>Bike</option>
                                        <option>Electronics Accessories</option>
                                    </select>
                                </div>
                            </div>

                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* minimum price */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Min Price You want to Sale ($)</span>
                                    </label>
                                    <input name="price_min" type="text" className="input input-bordered w-full"
                                           placeholder="e.g. 18.5" required/>
                                </div>

                                {/* maximum price */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Max Price You want to Sale ($)</span>
                                    </label>
                                    <input name="price_max" type="text" className="input input-bordered w-full"
                                           placeholder="Optional (default = Min Price)"/>
                                </div>
                            </div>

                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* product condition */}
                                <div className="form-control w-full flex flex-col">
                                    <label className="label mb-2">
                                        <span className="label-text text-secondary">Product Condition</span>
                                    </label>
                                    <div className="flex items-center gap-12">
                                        <label className="label cursor-pointer gap-2">
                                            <input type="radio" name="condition" value="Brand New" className="radio accent-[#632EE3]" checked={condition === "fresh"} onChange={() => setCondition("fresh")} />
                                            <span className="label-text">Brand New</span>
                                        </label>

                                        <label className="label cursor-pointer gap-2">
                                            <input type="radio" name="condition" value="Used" className="radio accent-gray-300" checked={condition === "used"} onChange={() => setCondition("used")} />
                                            <span className="label-text">Used</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Product usage time */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Product Usage time</span>
                                    </label>
                                    <input name="product_usage_time" type="text" className="input input-bordered w-full"
                                           placeholder="e.g. 1 year 3 month "/>
                                </div>
                            </div>

                            {/* product image URL */}
                            <div className="form-control w-full mb-5">
                                <label className="label">
                                    <span className="label-text text-secondary">Your Product Image URL</span>
                                </label>
                                <input name="product_image_url" type="text" className="input input-bordered w-full" placeholder="https://..."/>
                            </div>

                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* seller name */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Seller Name</span>
                                    </label>
                                    <input name="seller_name" type="text" className="input input-bordered w-full"
                                           placeholder="e.g. Artisan Roasters" required/>
                                </div>

                                {/* seller email */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Seller Email</span>
                                    </label>
                                    <input name="seller_email" type="email" className="input input-bordered w-full"
                                           placeholder="leli31955@nrlord.com"/>
                                </div>
                            </div>

                            {/* 2-column row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start mb-5">
                                {/* seller Contact */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Seller Contact</span>
                                    </label>
                                    <input name="seller_contact" type="text" className="input input-bordered w-full"
                                           placeholder="e.g. +1-555-1234" required/>
                                </div>

                                {/* seller image url */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-secondary">Seller Image URL</span>
                                    </label>
                                    <input name="seller_image_url" type="text" className="input input-bordered w-full"
                                           placeholder="https://..."/>
                                </div>
                            </div>

                            {/* location */}
                            <div className="form-control w-full mb-5">
                                <label className="label">
                                    <span className="label-text text-secondary">Location</span>
                                </label>
                                <input name="location" type="text" className="input input-bordered w-full" placeholder="City, Country"/>
                            </div>

                            {/* description */}
                            <div className="form-control w-full mb-5">
                                <legend className="label text-secondary">Simple Description about your Product</legend>
                                <textarea name="description" className="textarea w-full h-24" placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning
 guitar is so tough..... "></textarea>
                            </div>

                            <button className="btn btn-primary">Create A Product</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;