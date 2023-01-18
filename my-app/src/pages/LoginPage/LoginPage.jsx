import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import firebase from "firebase/compat/app";
import { changeEmail, changePassword } from "../../core/actions/actions";
import { signIn, signInWithGoogle } from "../../core/utilits/utilities";
import { useInput } from "../../core/hooks/useInput";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import "./LoginPage.css";
import { Loading } from "../../components/Loading";

export function LoginPage() {
  const dispatch = useDispatch();
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/todolist", { replace: true });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [setIsLoggedIn, isLoggedIn]);

  const toSignIn = () => {
    setLoading(true);
    dispatch(changeEmail(email.value));
    dispatch(changePassword(password.value));
    signIn(email.value, password.value)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setErrors(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toSignInWithGoogle = async () => {
    try {
      setLoading(true);
      await dispatch(signInWithGoogle);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_div">
      <Button
        className="btn_back"
        title={<ArrowBackTwoToneIcon id="i" />}
        onClick={() => {
          navigate("/", { replace: true });
        }}
        type="button"
      />
      <h1 className="login_h1">Sign In</h1>
      <label htmlFor="input_email" className="login_label">
        Email:
      </label>
      <Input
        className="login_input"
        placeholder="example: qwer@mail.com"
        onChange={email.onChange}
        type="text"
        id="input_email"
        value={email.value}
      />
      <label htmlFor="input_password" className="login_label">
        Password:
      </label>
      <Input
        placeholder="example: 123456"
        className="login_input"
        onChange={password.onChange}
        id="input_password"
        type="password"
        value={password.value}
      />
      <span className="login_span">
        <i>Password must contain at least 6 characters</i>
      </span>
      <div className="btns_controls">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              className="login_button"
              type="button"
              title="Sign In"
              onClick={toSignIn}
            />
            <Button
              type="button"
              className="login_button"
              title="Sign In with Google"
              onClick={toSignInWithGoogle}
            />
          </>
        )}
      </div>
      <h4 className="login_h4">Do not have an account in the To-do List?</h4>
      <Button
        onClick={() => {
          navigate("/register", { replace: true });
        }}
        title="Sign up"
        className="sign_up_btn"
        type="button"
      />
      {errors && (
        <Alert sx={{ width: "300px", mt: 2 }} severity="error">
          {errors}
        </Alert>
      )}
    </div>
  );
}
