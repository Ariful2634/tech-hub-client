import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Trending from "./Trending";


const TrendingProduct = () => {

    const axiosPublic = useAxiosPublic()

    const { data: trendings = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trendingProduct')
            return res.data
            
        }
        
    })
    // console.log(trending)

    return (
        <div>
            <h2 className="text-center font-bold text-3xl italic mt-24 mb-12 text-green-600">Trending Products</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  md:ml-48 ml-5 lg:ml-0">
                {
                    trendings.map(trending=><Trending key={trending._id} product={trending}></Trending>)
                }
            </div>
            <div className="flex justify-center mt-8">
                <button className="btn">See All Products</button>
            </div>
        </div>
    );
};

export default TrendingProduct;