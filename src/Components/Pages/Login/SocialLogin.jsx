import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {

    const {googleLogIn}=useContext(AuthContext)
    const location=useLocation()
    const navigate = useNavigate()
    const axiosPublic=useAxiosPublic()

    const from = location?.state?.from?.pathname || "/"


    const handleSocial = ()=>{
        googleLogIn()
        .then(res=>{
            const user = res.user;
            console.log(user)
            const userInfo={
                email:user?.email,
                name:user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data)
            })
            navigate(from,{replace:true});
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div className="text-center">
                <button onClick={handleSocial} className="btn btn-outline text-purple-600"><FaGoogle></FaGoogle> Login With Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;