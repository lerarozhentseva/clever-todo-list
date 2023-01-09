import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveSelectedDay} from "../../store/actions";
import "./TodoPage.css";

export const DateItem = ({todos, day, weekDay, value}) => {
  const dispatch = useDispatch();
  const [complete, setComplete] = useState(false);
  const [uncomplete, setUncomplete] = useState(false);
  const selectedDay = useSelector(state => state.selectedDay);

  useEffect(() => {
    todos.forEach(item => {
      if (item.date === value) {
        if (item.creator === sessionStorage.email) {
          if (item.completed) {
            setComplete(true);
          } else {
            setUncomplete(true);
          }
        }
      }
    })
  }, [todos]);

  const setCheckedDay = (e) => {
    const checkedDay = e.target;
    dispatch(saveSelectedDay(checkedDay.getAttribute('value')));
  };

  return (
    <div className={'data'}>
      <div className={selectedDay === value ? 'date_item checked' : 'date_item'} onClick={setCheckedDay}>
        <div value={value} className={selectedDay === value ? 'date_text checked' : 'date_text'}>
          {weekDay}
          <br/>
          {day}
        </div>
      </div>
      <div className={'check_block'}>
        {uncomplete && <div className={'uncomplete'}/>}
        {complete && <div className={'complete'}/>}
      </div>
    </div>
  )
};
