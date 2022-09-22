import { useState, useCallback } from "react"
import { putSkill } from "../features/skills/skillsSlice"
import { StyledInput } from "../elements/Input"
import { ReactComponent as UpdateIcon } from "../assets/icons/update-icon.svg"
import { ReactComponent as EditIcon } from "../assets/icons/edit-icon.svg"
import { ReactComponent as RemoveIcon } from "../assets/icons/remove-icon.svg"

function Skill({ skill }) {
  const [inputValue, setInputValue] = useState()
  const [editInput, setEditInput] = useState(false)
  const onEditClick = useCallback((event) => {
    event.preventDefault()
  }, [])
  const onDeleteClick = useCallback((event) => {
    event.preventDefault()
  }, [])
  return (
    <div className="flex justify-center items-center">
      {console.log("inputValue", inputValue)}
      {editInput ? (
        <>
          <StyledInput
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            name="skill"
            id="skill"
            placeholder="Skill"
            className="font-normal rounded-full"
            classNameWrapper="w-1/2 mb-0"
            // error={errors.project_name}
          />
          <UpdateIcon
            width={20}
            height={20}
            className="cursor-pointer min-w-[12px] ml-[20px]"
            onClick={() => {
              setInputValue(skill.skill_name)
              setEditInput(true)
            }}
          />
        </>
      ) : (
        <>
          <div>{skill.skill_name}</div>
          <EditIcon
            width={20}
            height={20}
            className="cursor-pointer min-w-[12px] ml-[20px]"
            onClick={() => {
              setInputValue(skill.skill_name)
              setEditInput(true)
            }}
          />
          <RemoveIcon
            width={18}
            height={18}
            className="cursor-pointer min-w-[12px] ml-[10px]"
            onClick={(e) => onDeleteClick(e)}
          />
        </>
      )}
    </div>
  )
}

export default Skill
