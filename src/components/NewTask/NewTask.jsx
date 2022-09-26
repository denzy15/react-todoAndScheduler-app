import React, { useEffect, useState } from "react";
import { icons } from "../../icons/icons";
import { addTodo, deleteTodo } from "../../store/todoSlice";

import { useDispatch } from "react-redux";

import c from "./NewTask.module.css";
import DateSelect from "../DatePicker/DateSelect";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";

const NewTask = (props) => {
  const dispatch = useDispatch();


  const currentTask = props.currentTask;

  const [task, setTask] = useState({
    title: "",
    strDate: "",
    isImportant: false,
    tags: [],
    endingDate: new Date(),
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    strDate: "",
    endingDate: "",
    description: "",
    tags: "",
  });

  const [deletionModal, setDeletionModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState(false);

  useEffect(() => {
    if (props.currentTask) {
      setTask({
        title: currentTask.title,
        strDate: currentTask.strDate,
        isImportant: currentTask.isImportant,
        tags: currentTask.tags,
        endingDate: new Date(currentTask.endingDate),
        description: currentTask.description,
      });
      setSelectedDate(true);
    }
  }, []);

  function validate() {
    let isValid = true;
    if (!task.title) {
      setErrors({ ...errors, title: "Строка не должна быть пустой" });
      isValid = false;
    }
    if (!task.strDate) {
      setErrors({ ...errors, strDate: "Строка не должна быть пустой" });
      isValid = false;
    }
    if (!selectedDate) {
      setErrors({ ...errors, endingDate: "Выберите дату" });
      isValid = false;
    }

    if (!task.description) {
      setErrors({ ...errors, description: "Строка не должна быть пустой" });
      isValid = false;
    }
    if (task.tags.length === 0) {
      setErrors({ ...errors, tags: "Выберите хотя бы 1 тег" });
      isValid = false;
    }

    return isValid;
  }

  function checkboxTagHandler(e) {
    const tag = e.target.name;
    if (task.tags.includes(tag)) {
      let arr = task.tags.filter((t) => t !== tag);
      setTask({ ...task, tags: arr });
      return;
    }
    setTask({ ...task, tags: [...task.tags, tag] });
  }

  function isImportantHandler(e) {
    e.target.checked
      ? setTask({ ...task, isImportant: true })
      : setTask({ ...task, isImportant: false });
  }

  function onTaskAdd() {
    if (validate()) {
      if (currentTask) {
        const id = currentTask.id;
        dispatch(deleteTodo({ id }));
      }
      dispatch(addTodo({ ...task, endingDate: task.endingDate.toISOString() }));
      setTask({
        title: "",
        isImportant: false,
        tags: [],
        endingDate: new Date().getDate(),
        description: "",
      });
      props.closeModal(false);
    }
  }

  return (
    <div className={c.modalWrapper}>
      <div className={c.modalContainer}>
        <div className={c.header}>
          <h2>Задача</h2>
          <button>{icons.star}</button>
          <button onClick={() => props.closeModal(false)}>{icons.close}</button>
        </div>
        <div className={c.form}>
          <div className={c.name}>
            <label>Название</label>
            <input
              className={errors.title && c.redBorder}
              type="text"
              placeholder="Названия задачи"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            {errors.title && <span className={c.error}>{errors.title}</span>}
          </div>
          <div className={c.strDate}>
            <label>Дата завершения задачи</label>
            <input
              className={errors.strDate && c.redBorder}
              type="text"
              placeholder="Названия задачи"
              value={task.strDate}
              onChange={(e) => setTask({ ...task, strDate: e.target.value })}
            />
            {errors.strDate && (
              <span className={c.error}>{errors.strDate}</span>
            )}
          </div>
          <div className={c.important}>
            <input
              onChange={isImportantHandler}
              type="checkbox"
              checked={task.isImportant}
            />
            <label>Важная задача</label>
          </div>

          <div className={`${c.date} ${errors.endingDate && c.redBorder}`}>
            <label>Дата и время окончания</label>
            <DateSelect
              task={task}
              setTask={setTask}
              selected={selectedDate}
              setSelected={setSelectedDate}
            />
            {errors.endingDate && (
              <span className={c.error}>{errors.endingDate}</span>
            )}
          </div>
          <div className={c.desc}>
            <label>Описание задачи</label>
            <textarea
              className={errors.description && c.redBorder}
              placeholder="Описание задачи"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            ></textarea>
            {errors.description && (
              <span className={c.error}>{errors.description}</span>
            )}
          </div>
          <article className={c.tags}>
            <h3>Тэги</h3>
            <div
              className={`${c.tagsRow} ${errors.title && c.redBorder}`}
              onChange={checkboxTagHandler}
            >
              <label>
                <input
                  type="checkbox"
                  name="Продуктивность"
                  defaultChecked={
                    currentTask
                      ? currentTask.tags.includes("Продуктивность")
                      : false
                  }
                />
                Продуктивность
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Образование"
                  defaultChecked={
                    currentTask
                      ? currentTask.tags.includes("Образование")
                      : false
                  }
                />
                Образование
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Здоровье"
                  defaultChecked={
                    currentTask ? currentTask.tags.includes("Здоровье") : false
                  }
                />
                Здоровье
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Срочно"
                  defaultChecked={
                    currentTask ? currentTask.tags.includes("Срочно") : false
                  }
                />
                Срочно
              </label>
            </div>
            {errors.tags && <span className={c.error}>{errors.tags}</span>}
          </article>
          <div className={c.btns}>
            <button onClick={onTaskAdd}>Добавить</button>
            <button onClick={() => setDeletionModal(true)}>Удалить</button>
          </div>
        </div>
      </div>
      {deletionModal && (
        <DeleteConfirm
          closeModal={setDeletionModal}
          id={currentTask.id}
          task={task}
          setTask={setTask}
          closeParentModal={props.closeModal}
        />
      )}
    </div>
  );
};

export default NewTask;
