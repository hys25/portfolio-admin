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

export function Button({ children, className, onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center h-[60px] w-full cursor-pointer text-white bg-greyDark tracking-wide hover:tracking-normal hover:border-grey hover:border-[1px] hover:font-bold transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
