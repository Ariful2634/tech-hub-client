/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { GiVote } from "react-icons/gi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const Product = ({prod,refetch}) => {

    const { _id, product_image, product_name, tags, timestamp,upvoted,voteEmail } = prod

    const {user}=useContext(AuthContext)
   const axiosPublic = useAxiosPublic()

    const mail = user?.email === prod?.email;
    console.log(mail)
    const voteMail = user?.email===voteEmail

    const handleUpvote = id=>{
        
        const upvote = { upvote: upvoted + 1, voteEmail:user?.email }
        console.log(upvote)
        axiosPublic.put(`/addProduct/upvote/${id}`, upvote)
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
            <div className="border ml-16 md:ml-10 lg:ml-0 mt-8 border-purple-200 p-4 w-[300px] rounded-lg">
                <div className="flex justify-center">
                    <img className="h-[200px]" src={product_image} alt="" />
                </div>
                <div className="font-bold mt-6 space-y-2">
                    <h2><span className="text-blue-600 italic">Name:</span> {product_name}</h2>
                    <p><span className="italic text-green-600">Tags:</span> #{tags}</p>
                    <p>{timestamp}</p>
                </div>
                <div className="text-center mt-4">
                {
                           voteMail ||  mail || !user?  <Link to='/login'><button  className="btn text-blue-600 w-full  mt-4 bg-gradient-to-r from-pink-500 to-pink-300 " disabled><GiVote></GiVote>Upvote ({upvoted})</button></Link> :
                            <button onClick={()=>handleUpvote(_id)} className="btn text-white w-full mt-4 bg-gradient-to-r from-cyan-600 to-pink-300"><GiVote></GiVote>Upvote ({upvoted})</button>
                           }
                </div>
            </div>
        </div>
    );
};

export default Product;