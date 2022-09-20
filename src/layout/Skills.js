import { useState, useCallback } from "react"
import useForm from "../hooks/useForm"
import { StyledInput, StyledTextarea } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button } from "../elements/Button"
import UploadFile from "./UploadFile"
import { ReactComponent as EditIcon } from "./../assets/icons/edit-icon.svg"
import { ReactComponent as RemoveIcon } from "./../assets/icons/remove-icon.svg"

function Skills({ skills }) {
  // const [errors, setErrors] = useState({})
  // const [mainImage, setMainImage] = useState()
  // const [bgImage, setBgImage] = useState()
  // const { onChange, formDataValue } = useForm({
  //   project_name: defaultValues.project_name,
  //   main_project: defaultValues.main_project,
  //   website_link: defaultValues.website_link,
  //   project_stack: defaultValues.project_stack,
  //   project_description: defaultValues.project_description,
  //   your_impact: defaultValues.your_impact,
  //   brand_color: defaultValues.brand_color,
  // })
  // const handleMainImage = useCallback(
  //   (event) => {
  //     setMainImage(event.target.files[0])
  //   },
  //   [setMainImage]
  // )
  // const handleBgImage = useCallback(
  //   (event) => {
  //     setBgImage(event.target.files[0])
  //   },
  //   [setBgImage]
  // )
  return (
    <div className="mt-[50px] text-white font-bold uppercase">
      {skills.map((skill) => (
        <div key={skill._id} className="flex items-center">
          <div>{skill.skill_name}</div>
          <EditIcon
            width={20}
            height={20}
            className="min-w-[12px] ml-[20px] cursor-pointer"
          />
          <RemoveIcon
            width={18}
            height={18}
            className="min-w-[12px] ml-[10px] cursor-pointer"
          />
        </div>
      ))}
    </div>
  )
}

export default Skills
