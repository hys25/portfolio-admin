import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultContainer from "../layout/DefaultContainer";
import { AuthInput, PasswordInput } from "../elements/Input";
import { Button } from "../elements/Button";
import { signUp, reset } from "../features/auth/authSlice";
import Spinner from "../layout/Spinner";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      dispatch(signUp(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <DefaultContainer>
      <form onSubmit={onSubmit} className="w-full max-w-[400px] m-auto">
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

export default SignUp;
