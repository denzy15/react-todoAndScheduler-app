import React from 'react'
import c from './Schedule.module.css'
import Paper from '@mui/material/Paper';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import ViewSwitcher from '../../components/ViewSwithcer/ViewSwithcer';





const currentDate = '2023-10-06';
const data = [{
  startDate: new Date('2023-10-06 14:00'),
  endDate: new Date('2023-10-06 23:15'),
  title: 'No way',
  allDay: false,
  id: 1,
  rRule: undefined,
  exDate: undefined,
},{
  startDate: new Date('2023-10-06 14:00'),
  endDate: new Date('2023-10-06 23:15'),
  title: 'Рома еблан',
  allDay: false,
  id: 2,
}]

const currentViewName = 'Week'
const currentViewNameChange = () => {}

const Schedule = () => {
  return (
    <React.Fragment>
        <ViewSwitcher
          currentViewName={currentViewName}
          onChange={currentViewNameChange}
        />

        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentDate={currentDate}
              currentViewName={currentViewName}
            />
            <WeekView
              startDayHour={0}
              endDayHour={24}
            />
            <WeekView
              name="Work Week"
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />

            <Appointments />
          </Scheduler>
        </Paper>
      </React.Fragment>
  )
}

export default Schedule