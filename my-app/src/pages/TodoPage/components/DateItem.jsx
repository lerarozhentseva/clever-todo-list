import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { saveSelectedDay } from "../../../core/actions/actions";
import "../styles/TodoPage.css";

export function DateItem({ todos, day, weekDay, value, id }) {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.selectedDay);
  const email = useSelector((state) => state.email);
  const [completeTasks, setCompleteTasks] = useState({
    complete: false,
    uncomplete: false,
  });

  const [googleUser, setGoogleUser] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setGoogleUser(user?.email);
      }
    });
  }, []);

  const setCheckedDay = (e) => {
    const checkedDay = e.target;
    dispatch(saveSelectedDay(checkedDay.getAttribute("value")));
  };

  useEffect(() => {
    const completedItems = [];
    const uncompletedItems = [];
    todos.forEach((item) => {
      if (item.date === value) {
        if (item.creator === googleUser || item.creator === email) {
          if (item.completed) {
            completedItems.push(item);
          } else {
            uncompletedItems.push(item);
          }
        }
      }
    });

    if (completedItems.length && !uncompletedItems.length) {
      setCompleteTasks({ complete: true, uncomplete: false });
    } else if (uncompletedItems.length && !completedItems.length) {
      setCompleteTasks({ complete: false, uncomplete: true });
    } else if (completedItems.length && uncompletedItems.length) {
      setCompleteTasks({ complete: true, uncomplete: true });
    } else {
      setCompleteTasks({ complete: false, uncomplete: false });
    }
  }, [todos]);

  return (
    <div key={id} className="data">
      <div
        className={selectedDay === value ? "date_item checked" : "date_item"}
        onClick={setCheckedDay}
      >
        <div
          value={value}
          className={selectedDay === value ? "date_text checked" : "date_text"}
        >
          {weekDay} {day}
        </div>
      </div>
      <div className="check_block">
        {completeTasks.complete && <div className="complete" />}
        {completeTasks.uncomplete && <div className="uncomplete" />}
      </div>
    </div>
  );
}
