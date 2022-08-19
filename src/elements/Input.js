import { useState } from "react"
import { ReactComponent as ShowPasswordIcon } from "../assets/icons/password-icon-eye-24.svg"
import { ReactComponent as HidenPasswordIcon } from "../assets/icons/password-icon-eye-24-closed.svg"

export function StyledInput({ className, classNameWrapper, ...props }) {
  return (
    <div
      className={`flex relative items-center text-black w-full mb-[10px] ${classNameWrapper}`}
    >
      <input
        className={`text-white px-5 w-full h-[60px] text-14 appearance-none focus:outline-none bg-greyDark placeholder:text-grey ${className}`}
        {...props}
      />
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
