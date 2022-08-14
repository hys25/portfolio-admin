import DefaultContainer from "../layout/DefaultContainer";
import ContentContainer from "../layout/ContentContainer";
import Title from "../elements/Title";

function Project() {
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Project page</Title>
      </ContentContainer>
    </DefaultContainer>
  );
}

export default Project;
