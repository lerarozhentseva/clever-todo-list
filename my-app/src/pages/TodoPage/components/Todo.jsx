import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import "../styles/Todo.css";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { DialogComponent } from "../../../components/DialogComponent";

export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleClickOpen = () => {
    if (!todo.completed) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTitle = (e) => {
    e.preventDefault();
    if (todo.completed === true) {
      setTitle(todo.title);
    } else {
      setTitle(e.target.value);
    }
  };

  const handleChangeDescripltion = (e) => {
    e.preventDefault();
    if (todo.completed === true) {
      setDescription(todo.description);
    } else {
      todo.description = "";
      setDescription(e.target.value);
    }
  };

  const saveNewTodo = () => {
    try {
      setLoading(true);
      handleEdit(todo, title, description);
      if (title === "") {
        setErrors("Title must be filled");
        setTimeout(() => {
          setErrors("");
        }, 3000);
      } else {
        setErrors("");
        handleClose();
      }
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo">
      <div className="todo_input_block">
        <Input
          type="text"
          readOnly="readOnly"
          value={todo.title}
          className={todo.completed ? "todo_elem checked_todo" : "todo_elem"}
        />
        <Input
          type="text"
          readOnly="readOnly"
          value={todo.description}
          className={todo.completed ? "todo_elem checked_todo" : "todo_elem"}
        />
      </div>
      <div className="todo_btns_block">
        <Button
          className="todo_btn"
          type="button"
          title={<CheckCircleIcon id="i" />}
          onClick={() => toggleComplete(todo)}
        />
        <Button
          className="todo_btn"
          type="button"
          title={<EditIcon id="i" />}
          onClick={handleClickOpen}
        />
        <Button
          className="todo_btn"
          type="button"
          title={<DeleteOutlineTwoToneIcon id="i" />}
          onClick={() => handleDelete(todo.id)}
        />
        <DialogComponent
          open={open}
          todo={todo}
          handleClose={handleClose}
          dialogTitle="Edit Task"
          editTitle={title}
          editDescription={description}
          onChangeTitle={handleChangeTitle}
          onChangeDescr={handleChangeDescripltion}
          handleSubmit={saveNewTodo}
          error={errors}
          loading={loading}
        />
      </div>
    </div>
  );
}
