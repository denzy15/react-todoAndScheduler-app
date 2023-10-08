import React from "react";
import { useDispatch } from "react-redux";
import { icons } from "../../icons/icons";
import { deleteTodo } from "../../store/todoSlice";
import c from "./DeleteConfirm.module.css";

const DeleteConfirm = (props) => {
  const dispatch = useDispatch();

  function deleteHandler() {
    if (props.id) {
      const id = props.id;
      dispatch(deleteTodo({ id }));
    }

    if (props.closeParentModal) {
      props.setTask({
        title: "",
        isImportant: false,
        tags: [],
        endingDate: new Date().getDate(),
        description: "",
      });

      props.closeParentModal(false);
    }

    props.closeModal(false);
  }

  return (
    <section className={c.deleteModal}>
      <div className={c.container}>
        {icons.confirmIcon}
        <h2 className={c.title}>Вы уверены?</h2>
        <span className={c.subtitle}>Вы не сможете восстановить это</span>
        <div className={c.btns}>
          <button className={c.delete} onClick={deleteHandler}>
            Да, удалить
          </button>
          <button className={c.cancel} onClick={() => props.closeModal(false)}>
            Отмена
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirm;
