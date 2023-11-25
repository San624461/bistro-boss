import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const SignUp = () => {
  const axiosPublic = useAxiosPublic()

  const { createUser, updateUserProfile } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
      .then(res => {
        const loggerUser = res.user
        console.log(loggerUser);
        updateUserProfile(data.name, data.photo)
          .then(() => {
            console.log('user profile info updated');
            // create user entry in the database
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
              if(res.data.insertedId){
                console.log('user added to the database');
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created Successfully",
                  showConfirmButton: false,
                  timer: 1500
                 });
                navigate('/')
              }
            })
            
          })
          .catch(error => console.log(error))
      }
      )


  }

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input  {...register("name", { required: true })} type="text" placeholder="name" name="name"
                  className="input input-bordered" />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoUrl</span>
                </label>
                <input  {...register("photo", { required: true })} type="text" placeholder="Photo URL"
                  className="input input-bordered" />
                {errors.photo && <span className="text-red-600">Photo is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} placeholder="email" name="email"
                  className="input input-bordered" required />
                {errors.email && <span>Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", {
                  required: true, minLength: 6, maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                })} placeholder="password"
                  name="password"
                  className="input input-bordered" />

                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 character</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">Password must be less than 20 character</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">Password must be one uppercase ,one lowercase ,one number and one special character</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" value='Sign Up' className="btn btn-primary" />

              </div>
            </form>
            <p className="px-4"><small>Already Have An Account <Link to='login'> Log In</Link></small></p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;