import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

import c from "./DateSelect.module.css";
import "./extraDateSelect.css";

import React from "react";
import { icons } from "../../icons/icons";

//display calendar in russian 
registerLocale("ru", ru);

const DateSelect = (props) => {

  function onDateChange(date) {
    props.setSelected(true);
    props.setTask({ ...props.task, endingDate: date });
  }

  return (
    <div className={`${c.datepicker} ${props.selected ? c.selectedDate : ""}`}>
      <span className={c.title}>Дата и время</span>
      <DatePicker
        selected={props.task.endingDate}
        onChange={onDateChange}
        id={c.input}
        locale="ru"
        timeInputLabel=""
        dateFormat="MMMM d, yyyy h:mm"
        showTimeInput
        timeClassName={c.time}
        dayClassName={(date) =>
          date.getDay() === 6 || date.getDay() === 0 ? c.weekend : ""
        }
      />
      {icons.date}
    </div>
  );
};

export default DateSelect;
