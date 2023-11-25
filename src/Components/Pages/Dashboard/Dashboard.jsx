import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex max-w-6xl mx-auto">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu text-white">
                    <li>
                        <NavLink to='/dashboard/myProfile'> My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/addProducts'> Add Products</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myProducts'> My Products</NavLink>
                    </li>
                    {/* shared */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}><FaHome></FaHome>Home</NavLink>
                    </li>
                </ul>

            </div>
            <div className="flex-1 p-6 ml-16">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;