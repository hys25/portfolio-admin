import { useState } from "react";
import { ReactComponent as ShowPasswordIcon } from "../assets/icons/password-icon-eye-24.svg";
import { ReactComponent as HidenPasswordIcon } from "../assets/icons/password-icon-eye-24-closed.svg";

export function StyledInput({
  value,
  onChange,
  type,
  name,
  className,
  classNameWrapper,
  children,
  placeholder,
  login = false,
  ...props
}) {
  return (
    <div
      {...props}
      className={`flex relative items-center text-black w-full ${classNameWrapper}`}
    >
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`text-white px-5 w-full h-[60px] text-14 appearance-none focus:outline-none bg-greyDark placeholder:text-grey  ${className}`}
        {...props}
      />
      {login ? (
        <span className="absolute block w-full h-[60px] bg-greyDark left-0 top-0 z-[-1]" />
      ) : null}
    </div>
  );
}

export function AuthInput({
  value,
  onChange,
  type = 'text',
  name,
  placeholder,
  className = '',
  classNameWrapper = '',
  children,
  bgColor,
  login,
  ...props
}) {
  return (
    <div {...props} className="flex relative items-center text-black w-full">
      <StyledInput
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`mb-[10px] ${className}`}
        login={login}
      />
      {children}
    </div>
  )
}

export function PasswordInput({ onChange, value, className, placeholder, ...props }) {
  const [type, setType] = useState("password")
  return (
    <div className={`relative flex items-center ${className}`}>
      <StyledInput
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        id="passwordInput"
        className={`mb-[10px] ${className}`}
        {...props}
      />
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
  );
}
