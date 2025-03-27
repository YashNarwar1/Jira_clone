import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { client } from "@/lib/rpc";


type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"],200>
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>


export const useDeleteProject = () => {
  
    const useQuery = useQueryClient()
   
    const mutation = useMutation<
     ResponseType,
     Error,
     RequestType
    >({
        
        mutationFn: async ({ param}) => {
           
            const response = await client.api.projects[":projectId"]["$delete"]({ param});
           if(!response.ok){
            throw new Error("Failed to delete project")
           }
           
            return await response.json();
        },
      onSuccess: (data) => {
       toast.success("project deleted successfully")
        
        useQuery.invalidateQueries({queryKey: ["projects"]})
        useQuery.invalidateQueries({queryKey: ["project", data.data.$id]})

      },
      onError: () => {
        toast.error("Failed to delete project")
      }
      
    });
    return mutation;
}
