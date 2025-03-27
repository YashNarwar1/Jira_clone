import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";





type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>


export const useUpdateTask = () => {
   
  const useQuery = useQueryClient()
   
    const mutation = useMutation<
     ResponseType,
     Error,
     RequestType
    >({
        
        mutationFn: async ({param, json}) => {
           
            const response = await client.api.tasks[":taskId"]["$patch"]({param,json});
           if(!response.ok){
            throw new Error("Failed to Edit task")
           }
           
            return await response.json();
        },
      onSuccess: ({data}) => {
        
        toast.success("task Edited")
        
        useQuery.invalidateQueries({queryKey: ["tasks"]})
        useQuery.invalidateQueries({queryKey: ["task", data.$id]})

      },
      onError: () => {
        toast.error("Failed to Edit tasks")
      }
      
    });
    return mutation;
}
