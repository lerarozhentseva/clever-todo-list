import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import { Button } from "../../../components/Button";
import { db } from "../../../core/database/firebase";
import { uniqueID } from "../../../core/utilits/utilities";
import "../styles/TodoPage.css";
import { useInput } from "../../../core/hooks/useInput";
import { DialogComponent } from "../../../components/DialogComponent";

function AddTodo() {
  const [open, setOpen] = useState(false);
  const title = useInput();
  const description = useInput();
  const selectedDay = useSelector((state) => state.selectedDay);
  const email = useSelector((state) => state.email);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let googleUser = "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    title.reset("");
    description.reset("");
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      googleUser = user?.email;
      return googleUser;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title.value !== "") {
        setLoading(true);
        await addDoc(collection(db, "todos"), {
          title: title.value,
          id: uniqueID(),
          description: description.value,
          date: selectedDay,
          creator: email || googleUser,
          completed: false,
        });
        handleClose();
      } else {
        setError("Title must be filled!");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add_block">
      {selectedDay && (
        <Button
          className="add_new_btn"
          onClick={handleClickOpen}
          title="+ Add a New Task"
        />
      )}
      <DialogComponent
        loading={loading}
        open={open}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        title={title}
        description={description}
        error={error}
        dialogTitle="New Task"
      />
    </div>
  );
}

export default AddTodo;
