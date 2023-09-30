import { useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useGetProjectQuery,
  useDeleteProjectMutation,
} from "../../features/project/projectApi"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import { Title } from "../../elements/Title"
import { Button } from "../../elements/Button"
import { REACT_APP_BE_HOST } from "../../config/index"
import DeleteConfirmModal from "../../layout/DeleteConfirmModal"

const MAIN_IMAGE_PLACEHOLDER =
  "https://blog.hubspot.com/hubfs/Team%20deciding%20on%20membership%20website%20builder.jpg"

function ProjectView() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const { id: currentProjectId } = useParams()
  const { data: project } = useGetProjectQuery(currentProjectId)
  const [deleteProject] = useDeleteProjectMutation(currentProjectId)
  const onEdit = useCallback(
    (id) => {
      navigate(`/project/edit/${id}`)
    },
    [navigate]
  )
  const handleRemoveProject = useCallback(async () => {
    setOpenModal(false)
    const result = await deleteProject(currentProjectId)
    if (result.data.id === currentProjectId) {
      navigate("/")
    } else {
      toast.error("Project was deleted")
    }
  }, [deleteProject, currentProjectId, navigate])
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="font-bold mb-[50px]">{project?.project_name}</Title>
        <div className="flex flex-col mx-auto w-full text-white">
          <img
            alt="Project"
            className="object-cover w-full h-auto mb-[30px] max-h-[450px]"
            src={
              project?.main_image_url
                ? `${REACT_APP_BE_HOST}/${project?.main_image_url}`
                : MAIN_IMAGE_PLACEHOLDER
            }
          />
          <p className="mb-[20px]">
            <b className="text-grey">Project description:</b>{" "}
            {project?.project_description}
          </p>
          <p className="mb-[20px]">
            <b className="text-grey">Project stack:</b> {project?.project_stack}
          </p>
          <p>
            <b className="text-grey">My impact:</b> {project?.your_impact}
          </p>
          <div className="flex justify-end mt-10 w-full">
            <Button
              onClick={() => onEdit(currentProjectId)}
              className="mx-[20px]"
            >
              Edit
            </Button>
            <Button onClick={() => setOpenModal(true)} className="mx-0">
              Remove project
            </Button>
          </div>
          <DeleteConfirmModal
            onConfirm={() => handleRemoveProject(currentProjectId)}
            onDecline={() => setOpenModal(false)}
            isVisible={openModal}
            modalQuestion="Are you sure you want to delete this project?"
          />
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default ProjectView
