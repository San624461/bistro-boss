import { useQuery } from "@tanstack/react-query"
import useAxios from "./useAxios";
import axios from "axios";
import useAuth from "./useAuth";

//api, axios (axios secure), tan stack
const useCart = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data;
        }

    });
    return [cart, refetch];

}
export default useCart;
