import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signUp, reset } from "../features/auth/authSlice"
import DefaultContainer from "../layout/DefaultContainer"
import { StyledInput, PasswordInput } from "../elements/Input"
import { Button } from "../elements/Button"
import Spinner from "../layout/Spinner"
import useForm from "../hooks/useForm"

function SignUp() {
  const { formDataValue, onChange } = useForm({
    username: "",
    email: "",
    password: "",
    password2: "",
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate("/")
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      if (formDataValue.password !== formDataValue.password2) {
        toast.error("Passwords do not match")
      } else {
        dispatch(signUp(formDataValue))
      }
    },
    [dispatch, formDataValue]
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <DefaultContainer>
      <form onSubmit={onSubmit} className="m-auto w-full max-w-[400px]">
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
