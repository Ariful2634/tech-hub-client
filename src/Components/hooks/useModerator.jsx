import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useModerator = () => {
    const {user,loading}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()

    const {data: isModerator, isPending: isModeratorLoading}=useQuery({
        queryKey:[user?.email, 'isModerator'],
        enabled:!loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/moderator/${user?.email}`)
            console.log(res.data)
            return res.data?.moderator
        }
    })

    return [isModerator,isModeratorLoading]
};

export default useModerator;