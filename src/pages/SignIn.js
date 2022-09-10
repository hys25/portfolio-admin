import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signIn, reset } from "../features/auth/authSlice"
import DefaultContainer from "../layout/DefaultContainer"
import { StyledInput, PasswordInput } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button, StyledLink } from "../elements/Button"
import Spinner from "../layout/Spinner"
import useForm from "../hooks/useForm"

function SignIn() {
  const { onChange, formDataValue } = useForm({
    email: "",
    password: "",
  })
  const [rememberUser, setRememberUser] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    const userLS = localStorage.getItem("user_token")

    if (isError) {
      toast.error(message)
    }
    if (isSuccess || userLS) {
      navigate("/")
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(signIn(formDataValue))
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
          name="password"
          id="password"
          placeholder="Password"
        />
        <div className="flex justify-between mt-[20px] mb-[25px]">
          <Checkbox
            name="Remember me"
            onChange={() => setRememberUser(!rememberUser)}
            checked={rememberUser}
          >
            Remember me
          </Checkbox>
          <StyledLink href="/">Forgot password</StyledLink>
        </div>
        <Button type="submit">Sign in</Button>
        <div className="flex justify-center items-center mt-[10px] text-grey">
          Don&apos;t have an account yet?{" "}
          <StyledLink href="/auth/sign-up" className="ml-[10px]">
            Sign up now
          </StyledLink>
        </div>
      </form>
    </DefaultContainer>
  )
}

export default SignIn
