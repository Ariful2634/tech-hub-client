import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Trending from "./Trending";
import { Link } from "react-router-dom";


const TrendingProduct = () => {

    const axiosPublic = useAxiosPublic()

    const {refetch, data: trendings = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trendingProduct')
            return res.data
            
        }
        
    })
    // console.log(trending)

    const sortedProducts = trendings.slice().sort((a, b) => b.upvoted - a.upvoted);

    return (
        <div>
            <h2 className="text-center font-bold text-3xl italic mt-24 mb-12 text-green-600">Trending Products</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  md:ml-48 ml-5 lg:ml-0">
                {
                    sortedProducts.map(trending=><Trending key={trending._id} product={trending} refetch={refetch}></Trending>)
                }
            </div>
            <div className="flex justify-center mt-8">
                <Link to='/products'><button className="btn">See All Products</button></Link>
            </div>
        </div>
    );
};

export default TrendingProduct;