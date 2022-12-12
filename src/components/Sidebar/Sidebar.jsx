import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import c from "./Sidebar.module.css";
import NewTask from "../NewTask/NewTask";
import { icons } from "../../icons/icons.js";
import { addToFilter, removeFromFilter } from "../../store/filterSlice";

const Sidebar = () => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);

  const selectTagHandler = (e) => {
    const filter = e.currentTarget;
    const filterName = filter.textContent;

    let style = c.activeFilter;
    if (filters.includes(filterName)) {
      filter.classList.remove(style);
      dispatch(removeFromFilter({ filterName }));
    } else {
      filter.classList.add(style);
      dispatch(addToFilter({ filterName }));
    }
  };

  return (
    <div className={c.sidebar}>
      <button className={c.newTask} onClick={() => setModal(true)}>
        Новая задача
      </button>
      <ul className={c.nav}>
        <li>
          <NavLink
            to="/tasks"
            className={(navData) => (navData.isActive ? c.active : null)}
          >
            {icons.myTasks} Мои задачи
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/important"
            className={(navData) => (navData.isActive ? c.active : null)}
          >
            {icons.star} Важные
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/done"
            className={(navData) => (navData.isActive ? c.active : null)}
          >
            {icons.done} Выполненные
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/deleted"
            className={(navData) => (navData.isActive ? c.active : null)}
          >
            {icons.delete} Удаленные
          </NavLink>
        </li>
      </ul>

      <div className={c.tags}>
        <h5>Фильтр по тэгам:</h5>
        <ul className={c.tagsCol}>
          <li onClick={selectTagHandler} id={c.li}>
            Продуктивность
          </li>
          <li onClick={selectTagHandler} id={c.li}>
            Образование
          </li>
          <li onClick={selectTagHandler} id={c.li}>
            Здоровье
          </li>
          <li onClick={selectTagHandler} id={c.li}>
            Срочно
          </li>
        </ul>
      </div>
      {modal && <NewTask closeModal={setModal} />}
    </div>
  );
};

export default Sidebar;
