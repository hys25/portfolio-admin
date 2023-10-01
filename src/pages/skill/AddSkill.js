import { useCallback, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  useGetAllSkillsQuery,
  useAddSkillMutation,
} from "../../features/skill/skillsApi"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import Skill from "../../layout/Skill"
import { Title } from "../../elements/Title"
import { StyledInput } from "../../elements/Input"
import { Button } from "../../elements/Button"
import { LSService } from "../../features/auth/localStorageService"

function AddSkill() {
  const navigate = useNavigate()

  const { data: skills } = useGetAllSkillsQuery()
  const [addSkill] = useAddSkillMutation()

  const [newSkill, setNewSkill] = useState()
  const [disableSubmit, setDisableSubmit] = useState(true)
  const handleAddNewSkill = useCallback(
    async (event) => {
      event.preventDefault()
      setNewSkill(event.target.value)
      if (event.target.value) {
        setDisableSubmit(false)
      } else {
        setDisableSubmit(true)
      }
    },
    [setNewSkill]
  )
  const onSubmitNewSkill = useCallback(
    async (event) => {
      event.preventDefault()
      const result = await addSkill({ skill_name: newSkill })
      if (result.data._id) {
        setNewSkill("")
        setDisableSubmit(true)
      }
    },
    [addSkill, newSkill]
  )
  useEffect(() => {
    const isUser = LSService.getToken()
    if (!isUser) {
      navigate("/auth/sign-in")
    }
  }, [navigate])
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Add new skill</Title>
        <div className="mx-auto w-full">
          <StyledInput
            value={newSkill || ""}
            onChange={handleAddNewSkill}
            id="project_stack"
            placeholder="Add new skill"
            name="skill"
            // error={errors.project_stack}
          />
          <Button
            onClick={(event) => onSubmitNewSkill(event)}
            type="submit"
            className="w-auto mt-[30px]"
            disable={disableSubmit}
          >
            Submit
          </Button>
          <div className="grid grid-cols-3 gap-5 font-bold text-white uppercase mt-[50px]">
            {skills &&
              skills.map((skillItem) => (
                <Skill key={skillItem._id} skill={skillItem} />
              ))}
          </div>
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default AddSkill
