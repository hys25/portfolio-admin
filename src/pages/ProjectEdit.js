import DefaultContainer from "../layout/DefaultContainer"
import ContentContainer from "../layout/ContentContainer"
import { Title } from "../elements/Title"
import { Button } from "../elements/Button"

function ProjectEdit() {
  const onEditSubmit = (e) => e.preventDefault()
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Edit project page</Title>
        <form onSubmit={onEditSubmit} className="m-auto w-full max-w-[400px]">
          <Button type="submit">Sign in</Button>
        </form>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default ProjectEdit
