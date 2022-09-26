import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import TaskItem from "../TaskItem/TaskItem";

const SearchResults = (props) => {
  const todos = useSelector((state) => state.todos.todos);

  let filteredTodos = todos.filter((todo) => {
    if (props.query === "") {
      return todo;
    } else {
      return todo.title.toLowerCase().includes(props.query.toLowerCase());
    }
  });

  const [draggableTodos, setDraggableTodos] = useState([]);

  useEffect(() => {
    setDraggableTodos(filteredTodos);
  }, [todos]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(draggableTodos);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    setDraggableTodos(items);
  }

  return (
    <div>
      {filteredTodos.length === 0 ? (
        <div style={{ padding: "10px 20px" }}>Ничего не найдено</div>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {draggableTodos.map((t, i) => {
                  return (
                    <TaskItem {...t} key={t.id} index={i} query={props.query} />
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default SearchResults;
