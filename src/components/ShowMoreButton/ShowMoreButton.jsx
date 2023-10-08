import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import c from "./ShowMoreButton.module.css";
import { getNoun } from "../../utils";

const ShowMoreButton = (props) => {
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
