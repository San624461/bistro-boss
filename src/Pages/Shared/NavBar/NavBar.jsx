import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { TiShoppingCart } from "react-icons/ti";
import useCart from '../../../Hooks/useCart';
import useAdmin from '../../../Hooks/useAdmin';
const NavBar = () => {

  const { user, logOut } = useContext(AuthContext)
  const [cart] = useCart()
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    logOut()
      .then(() => {


        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => console.error(error))
  }
  const navOptions = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/menu'>Our Menu</NavLink></li>
    <li><NavLink to='/order/salad'>Order Food</NavLink></li>
    {
      // user ? 'true' : 'false'
      //user?  condition ? 'double true' : 'one true' : 'false
    }
    {
      user && isAdmin && <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
    }
    {
      user && !isAdmin && <li><NavLink to='/dashboard/userHome'>Dashboard</NavLink></li>
    }
    <li>
      <Link to='/dashboard/cart'>

        <button className="btn">
          <TiShoppingCart className='mr-2'></TiShoppingCart>
          <div className="badge badge-secondary">+{cart.length}</div>
        </button>
      </Link>
    </li>
    {
      user ? <>
        {/* <span>{user?.displayName}</span> */}
        <button className="btn btn-ghost" onClick={handleLogout}>LogOut</button>
      </> : <>

        <li><NavLink to='/login'>Login</NavLink></li></>
    }

  </>
  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white  w-[87%] md:w-[92%] lg:w-[80%]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Bistro Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navOptions}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default NavBar;