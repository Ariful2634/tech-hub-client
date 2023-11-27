import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useState } from "react";


const ProductReviewQueue = () => {

    const axiosSecure = useAxiosSecure()
    // const {confirm,setConfirm}=useState(false)

    const { refetch, data: products = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addProduct')
            return res.data

        }

    })

    // const feat = products.map(pro => pro)
    // console.log(feat)



    const handleFeatured = (id) => {
        // console.log(id)

        // const featured = feat.find(data => data._id == id)
        // console.log(featured)
        // axiosSecure.post('/featureProduct', featured)
        //     .then(res => {
        //         console.log(res.data)
        //         if (res.data.insertedId) {
        //             Swal.fire(
        //                 'Congratulations',
        //                 `${featured.product_name} Successfully added to the featured product`,
        //                 'success'
        //             )
        //         }
        //     })
        console.log(id)
        const featured = { mark: 'featured' }
        console.log(featured)
        // axiosSecure.put(`/addProduct/mark/${id}`, featured)
        //     .then(res => {
        //         console.log(res.data)
        //         if (res.data.insertedId) {
        //                         Swal.fire(
        //                             'Congratulations',
        //                             `${featured.product_name} Successfully added to the featured product`,
        //                             'success'
        //                         )
        //                     }
        //         refetch()
        //     })
    }

    const handleAccept = (id) => {
        const accepted = { status: 'accept' }
        console.log(accepted)
        axiosSecure.put(`/addProduct/status/${id}`, accepted)
            .then(res => {
                console.log(res.data)
                refetch()
            })
        // console.log(id)

    }

    const handleReject = (id) => {
        const rejected = { status: 'reject' }
        console.log(rejected)
        axiosSecure.put(`/addProduct/status/${id}`, rejected)
            .then(res => {
                console.log(res.data)
                refetch()
            })
        // console.log(id)

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
                                <td>
                                    {
                                        product.mark === 'featured' ? <button  className="btn btn-accent btn-disabled">Featured</button> :
                                        <button onClick={() => handleFeatured(product._id)} className="btn btn-accent">Featured</button>
                                    }
                                    </td>
                                <td>
                                    {
                                        product.status === 'accept' ? <button className="btn btn-accent btn-disabled">Accept</button> :
                                            <button onClick={() => handleAccept(product._id)} className="btn btn-accent">Accept</button>
                                    }
                                </td>
                                <td>
                                    {
                                        product.status === 'reject' ? <button className="btn btn-accent btn-disabled">Reject</button> :
                                            <button onClick={() => handleReject(product._id)} className="btn btn-accent">Reject</button>

                                    }
                                </td>

                                {
                                    product.status === 'ending' ? <td>{product.status}</td> :
                                        <td> {product.status === 'accept' && "Accepted"}
                                            {product.status === 'reject' && "Rejected"}

                                        </td>
                                }

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductReviewQueue;