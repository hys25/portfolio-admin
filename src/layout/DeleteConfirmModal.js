import { Button } from "../elements/Button"

function DeleteConfirmModal({
  isVisible,
  onConfirm,
  onDecline,
  modalQuestion,
}) {
  return (
    isVisible && (
      <div className="absolute top-1/3 left-[40%] w-auto h-[300px] bg-white px-10 py-6 text-black flex justify-center items-center flex-col font-bold rounded">
        <p className="mb-10">{modalQuestion}</p>
        <div className="flex">
          <Button onClick={onConfirm} className="mr-4">
            Remove
          </Button>
          <Button onClick={onDecline} className="mx-0">
            Cancel
          </Button>
        </div>
      </div>
    )
  )
}
export default DeleteConfirmModal
