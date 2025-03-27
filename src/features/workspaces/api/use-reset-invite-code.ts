import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";




type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"],200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]>


export const useResetInviteCode = () => {
    const useQuery = useQueryClient()
   
    const mutation = useMutation<
     ResponseType,
     Error,
     RequestType
    >({
        
        mutationFn: async ({param}) => {
           
            const response = await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]({param});
           if(!response.ok){
            throw new Error("Failed to reset invite code")
           }
          
            return await response.json();
        },
      onSuccess: ({data}) => {
       toast.success("Invite code reset.")
        useQuery.invalidateQueries({queryKey: ["workspaces"]})
        useQuery.invalidateQueries({queryKey: ["workspace", data.$id]})

      },
      onError: () => {
        toast.error("Failed to reset invite code")
      }
      
    });
    return mutation;
}
