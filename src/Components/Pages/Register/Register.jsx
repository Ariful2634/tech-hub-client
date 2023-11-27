import { useContext } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import SocialLogIn from "../Login/SocialLogIn";
import { AuthContext } from "../../Provider/AuthProvider";


const Register = () => {

    const { createUser, updateUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database

                        const userInfo = {
                            name: data.name,
                            email: data.email

                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "User created successfully",
                                        title: "Your work has been saved",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })

                    })
                    .catch()

                navigate('/')

            })
            .catch(error => {
                console.log(error)
            })



    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col w-96">
              
                <div className="card flex-shrink-0 w-full  max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" name="name" {...register("name")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURl</span>
                            </label>
                            <input type="text" placeholder="PhotoURl" name="photoURL" {...register("photoURL")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" {...register("email")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Password" name="password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className="text-red-600 mt-2 font-bold">password is required</span>}
                            {errors.password?.type === 'minlength' && <span className="text-red-600 mt-2 font-bold">password must be 6 characters or more </span>}
                            {errors.password?.type === 'maxlength' && <span className="text-red-600 mt-2 font-bold">password must be less than 20 characters</span>}

                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <div>
                            <p>Do not have an account? <Link to='/login'>Login</Link></p>
                        </div>
                    </form>
                    {/* <div>
                        <SocialLogIn></SocialLogIn>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Register;