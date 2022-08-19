import { Link } from "react-router-dom"

function Nav({ href, navItems, ...props }) {
  return (
    <ul className="flex flex-col h-full text-white mt-[50px]">
      {navItems.map((item) => (
        <li
          key={item}
          className="py-4 pr-5 font-bold text-left uppercase transition-all hover:w-full w-[200px] pl-[50px] mb-[10px] bg-greyDark text-14 hover:pr-[50px] hover:bg-grey"
        >
          <Link to={href}>
            <div
              className="flex items-center text-white cursor-pointer text-14"
              {...props}
            >
              {item}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Nav
