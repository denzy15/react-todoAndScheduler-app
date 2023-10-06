import React, { useEffect, useState } from "react";
import { icons } from "../../icons/icons";
import { addTodo, deleteTodo } from "../../store/todoSlice";

import { useDispatch } from "react-redux";

import c from "./TaskEdit.module.css";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import MyDatePicker from "../MyDatePicker/MyDatePicker";

const initialTask = {
  title: "",
  isImportant: false,
  startDate: new Date(),
  endingDate: new Date(new Date().getTime() + 86400000),
  description: "",
}
const TaskEdit = (props) => {
  const dispatch = useDispatch();

  const currentTask = props.currentTask;

  const [task, setTask] = useState(initialTask);



  const [errors, setErrors] = useState({
    title: "",
    endingDate: "",
  });


  const [deletionModal, setDeletionModal] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(new Date().getTime() + 86400000));

  useEffect(() => {
    if (props.currentTask) {
      setTask({
        title: currentTask.title,
        strDate: currentTask.strDate,
        isImportant: currentTask.isImportant,
        startDate: new Date(currentTask.startDate),
        endingDate: new Date(currentTask.endingDate),
        description: currentTask.description,
      });
      
    }
  }, []);


  function onDateChange(date, name) {
      setTask(prev=> ({...prev, [name]: date}))
  }


  function validate() {
    let isValid = true;
    if (!task.title) {
      setErrors({ ...errors, title: "Строка не должна быть пустой" });
      isValid = false;
    }

    // if (
    //   task.endingDate !== null &&
    //   task.endingDate.toISOString() < new Date().toISOString()
    // ) {
    //   setErrors({
    //     ...errors,
    //     endingDate: "Вы не можете выбрать день, который уже прошел",
    //   });
    //   isValid = false;
    // }
    return isValid;
  }

  function isImportantHandler(e) {
    e.target.checked
      ? setTask({ ...task, isImportant: true })
      : setTask({ ...task, isImportant: false });
  }

  console.log(new Date(task.endingDate.toString()).getDate());

  function onTaskAdd() {
    if (validate()) {
      if (currentTask) {
        const id = currentTask.id;
        dispatch(deleteTodo({ id }));
      }
      dispatch(addTodo({ ...task, endingDate: task.endingDate }));
      setTask(initialTask);
      props.closeModal(false);
    }
  }

  return (
    <div className={c.modalWrapper}>
      <div className={c.modalContainer}>
        <div className={c.header}>
          <h2>Задача</h2>
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
          <div className={c.important}>
            <label>
              <input
                onChange={isImportantHandler}
                type="checkbox"
                checked={task.isImportant}
              />
              Важная задача
            </label>
          </div>

          <div className={c.date}>
            <label>Дата и время начала</label>
            <MyDatePicker name={'startDate'} change={onDateChange} selected={task.startDate}/>
            {errors.endingDate && (
              <span className={c.error}>{errors.endingDate}</span>
            )}
          </div>

          <div className={`${c.date} ${errors.endingDate && c.redBorder}`}>
            <label>Дата и время окончания</label>
            <MyDatePicker name={'endingDate'} change={onDateChange} selected={task.endingDate}/>
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
          </div>
          <div className={c.btns}>
            <button onClick={onTaskAdd}>Добавить</button>
            {props.currentTask && <button onClick={() => setDeletionModal(true)}>Удалить</button>}
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

export default TaskEdit;
