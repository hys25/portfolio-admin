import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signIn, reset } from "../features/auth/authSlice"
import DefaultContainer from "../layout/DefaultContainer"
import { AuthInput, PasswordInput } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button, ButtonLink } from "../elements/Button"
import Spinner from "../layout/Spinner"

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    const userLS = localStorage.getItem("user")

    if (isError) {
      toast.error(message)
    }
    if (isSuccess || userLS) {
      navigate("/")
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(signIn(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <DefaultContainer>
      <form onSubmit={onSubmit} className="w-full max-w-[400px] m-auto">
        <AuthInput
          value={email}
          onChange={onChange}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          login
        />
        <PasswordInput
          value={password}
          onChange={onChange}
          name="password"
          id="password"
          placeholder="Password"
        />
        <div className="flex justify-between mt-[20px] mb-[25px]">
          <Checkbox name="Remember me">Remember me</Checkbox>
          <ButtonLink href="/">Forgot password</ButtonLink>
        </div>
        <Button type="submit">Sign in</Button>
        <div className="flex items-center justify-center mt-[10px] text-grey">
          Don&apos;t have an account yet?{" "}
          <ButtonLink href="/register" className="ml-[10px]">
            Register now
          </ButtonLink>
        </div>
      </form>
    </DefaultContainer>
  )
}

export default SignIn
