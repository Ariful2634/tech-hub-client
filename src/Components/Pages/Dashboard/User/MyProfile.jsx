import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MyProfile = () => {

    const { user } = useContext(AuthContext)

    const axiosSecure = useAxiosSecure()

    const { data: payments = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')
            return res.data
            
        }
        
    })
    console.log(payments)

    const payment = payments.find(pay=>pay.email==user?.email)
    console.log(payment)


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subscribe</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                   
                                </div>
                            </td>
                            <td>
                                {user.displayName}
                               
                            </td>
                            <td>{user.email}</td>
                            <td>
                               {
                                payment?.transactionId ?  <button className="btn  btn-success" disabled>BDT 200tk</button> :
                                <Link to='/dashboard/payment'> <button className="btn  btn-success">BDT 200tk</button></Link>

                               }
                            </td>
                            <td className="text-blue-600 font-bold">
                                {
                                    payment?.transactionId ? 'Verified' : 'Not Verified'
                                }
                            </td>
                        </tr>
                      
                        
                       
                    </tbody>
                    

                </table>
            </div>
        </div>
    );
};

export default MyProfile;