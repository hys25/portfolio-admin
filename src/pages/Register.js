import { useState } from "react";
import DefaultContainer from "./../layout/DefaultContainer";
import { AuthInput, PasswordInput } from "../elements/Input";
import { Button } from "../elements/Button";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  })
  const {username, email, password, password2} = formData

  const onChange = (e) => {
    console.log('email e.target.name register', e)
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
          value={username}

          name="username"
          id="username"
          placeholder="Username"
          login
          onChange={onChange}
        />
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
          placeholder="Password"
          name="password"
          id="password"
        />
        <PasswordInput
          value={password2}
          onChange={onChange}
          placeholder="Confirm password"
          name="password2"
          id="password2"
        />
        <Button type="submit">Sign up</Button>
      </form>
    </DefaultContainer>
  );
}

export default Register
