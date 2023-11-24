import { GiVote } from "react-icons/gi";
import { useLoaderData, useParams } from "react-router-dom";



const FeatureDetails = () => {

    const load = useLoaderData()
    console.log(load)
    const {id}=useParams()
    console.log(id)

    const details = load.find(detail=>detail._id==id)

    return (
        <div>
            <div className="card w-[400px] ml-3 bg-base-100 shadow-xl mt-10">
                    <figure><img className="h-[200px]" src={details.product_image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{details.product_name}</h2>
                        <p>{details.description}</p>
                        <p className="space-x-3"><span className="font-bold text-blue-600">Tags:</span> <span>#{details.tags[0]}</span> <span>#{details.tags[1]}</span> <span>#{details.tags[2]}</span></p>
                        <div className="card-actions justify-between mt-4">
                            
                            <button className="btn btn-primary"><GiVote></GiVote>Upvote </button>
                            <button className="btn btn-error">Report</button>

                        </div>
                    </div>
                </div>
        </div>
    );
};

export default FeatureDetails;