import Nav from "../elements/Nav";

const dummyUser = {
  name: "Halyna Pravdych",
  position: "frontend dev",
};
const dummyNav = [
  "all projects",
  "new project",
  "new skill",
  "update cv",
  "messages",
  "settings",
];

function DefaultContainer({ authorized, ...props }) {
  return (
    <div className="h-screen w-screen flex py-[40px] bg-black">
      {authorized ? (
        <div className="flex flex-col justify-between h-full w-full max-w-[230px] text-white">
          <div className="flex flex-col">
            <h1 className="ml-[50px] font-bold text-14 uppercase">
              {dummyUser.name}
            </h1>
            <Nav navItems={dummyNav}></Nav>
          </div>
          <h2 className="ml-[50px] uppercase font-bold text-14">
            {dummyUser.position.replace(" ", "_")}
          </h2>
        </div>
      ) : null}
      {props.children}
    </div>
  )
}

export default DefaultContainer
