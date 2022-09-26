import React from "react";
import c from "./Tag.module.css";

const Tag = (props) => {
  const name = props.name;

  function getStyles(name) {
    switch (name) {
      case "Срочно":
        return "red";
      case "Образование":
        return "green";
      case "Продуктивность":
        return "purple";
      case "Здоровье":
        return "yellow";
      default:
        return "common";
    }
  }

  return <li className={`${c.tag} ${c[getStyles(name)]}`}>{name}</li>;
};

export default Tag;
