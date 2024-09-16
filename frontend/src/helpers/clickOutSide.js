import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleMouseDown = (event) => {
      // Check if the click is outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); // Execute the callback if clicked outside
      }
    };

    // Add the event listener for 'mousedown'
    document.addEventListener("mousedown", handleMouseDown);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref, callback]); // Make sure effect depends on ref and callback
}
