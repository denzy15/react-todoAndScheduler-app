import React, { useState } from "react";
import c from "./Main.module.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Tasks from "../Tasks/Tasks";
import Important from "../Important/Important";
import Done from "../Done/Done";
import Deleted from "../Deleted/Deleted";
import { useLocation } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import SearchResults from "../SearchResults/SearchResults";

const Main = () => {
  const name = {
    "/tasks": "Мои задачи",
    "/important": "Важные задачи",
    "/done": "Выполенные",
    "/deleted": "Удаленные",
    "/search": "Результаты поиска",
  };
  const location = useLocation();
  let pathname = location.pathname;

  const [query, setQuery] = useState("");

  return (
    <section className={c.main}>
      <Searchbar query={query} setQuery={setQuery} />
      <div className={c.title}>{name[pathname]}</div>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/important" element={<Important />} />
        <Route path="/done" element={<Done />} />
        <Route path="/deleted" element={<Deleted />} />
        <Route path="/search" element={<SearchResults query={query} />} />
      </Routes>
    </section>
  );
};

export default Main;
