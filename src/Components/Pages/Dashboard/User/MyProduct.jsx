import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const MyProduct = () => {
    const {user}=useContext(AuthContext)

    const axiosSecure = useAxiosSecure()

    const { data: products = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addProduct?email=${user?.email}`)
            return res.data

        }

    })

    // console.log(products)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Number of votes</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product=> <tr key={product._id}>
                                <td>{product.product_name}</td>
                                <td>n/a</td>
                                <td>Pending</td>
                                <td><GrDocumentUpdate className="text-xl text-green-600"></GrDocumentUpdate></td>
                                <td><FaTrash className="text-xl text-red-600"></FaTrash></td>
                            </tr>)
                        }
                       
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;