import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut, reset } from "../features/auth/authSlice"
import Nav from "../elements/Nav"

const dummyUser = {
  name: "Halyna Pravdych",
  position: "frontend dev",
}
const dummyNav = [
  {
    id: 1,
    name: "all projects",
    slug: "/",
  },
  {
    id: 2,
    name: "new project",
    slug: "/new-project",
  },
  {
    id: 3,
    name: "new skill",
    slug: "/new-skill",
  },
  {
    id: 4,
    name: "update cv",
    slug: "/update-cv",
  },
  {
    id: 5,
    name: "messages",
    slug: "/messages",
  },
  {
    id: 6,
    name: "settings",
    slug: "/settings",
  },
]

function DefaultContainer({ authorized, ...props }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogOut = useCallback(() => {
    dispatch(reset())
    dispatch(logOut())
    navigate("/auth/sign-in")
  }, [dispatch, navigate])

  return (
    <div className="flex w-screen h-screen bg-black py-[40px]">
      {authorized ? (
        <div className="flex flex-col justify-between w-full h-full text-white max-w-[230px]">
          <div className="flex flex-col">
            <h1 className="font-bold uppercase ml-[50px] text-14">
              {dummyUser.name}
            </h1>
            <Nav navItems={dummyNav} />
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
