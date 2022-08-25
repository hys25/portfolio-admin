import { useState } from "react"
import { useDispatch } from "react-redux"
import DefaultContainer from "../layout/DefaultContainer"
import ContentContainer from "../layout/ContentContainer"
import useForm from "../hooks/useForm"
import { Title } from "../elements/Title"
import { StyledInput, StyledTextarea } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button } from "../elements/Button"
import UploadFile from "../layout/UploadFile"
import { postProject } from "../features/project/projectSlice"

function NewProject() {
  const { onChange, formDataValue } = useForm({
    project_name: "",
    main_project: false,
    website_link: "",
    project_stack: "",
    project_description: "",
    your_impact: "",
    brand_color: "",
  })
  const dispatch = useDispatch()

  const [mainImage, setMainImage] = useState()
  const [bgImage, setBgImage] = useState()
  const handleMainImage = (event) => {
    setMainImage(event.target.files[0])
  }
  const handleBgImage = (event) => {
    setBgImage(event.target.files[0])
  }

  const formData = new FormData()
  const onSubmit = (event) => {
    event.preventDefault()
    formData.append("main_image", mainImage)
    formData.append("background_image", bgImage)
    Object.entries(formDataValue).forEach(([key, value]) => {
      formData.append(key, value)
    })
    dispatch(postProject(formData))
  }

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
          />
          <StyledTextarea
            value={formDataValue.project_description}
            onChange={onChange}
            name="project_description"
            id="project_description"
            placeholder="Project description"
          />
          <StyledTextarea
            value={formDataValue.your_impact}
            onChange={onChange}
            name="your_impact"
            id="your_impact"
            placeholder="Your impact"
          />

          <div className="flex justify-between">
            <UploadFile
              classNameWrapper="mr-[5px]"
              onChange={handleMainImage}
              selectedFile={mainImage}
            >
              Add main image of project
            </UploadFile>
            <UploadFile
              classNameWrapper="ml-[5px]"
              onChange={handleBgImage}
              selectedFile={bgImage}
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
