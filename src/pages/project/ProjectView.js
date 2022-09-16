import { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  getProject,
  reset,
  deleteProject,
} from "../../features/project/projectSlice"
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
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const { project } = useSelector((state) => state.project)
  const { id: currentProjectId } = useParams()
  useEffect(() => {
    dispatch(getProject(currentProjectId))
    return () => {
      dispatch(reset())
    }
  }, [navigate, dispatch, currentProjectId])
  const onEdit = useCallback(
    (id) => {
      navigate(`/project/edit/${id}`)
    },
    [navigate]
  )
  const handleRemoveProject = useCallback(
    async (currentProjectId) => {
      setOpenModal(false)
      const result = await dispatch(deleteProject(currentProjectId))
      if (result.payload.status === 200) {
        navigate("/")
      }
    },
    [dispatch, navigate]
  )
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="font-bold mb-[50px]">{project?.project_name}</Title>
        <div className="flex flex-col mx-auto w-full text-white max-w-[700px]">
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
