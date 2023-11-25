import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
// import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    const AxiosPublic = useAxiosPublic();

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/menu');
            return res.data

        }
    })

    // const [menu, setMenu] = useState([])
    // const[loading,setLoading] = useState(true)
    // useEffect(() => {
    //     fetch('https://bistro-boss-server-six-steel.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             // const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(data)
    //             setLoading(false)
    //         })

    // }, [])

    return [menu, loading, refetch]
}

export default useMenu;