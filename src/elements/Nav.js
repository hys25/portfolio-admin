import { Link } from "react-router-dom"

function Nav({ navItems, ...props }) {
  return (
    <ul className="flex flex-col h-full mt-[50px]">
      {navItems.map((item) => (
        <li
          key={item.id}
          className="py-4 pr-5 font-bold text-left text-white uppercase transition-all hover:w-full w-[200px] pl-[50px] mb-[10px] bg-greyDark text-14 hover:text-greyDark hover:pr-[50px] hover:bg-grey"
        >
          <Link to={item.slug}>
            <div
              className="flex items-center cursor-pointer text-14 hover:text-greyDark"
              {...props}
            >
              {item.name}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Nav
