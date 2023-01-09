import React, {useState} from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import {Input} from "../../../components/Input";
import {Button} from "../../../components/Button";
import "./Todo.css";

export default function Todo({todo, toggleComplete, handleDelete, handleEdit}) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescr, setNewDescr] = useState(todo.description);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    if (todo.completed === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  const handleChangeDescripltion = (e) => {
    e.preventDefault();
    if (todo.completed === true) {
      setNewDescr(todo.description);
    } else {
      todo.description = "";
      setNewDescr(e.target.value);
    }
  };

  return (
    <>
      <div className={'todo'}>
        <div className={'todo_input-block'}>
          <Input
            type="text"
            value={todo.title === '' ? newTitle : todo.title}
            className={todo.completed ? 'todo_elem checked-todo' : 'todo_elem'}
            onChange={handleChangeTitle}
          />
          <Input
            type="text"
            value={todo.description === "" ? newDescr : todo.description}
            className={todo.completed ? 'todo_elem checked-todo' : 'todo_elem'}
            onChange={handleChangeDescripltion}
          />
        </div>
        <div className={'todo_btns-block'}>
          <Button
            className={'todo_btn'}
            type={'button'}
            title={<CheckCircleIcon id="i"/>}
            onClick={() => toggleComplete(todo)}
          />
          <Button
            className={'todo_btn'}
            type={'button'}
            title={<EditIcon id="i"/>}
            onClick={() => handleEdit(todo, newTitle, newDescr)}
          />
          <Button
            className={'todo_btn'}
            type={'button'}
            title={<DeleteOutlineTwoToneIcon id="i"/>}
            onClick={() => handleDelete(todo.id)}
          />
        </div>
      </div>
    </>
  );
}