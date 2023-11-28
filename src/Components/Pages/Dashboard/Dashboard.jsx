// import {  useState } from "react";
import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useModerator from "../../hooks/useModerator";

// import { Outlet } from "react-router-dom";


const Dashboard = () => {

    const [isModerator] = useModerator()
    const [isAdmin] = useAdmin()
    // const { user } = useContext(AuthContext)
    console.log(isModerator,isAdmin)

    return (


        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col mt-10 lg:mx-28">
                {/* Page content here */}
                <div className="">
                    <Outlet></Outlet>
                </div>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="w-64 min-h-screen bg-sky-700">
                    <ul className="menu text-white italic">

                        {
                            isAdmin ? <>
                                <li>
                                    <NavLink to='/dashboard/manageUsers'> Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageCoupons'> Manage Coupons</NavLink>
                                </li>
                            </>
                        
                        :

                        
                            isModerator ? <>
                                <li>
                                    <NavLink to='/dashboard/productReviewQueue'> Product Review Queue</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reportedContents'> Reported Contents</NavLink>
                                </li>

                            </>
                            :
                        
                             <>
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