import { Button } from "../elements/Button"

function DeleteProjectConfirmModal({ setOpenModal, removeProject }) {
  return (
    <div className="absolute top-1/3 left-[40%] w-auto h-[300px] bg-white px-10 py-6 text-black flex justify-center items-center flex-col font-bold rounded">
      <p className="mb-10">Are you sure you want to delete this project?</p>
      <div className="flex">
        <Button onClick={removeProject} className="mr-4">
          Remove project
        </Button>
        <Button onClick={setOpenModal} className="mx-0">
          Cancel
        </Button>
      </div>
    </div>
  )
}
export default DeleteProjectConfirmModal
