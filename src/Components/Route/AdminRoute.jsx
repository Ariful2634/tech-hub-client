/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading]=useAdmin()

    const {user,loading}=useContext(AuthContext)
    const location = useLocation()

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>;
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate state={{from:location}} to='/login'></Navigate>
};

export default AdminRoute;