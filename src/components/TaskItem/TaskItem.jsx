import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { icons } from "../../icons/icons";
import c from "./TaskItem.module.css";
import {
  deleteTodo,
  hideTodo,
  toggleIsDone,
  undoTodo,
} from "../../store/todoSlice";
import { useLocation } from "react-router-dom";
import NewTask from "../TaskEdit/TaskEdit";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = (props) => {
  let dispatch = useDispatch();
  const location = useLocation();

  //making the task id a separate constant
  const id = props.id;
  
  //Search query
  const query = props.query || "";

  //state for opening a modal window to edit a task
  const [taskModal, setTaskModal] = useState(false);

  //state for opening a modal window to confirm deletion
  const [deletionModal, setDeletionModal] = useState(false);

  //function to convert date from state to beautiful string
  function dateToStr(date) {
    return new Date(date).toLocaleString()
  }

  function highlightQueryText() {
    const parts = props.title.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === query.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  }

  //handlers
  function undoTaskHandler() {
    dispatch(undoTodo({ id }));
  }

  function doneHandler() {
    setTimeout(() => {
      dispatch(toggleIsDone({ id }));
    }, 1000);
  }


  

  return (
    <section>
      <Draggable draggableId={props.id} index={props.index}>
        {(provided) => (
          <li
            className={c.taskItem}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            {!props.isDeleted && (
              <input
                type="checkbox"
                onClick={doneHandler}
                defaultChecked={props.isDone}
              />
            )}

            <span
              onClick={() => setTaskModal(true)}
              className={`${c.title} ${
                location.pathname !== "/important" && props.isImportant === true
                  ? c.yellowTitle
                  : null
                //classname yellowTitle is needed for highlighting importand tasks in all lists except 'Important' list
              }`}
            >
              {props.query === "" ? props.title : highlightQueryText()}
            </span>

            

            <div className={`${c.startDate} ${c.date}`}> с {dateToStr(props.startDate)}</div>

            <div className={`${c.endDate} ${c.date}`}>до {dateToStr(props.endingDate)}</div>

            {props.isDeleted ? (
              <div className={c.btns}>
                <button
                  onClick={() => {
                    setDeletionModal(true);
                  }}
                  className={c.delete}
                >
                  {icons.delete}
                </button>
                <button onClick={undoTaskHandler} className={c.undo}>
                  {icons.undo}
                </button>
                <div className={c.drag} {...provided.dragHandleProps}>
                  {icons.drag}{" "}
                </div>
              </div>
            ) : (
              <div className={c.btns}>
                <button
                  onClick={() => {
                    dispatch(hideTodo({ id }));
                  }}
                  className={c.delete}
                >
                  {icons.delete}
                </button>
                <div className={c.drag} {...provided.dragHandleProps}>
                  {icons.drag}{" "}
                </div>
              </div>
            )}
          </li>
        )}
      </Draggable>

      {
        //modal tasks (hidden by default)
      }
      {taskModal && <NewTask closeModal={setTaskModal} currentTask={props} />}
      {deletionModal && (
        <DeleteConfirm
          closeModal={setDeletionModal}
          id={id}
          closeParentModal={props.closeModal}
        />
      )}
    </section>
  );
};

export default TaskItem;
