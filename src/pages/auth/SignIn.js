import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSignInMutation } from "../../features/auth/authApi"
import DefaultContainer from "../../layout/DefaultContainer"
import { StyledInput, PasswordInput } from "../../elements/Input"
import { Checkbox } from "../../elements/Checkbox"
import { Button, StyledLink } from "../../elements/Button"
import Spinner from "../../layout/Spinner"
import useForm from "../../hooks/useForm"
import { Title } from "../../elements/Title"
import { LSService } from "../../features/auth/localStorageService"

function SignIn() {
  const { onChange, formDataValue } = useForm({
    email: "",
    password: "",
  })
  const [rememberUser, setRememberUser] = useState(false)
  const navigate = useNavigate()

  const [signIn, { isLoading }] = useSignInMutation()

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      await signIn(formDataValue)
      const userLS = LSService.getToken()
      if (userLS) {
        navigate("/")
      }
    },
    [formDataValue, navigate, signIn]
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <DefaultContainer>
      <form onSubmit={onSubmit} className="m-auto w-full max-w-[400px]">
        <Title className="text-center mb-[50px]">Sign in to your account</Title>
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
