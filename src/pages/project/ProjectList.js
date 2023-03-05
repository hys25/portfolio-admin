import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { getProjects, reset } from "../../features/project/projectSlice"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import DragAndDropList from "../../elements/DragAndDropList"
import { Title } from "../../elements/Title"

function ProjectList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projects } = useSelector((state) => state.project)

  const [mainProjects, otherProjects] = useMemo(() => {
    const main = []
    const other = []
    projects?.forEach((project) => {
      if (project?.main_project === true) {
        main.push(project)
      } else if (project?.main_project === false) {
        other.push(project)
      }
    })
    return [main, other]
  }, [projects])

  const [mainProjectsList, setMainProjectsList] = useState(mainProjects)
  const [otherProjectsList, setOtherProjectsList] = useState(otherProjects)

  useEffect(() => {
    setMainProjectsList(mainProjects)
    setOtherProjectsList(otherProjects)
  }, [mainProjects, otherProjects])

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
        <div className="w-full">
          <h2 className="mb-4 font-bold text-white uppercase">
            List of main projects:
          </h2>
          <DragAndDropList
            droppableId="mainProjectsList"
            itemsData={mainProjectsList}
            setItemsData={setMainProjectsList}
          />
          <h2 className="mt-8 mb-4 font-bold text-white uppercase">
            List of other projects:
          </h2>
          <DragAndDropList
            droppableId="otherProjectsList"
            itemsData={otherProjectsList}
            setItemsData={setOtherProjectsList}
          />
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default ProjectList
