import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
   
    const [disabled, setDisabled] = useState(true)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location= useLocation();

    let from = location.state?.from?.pathname || "/";
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(res=>{
                const user = res.user
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log in Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate(from, { replace: true });
            })
    }
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value
        console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }
    return (
     <>
       <Helmet>
                <title>Bistro Boss | Login</title>
                {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
            </Helmet>
     <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type The Text above" className="input input-bordered" required />
                                
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" value='Login' type="submit" disabled={disabled} />
                            </div>
                        </form>
                        <p className='px-6'>New Here <Link to='/signup'>Sign Up</Link></p>
                    


                    <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div></>
    );
};

export default Login;