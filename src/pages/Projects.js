import { Link } from "react-router-dom"
import DefaultContainer from "./../layout/DefaultContainer"
import ContentContainer from "../layout/ContentContainer"

function Projects() {
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Link to="/about">About</Link>
        <Link to="/login">login</Link>
        <Link to="/registration">registration</Link>
      </ContentContainer>
    </DefaultContainer>
  );
}

export default Projects
