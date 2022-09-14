import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Projects from "./pages/Projects"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import NewProject from "./pages/NewProject"
import ProjectView from "./pages/ProjectView"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/project/:id" element={<ProjectView />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
