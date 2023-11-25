import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
import useCart from '../../Hooks/useCart';

const FoodCard = ({ item }) => {
    const { image, name, recipe, price, _id } = item
    const { user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxios();
    const [, refetch] =useCart();
    const handleAddToCart = food => {

        if (user && user.email) {
            //done: send cart item to the datebase
            // console.log(user.email, food);
            const cartItem = {
                menuItemId: _id,
                email: user.email,
                name,
                image,
                price
            }
           axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} add to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                refetch()
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Login to add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                    //   Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    //   });
                    //send the user to the login page
                }
            });

        }
    }
    return (
        <div>
            <div className="card w-96 p-0 bg-base-100 shadow-xl text-center">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className='absolute right-0 mr-4 mt-4 p-1 bg-black text-white '>${price}</p>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button
                            onClick={() => handleAddToCart(item)}
                            className="text-black btn btn-outline mt-2  border-0 border-b-orange-300 border-b-4 bg-slate-200">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;