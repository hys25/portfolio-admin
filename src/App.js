import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Projects from "./pages/project/Projects"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import ProjectCreate from "./pages/project/ProjectCreate"
import ProjectView from "./pages/project/ProjectView"
import ProjectEdit from "./pages/project/ProjectEdit"
import AddSkill from "./pages/skill/AddSkill"
import Messages from "./pages/messages/Messages"
import MessageView from "./pages/messages/MessageView"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/new-project" element={<ProjectCreate />} />
        <Route path="/project/:id" element={<ProjectView />} />
        <Route path="/project/edit/:id" element={<ProjectEdit />} />
        <Route path="/skill" element={<AddSkill />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/message/:id" element={<MessageView />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
