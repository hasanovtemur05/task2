import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createData, deleteData, updateData } from "../service"
import { PostsDataType } from "../types"

export function useCreatePosts () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:PostsDataType) => createData(data),
        onSuccess: (response)=>{
            console.log(response.message);
            queryClient.invalidateQueries({queryKey: ['posts']})
        },
       onError: (error)=> {
            console.log(error);
            queryClient.invalidateQueries({queryKey: ['posts']})
       }
       
    })
}



export function useUpdatePosts() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: PostsDataType }) => updateData(id, data),
      onSuccess: (response) => {
        console.log(response.message);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        console.error( error);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });
  }



  export function useDeletePosts() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: number) => deleteData(id), 
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        console.error( error);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });
  }