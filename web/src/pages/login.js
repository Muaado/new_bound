import React, { useEffect } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import { useForm } from "react-hook-form";
import { Button } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleLogin, isLoggedIn } from "../services/auth";
import { device } from "../styles/deviceSizes";
import * as yup from "yup";

const validationSchema = yup
  .object({
    email: yup.string().email("Enter is not valid").required("Required*"),
    password: yup.string().required("Required*"),
  })
  .required();

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const LoginContent = styled.div`
  display: flex;
  padding: 0rem 3rem 1rem 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(253, 247, 237);
  width: 30rem;
  height: 30rem;
  h2 {
    font-size: 35px;
  }
  form {
    width: 100%;
    height: 100%;
  }

  .form-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @media ${device.tablet} {
      width: 100%;
      /* margin: 1rem 0; */
    }
  }

  /* & */

  label {
    text-transform: uppercase;
    color: #3d3d3d;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-start;
  }

  input {
    width: 100%;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
`;

const defaultValues = {
  password: "",
  email: "",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { email: emailError, password: passwordError } = errors;

  if (isLoggedIn()) {
    navigate("/");
  }

  return (
    <LoginWrapper>
      <form
        onSubmit={handleSubmit((formValues) =>
          handleLogin({
            ...formValues,
          })
        )}
      >
        <LoginContent>
          <h2>Boundless Login</h2>
          <div className="form-control">
            <label>Email</label>
            <input type="text" {...register("email")} />
            <ErrorField error={emailError} />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input type="text" {...register("password")} />
            <ErrorField error={passwordError} />
            <Button
              style={{ width: "100%", background: "#91715c", color: "white" }}
            >
              Login
            </Button>
          </div>
        </LoginContent>
      </form>
    </LoginWrapper>
  );
};

const ErrorField = ({ error }) => {
  return (
    <span style={{ margin: "1rem 0", color: "red", alignSelf: "flex-start" }}>
      {error?.message}
    </span>
  );
};

export default Login;
