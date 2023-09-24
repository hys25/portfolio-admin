import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProjects, reset } from "../../features/project/projectSlice"
import { useGetAllProjectsQuery } from "../../features/project/projectSlice"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import { Title } from "../../elements/Title"
import { REACT_APP_BE_HOST } from "../../config/index"

const MAIN_IMAGE_PLACEHOLDER =
  "https://blog.hubspot.com/hubfs/Team%20deciding%20on%20membership%20website%20builder.jpg"

function Projects() {
  const navigate = useNavigate()
  const {data: projects} = useGetAllProjectsQuery()
  useEffect(() => {
    const isUser = localStorage.getItem("user_token")
    if (!isUser) {
      navigate("/auth/sign-in")
    }
  }, [navigate])
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
                    main_image_url ? mainImageUrl : MAIN_IMAGE_PLACEHOLDER
                  })`,
                }}
                className="flex relative flex-col justify-between w-full bg-no-repeat bg-cover cursor-pointer z-1 saturate-50 h-[230px] p-[20px] hover:drop-shadow-md hover:saturate-100"
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
