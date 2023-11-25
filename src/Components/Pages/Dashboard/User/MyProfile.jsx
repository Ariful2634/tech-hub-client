import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const MyProfile = () => {

    const { user } = useContext(AuthContext)

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
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                      
                        
                       
                    </tbody>
                    

                </table>
            </div>
        </div>
    );
};

export default MyProfile;