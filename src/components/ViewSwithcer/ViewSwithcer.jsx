import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ViewSwitcher = ({
  currentViewName,
  onChange,
}) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: 'row', background: '#596a9b', padding: 10 }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Week" control={<Radio color='warning'/>} label="Неделя" style={{color: '#fff'}}/>
    <FormControlLabel value="Month" control={<Radio color='warning'/>} label="Месяц"  />
  </RadioGroup>
);

export default ViewSwitcher
