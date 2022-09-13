import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DefaultContainer from "../layout/DefaultContainer"
import ContentContainer from "../layout/ContentContainer"
import { Title } from "../elements/Title"
import { Button } from "../elements/Button"

const dummyData = {
  project_name: "Project name",
  website_link: "https://www.lipsum.com/",
  project_stack:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  project_description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",
  your_impact:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
}

function Project() {
  const { id: currentProjectId } = useParams()
  const navigate = useNavigate()
  const onEdit = useCallback(
    (id) => {
      navigate(`/project/edit/${id}`)
    },
    [navigate]
  )
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">{dummyData.project_name}</Title>
        <div className="flex flex-col text-white">
          <p className="mb-[20px]">{dummyData.project_description}</p>
          <p className="mb-[20px]">{dummyData.project_stack}</p>
          <p>{dummyData.your_impact}</p>
          <Button
            onClick={() => onEdit(currentProjectId)}
            className="mt-10 max-w-[300px]"
          >
            Edit
          </Button>
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default Project
