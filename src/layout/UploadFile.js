import { useId } from "react"
import { ReactComponent as PlusIcon } from "../assets/icons/plus-icon.svg"

function UploadFile({
  className = "w-full",
  classNameWrapper,
  onChange,
  children,
  ...props
}) {
  const id = useId()
  return (
    <div
      className={`flex items-center justify-between h-[60px] px-[20px] w-full bg-greyDark ${classNameWrapper}`}
    >
      <input
        id={id}
        type="file"
        onChange={onChange}
        className={`text-[0px] opacity-0 w-0 ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className="cursor-pointer leading-[60px] h-[60px] w-full whitespace-nowrap text-grey"
      >
        {children}
      </label>
      <PlusIcon width={12} height={12} />
    </div>
  )
}

export default UploadFile
