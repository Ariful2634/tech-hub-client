/* eslint-disable react/prop-types */

import { useContext } from "react";
import { GiVote } from "react-icons/gi";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const Trending = ({product,refetch}) => {

    const {_id, product_image, product_name, timestamp, upvoted,voteEmail} = product

    const {user}=useContext(AuthContext)
   

    const mail = user?.email === product?.email;
    console.log(mail)


    const voteMail = user?.email===voteEmail

    const axiosPublic = useAxiosPublic()


    const handleUpvote = id=>{
       
        const upvote = { upvote: upvoted + 1, voteEmail:user?.email }
        console.log(upvote)
        axiosPublic.put(`/trendingProduct/upvote/${id}`, upvote)
            .then(res => {
                console.log(res.data)
                if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You vote this successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                
            })
        console.log(id)
    }

    return (
        <div>
            <div className="card w-96 h-[460px] p-4 bg-base-100 shadow-xl">
                    <figure><img className="h-[200px]" src={product_image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Name: {product_name}</h2>
                        {/* <p className="space-x-3"><span className="font-bold text-blue-600">Tags:</span> <span>#{tags[0]}</span> <span>#{tags[1]}</span> <span>#{tags[2]}</span></p> */}
                        <div className="card-actions justify-between mt-4 items-center">
                            <p>{timestamp}</p>
                            {
                           voteMail ||  mail || !user?  <Link to='/login'><button  className="btn text-blue-600 w-full  mt-4  " disabled><GiVote></GiVote>Upvote ({upvoted})</button></Link> :
                            <button onClick={()=>handleUpvote(_id)} className="btn text-white w-full mt-4 bg-gradient-to-r from-cyan-600 to-pink-300"><GiVote></GiVote>Upvote ({upvoted})</button>
                           }

                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Trending;