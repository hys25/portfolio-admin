import { useState, useCallback } from "react"

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState)

  const onChange = useCallback(
    (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    },
    [setFormData]
  )

  return { formData, onChange }
}

export default useForm
