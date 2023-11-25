import { useQuery } from "@tanstack/react-query";
import useAxios, { axiosSecure } from "../../../Hooks/useAxios";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import { TiTrash, TiUser } from "react-icons/ti";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxios()
    const { data: users = [], refetch } = useQuery({

        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })



    const handleMakeAdmin = user => {

        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=> {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an admin now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    }
    const handleDelete = (user) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {

                    axiosSecure.delete(`/users/${user._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })


                }
            });
    }
    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className="text-3xl">Total User</h2>
                <h2 className="text-3xl">All User : {users.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                      { user.role ==='admin' ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-success btn-md">
                                            <TiUser></TiUser>
                                        </button>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-warning btn-md">
                                        <TiTrash></TiTrash>
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;