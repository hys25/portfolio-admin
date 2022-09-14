import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProjects, reset } from "../features/project/projectSlice"
import DefaultContainer from "../layout/DefaultContainer"
import ContentContainer from "../layout/ContentContainer"
import { Title } from "../elements/Title"
import { REACT_APP_BE_HOST } from "../config/index"

const MAIN_IMAGE_PLACEHOLDER = "https://blog.hubspot.com/hubfs/Team%20deciding%20on%20membership%20website%20builder.jpg"

function Projects() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projects } = useSelector((state) => state.project)
  useEffect(() => {
    const isUser = localStorage.getItem("user_token")
    if (!isUser) {
      navigate("/auth/sign-in")
    }
    dispatch(getProjects())
    return () => {
      dispatch(reset())
    }
  }, [navigate, dispatch])
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">All projects</Title>
        <div className="grid grid-cols-2 gap-4 w-full">
          {projects?.map(({ _id, main_image_url, projectName }) => {
            const mainImageUrl = `${REACT_APP_BE_HOST}/${main_image_url}`
            return (
              <Link
                to={`/project/${_id}`}
                key={_id}
                style={{
                  backgroundImage: `url(${
                    main_image_url
                      ? mainImageUrl
                      : MAIN_IMAGE_PLACEHOLDER
                  })`,
                }}
                className="hover:drop-shadow-md relative z-1 saturate-50 hover:saturate-100 flex flex-col justify-between w-full h-[230px] p-[20px] cursor-pointer bg-no-repeat bg-cover"
              >
                <h2 className="relative h-auto font-bold text-white uppercase text-20 z-2">
                  {projectName}
                </h2>
              </Link>
            )
          })}
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default Projects
