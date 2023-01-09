import React, {useEffect, useState} from "react";
import AddTodo from "./Todo/AddTodo";
import Todo from "./Todo/Todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {db} from "../../firebase";
import {uniqueID} from "../../components/utilities";
import moment from "moment";
import {DateItem} from "./DateItem";
import {useSelector} from "react-redux";
import "./TodoPage.css";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {useTheme} from "../../components/useTheme";
import {Button} from "../../components/Button";


export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const email = sessionStorage.email;
  const navigate = useNavigate();
  const selectedDay = useSelector(state => state.selectedDay);
  const [errors, setErrors] = useState('');
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id});
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const currentDate = moment();
  const days = [{
    id: uniqueID(),
    weekDay: currentDate.format('llll').split(",")[0],
    date: currentDate.format('llll').split(",")[1].split(" ")[2],
    value: currentDate.format("").slice(0, 10)
  }];

  const createDates = () => {
    for (let i = 1; i <= 31; i++) {
      const nextDate = moment().add(i, 'days');
      const nextDay = {
        id: uniqueID() + i,
        weekDay: nextDate.format('llll').split(",")[0],
        date: nextDate.format('llll').split(",")[1].split(" ")[2],
        value: nextDate.format().slice(0, 10)
      };
      days.push(nextDay);
    }
  };
  createDates();

  const handleEdit = async (todo, title, description) => {
    if (title === '') {
      setErrors('Title can\'t be empty');
      setTimeout(() => {
        setErrors('')
      }, 3000);
    } else {
      await updateDoc(doc(db, "todos", todo.id), {title: title, description: description});
    }
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {completed: !todo.completed});
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const logOut = () => {
    sessionStorage.email = '';
    navigate('/', {replace: true});
  }

  const handleLightThemeClick = () => {
    setTheme('light');
  };

  const handleDarkThemeClick = () => {
    setTheme('dark');
  };

  return (
    <div className={'todolist'}>
      <div className={'theme_btns'}>
        <Button className={'btn-theme'} title={'dark'} onClick={handleDarkThemeClick}/>
        <Button className={'btn-theme'} title={'light'} onClick={handleLightThemeClick}/>
      </div>
      <button className={'btn_out'} onClick={logOut}>Log out</button>
      <h1 className={'todolist_h1'}>To-do List</h1>
      <div className='days_block'>
        {days && days.map(item => {
          return (
            <DateItem
              todos={todos}
              key={item.id}
              day={item.date}
              weekDay={item.weekDay}
              value={item.value}
            />
          )
        })}
      </div>
      <div>
        <AddTodo/>
      </div>
      <div className="todo_container">
        {
          todos && todos.map((item) => {
            if (item.creator === email) {
              if (item.date === selectedDay) {
                return <Todo
                  key={item.id}
                  todo={item}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              }
            }
          })
        }
        {
          errors ? <Alert sx={{width: '300px', mt: 2}} severity="error">{errors}</Alert> : ''
        }
      </div>
    </div>
  );
}
