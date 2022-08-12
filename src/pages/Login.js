import { useState } from "react"
import DefaultContainer from "./../layout/DefaultContainer"
import { AuthInput, PasswordInput } from "../elements/Input"
import { Checkbox } from "../elements/Checkbox"
import { Button, ButtonLink } from "../elements/Button"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email, password} = formData

  const onChange = (e) => {
    console.log('email e.target.name', e)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <DefaultContainer>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[400px] m-auto"
      >
        <AuthInput
          value={email}
          onChange={onChange}
          type="email"
          name="name"
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
          Don't have an account yet?{" "}
          <ButtonLink href="/register" className="ml-[10px]">
            Register now
          </ButtonLink>
        </div>
      </form>
    </DefaultContainer>
  );
}

export default Login
