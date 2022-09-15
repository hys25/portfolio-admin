import { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { REACT_APP_BE_HOST } from "../../config/index"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import { putProject } from "../../features/project/projectSlice"
import { Title } from "../../elements/Title"
import { Button } from "../../elements/Button"
import ProjectForm from "../../layout/ProjectForm"
import { validate } from "../../utils/validateFormInput"

function ProjectEdit() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { project } = useSelector((state) => state.project)
  const defaultValues = useMemo(
    () => ({
      project_name: project.project_name,
      main_project: project.main_project,
      website_link: project.website_link,
      project_stack: project.project_stack,
      project_description: project.project_description,
      your_impact: project.your_impact,
      brand_color: project.brand_color,
    }),
    [project]
  )
  const previousMainImage = `${REACT_APP_BE_HOST}/${project.main_image_url}`
  const previousBackgroundImage = `${REACT_APP_BE_HOST}/${project.background_image_url}`

  const onSubmit = useCallback(
    async (event, formDataValue, setErrors, mainImage, bgImage) => {
      event.preventDefault()
      const formData = new FormData()
      const requiredFields = [
        "project_name",
        "website_link",
        "project_stack",
        "project_description",
        "your_impact",
      ]
      const validationResult = validate(requiredFields, formDataValue)
      if (Object.keys(validationResult).length !== 0) {
        setErrors(validationResult)
        return
      }
      formData.append("main_image", mainImage)
      formData.append("background_image", bgImage)
      Object.entries(formDataValue).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const result = await dispatch(putProject(project._id, formData))
      if (result.payload.status === 200) {
        navigate(`/project/${project._id}`)
      }
    },
    [dispatch, navigate]
  )
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">
          Edit project:
          <span className="ml-2 text-white">{project.project_name}</span>
        </Title>
        <ProjectForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          previousMainImage={previousMainImage}
          previousBackgroundImage={previousBackgroundImage}
        />
      </ContentContainer>
    </DefaultContainer>
  )
}

export default ProjectEdit
