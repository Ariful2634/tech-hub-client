/* eslint-disable react/prop-types */
// import { useContext } from "react";
// import { useState } from "react";
import { GiVote } from "react-icons/gi";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvider";

const Feature = ({ product }) => {

    // const {user}=useContext(AuthContext)
    // const [count,setCount]=useState(0)

    const { _id, product_image, product_name, tags, timestamp } = product





    return (
        <div>
            <Link to={`/featureDetails/${_id}`}>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img className="h-[200px]" src={product_image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product_name}</h2>
                        <p className="space-x-3"><span className="font-bold text-blue-600">Tags:</span> <span>#{tags[0]}</span> <span>#{tags[1]}</span> <span>#{tags[2]}</span></p>
                        <div className="card-actions justify-between">
                            <p>{timestamp}</p>
                            <button className="btn btn-primary"><GiVote></GiVote>Upvote </button>

                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Feature;