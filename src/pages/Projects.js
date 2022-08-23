import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import DefaultContainer from "../layout/DefaultContainer"
import ContentContainer from "../layout/ContentContainer"
import { Title } from "../elements/Title"

const dummyProjects = [
  {
    id: 1,
    projectName: "Project name",
    imageUrl: "#",
    projectWebsite: "https://github.com/hys25/portfolio-admin",
  },
  {
    id: 2,
    projectName: "Project name",
    imageUrl: "#",
    projectWebsite: "https://github.com/hys25/portfolio-admin",
  },
  {
    id: 3,
    projectName: "Project name",
    imageUrl: "#",
    projectWebsite: "https://github.com/hys25/portfolio-admin",
  },
  {
    id: 4,
    projectName: "Project name",
    imageUrl: "#",
    projectWebsite: "https://github.com/hys25/portfolio-admin",
  },
  {
    id: 5,
    projectName: "Project name",
    imageUrl: "#",
    projectWebsite: "https://github.com/hys25/portfolio-admin",
  },
  {
    id: 6,
    projectName: "Project name",
    imageUrl: "#",
    projectWebsite: "https://github.com/hys25/portfolio-admin",
  },
]

function Projects() {
  const navigate = useNavigate()

  useEffect(() => {
    const isUser = localStorage.getItem("user_token")
    if (!isUser) {
      navigate("/auth/sign-in")
    }
  })
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">All projects</Title>
        <div className="grid grid-cols-2 gap-4 w-full">
          {dummyProjects.map((project) => (
            <Link
              to={`/project/${project.id}`}
              key={project.id}
              className={`hover:drop-shadow-md relative z-1 saturate-50 hover:saturate-100 flex flex-col justify-between w-full h-[230px] p-[20px] bg-[url('https://blog.hubspot.com/hubfs/Team%20deciding%20on%20membership%20website%20builder.jpg')] cursor-pointer`}
            >
              <h2 className="relative font-bold text-white uppercase text-20 z-2">
                {project.projectName}
              </h2>
            </Link>
          ))}
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default Projects
