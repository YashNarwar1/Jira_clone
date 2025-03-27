import { useQueryState, parseAsBoolean} from "nuqs";

export const useCreateProjectModal = () => {
    const [ isOpen , setIsOpen] = useQueryState(
        "create-project",
        parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true}) 
        // this line means when the isOpen value is false it will clear the url and will not show the state only if it is true
    )
      const open = () => setIsOpen(true);
      const close = () => setIsOpen(false);

    return {
        isOpen,
         open ,
         close,
         setIsOpen
    };
};