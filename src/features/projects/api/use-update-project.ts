import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { client } from "@/lib/rpc";


type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>


export const useUpdateProject = () => {
    
    const useQuery = useQueryClient()
   
    const mutation = useMutation<
     ResponseType,
     Error,
     RequestType
    >({
        
        mutationFn: async ({form, param}) => {
           
            const response = await client.api.projects[":projectId"]["$patch"]({form, param});
           if(!response.ok){
            throw new Error("Failed to update project")
           }
           
            return await response.json();
        },
      onSuccess: ({data}) => {
       toast.success("project updated successfully")
       
        useQuery.invalidateQueries({queryKey: ["projects"]})
        useQuery.invalidateQueries({queryKey: ["project", data.$id]})

      },
      onError: () => {
        toast.error("Failed to update project")
      }
      
    });
    return mutation;
}
