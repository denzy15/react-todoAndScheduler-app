import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import TaskItem from "../../components/TaskItem/TaskItem";
import c from "./Tasks.module.css";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Tasks = () => {
  const todos = useSelector((state) => state.todos.todos);
  const filters = useSelector((state) => state.filters.filters);

  const filteredTodos = todos.filter((todo) => {
    if (filters.length === 0) {
      return todo.isDeleted === false && todo.isDone === false;
    } else {
      return (
        todo.isDeleted === false &&
        todo.isDone === false &&
        filters.every((tag) => todo.tags.includes(tag))
      );
    }
  });

  const [more, setMore] = useState({
    hasMore: false,
    isOpened: false,
  });

  const [draggableTodos, setDraggableTodos] = useState([]);

  useEffect(() => {
    setMore({ ...more, hasMore: filteredTodos.length > 5 });
    setDraggableTodos(filteredTodos);
  }, [todos, filters]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(draggableTodos);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    setDraggableTodos(items);
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
                {draggableTodos.map((t, i) => {
                  if (i <= 4) return <TaskItem {...t} key={t.id} index={i} />;
                  return null;
                })}

                {more.isOpened &&
                  draggableTodos.map((t, i) => {
                    if (i < 5) return null;
                    return <TaskItem key={t.id} {...t} index={i} />;
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
