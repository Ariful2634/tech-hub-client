import { Link, NavLink } from "react-router-dom";
import tech from '../Shared../../../Pages../../../assets/tech-hub-removebg-preview.png'
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaHome } from "react-icons/fa";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)


    const handleOut = () => {
        logOut()
            .then()
            .catch()
    }

    const links = <>
        <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
        <li><NavLink to='/products'>Products</NavLink></li>
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <img className="w-[150px]" src={tech} alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                        {
                            user?.email ? <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {
                                            user && <img src={user.photoURL} />
                                        }
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <button className="btn btn-sm  btn-ghost text-blue-600">{
                                            user && <p>{user.displayName}</p>
                                        }</button>

                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/myProfile'><button className="btn btn-sm  btn-ghost ml-10 text-green-600">Dashboard</button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleOut} className="btn btn-sm  btn-ghost">Logout</button>

                                    </li>
                                </ul>
                            </div>
                                :
                                <Link to='/login'>
                                    <button className="btn btn-md mr-2  btn-outline btn-primary">Login</button>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;