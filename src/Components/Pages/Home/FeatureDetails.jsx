import { GiVote } from "react-icons/gi";
import { useLoaderData, useParams } from "react-router-dom";
import { MdOutlineReport } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
// import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";




const FeatureDetails = () => {

    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    

    

    const load = useLoaderData()
    // console.log(load)
    const { id } = useParams()
    // console.log(id)

    const details = load.find(detail => detail._id == id)
    const mail = user?.email === details?.email;
    console.log(mail)

    const handleReport = id=>{
        // console.log(id)
        const reported = {
           
            status:'reported',

          
        }
        console.log(reported)
        axiosPublic.put(`/addProduct/status/${id}`,reported)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You Reported the product",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleForm = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const opinion = form.opinion.value;
        const rating = form.rating.value;
        const rat = parseFloat(rating)

        const reviews = { product_name: details.product_name, name, image, opinion, rat }
        console.log(reviews)

        axiosPublic.post('/reviews', reviews)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You reviewed successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }



    
    const {  data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews')
            return res.data

        }

    })

    const getReview = review.filter(view => view.product_name === details.product_name)
    console.log(getReview)

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
            <div className="flex flex-col md:flex-row lg:flex-row lg:ml-10 lg:gap-20">
                <div className="card w-[420px] ml-0 bg-base-100 shadow-xl mt-10">
                    <figure><img className="h-[200px]" src={details.product_image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Name: {details.product_name}</h2>
                        <p className="font-medium">{details.description}</p>
                        <p className="space-x-3"><span className="font-bold text-blue-600">Tags:</span> #{details.tags}</p>
                        <p><span className="font-bold">External Links:</span> {details.links}</p>
                        <div className="card-actions justify-between mt-4">

                        {
                            details.upvoted || mail || !user? <button  className="btn text-blue-600 w-full mt-4 bg-gradient-to-r from-cyan-600 to-pink-300 " disabled><GiVote></GiVote>Upvote ({details.upvoted})</button> :
                            <button onClick={()=>handleUpvote(details._id)} className="btn text-white w-full mt-4 bg-gradient-to-r from-cyan-600 to-pink-300"><GiVote></GiVote>Upvote ({details.upvoted})</button>
                           }
                            {
                                details.status === 'reported' ? <button className="btn btn-error btn-disabled"><MdOutlineReport></MdOutlineReport>Report</button> :
                                <button onClick={()=>handleReport(details._id)} className="btn btn-error w-full"><MdOutlineReport></MdOutlineReport>Report</button>
                            }

                        </div>
                    </div>
                </div>
                {/* review form */}
                <div className="flex-1">
                    <h1 className="text-center mt-4 text-blue-600 font-bold text-2xl">Share Your Opinion</h1>

                    <div className="hero mt-6">
                        <div className="hero-content w-[420px] md:w-96 lg:w-[420px] flex-col ">

                            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form onSubmit={handleForm} className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" placeholder="Name" name="name" defaultValue={user?.displayName} className="input input-bordered border-success" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Image</span>
                                        </label>
                                        <input type="text" placeholder="Image" defaultValue={user?.photoURL} name="image" className="input input-bordered border-success" required />

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Give Your Opinion</span>
                                        </label>
                                        <textarea className="textarea textarea-success" placeholder="Description" name="opinion"></textarea>

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Give Rating</span>
                                        </label>
                                        <input type="text" placeholder="Rating" name="rating" className="input input-bordered border-success" required />

                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* review */}
            <div>
                
                   
                   {
                    getReview.length > 0 ? 
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        getReview.map(rev => <SwiperSlide key={rev._id}>
                            <div className="py-16 mx-24 space-y-3 flex flex-col items-center">
                                <img className="w-[80px] h-[80px] rounded-full" src={rev.image} alt="" />
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={rev.rat}
                                    readOnly
                                />
                                <p className="text-center">{rev.opinion}</p>
                                <h2 className="text-green-600 font-bold">{rev.name}</h2>
                            </div>
                        </SwiperSlide>)
                    }


                </Swiper>  :
                    <p className="text-center font-bold text-4xl text-red-600 mt-20">There is no review yet</p>
                   } 
                
                
            </div>
        </div>
    );
};

export default FeatureDetails;