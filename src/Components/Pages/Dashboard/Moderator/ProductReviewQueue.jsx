import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import { useState } from "react";


const ProductReviewQueue = () => {

    const axiosSecure = useAxiosSecure()
    // const {confirm,setConfirm}=useState(false)

    const {refetch, data: products = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addProduct')
            return res.data

        }

    })

    const feat = products.map(pro=>pro)
    // console.log(feat)

   

    const handleFeatured = (id) => {
        // console.log(id)
        
        const featured = feat.find(data=>data._id==id)
        // console.log(featured)
        axiosSecure.post('/featureProduct',featured)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire(
                    'Congratulations',
                     `${featured.product_name} Successfully added to the featured product`,
                    'success'
                  )
            }
        })
    }

    const handleAccept = (id)=>{
        const accepted = {status:'accept'}
        console.log(accepted)
        axiosSecure.put(`/addProduct/status/${id}`,accepted)
        .then(res=>{
            console.log(res.data)
        })
        // console.log(id)
        refetch()



    }

   

  

    return (
        <div>
            <div className="overflow-x-auto flex lg:flex-row flex-col">
                <table className="table table-zebra flex lg:flex-row flex-col">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>View Details</th>
                            <th>Featured</th>
                            <th>Accept</th>
                            <th>Reject</th>
                            <th>Status</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => <tr key={product._id}>
                                <td>{product.product_name}</td>
                                <td> <Link to={`/featureDetails/${product._id}`}><button className="btn btn-accent">View Details</button></Link> </td>
                                <td><button onClick={()=>handleFeatured(product._id)} className="btn btn-accent">Featured</button></td>
                                <td><button onClick={()=>handleAccept(product._id)} className="btn btn-accent">Accept</button></td>
                                <td><button className="btn btn-accent">Reject</button></td>
                                <td> {product.status === 'accept' ? "Accept" : "Pending"}</td>


                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductReviewQueue;