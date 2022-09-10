import { useState, useCallback } from "react"

const useForm = (initialState) => {
  const [formDataValue, setFormDataValue] = useState(initialState)

  const onChange = useCallback(
    (e) => {
      if (e.target.type === "checkbox") {
        return setFormDataValue((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.checked,
        }))
      }
      return setFormDataValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    },
    [setFormDataValue]
  )

  return { formDataValue, onChange }
}

export default useForm
