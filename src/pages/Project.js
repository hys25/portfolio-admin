import {useRouter} from 'next/router'
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"

function Project() {
  const router = useRouter()
  console.log({router})
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Project page</Title>
      </ContentContainer>
    </DefaultContainer>
  );
}

export default Project
