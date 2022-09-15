import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import { Title } from "../../elements/Title"
import { postProject } from "../../features/project/projectSlice"
import { validate } from "../../utils/validateFormInput"
import ProjectForm from "../../layout/ProjectForm"

function ProjectCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      if (!bgImage) {
        validationResult.background_image = "Background image is required"
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
      const result = await dispatch(postProject(formData))
      if (result.payload.status === 200) {
        navigate(`/project/${result.payload.data._id}`)
      }
    },
    [dispatch, navigate]
  )
  // Create <Form onSubmit={onSubmit}/>
  // Update <Form defaultValues={defaultValues} onSubmit={onSubmit} previousMainImage={previousMainImage} previousBackgroundImage={previousBackgroundImage}/>
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
