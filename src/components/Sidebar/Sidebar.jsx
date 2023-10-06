import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import c from "./Sidebar.module.css";
import NewTask from "../TaskEdit/TaskEdit";
import { icons } from "../../icons/icons.js";


const Sidebar = () => {
  const navigate = useNavigate()

  const [modal, setModal] = useState(false);

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
            to="/schedule"
            className={(navData) => (navData.isActive ? c.active : c.calendar)}
          >
            {icons.calendar} Календарь
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
      {modal && <NewTask closeModal={setModal} />}
    </div>
  );
};

export default Sidebar;
