import { useState } from "react";
import { ReactComponent as ShowPasswordIcon } from "../assets/icons/password-icon-eye-24.svg";
import { ReactComponent as HidenPasswordIcon } from "../assets/icons/password-icon-eye-24-closed.svg";

export function StyledInput({
  setValue,
  value,
  className,
  classNameWrapper,
  children,
  placeholder,
  login = false,
  type = "text",
  ...props
}) {
  return (
    <div
      {...props}
      className={`flex relative items-center text-black w-full ${classNameWrapper}`}
    >
      <input
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={`text-white px-5 w-full h-[60px] text-14 appearance-none focus:outline-none bg-greyDark placeholder:text-white  ${className}`}
        {...props}
      />
      {login ? (
        <span className="absolute block w-full h-[60px] bg-greyDark left-0 top-0 z-[-1]" />
      ) : null}
    </div>
  );
}

export function AuthInput({
  placeholder,
  setValue,
  value,
  className,
  children,
  bgColor,
  login,
  ...props
}) {
  return (
    <div {...props} className="flex relative items-center text-black w-full">
      <StyledInput
        placeholder={placeholder}
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        login={login}
        className={`mb-[10px] ${className}`}
      />
      {children}
    </div>
  );
}

export function PasswordInput({ setValue, className, placeholder, ...props }) {
  const [type, setType] = useState("password");
  return (
    <div className={`relative flex items-center ${className}`}>
      <AuthInput
        type={type}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        id="passwordInput"
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
