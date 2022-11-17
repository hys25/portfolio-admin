import { useCallback, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getSkills, reset, postSkill } from "../../features/skill/skillSlice"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import Skill from "../../layout/Skill"
import { Title } from "../../elements/Title"
import { StyledInput } from "../../elements/Input"
import { Button } from "../../elements/Button"

function AddSkill() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { skills } = useSelector((state) => state.skill)
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
      const result = await dispatch(postSkill({ skill_name: newSkill }))
      if (result.payload.status === 200) {
        dispatch(getSkills())
      }
    },
    [dispatch, newSkill]
  )
  useEffect(() => {
    const isUser = localStorage.getItem("user_token")
    if (!isUser) {
      navigate("/auth/sign-in")
    }
    dispatch(getSkills())
    return () => {
      dispatch(reset())
    }
  }, [dispatch, navigate])
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
