import React, {useState} from "react";
import {Input} from "../../../components/Input";
import {Button} from "../../../components/Button";
import {db} from "../../../firebase";
import {collection, addDoc} from "firebase/firestore";
import {useSelector} from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {uniqueID} from "../../../components/utilities";
import "../TodoPage.css";
import {useInput} from "../../../components/useInput";
import {Alert} from "@mui/material";

const AddTodo = () => {
  const [open, setOpen] = useState(false);
  const title = useInput();
  const description = useInput();
  const selectedDay = useSelector(state => state.selectedDay);
  const email = sessionStorage.email;
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    if (selectedDay) {
      setOpen(true);
    } else {
      setError('Please, select date!')
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  };

  const handleClose = () => {
    setOpen(false);
    title.reset("");
    description.reset("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.value !== "") {
      await addDoc(collection(db, "todos"), {
        title: title.value,
        id: uniqueID(),
        description: description.value,
        date: selectedDay,
        creator: email,
        completed: false,
      });
      handleClose();
    } else {
      setError('Field Title must be filled!');
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  };

  return (
    <>
      <div className={'add-block'}>
        <Button className={'addNew_btn'} onClick={handleClickOpen} title={'+ Add a New Task'}/>
      </div>
      {
        error === 'Please, select date!' ? <Alert sx={{width: '300px', mt: 2}} severity="error">{error}</Alert> : ''
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent className={'dialog_inputs'}>
          <Input
            className={'modal_input'} placeholder={'Title'} value={title.value}
            onChange={title.onChange}
            type={'text'}
          />
          <Input
            className={'modal_input'} placeholder={'Description'} value={description.value}
            onChange={description.onChange}
            type={'text'}
          />
        </DialogContent>
        <DialogActions>
          <Button className={'modal_btn'} type={'button'} onClick={handleClose} title={'Close'}/>
          <Button className={'modal_btn'} type={'button'} onClick={handleSubmit} title={'Add'}/>
        </DialogActions>
        {
          error === 'Field Title must be filled!' ?
            <Alert sx={{width: '300px', m: 2}} severity="error">{error}</Alert> : ''
        }
      </Dialog>
    </>
  );
}

export default AddTodo;