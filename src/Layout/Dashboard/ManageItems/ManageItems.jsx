// import React from 'react';

import { TiEdit, TiScissors, TiTrash } from "react-icons/ti";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu] = useMenu();
    const axiosSecure = useAxios()
    const handleDelete = (item) => {
        // console.log('clicked');
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(item._id);

                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data);
                if(res.data.deletedCount > 0){

                       Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
               
            }
        });

    }
    return (
        <div>
            <SectionTitle
                heading={'manage all items'}
                subHeading='hurry up'
            ></SectionTitle>


            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>

                                    {item.name}
                                </td>
                                <td className="text-right">${item.price}</td>
                                <td>
                                  <Link to={`/dashboard/updateItem/${item._id}`}>
                                  <button

className="btn btn-warning btn-md">
<TiEdit></TiEdit>
</button></Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="btn btn-warning btn-md bg-red-600">
                                        <TiTrash></TiTrash>
                                    </button>
                                </td>
                            </tr>
                            )}


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;