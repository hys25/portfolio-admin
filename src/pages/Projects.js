import DefaultContainer from "../layout/defaultContainer"
import { Link } from "react-router-dom";

function Projects() {
  return (
    <DefaultContainer>
      <h1>Projects page(homepage)</h1>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/login">login</Link>
        <Link to="/registration">registration</Link>
      </nav>
    </DefaultContainer>
  );
}

export default Projects;
