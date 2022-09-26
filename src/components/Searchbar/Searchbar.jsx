import React from "react";
import { icons } from "../../icons/icons";
import c from "./Searchbar.module.css";

import { useNavigate } from "react-router-dom";

const Searchbar = (props) => {
  const navigate = useNavigate();

  function clickHandler(e) {
    if (e.key === "Enter") {
      navigate("/search");
    }
  }
  

  return (
    <div className={c.searchbar}>
      <input
        type="text"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Поиск"
        onKeyDown={clickHandler}
      />
      {icons.search}
    </div>
  );
};

export default Searchbar;
