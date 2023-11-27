import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyProduct = () => {
    const {user}=useContext(AuthContext)

    const axiosSecure = useAxiosSecure()

    const {refetch, data: products = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addProduct?email=${user?.email}`)
            return res.data

        }

    })

    const handleDelete = id=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

              axiosSecure.delete(`/addProduct/${id}`)
                .then(res=>{
                    // console.log(data)
                    if(res.data.deletedCount > 0){
                        refetch()
                        Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                              
                    }
                })

            
            }
          })
    }


    // console.log(products)
    return (
        <div>
            <div className="overflow-x-auto flex lg:flex-row flex-col">
                <table className="table table-zebra flex lg:flex-row flex-col">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Number of votes</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product=> <tr key={product._id}>
                                <td>{product.product_name}</td>
                                <td> n/a </td>
                                <td>
                                {
                                    product.status === 'Pending' ? <td>{product.status}</td> :
                                        <td> {product.status === 'accept' && "Accepted"}
                                            {product.status === 'reject' && "Rejected"}

                                        </td>
                                }
                                </td>
                                <Link to={`/dashboard/updateMyProduct/${product._id}`}><td><GrDocumentUpdate className="text-lg mt-3 text-green-600"></GrDocumentUpdate></td>
                                </Link>
                                <td ><button onClick={()=>handleDelete(product._id)} className="btn btn-sm"><FaTrash className="text-xl text-red-600"></FaTrash></button></td>
                                
                            </tr>)
                        }
                       
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;