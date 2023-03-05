import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { getProjects, reset } from "../../features/project/projectSlice"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import ProjectListItem from "./ProjectListItem"
import { Title } from "../../elements/Title"

function ProjectList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projects } = useSelector((state) => state.project)
  const mainProjects = useMemo(
    () => projects?.filter((project) => project.main_project === true),
    [projects]
  )
  const otherProjects = projects?.filter(
    (project) => project.main_project === false
  )

  const [mainProjectsList, setMainProjectsList] = useState(mainProjects)

  useEffect(() => {
    setMainProjectsList(mainProjects)
  }, [mainProjects])

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

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination || destination.index === source.index) {
      return
    }
    const reordered = [...mainProjectsList]

    reordered.splice(source.index, 1)
    reordered.splice(
      destination.index,
      0,
      mainProjects.filter(({ _id }) => _id.toString() === draggableId)[0]
    )
    setMainProjectsList(reordered)
  }

  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">All projects</Title>
        <div className="w-full">
          <h2 className="mb-4 font-bold text-white uppercase">
            List of main projects:
          </h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {mainProjectsList?.map((project, index) => (
                    <Draggable
                      key={project?._id.toString()}
                      draggableId={project?._id.toString()}
                      index={index}
                    >
                      {(innerProvided) => (
                        <div
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                          ref={innerProvided.innerRef}
                        >
                          <ProjectListItem projectData={project} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <h2 className="mt-8 mb-4 font-bold text-white uppercase">
            List of other projects:
          </h2>
          {otherProjects?.map((project) => (
            <ProjectListItem projectData={project} key={project._id} />
          ))}
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default ProjectList
