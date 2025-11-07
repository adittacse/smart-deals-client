import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const MyBids = () => {
    const [myBids, setMyBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // using axios secure
    useEffect(() => {
        axiosSecure.get(`/my-bids?email=${user.email}`)
            .then(data => {
                setMyBids(data.data);
                setLoading(false);
            })
    }, [axiosSecure, user?.email]);

    // for the jwt authorization
    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`https://smart-deals-server-bvmm.onrender.com/my-bids?email=${user.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${localStorage.getItem("token")}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 setMyBids(data);
    //                 setLoading(false);
    //             });
    //     }
    // }, [user?.email]);

    const handleDeleteBid = (_id) => {
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
                fetch(`https://smart-deals-server-bvmm.onrender.com/bids/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                            // remaining bids
                            const remainingBids = myBids.filter(bid => bid._id !== _id);
                            setMyBids(remainingBids);
                        }
                    });
            }
        });
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className="text-center text-5xl font-bold mt-20">My Bids: <span className="primary-text">{myBids.length}</span></h2>
            <div className="overflow-x-auto bg-white mt-10 mb-20">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#AAACBB07]">
                        <tr>
                            <th>SL No.</th>
                            <th>Product</th>
                            <th>Bider</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        myBids.map((bid, index) => <tr key={bid._id}>
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
                            <td>
                                {
                                    bid?.status === "pending" ? <div className="badge badge-warning">Pending</div>
                                        : <div className="badge badge-success">Accepted</div>
                                }
                            </td>
                            <th>
                                <button onClick={() => handleDeleteBid(bid._id)} className="btn btn-outline btn-error">Remove Bid</button>
                            </th>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;