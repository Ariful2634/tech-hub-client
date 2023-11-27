import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

// import { Outlet } from "react-router-dom";


const Dashboard = () => {

    const [isModerator] = useState(true)
    const [isAdmin] = useAdmin()
    const { user } = useContext(AuthContext)

    return (


        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <div className="">
                    <Outlet></Outlet>
                </div>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu text-white">

                        {
                            isAdmin && <>
                                <li>
                                    <NavLink to='/dashboard/manageUsers'> Manage Users</NavLink>
                                </li>
                            </>
                        }

                        {
                            isModerator && <>
                                <li>
                                    <NavLink to='/dashboard/productReviewQueue'> Product Review Queue</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reportedContents'> Reported Contents</NavLink>
                                </li>

                            </>}
                        {
                            user && <>
                                <li>
                                    <NavLink to='/dashboard/myProfile'> My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addProducts'> Add Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/myProducts'> My Products</NavLink>
                                </li>

                            </>
                        }

                        {/* shared */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to={'/'}><FaHome></FaHome>Home</NavLink>
                        </li>
                    </ul>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;