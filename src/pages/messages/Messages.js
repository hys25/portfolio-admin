import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMessages, reset } from "../../features/message/messageSlice"
import DefaultContainer from "../../layout/DefaultContainer"
import ContentContainer from "../../layout/ContentContainer"
import { Title } from "../../elements/Title"

function Messages() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { messages } = useSelector((state) => state.message)
  useEffect(() => {
    const isUser = localStorage.getItem("user_token")
    if (!isUser) {
      navigate("/auth/sign-in")
    }
    dispatch(getMessages())
    return () => {
      dispatch(reset())
    }
  }, [navigate, dispatch])
  return (
    <DefaultContainer authorized>
      <ContentContainer>
        <Title className="mb-[50px]">Messages</Title>
        {messages &&
          messages.map((message) => (
            <div className="flex justify-between items-center p-5 text-white transition-all cursor-pointer mb-[10px] bg-greyDark hover:bg-greyLight">
              <div className="flex w-[80%] items-center">
                <p className="w-[25%]">
                  {message.first_name}
                  <span className="ml-2">{message.last_name}</span>
                </p>
                <p className="w-[75%] h-[24px] overflow-hidden">
                  {message.message}
                </p>
              </div>
              <p className="flex w-[20%] justify-end">
                {new Date(message.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
      </ContentContainer>
    </DefaultContainer>
  )
}

export default Messages
