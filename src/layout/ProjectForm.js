import { useState, useCallback, useEffect, useRef } from "react"
import useForm from "../hooks/useForm"
import { StyledInput, StyledTextarea } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button } from "../elements/Button"
import UploadFile from "./UploadFile"

function ProjectForm({
  defaultValues = {
    project_name: "",
    main_project: false,
    website_link: "",
    project_stack: "",
    project_description: "",
    your_impact: "",
    brand_color: "",
  },
  onSubmit,
  previousMainImage = null,
  previousBackgroundImage = null,
}) {
  const firstInputRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [mainImage, setMainImage] = useState()
  const [bgImage, setBgImage] = useState()
  const { onChange, formDataValue } = useForm({
    project_name: defaultValues.project_name,
    main_project: defaultValues.main_project,
    website_link: defaultValues.website_link,
    project_stack: defaultValues.project_stack,
    project_description: defaultValues.project_description,
    your_impact: defaultValues.your_impact,
    brand_color: defaultValues.brand_color,
  })
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
  useEffect(() => {
    firstInputRef.current.focus()
  })
  return (
    <form
      onSubmit={(event) =>
        onSubmit(event, formDataValue, setErrors, mainImage, bgImage)
      }
      className="mx-auto w-full max-w-[700px]"
    >
      <div className="flex justify-between">
        <StyledInput
          value={formDataValue.project_name}
          onChange={onChange}
          name="project_name"
          id="project_name"
          placeholder="Project name"
          classNameWrapper="w-2/3 pr-[10px]"
          error={errors.project_name}
          firstInputRef={firstInputRef}
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
          previousImage={previousMainImage}
        >
          Add main image of project
        </UploadFile>
        <UploadFile
          classNameWrapper="ml-[5px]"
          onChange={handleBgImage}
          selectedFile={bgImage}
          error={errors.background_image}
          previousImage={previousBackgroundImage}
        >
          Add background animation
        </UploadFile>
      </div>
      <Button type="submit" className="w-auto mt-[30px]">
        Submit
      </Button>
    </form>
  )
}

export default ProjectForm
