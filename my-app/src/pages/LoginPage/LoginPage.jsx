import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeEmail, changePassword} from "../../store/actions";
import {signIn} from "../../components/utilities";
import {useInput} from "../../components/useInput";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import "./LoginPage.css";
import {Alert} from "@mui/material";
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/todolist", {replace: true});
    }
  }, [isLoggedIn]);

  const toSignIn = () => {
    dispatch(changeEmail(email.value));
    dispatch(changePassword(password.value));
    signIn(email.value, password.value)
      .then(() => {
        sessionStorage.email = email.value;
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setErrors(err.message);
      });
  };

  return (
    <>
      <div className={'login_div'}>
        <Button
          className={'btn_back'}
          title={<ArrowBackTwoToneIcon id="i"/>}
          onClick={() => {
            navigate("/", {replace: true})
          }}
          type={'button'}
        />
        <h1 className={'login_h1'}>Sign In</h1>
        <label className={'login_label'}>Email:</label>
        <Input className={'login_input'} placeholder={'example: qwer@mail.com'} onChange={email.onChange}
               type={'text'}
               value={email.value}/>
        <label className={'login_label'}>Password:</label>
        <Input placeholder={'example: 123456'} className={'login_input'} onChange={password.onChange}
               type={'password'} value={password.value}/>
        <span className={'login_span'}><i>Password must contain at least 6 characters</i></span>
        <Button className={'login_button'} type="button" title="Sign In" onClick={toSignIn}/>
        <h4 className={'login_h4'}>Do not have an account in the To-do List?</h4>
        <Button
          onClick={() => {
            navigate("/register", {replace: true})
          }}
          title={'Sign up'}
          className={'signUpBtn'}
          type={'button'}
        />
        {
          errors ?
            <Alert sx={{width: '300px', mt: 2}} severity="error">{errors}</Alert> : ''
        }
      </div>
    </>
  )
}