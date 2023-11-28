import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Feature from "./Feature";
import { useQuery } from "@tanstack/react-query";


const FeatureProduct = () => {

    const axiosPublic = useAxiosPublic()
    
    const [asc,setAsc]=useState(true)
    const mark = 'featured'

    

    const {refetch,  data: feature = [] } = useQuery({
        queryKey: ['feature'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/addProduct?sort=${asc ? 'asc' : 'des'}`)
            return res.data

        }

    })

    const featured = feature.filter(feat=>feat.mark==mark)
    // console.log(featured)

   

    return (
        <div>
            <h2 className="text-center font-bold text-3xl italic mt-16 mb-8">Feature Products</h2>
            <div className="text-center mb-8">
                <button onClick={()=>setAsc(!asc)} className="btn btn-secondary">{ asc ? 'latest' : 'oldest'}</button>
            </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:ml-48 ml-5 lg:ml-28">
            {
                featured.slice(0,4).map(product=><Feature key={product._id} product={product} refetch={refetch}></Feature>)
            }
           </div>
        </div>
    );
};

export default FeatureProduct;