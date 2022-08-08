import { Link } from "react-router-dom";

function Projects() {
  return (
    <>
      <h1>Projects page(homepage)</h1>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/login">login</Link>
        <Link to="/registration">registration</Link>
      </nav>
    </>
  );
}

export default Projects;
