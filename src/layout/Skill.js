import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import {
  putSkill,
  getSkills,
  deleteSkill,
} from "../features/skills/skillsSlice"
import { StyledInput } from "../elements/Input"
import { ReactComponent as UpdateIcon } from "../assets/icons/update-icon.svg"
import { ReactComponent as EditIcon } from "../assets/icons/edit-icon.svg"
import { ReactComponent as RemoveIcon } from "../assets/icons/remove-icon.svg"

function Skill({ skill }) {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState()
  const [editInput, setEditInput] = useState(false)
  const handleUpdateSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const result = await dispatch(
        putSkill({ skillId: skill._id, skillData: { skill_name: inputValue } })
      )
      if (result.payload.status === 200) {
        dispatch(getSkills())
        setEditInput(false)
      }
    },
    [dispatch, inputValue, setEditInput]
  )
  const onDeleteClick = useCallback(
    async (event) => {
      event.preventDefault()
      const result = await dispatch(deleteSkill(skill._id))
      if (result.payload.status === 200) {
        dispatch(getSkills())
        setEditInput(false)
      }
    },
    [dispatch]
  )
  return (
    <div className="flex justify-center items-center h-[30px]">
      {editInput ? (
        <>
          <StyledInput
            size="small"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
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
            onClick={(event) => handleUpdateSubmit(event)}
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
