import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut, reset } from "../features/auth/authSlice"
import Nav from "../elements/Nav"

const dummyUser = {
  name: "Halyna Pravdych",
  position: "frontend dev",
}
const dummyNav = [
  "all projects",
  "new project",
  "new skill",
  "update cv",
  "messages",
  "settings",
]

function DefaultContainer({ authorized, ...props }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogOut = () => {
    dispatch(reset())
    dispatch(logOut())
    navigate("/auth/sign-in")
  }

  return (
    <div className="h-screen w-screen flex py-[40px] bg-black">
      {authorized ? (
        <div className="flex flex-col justify-between h-full w-full max-w-[230px] text-white">
          <div className="flex flex-col">
            <h1 className="ml-[50px] font-bold text-14 uppercase">
              {dummyUser.name}
            </h1>
            <Nav navItems={dummyNav} />
          </div>
          <div className="ml-[50px] flex flex-col">
            {user && (
              <div
                className="mb-3 font-bold text-14 uppercase cursor-pointer"
                onClick={onLogOut}
                onKeyPress={onLogOut}
                role="presentation"
              >
                Log out
              </div>
            )}
            <h2 className="uppercase font-bold text-14 text-grey">
              {dummyUser.position.replace(" ", "_")}
            </h2>
          </div>
        </div>
      ) : null}
      {props.children}
    </div>
  )
}

export default DefaultContainer
