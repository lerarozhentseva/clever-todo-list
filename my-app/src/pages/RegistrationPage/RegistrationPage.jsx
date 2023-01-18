import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { signUp } from "../../core/utilits/utilities";
import {
  changeVerifPassword,
  changeEmail,
  changePassword,
} from "../../core/actions/actions";
import "./RegistrationPage.css";

function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/todolist", { replace: true });
    }
  }, [isLoggedIn]);

  const signUpHandler = () => {
    dispatch(changeEmail(email));
    dispatch(changePassword(password));
    dispatch(changeVerifPassword(verificationPassword));
    if (password === verificationPassword) {
      setLoading(true);
      signUp(email, password)
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          setErrors(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrors("Password does not match");
    }
  };

  return (
    <div className="registr_div">
      <Button
        className="btn_back"
        title={<ArrowBackTwoToneIcon id="i" />}
        onClick={() => {
          navigate("/", { replace: true });
        }}
        type="button"
      />
      <h1 className="login_h1">Sign Up</h1>
      <label htmlFor="input_email" className="login_label">
        Email:
      </label>
      <Input
        className="login_input"
        value={email}
        placeholder="example: qwer@mail.com"
        onChange={(e) => setEmail(e.target.value)}
        id="input_email"
        type="text"
      />
      <label htmlFor="input_password" className="login_label">
        Password:
      </label>
      <Input
        id="input_password"
        placeholder="example: 123456"
        value={password}
        className="login_input"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <label htmlFor="input_repeat" className="login_label">
        Repeat password:
      </label>
      <Input
        id="input_repeat"
        value={verificationPassword}
        placeholder="example: 123456"
        className="login_input"
        onChange={(e) => setVerificationPassword(e.target.value)}
        type="password"
      />
      {loading ? (
        <Loading />
      ) : (
        <Button
          className="login_button"
          type="button"
          title="Sign Up"
          onClick={signUpHandler}
        />
      )}
      {errors && (
        <Alert sx={{ width: "300px", mt: 2 }} severity="error">
          {errors}
        </Alert>
      )}
    </div>
  );
}

export default RegistrationPage;
