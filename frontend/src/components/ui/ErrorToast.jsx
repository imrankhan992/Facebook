import React from 'react'
import { toast } from 'sonner'

const ErrorToast = (message) => {
  return (
    toast.error(message, {
        type: "error",
        action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
        },
    })
  )
}

export default ErrorToast
