import { AuthInput, PasswordInput } from "../elements/Input";
import { Button } from "../elements/Button";

function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <AuthInput placeholder="Login" type="text" />
      <PasswordInput placeholder="Password" type="password" />
      <Button>Sign in</Button>
    </div>
  );
}

export default Login;
