import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Login = () => {

    const {logIn,googleLogIn}=useContext(AuthContext)

   

    const[show,setShow]=useState(false)
    const location=useLocation()
    const navigate = useNavigate()

    const from = location?.state?.from?.pathname || "/"

    const handleLogin = e=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)

        logIn(email,password)
        .then(res=>{
            const loggedInUser = res.user;
            console.log(loggedInUser)
             
           
            Swal.fire(
                'Congratulations',
                'You Logged In Successfully!',
                'success'
              )
              navigate(from,{replace:true});
             
              
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const handleGoogle = ()=>{
        googleLogIn()
        .then(result=>{
            const user = result.user
            console.log(user)
            Swal.fire(
                'Congratulations',
                'You Logged In Successfully!',
                'success'
              )
              navigate(from,{replace:true});
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-[420px] flex-col lg:flex-row">
                   
                    <div className="card flex-shrink-0 w-full max-w-sm  border border-purple-800">
                        
                        <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl font-bold text-center">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={show ? "text" : "password"} name='password' placeholder="Password" className="input input-bordered" required />
                            <span className='absolute top-[53px] left-[280px]' onClick={()=>(setShow(!show))}>{show ? <FaEyeSlash></FaEyeSlash>  : <FaEye></FaEye>}</span>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn text-white font-bold bg-[#FF3811]">Login</button>
                            </div>
                        </form>
                        <div className="divider">Or Sign In With</div> 
                        <div className='text-center mb-3 mt-3'>
                            
                            <button onClick={handleGoogle} className='btn btn-outline btn-primary'><FaGoogle></FaGoogle>Login With Google</button>
                        </div>
                        <div>
                        <p className='text-center mb-4'>Do not have an account? <Link className='text-orange-600 font-bold' to='/register'>Register</Link></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;