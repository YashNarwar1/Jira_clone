import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";






type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"],200>
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>


// export const useBulkUpdateTasks = () => {

//   const useQuery = useQueryClient()
   
//     const mutation = useMutation<
//      ResponseType,
//      Error,
//      RequestType
//     >({
        
//         mutationFn: async ({ json}) => {
//           console.log("Sending payload:", json);
//             const response = await client.api.tasks["bulk-update"]["$post"]({json});
//            if(!response.ok){
//             throw new Error("Failed to update task")
//            }
           
//             return await response.json();
//         },
//       onSuccess: () => {
        
//         toast.success("tasks updated")
   
//         useQuery.invalidateQueries({queryKey: ["tasks"]})

//       },
//       onError: () => {
//         toast.error("Failed to update tasks")
//       }
      
//     });
//     return mutation;
// }

export const useBulkUpdateTasks = () => {
  const useQuery = useQueryClient();
   
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ json }) => {
      console.log("Sending payload:", json);
      const response = await client.api.tasks["bulk-update"]["$post"]({ json });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update task:", errorText);
        throw new Error("Failed to update task");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("tasks updated");
      useQuery.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating tasks:", error);
      toast.error("Failed to update tasks");
    }
  });
  return mutation;
};