import { useId } from "react"

export function Checkbox({
  className = "",
  classNameWrapper = "",
  classNameLabel = "text-white",
  name,
  checked,
  onChange,
}) {
  const id = useId()
  return (
    <div
      className={`flex flex-row items-center cursor-pointer ${classNameWrapper}`}
    >
      <input
        id={id}
        type="checkbox"
        className={`w-6 h-6 checked:bg-grey checked:red border border-grey z-40 ${className}`}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={`ml-2 w-full ${classNameLabel}`}>
        {name}
      </label>
    </div>
  )
}
