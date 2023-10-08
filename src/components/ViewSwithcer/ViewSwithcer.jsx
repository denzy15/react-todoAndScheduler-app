import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const ViewSwitcher = ({ currentViewName, onChange }) => (
  <RadioGroup
    aria-label="Views"
    sx={{ flexDirection: "row", backgroundColor: "lightgray", p: 1, }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel
      value="Week"
      control={<Radio color="secondary" />}
      label="Неделя"
      sx={{color: 'darkslategray'}}
    />
    <FormControlLabel
      value="Month"
      control={<Radio color="secondary" />}
      label="Месяц"
      sx={{color: 'darkslategray'}}
    />
  </RadioGroup>
);

export default ViewSwitcher;
