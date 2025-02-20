import { useQuery } from "@tanstack/react-query";
import { getData } from "../service";

export function useGetData(){
    return useQuery({
        queryKey: ["posts"],
        queryFn: ()=> getData()
    })
}