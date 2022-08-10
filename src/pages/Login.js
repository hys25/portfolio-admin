import { useState } from "react"
import DefaultContainer from "./../layout/DefaultContainer"
import { AuthInput, PasswordInput } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button, ButtonLink } from "../elements/Button"

function Login() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    // e.preventDefault()
  }

  return (
    <DefaultContainer>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-full max-w-[400px] m-auto"
      >
        <AuthInput
          placeholder="Login"
          type="text"
          value={login}
          setValue={setLogin}
          login
        />
        <PasswordInput
          placeholder="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <div className="flex justify-between mt-[20px] mb-[25px]">
          <Checkbox name="Remember me">Remember me</Checkbox>
          <ButtonLink href="/">Forgot password</ButtonLink>
        </div>
        <Button type="submit">Sign in</Button>
        <div className="flex items-center justify-center mt-[10px] text-grey">
          Don't have an account yet?{" "}
          <ButtonLink href="/" className="ml-[10px]">
            Register now
          </ButtonLink>
        </div>
      </form>
    </DefaultContainer>
  );
}

export default Login
