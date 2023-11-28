/* eslint-disable react/prop-types */
import { useContext } from "react";
import { GiVote } from "react-icons/gi";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const Feature = ({ product, refetch }) => {
    const { user } = useContext(AuthContext);
    const mail = user?.email === product?.email;
    const { _id, product_image, product_name, tags, timestamp, upvoted, voteEmail } = product;
    const voteMail = user?.email === voteEmail;
    const axiosPublic = useAxiosPublic();

    const handleUpvote = (id) => {
        const upvote = { upvote: upvoted + 1, voteEmail: user?.email };
        axiosPublic.put(`/addProduct/upvote/${id}`, upvote).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You voted successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <div>
            <div className="card w-96 p-4 bg-base-100 shadow-xl">
                <figure>
                    <img className="h-[200px]" src={product_image} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <Link to={`/featureDetails/${_id}`}>
                        <h2 className="card-title">Name: {product_name}</h2>
                    </Link>
                    <p className="space-x-3">
                        <span className="font-bold text-blue-600">Tags:</span> <span>#{tags}</span>{" "}
                    </p>
                    <div className="card-actions justify-between items-center mt-4">
                        <p>{timestamp}</p>
                        {voteMail || mail || !user ? (
                            <Link to="/login">
                                <button className="btn text-blue-600 w-full mt-4 " disabled >
                                    <GiVote />
                                    Upvote ({upvoted})
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={() => handleUpvote(_id)}
                                className="btn text-white w-full mt-4 bg-gradient-to-r from-cyan-600 to-pink-300"
                            >
                                <GiVote />
                                Upvote ({upvoted})
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
