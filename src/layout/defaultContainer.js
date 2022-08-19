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
    <div className="flex w-screen h-screen bg-black py-[40px]">
      {authorized ? (
        <div className="flex flex-col justify-between w-full h-full text-white max-w-[230px]">
          <div className="flex flex-col">
            <h1 className="font-bold uppercase ml-[50px] text-14">
              {dummyUser.name}
            </h1>
            <Nav navItems={dummyNav} href="/" />
          </div>
          <div className="flex flex-col ml-[50px]">
            {user && (
              <div
                className="mb-3 font-bold uppercase cursor-pointer text-14"
                onClick={onLogOut}
                onKeyPress={onLogOut}
                role="presentation"
              >
                Log out
              </div>
            )}
            <h2 className="font-bold uppercase text-14 text-grey">
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
