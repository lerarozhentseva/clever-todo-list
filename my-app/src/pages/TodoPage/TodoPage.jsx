import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../core/database/firebase";
import { uniqueID, logOut } from "../../core/utilits/utilities";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { DateItem } from "./components/DateItem";
import "./styles/TodoPage.css";
import { useTheme } from "../../core/hooks/useTheme";
import { Button } from "../../components/Button";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const email = useSelector((state) => state.email);
  const navigate = useNavigate();
  const selectedDay = useSelector((state) => state.selectedDay);
  const { setTheme } = useTheme();
  const [googleUser, setGoogleUser] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setGoogleUser(user?.email);
      }
    });
  }, []);

  useEffect(() => {
    const getQuery = query(collection(db, "todos"));
    const unsub = onSnapshot(getQuery, (querySnapshot) => {
      const todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const currentDate = moment();
  const days = [
    {
      id: uniqueID(),
      weekDay: currentDate.format("llll").split(",")[0],
      date: currentDate.format("llll").split(",")[1].split(" ")[2],
      value: currentDate.format("").slice(0, 10),
    },
  ];

  const createDates = () => {
    for (let i = 1; i <= 31; i += 1) {
      const nextDate = moment().add(i, "days");
      const nextDay = {
        id: uniqueID() + i,
        weekDay: nextDate.format("llll").split(",")[0],
        date: nextDate.format("llll").split(",")[1].split(" ")[2],
        value: nextDate.format().slice(0, 10),
      };
      days.push(nextDay);
    }
  };
  createDates();

  const handleEdit = (todo, title, description) => {
    if (title) {
      return updateDoc(doc(db, "todos", todo.id), {
        title,
        description,
      });
    }
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const logOutFromAccount = () => {
    logOut();
    navigate("/", { replace: true });
  };

  const handleLightThemeClick = () => {
    setTheme("light");
  };

  const handleDarkThemeClick = () => {
    setTheme("dark");
  };

  return (
    <div className="todolist">
      <div className="theme_btns">
        <Button
          className="btn_theme"
          title="dark"
          onClick={handleDarkThemeClick}
        />
        <Button
          className="btn_theme"
          title="light"
          onClick={handleLightThemeClick}
        />
      </div>
      <button type="button" className="btn_out" onClick={logOutFromAccount}>
        Log out
      </button>
      <h1 className="todolist_h1">To-do List</h1>
      <div className="days_block">
        {days &&
          days.map((item, index) => (
            <DateItem
              todos={todos}
              key={index}
              id={item.id}
              day={item.date}
              weekDay={item.weekDay}
              value={item.value}
            />
          ))}
      </div>
      <div>
        <AddTodo />
      </div>
      <div className="todo_container">
        {todos &&
          todos.map((item) => {
            if (item.creator === email || item.creator === googleUser) {
              if (item.date === selectedDay) {
                return (
                  <Todo
                    key={item.id}
                    todo={item}
                    toggleComplete={toggleComplete}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              }
            }
          })}
      </div>
    </div>
  );
}
