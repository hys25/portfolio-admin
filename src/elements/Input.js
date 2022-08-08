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
  type = "text",
  ...props
}) {
  return (
    <div
      {...props}
      className={`flex relative items-center text-black ${classNameWrapper}`}
    >
      <input
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={`text-white px-5 w-full h-[50px] text-xs appearance-none focus:outline-none bg-greyDark placeholder:text-white ${className}`}
        {...props}
      />
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
  ...props
}) {
  return (
    <div {...props} className="flex relative items-center text-black">
      <StyledInput
        placeholder={placeholder}
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
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
      <div className="absolute right-4 mr-1 max-h-5 cursor-pointer">
        {type === "password" ? (
          <HidenPasswordIcon
            onClick={() => setType("text")}
            width={20}
            height={20}
            // src="/assets/icons/password-icon-eye-24-closed.svg"
          />
        ) : (
          <ShowPasswordIcon
            onClick={() => setType("password")}
            width={20}
            height={20}
            // src="/assets/icons/password-icon-eye-24.svg"
          />
        )}
      </div>
    </div>
  );
}
