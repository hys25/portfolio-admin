import { useCallback, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSkills, reset } from "../../features/skills/skillsSlice"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import Skills from "../../layout/Skills"
import { Title } from "../../elements/Title"
import { StyledInput } from "../../elements/Input"
import { Button } from "../../elements/Button"

function AddSkill() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [skill, setSkill] = useState()
  const handleAddNewSkill = useCallback(
    (event) => {
      event.preventDefault()
      setSkill(event.target.value)
    },
    [setSkill]
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
  }, [dispatch])
  const { skills } = useSelector((state) => state.skills)
  console.log("skills", skills)
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Add new skill</Title>
        <div className="mx-auto w-full max-w-[700px]">
          <StyledInput
            value={skill || ""}
            onChange={handleAddNewSkill}
            id="project_stack"
            placeholder="Add new skill"
            name="skill"
            // error={errors.project_stack}
          />
          <Button type="submit" className="w-auto mt-[30px]">
            Submit
          </Button>
          {skills && <Skills skills={skills} />}
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default AddSkill
