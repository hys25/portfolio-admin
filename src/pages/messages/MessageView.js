import { useCallback, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  useGetMessageQuery,
  useDeleteMessageMutation,
} from "../../features/message/messageApi"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import { Button } from "../../elements/Button"
import DeleteConfirmModal from "../../layout/DeleteConfirmModal"
import { DateAndTime } from "../../elements/DateAndTime"
import { ReactComponent as ArrowBack } from "../../assets/icons/arrow-back.svg"

function MessageView() {
  const navigate = useNavigate()

  const { id: currentMessageId } = useParams()
  const { data: message } = useGetMessageQuery(currentMessageId)
  const [deleteMessage] = useDeleteMessageMutation()

  const [openModal, setOpenModal] = useState(false)

  const handleRemoveMessage = useCallback(async () => {
    setOpenModal(false)
    const result = deleteMessage(currentMessageId)

    if (result.data._id === currentMessageId) {
      navigate("/message")
    }
  }, [deleteMessage, currentMessageId, navigate])
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Link to="/message" className="flex items-center text-white mb-[50px]">
          <ArrowBack
            width={30}
            height={10}
            className="cursor-pointer min-w-[30px] mr-[20px]"
          />
          Back to messages
        </Link>

        <div className="flex flex-col mx-auto w-full">
          <div className="flex justify-between w-full">
            <p className="w-full font-bold text-white">
              {message?.first_name}
              <span className="ml-2">{message?.last_name}</span>
              <span className="ml-2 font-normal text-grey">
                {message?.email}
              </span>
            </p>
            <div className="whitespace-nowrap">
              <DateAndTime date={message.createdAt} />
            </div>
          </div>
          <p className="mt-6 text-white">{message?.message}</p>
          <div className="flex justify-end mt-10 w-full">
            <Button onClick={() => setOpenModal(true)} className="mx-0">
              Remove message
            </Button>
          </div>
          <DeleteConfirmModal
            onConfirm={() => handleRemoveMessage(currentMessageId)}
            onDecline={() => setOpenModal(false)}
            isVisible={openModal}
            modalQuestion="Are you sure you want to delete this message?"
          />
        </div>
      </ContentContainer>
    </DefaultContainer>
  )
}

export default MessageView
