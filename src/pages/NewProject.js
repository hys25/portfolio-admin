import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import DefaultContainer from "../layout/DefaultContainer"
import ContentContainer from "../layout/ContentContainer"
import useForm from "../hooks/useForm"
import { Title } from "../elements/Title"
import { StyledInput, StyledTextarea } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button } from "../elements/Button"
import UploadFile from "../layout/UploadFile"
import { postProject } from "../features/project/projectSlice"
import { validate } from "../utils/validateFormInput"

function NewProject() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [mainImage, setMainImage] = useState()
  const [bgImage, setBgImage] = useState()
  const handleMainImage = useCallback(
    (event) => {
      setMainImage(event.target.files[0])
    },
    [setMainImage]
  )
  const handleBgImage = useCallback(
    (event) => {
      setBgImage(event.target.files[0])
    },
    [setBgImage]
  )

  const { onChange, formDataValue } = useForm({
    project_name: "",
    main_project: false,
    website_link: "",
    project_stack: "",
    project_description: "",
    your_impact: "",
    brand_color: "",
  })
  const onSubmit = useCallback(
    async (event) => {
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
        navigate("/")
      }
    },
    [dispatch, navigate, setErrors, mainImage, bgImage, formDataValue]
  )

  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Add new project</Title>
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-[700px]">
          <div className="flex justify-between">
            <StyledInput
              value={formDataValue.project_name}
              onChange={onChange}
              name="project_name"
              id="project_name"
              placeholder="Project name"
              classNameWrapper="w-2/3 pr-[10px]"
              error={errors.project_name}
            />
            <Checkbox
              name="main_project"
              onChange={onChange}
              checked={formDataValue.main_project}
              classNameWrapper="w-1/3 h-[60px] px-[16px] bg-greyDark"
              classNameLabel="text-grey text-14"
            >
              Main project
            </Checkbox>
          </div>
          <div className="flex justify-between">
            <StyledInput
              value={formDataValue.website_link}
              onChange={onChange}
              name="website_link"
              id="website_link"
              placeholder="Link to website"
              classNameWrapper="w-2/3 pr-[10px]"
              error={errors.website_link}
            />
            <StyledInput
              value={formDataValue.brand_color}
              onChange={onChange}
              name="brand_color"
              id="brand_color"
              placeholder="Brand color HEX (optional)"
              classNameWrapper="w-1/3"
            />
          </div>
          <StyledInput
            value={formDataValue.project_stack}
            onChange={onChange}
            name="project_stack"
            id="project_stack"
            placeholder="Project stack (optional)"
            error={errors.project_stack}
          />
          <StyledTextarea
            value={formDataValue.project_description}
            onChange={onChange}
            name="project_description"
            id="project_description"
            placeholder="Project description"
            error={errors.project_description}
          />
          <StyledTextarea
            value={formDataValue.your_impact}
            onChange={onChange}
            name="your_impact"
            id="your_impact"
            placeholder="Your impact"
            error={errors.your_impact}
          />

          <div className="flex justify-between">
            <UploadFile
              classNameWrapper="mr-[5px]"
              onChange={handleMainImage}
              selectedFile={mainImage}
              error={errors.main_image}
            >
              Add main image of project
            </UploadFile>
            <UploadFile
              classNameWrapper="ml-[5px]"
              onChange={handleBgImage}
              selectedFile={bgImage}
              error={errors.background_image}
            >
              Add background animation
            </UploadFile>
          </div>
          <Button type="submit" className="w-auto mt-[30px]">
            Add project
          </Button>
        </form>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default NewProject
