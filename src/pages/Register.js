import { useState } from "react";
import DefaultContainer from "./../layout/DefaultContainer";
import { AuthInput, PasswordInput } from "../elements/Input";
import { Button } from "../elements/Button";

function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = (e) => {
    // e.preventDefault()
  };

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
        <AuthInput
          placeholder="Username"
          type="text"
          value={username}
          setValue={setUsername}
          login
        />
        <Button type="submit">Sign up</Button>
      </form>
    </DefaultContainer>
  );
}

export default Register
