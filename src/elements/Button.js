/* eslint-disable no-unused-expressions */
import { Link } from "react-router-dom"

export function StyledLink({ href, children, className, onClick, ...props }) {
  return (
    <Link to={href}>
      <div
        onKeyDown={onClick}
        onClick={onClick}
        role="presentation"
        href={href}
        className={`flex items-center cursor-pointer text-white text-14 ${className}`}
        {...props}
      >
        {children}
      </div>
    </Link>
  )
}

export function Button({
  children,
  className = "w-full",
  onClick,
  disable,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center mx-auto h-[60px] px-[30px] cursor-pointer  bg-greyDark hover:bg-grey hover:text-greyDark font-bold transition-all uppercase ${
        disable ? "pointer-events-none text-black" : "text-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
