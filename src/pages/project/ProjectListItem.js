import { Link } from "react-router-dom"
import { REACT_APP_BE_HOST } from "../../config/index"

const MAIN_IMAGE_PLACEHOLDER =
  "https://blog.hubspot.com/hubfs/Team%20deciding%20on%20membership%20website%20builder.jpg"

function ProjectListItem({ projectData, innerRef }) {
  const mainImageUrl = `${REACT_APP_BE_HOST}/${projectData?.main_image_url}`
  return (
    <Link
      to={`/project/${projectData?._id}`}
      style={{
        backgroundImage: `url(${
          projectData?.main_image_url ? mainImageUrl : MAIN_IMAGE_PLACEHOLDER
        })`,
      }}
      ref={innerRef}
      className="flex relative flex-col justify-center mb-2 w-full bg-no-repeat bg-cover opacity-70 cursor-pointer hover:opacity-100 z-1 h-[70px] p-[15px] bg-greyDark"
    >
      <div className="absolute h-auto font-medium text-20 z-2">
        <h2 className="text-white uppercase">{projectData?.project_name}</h2>
        <h3 className="text-16 text-grey">{projectData?.project_stack}</h3>
      </div>
    </Link>
  )
}

export default ProjectListItem
