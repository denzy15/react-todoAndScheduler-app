import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import ViewSwitcher from "../../components/ViewSwithcer/ViewSwithcer";
import moment from "moment";
import "moment/locale/ru";
import { useSelector } from "react-redux";

moment.locale("ru");

const Appointment = ({ children, style, ...restProps }) => {
  const isImportant = restProps.data.isImportant;
  return (
    <Appointments.Appointment
      {...restProps}
      style={{ ...style, backgroundColor: isImportant ? "#F59300" : "#007CDB" }}
    >
      {children}
    </Appointments.Appointment>
  );
};

const Schedule = () => {
  const todos = useSelector((state) => state.todos.todos);
  const [currentViewName, setCurrentViewName] = useState("Week");

  const [date, setDate] = useState(moment(new Date()));

  const currentViewNameChange = (e) => {
    setCurrentViewName(e.target.value);
  };

  const handleNext = () => {
    switch (currentViewName) {
      case "Week":
        setDate((prevDate) => prevDate.clone().add(1, "week"));
        break;
      case "Month":
        setDate((prevDate) => prevDate.clone().add(1, "month"));
        break;
      default:
        break;
    }
  };

  const handlePrev = () => {
    switch (currentViewName) {
      case "Week":
        setDate((prevDate) => prevDate.clone().subtract(1, "week"));
        break;
      case "Month":
        setDate((prevDate) => prevDate.clone().subtract(1, "month"));
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <ViewSwitcher
        currentViewName={currentViewName}
        onChange={currentViewNameChange}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        p={2}
        sx={{backgroundColor: "lightgray",  borderTop: '1px solid gray',  borderBottom: '1px solid gray'}}
      >
        <Button
          onClick={handlePrev}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Назад
        </Button>
        <Typography sx={{ textTransform: "uppercase", fontSize: 18, color: 'black' }}>
          {date.format("MMMM")}
        </Typography>
        <Button
          onClick={handleNext}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Назад
        </Button>
      </Stack>
      <Paper>
        <Scheduler
          data={todos.filter((t) => !t.isDeleted && !t.isDone)}
          height={500}
          firstDayOfWeek={1}
          locale={"ru"}
        >
          <ViewState
            currentDate={date.toDate()}
            currentViewName={currentViewName}
          />
          <WeekView  startDayHour={5} endDayHour={24} />
          <MonthView />
          <Appointments  appointmentComponent={Appointment} />
          <AllDayPanel messages={{ allDay: "Несколько дней" }} />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};

export default Schedule;
