import { Link } from "react-router-dom"

function Nav({ navItems, activePage, ...props }) {
  const activePageClasses = "w-full text-greyDark pr-[50px] bg-grey"
  return (
    <ul className="flex flex-col h-full mt-[50px]">
      {navItems.map((item) => (
        <li
          key={item.id}
          className={`font-bold text-left text-white uppercase transition-all hover:w-full  mb-[10px] bg-greyDark text-14 hover:text-greyDark hover:pr-[50px] hover:bg-grey cursor-pointer ${
            item.slug === activePage ? activePageClasses : "w-[200px]"
          }`}
        >
          <Link
            to={item.slug}
            className="flex items-center py-4 whitespace-nowrap pl-[50px] text-14 hover:text-greyDark"
            {...props}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Nav
