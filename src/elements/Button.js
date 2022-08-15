/* eslint-disable no-unused-expressions */
import { Link } from "react-router-dom"

export function ButtonLink({ href, children, className, onClick, ...props }) {
  return (
    <Link to={href}>
      <div
        onKeyDown={onClick}
        onClick={onClick}
        href={href}
        className={`flex items-center cursor-pointer text-white text-14 ${className}`}
        role="presentation"
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
      onClick={onClick}
      className={`flex items-center justify-center h-[60px] w-full cursor-pointer text-white bg-greyDark tracking-wide hover:tracking-normal hover:border-grey hover:border-[1px] hover:font-bold transition-all ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export function NavButton({ children, className, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center h-[60px] w-full cursor-pointer text-white bg-greyDark tracking-wide hover:tracking-normal hover:border-grey hover:border-[1px] hover:font-bold transition-all ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
