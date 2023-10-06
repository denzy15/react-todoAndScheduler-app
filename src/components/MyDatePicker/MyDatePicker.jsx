import React from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import './MyDatePicker.css'

registerLocale("ru", ru);

const MyDatePicker = ({ selected, change, name }) => {
    return (
        <DatePicker
            selected={selected}
            onChange={(date) => change(date, name)}
            showTimeSelect
            timeFormat="p"
            locale='ru'
            timeIntervals={15}
            dateFormat="P - p"
        />
    )
}

export default MyDatePicker