import { GiVote } from "react-icons/gi";
import { useLoaderData, useParams } from "react-router-dom";
import { MdOutlineReport } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
// import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";



const FeatureDetails = () => {

    const {user}=useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const load = useLoaderData()
    // console.log(load)
    const { id } = useParams()
    // console.log(id)

    const details = load.find(detail => detail._id == id)

    const handleForm = e=>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const opinion = form.opinion.value;
        const rating = form.rating.value;

        const reviews = {name,image,opinion,rating}
        console.log(reviews)

        axiosPublic.post('/reviews', reviews)
        .then(res=>{
            if(res.data.insertedId){
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

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:ml-10 gap-20">
                <div className="card w-[420px] ml-0 bg-base-100 shadow-xl mt-10">
                    <figure><img className="h-[200px]" src={details.product_image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Name: {details.product_name}</h2>
                        <p>{details.description}</p>
                        <p className="space-x-3"><span className="font-bold text-blue-600">Tags:</span> <span>#{details.tags[0]}</span> <span>#{details.tags[1]}</span> <span>#{details.tags[2]}</span></p>
                        <div className="card-actions justify-between mt-4">

                            <button className="btn btn-primary"><GiVote></GiVote>Upvote </button>
                            <button className="btn btn-error"><MdOutlineReport></MdOutlineReport>Report</button>

                        </div>
                    </div>
                </div>
                {/* review form */}
                <div className="flex-1">
                    
                        <div className="hero mt-10">
                            <div className="hero-content w-[420px] flex-col ">
                              
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
        </div>
    );
};

export default FeatureDetails;