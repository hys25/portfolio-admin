function Nav({ navItems }) {
  return (
    <ul className="h-full flex flex-col mt-[50px] text-white">
      {navItems.map((item) => (
        <li
          key={item}
          className="w-[200px] hover:w-full hover:pr-[50px] hover:bg-grey transition-all pl-[50px] pr-5 py-4 mb-[10px] bg-greyDark text-left text-14 uppercase font-bold"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
export default Nav;
