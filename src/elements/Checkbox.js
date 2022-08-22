import { useId } from "react"

export function Checkbox({ className = "", name, checked, onChange }) {
  const id = useId()
  return (
    <div className="flex flex-row cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className={`w-6 h-6 checked:bg-grey checked:red border border-grey z-40 ${className}`}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 w-full text-white">
        {name}
      </label>
    </div>
  )
}
