import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import { Title } from "../../elements/Title"
import { useAddProjectMutation } from "../../features/project/projectApi"
import { validate } from "../../utils/validateFormInput"
import ProjectForm from "../../layout/ProjectForm"

function ProjectCreate() {
  const navigate = useNavigate()

  const [addProject] = useAddProjectMutation()

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
      if (!mainImage) {
        validationResult.main_image = "Main image is required"
      }
      if (Object.keys(validationResult).length !== 0) {
        setErrors(validationResult)
        return
      }
      formData.append("main_image", mainImage)
      formData.append("background_image", bgImage)
      Object.entries(formDataValue).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const result = await addProject(formData).unwrap()
      if (result) {
        navigate(`/project/${result._id}`)
      }
    },
    [navigate, addProject]
  )
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Add new project</Title>
        <ProjectForm onSubmit={onSubmit} />
      </ContentContainer>
    </DefaultContainer>
  )
}

export default ProjectCreate
