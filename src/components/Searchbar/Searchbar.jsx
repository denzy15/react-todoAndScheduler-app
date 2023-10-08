import React from "react";
import { icons } from "../../icons/icons";
import c from "./Searchbar.module.css";

const Searchbar = (props) => {
  return (
    <div className={c.searchbar}>
      <input
        type="text"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Поиск"
      />
      {icons.search}
    </div>
  );
};

export default Searchbar;
