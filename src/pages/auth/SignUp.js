import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSignUpMutation } from "../../features/auth/authService"
import DefaultContainer from "../../layout/DefaultContainer"
import { StyledInput, PasswordInput } from "../../elements/Input"
import { Button } from "../../elements/Button"
import Spinner from "../../layout/Spinner"
import useForm from "../../hooks/useForm"
import { Title } from "../../elements/Title"

function SignUp() {
  const { formDataValue, onChange } = useForm({
    username: "",
    email: "",
    password: "",
    password2: "",
  })
  const navigate = useNavigate()

  const [signUp, { isLoading }] = useSignUpMutation()

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      if (formDataValue.password !== formDataValue.password2) {
        toast.error("Passwords do not match")
      } else {
        await signUp(formDataValue)
        const userLS = localStorage.getItem("user_token")
        if (userLS) {
          navigate("/")
        }
      }
    },
    [formDataValue, navigate, signUp]
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <DefaultContainer>
      <form onSubmit={onSubmit} className="m-auto w-full max-w-[400px]">
        <Title className="text-center mb-[50px]">Create admin account</Title>
        <StyledInput
          value={formDataValue.username}
          name="username"
          id="username"
          placeholder="Username"
          onChange={onChange}
        />
        <StyledInput
          value={formDataValue.email}
          onChange={onChange}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <PasswordInput
          value={formDataValue.password}
          onChange={onChange}
          placeholder="Password"
          name="password"
          id="password"
        />
        <PasswordInput
          value={formDataValue.password2}
          onChange={onChange}
          placeholder="Confirm password"
          name="password2"
          id="password2"
        />
        <Button type="submit">Sign up</Button>
      </form>
    </DefaultContainer>
  )
}

export default SignUp
