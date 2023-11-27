/* eslint-disable react/prop-types */
// import { useContext } from "react";
// import { useState } from "react";
import { GiVote } from "react-icons/gi";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";

const Feature = ({ product }) => {

    const {user}=useContext(AuthContext)
    // const [count,setCount]=useState(0)

    const mail = user?.email === product?.email;
    console.log(mail)

    const { _id, product_image, product_name, tags, timestamp, upvoted } = product
    const axiosPublic = useAxiosPublic()


    const handleUpvote = id=>{
        const upvoted = { upvote: 1 }
        console.log(upvoted)
        axiosPublic.put(`/addProduct/upvote/${id}`, upvoted)
            .then(res => {
                console.log(res.data)
                if(res.data.modifiedCount > 0){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You vote this successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // refetch()
            })
        console.log(id)
    }


    return (
        <div>
            
                <div className="card w-96  p-4 bg-base-100 shadow-xl">
                    <figure><img className="h-[200px]" src={product_image} alt="Shoes" /></figure>
                    <div className="card-body">
                    <Link to={`/featureDetails/${_id}`}> <h2 className="card-title">Name: {product_name}</h2></Link>
                        <p className="space-x-3"><span className="font-bold text-blue-600">Tags:</span> <span>#{tags}</span> </p>
                        <div className="card-actions justify-between items-center mt-4">
                            <p>{timestamp}</p>
                           {
                            upvoted || mail ?  <button  className="btn text-blue-600 w-full mt-4 bg-gradient-to-r from-cyan-600 to-pink-300 btn-disabled"><GiVote></GiVote>Upvote ({upvoted})</button> :
                            <button onClick={()=>handleUpvote(_id)} className="btn text-white w-full mt-4 bg-gradient-to-r from-cyan-600 to-pink-300"><GiVote></GiVote>Upvote ({upvoted})</button>
                           }

                        </div>
                    </div>
                </div>
            
        </div>
    );
};

export default Feature;