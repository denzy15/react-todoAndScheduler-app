import React, { useState } from "react";
import c from "./Main.module.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Tasks from "../../pages/Tasks/Tasks";
import Important from "../../pages/Important/Important";
import Done from "../../pages/Done/Done";
import Deleted from "../../pages/Deleted/Deleted";
import { useLocation } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import SearchResults from "../../pages/SearchResults/SearchResults";
import Schedule from "../../pages/Schedule/Schedule";

const Main = () => {
  const name = {
    "/tasks": "Мои задачи",
    "/important": "Важные задачи",
    "/done": "Выполенные",
    "/deleted": "Удаленные",
    "/search": "Результаты поиска",
    "/schedule": "Календарь",
  };
  const location = useLocation();
  let pathname = location.pathname;

  const [query, setQuery] = useState("");

  return (
    <section className={c.main}>
      <Searchbar query={query} setQuery={setQuery} />
      <div className={c.title}>{name[pathname]}</div>
      <Routes>
        {["/tasks", "/important", "/done", "/deleted", "/search"].map((path, index) =>
          <Route path={path} element={<Tasks query={query}/>} key={path} />
        )}
        <Route path="/schedule" element={<Schedule />} />
        {/* <Route path="/search" element={<SearchResults query={query} />} /> */}
        <Route path='*' element={<Navigate to='/tasks' />} />
      </Routes>
    </section>
  );
};

export default Main;
