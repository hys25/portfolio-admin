import DefaultContainer from "./../layout/DefaultContainer"
import { AuthInput, PasswordInput } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button, ButtonLink } from "../elements/Button"

function Login() {
  return (
    <DefaultContainer>
      <div className="w-full max-w-[400px] m-auto">
        <AuthInput placeholder="Login" type="text" login />
        <PasswordInput placeholder="Password" type="password" />
        <div className="flex justify-between mt-[20px] mb-[25px]">
          <Checkbox name="Remember me">Remember me</Checkbox>
          <ButtonLink href="/">Forgot password</ButtonLink>
        </div>
        <Button>Sign in</Button>
        <div className="flex items-center justify-center mt-[10px] text-grey">
          Don't have an account yet?{" "}
          <ButtonLink href="/" className="ml-[10px]">
            Register now
          </ButtonLink>
        </div>
      </div>
    </DefaultContainer>
  )
}

export default Login
