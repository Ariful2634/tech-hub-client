/* eslint-disable react/prop-types */

import { GiVote } from "react-icons/gi";


const Trending = ({product}) => {

    const { product_image, product_name, tags, timestamp } = product

    return (
        <div>
            <div className="card w-96 h-[460px] p-4 bg-base-100 shadow-xl">
                    <figure><img className="h-[200px]" src={product_image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Name: {product_name}</h2>
                        <p className="space-x-3"><span className="font-bold text-blue-600">Tags:</span> <span>#{tags[0]}</span> <span>#{tags[1]}</span> <span>#{tags[2]}</span></p>
                        <div className="card-actions justify-between mt-4 items-center">
                            <p>{timestamp}</p>
                            <button className="btn btn-primary"><GiVote></GiVote>Upvote </button>

                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Trending;