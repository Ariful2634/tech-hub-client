import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const ReportedContents = () => {

    const axiosSecure = useAxiosSecure()
    
    const report = 'reported'

    const {refetch,  data: products = [] } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addProduct')
            return res.data

        }

    })
    console.log(products)

    const reported = products.filter(product=>product.status === report)
    console.log(reported)


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

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                         
                            <th>Product Name</th>
                            <th>View Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reported.map(repo=> <tr key={repo._id}>
                        
                                <td>{repo.product_name}</td>
                                <td><Link to={`/featureDetails/${repo._id}`}><button className="btn btn-primary">View Details</button></Link></td>
                                <td><button onClick={()=>handleDelete(repo._id)} className="btn"><FaTrash className="text-red-600"></FaTrash></button></td>
                            </tr>)
                        }
                       
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedContents;