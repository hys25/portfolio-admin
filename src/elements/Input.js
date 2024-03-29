import { useState } from "react"
import { ReactComponent as ShowPasswordIcon } from "../assets/icons/password-icon-eye-24.svg"
import { ReactComponent as HidenPasswordIcon } from "../assets/icons/password-icon-eye-24-closed.svg"

const SIZE = {
  small: "h-[30px] px-4",
  default: "h-[60px] px-5",
}

export function StyledInput({
  className,
  classNameWrapper = "w-full",
  error = null,
  size = "default",
  ...props
}) {
  return (
    <div
      className={`flex flex-col relative items-start text-black mb-[10px] ${classNameWrapper}`}
    >
      <input
        className={`text-white w-full text-14 appearance-none focus:outline-none bg-greyDark placeholder:text-grey ${SIZE[size]} ${className}`}
        {...props}
      />
      {error && <div className="text-error text-12">{error}</div>}
    </div>
  )
}

export function PasswordInput({ className, ...props }) {
  const [type, setType] = useState("password")
  return (
    <div className={`relative flex items-center ${className}`}>
      <StyledInput type={type} id="passwordInput" {...props} />
      <div className="absolute right-4 top-5 mr-1 max-h-5 cursor-pointer">
        {type === "password" ? (
          <HidenPasswordIcon
            onClick={() => setType("text")}
            width={20}
            height={20}
          />
        ) : (
          <ShowPasswordIcon
            onClick={() => setType("password")}
            width={20}
            height={20}
          />
        )}
      </div>
    </div>
  )
}

export function StyledTextarea({
  className,
  classNameWrapper = "w-full",
  error = null,
  ...props
}) {
  return (
    <div
      className={`flex flex-col relative items-start text-black mb-[10px] ${classNameWrapper}`}
    >
      <textarea
        className={`text-white p-5 w-full h-auto min-h-[100px] text-14 appearance-none focus:outline-none bg-greyDark placeholder:text-grey ${className}`}
        {...props}
      />
      {error && <div className="text-error text-12">{error}</div>}
    </div>
  )
}
