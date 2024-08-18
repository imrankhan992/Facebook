import { useEffect } from "react";

export default function useClickOutSide(ref,fun) {
    useEffect(() => {
        function handleClickOutside(event) {
          
          
            if (ref.current && !ref.current.contains(event.target)) {
                
                fun()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref,fun]);
    
}