import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import c from "./ShowMoreButton.module.css";

const ShowMoreButton = (props) => {
  function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  const noun = getNoun(props.todos.length - 5, "задачу", "задачи", "задач");

  function showMoreHandler() {
    props.setMore({ ...props.more, isOpened: true });
    return props.todos.map((t, i) => {
      if (i < 5) return null;
      return <TaskItem key={t.id} {...t} />;
    });
  }
  return (
    <span className={c.showMore} onClick={showMoreHandler}>
      Открыть еще {props.todos.length - 5} {noun}
    </span>
  );
};

export default ShowMoreButton;
