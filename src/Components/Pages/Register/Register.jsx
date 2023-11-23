import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate()
    const {createUser}=useContext(AuthContext)
    const[show,setShow]=useState(false)
    const [pass, setPass] = useState("")
    const handleRegister = e =>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,photo,email,password)

        setPass("")

        if (password.length < 6) {
            form.reset()
            return setPass("Password should be at least 6 characters or longer")
        }

        else if (!/[A-Z]/.test(password)) {
            form.reset()
            return setPass("Password should contain at least one uppercase letter")
        }

        else if (!/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(password)) {
            form.reset()
            return setPass("Password should contain at least one special  character")
        }

        createUser(email,password)
        .then(res=>{
            const user = res.user
            updateProfile(user,{
                displayName:name,
                photoURL:photo
              })
            console.log(user)
            Swal.fire(
                'Congratulations',
                'User Created Successfully!',
                'success'
              )
              navigate('/')
        })
        .catch(err=>{
            setPass(err.message)
            console.log(err)
        })
    }

    return (
        <div>
            <div className="hero min-h-screen  bg-base-200">
            <div className="hero-content w-[420px] flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full max-w-sm  border border-orange-600">
                    <form onSubmit={handleRegister} className="card-body">
                    <h1 className="text-5xl font-bold text-center">Register</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered" required />
                        </div>
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
                          
                        </div>
                        <div>
                                {
                                    pass && <p className="text-red-400 font-bold">{pass}</p>
                                }
                            </div>
                        <div className="form-control mt-6">
                            <button className="btn text-white font-bold bg-[#FF3811]">Register</button>
                        </div>
                    </form>
                    <div>
                        <p className='text-center mb-4'>Already have an account? <Link className='text-orange-600 font-bold' to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;