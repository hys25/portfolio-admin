/* eslint-disable no-unused-expressions */
import { Link } from "react-router-dom";

export function ButtonLink({href, children, className, onClick, ...props}) {
  return (
    <Link to={href}>
      <a
        onClick={onClick}
        href={href}
        className={`flex gap-1.5 items-center cursor-pointer group ${className}`}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}

export function Button({children, className, onClick, ...props}) {
  return (
      <button
        onClick={onClick}
        className={`flex gap-1.5 items-center cursor-pointer group text-white ${className}`}
        {...props}
      >
        {children}
      </button>
  );
}