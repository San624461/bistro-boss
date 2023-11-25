// import React from 'react';
import { TiCalendar, TiHome, TiMail, TiShoppingCart, TiStar, TiThList, TiThMenu, TiUser, } from 'react-icons/ti';

import { FaBook, FaList, FaUtensils } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../../../../Hooks/useCart';
import useAdmin from '../../../../Hooks/useAdmin';

const DashBoard = () => {
    const [cart] = useCart()

    // todo : get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (

        <div className='flex'>
            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen bg-red-400">

                <ul className='menu p-4'>
                    {
                        isAdmin ? <>

                            <li>
                                <NavLink to='/dashboard/adminHome'>
                                    <TiHome></TiHome> Admin Home</NavLink>  </li>
                            <li>
                                <NavLink to='/dashboard/addItems'>

                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>  </li>
                            <li>
                                <NavLink to='/dashboard/manageItems'>
                                    <FaList></FaList>
                                    Manage Items</NavLink>  </li>
                            <li>
                                <NavLink to='/dashboard/bookings'>
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink>  </li>
                            <li>
                                <NavLink to='/dashboard/users'>
                                    <TiUser></TiUser>
                                    All Users</NavLink>  </li>
                        </>


                            :
                            <>
                                <li>

                                    <NavLink to='/dashboard/cart'>

                                        <TiShoppingCart></TiShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/userHome'>
                                        <TiHome></TiHome> User Home</NavLink>  </li>
                                <li>
                                    <NavLink to='/dashboard/history'>
                                        <TiCalendar></TiCalendar>Not history
                                    </NavLink>  </li>
                                <li>
                                    <NavLink to='/dashboard/review'>
                                        <TiStar></TiStar>
                                        Review</NavLink>  </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <TiThList></TiThList>
                                        Payment real History</NavLink>  </li></>
                    }

                    <div className="divider"></div>
                    {/* shared navlinks */}
                    <li>
                        <NavLink to='/'>
                            <TiHome></TiHome>
                            Home</NavLink>  </li>
                    <li>
                        <NavLink to='/order/salad'>
                            <TiThMenu></TiThMenu>
                            Menu</NavLink>  </li>
                    <li>
                        <NavLink to='/order/contact'>
                            <TiMail></TiMail>
                            Contact</NavLink>  </li>
                </ul>



            </div>

            {/* dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;