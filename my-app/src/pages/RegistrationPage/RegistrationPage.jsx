import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {signUp} from "../../components/utilities";
import {changeVerifPassword, changeEmail, changePassword} from "../../store/actions";
import "./RegistrationPage.css";
import {Alert} from "@mui/material";
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(state => state.email);
  const password = useSelector(state => state.password);
  const verificationPassword = useSelector(state => state.verificationPassword);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/todolist", {replace: true});
    }
  }, [isLoggedIn]);

  const onChangeEmail = (e) => dispatch(changeEmail(e.target.value));
  const onChangePassword = (e) => dispatch(changePassword(e.target.value));
  const onChangeVerificationPassword = (e) => dispatch(changeVerifPassword(e.target.value));

  const signUpHandler = () => {
    if (password === verificationPassword) {
      signUp(email, password)
        .then(() => {
          sessionStorage.email = email;
          setIsLoggedIn(true);
        })
        .catch((err) => {
          setErrors(err.message);
        });
    } else {
      setErrors("Password does not match");
    }
  };

  return (
    <>
      <div className={'registr_div'}>
        <Button
          className={'btn_back'}
          title={<ArrowBackTwoToneIcon id="i"/>}
          onClick={() => {
            navigate('/', {replace: true})
          }}
          type={'button'}
        />
        <h1 className={'login_h1'}>Sign Up</h1>
        <label className={'login_label'}>Email:</label>
        <Input className={'login_input'} placeholder={'example: qwer@mail.com'} onChange={onChangeEmail}
               type={'text'}/>
        <label className={'login_label'}>Password:</label>
        <Input placeholder={'example: 123456'} className={'login_input'} onChange={onChangePassword}
               type={'password'}/>
        <label className={'login_label'}>Repeat password:</label>
        <Input placeholder={'example: 123456'} className={'login_input'} onChange={onChangeVerificationPassword}
               type={'password'}/>
        <Button className={'login_button'} type="button" title="Sign Up" onClick={signUpHandler}/>

        {
          errors ?
            <Alert sx={{width: '300px', mt: 2}} severity="error">{errors}</Alert> : ''
        }
      </div>
    </>
  )
}

export default RegistrationPage;