import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import TaskItem from "../../components/TaskItem/TaskItem";
import c from "./Tasks.module.css";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";

const Tasks = (props) => {
  const path = useLocation().pathname;
  const todos = useSelector((state) => state.todos.todos);

  const [filteredTodos, setFilteredTodos] = useState([]);

  const [more, setMore] = useState({
    hasMore: false,
    isOpened: false,
  });

  useEffect(() => {
    switch (path) {
      case "/deleted":
        if (props.query) {
          setFilteredTodos(
            todos.filter(
              (todo) =>
                todo.isDeleted &&
                todo.title.toLowerCase().includes(props.query.toLowerCase())
            )
          );
        } else {
          setFilteredTodos(todos.filter((todo) => todo.isDeleted));
        }
        break;

      case "/done":
        if (props.query) {
          setFilteredTodos(
            todos.filter(
              (todo) =>
                !todo.isDeleted &&
                todo.isDone &&
                todo.title.toLowerCase().includes(props.query.toLowerCase())
            )
          );
        } else {
          setFilteredTodos(
            todos.filter((todo) => !todo.isDeleted && todo.isDone)
          );
        }
        break;

      case "/important":
        if (props.query) {
          setFilteredTodos(
            todos.filter(
              (todo) =>
                todo.isImportant &&
                !todo.isDeleted &&
                !todo.isDone &&
                todo.title.toLowerCase().includes(props.query.toLowerCase())
            )
          );
        } else {
          setFilteredTodos(
            todos.filter(
              (todo) => todo.isImportant && !todo.isDeleted && !todo.isDone
            )
          );
        }
        break;

      default:
        if (props.query) {
          setFilteredTodos(
            todos.filter(
              (todo) =>
                !todo.isDeleted &&
                !todo.isDone &&
                todo.title.toLowerCase().includes(props.query.toLowerCase())
            )
          );
        } else {
          setFilteredTodos(
            todos.filter((todo) => !todo.isDeleted && !todo.isDone)
          );
        }
        break;
    }

    setMore({ ...more, hasMore: filteredTodos.length > 5 });
  }, [path, props.query, filteredTodos.length, todos]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(filteredTodos);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    setFilteredTodos(items);
  }

  return (
    <div className={c.myTasks}>
      {filteredTodos.length === 0 ? (
        <div style={{ padding: "10px 20px" }}>Нет задач</div>
      ) : (
        <DragDropContext
          onDragEnd={handleOnDragEnd}
          onBeforeDragStart={() => setMore({ ...more, isOpened: true })}
        >
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTodos.map((t, i) => {
                  if (i <= 4)
                    return (
                      <TaskItem
                        {...t}
                        key={t.id}
                        index={i}
                        query={props.query}
                      />
                    );
                  return null;
                })}

                {more.isOpened &&
                  filteredTodos.map((t, i) => {
                    if (i < 5) return null;
                    return (
                      <TaskItem
                        key={t.id}
                        {...t}
                        index={i}
                        query={props.query}
                      />
                    );
                  })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {!more.isOpened && more.hasMore && (
        <ShowMoreButton more={more} setMore={setMore} todos={filteredTodos} />
      )}
    </div>
  );
};

export default Tasks;
