import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {  FaTrashAlt, FaUsers } from "react-icons/fa";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure()

    const {refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    console.log(users)

    const handleMakeAdmin = id=>{
        console.log('click')
        axiosSecure.patch(`/users/admin/${id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${users.name} is an Admin Now !`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleDelete = id=>{
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                .then(res=>{
                    if(res.data.deletedCount > 0){
                        refetch()
                        Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                    }
                    // console.log(res)
                })

              
            }
          });
    }


    return (
        <div>
        <div className="flex justify-evenly">
            <h2 className="text-3xl">All Users: </h2>
            <h2 className="text-3xl">Total Users: {users.length}</h2>
        </div>
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index)=><tr key={user._id}>
                            <th>{index+1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                           { user.role == 'admin' ? 'Admin' : <button onClick={()=>handleMakeAdmin(user._id)}  className="btn bg-orange-600  btn-lg">
                                    <FaUsers className="text-white"></FaUsers>
                                </button>}
                            </td>
                           
                            <td>
                            <button onClick={()=>handleDelete(user._id)} className="btn btn-ghost btn-lg">
                                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                </button>
                            </td>
                        </tr>)
                    }
                    

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllUsers;