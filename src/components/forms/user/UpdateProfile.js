import React, { useEffect, useState } from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../../../actions/Actions";
import { withRouter, Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import strings from "../../../localization";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const UpdateProfile = ({
  onSubmit,
  onChange,
  user,
  data,
  date,
  keyPress,
  setPhoto,
  onCancel
}) => {
  const [maleActive, setMaleActive] = useState(false);
  const [femaleActive, setFemaleActive] = useState(false);
  const [otherActive, setOtherActive] = useState(false);

  const handleChangeee = event => {
    if (event.target.name === "gander") {
      console.log(event.target.value);

      switch (event.target.value) {
        case "male":
          setMaleActive(true);
          setFemaleActive(false);
          setOtherActive(false);
          break;
        case "female":
          setFemaleActive(true);
          setMaleActive(false);
          setOtherActive(false);

          break;
        case "other":
          setOtherActive(true);
          setFemaleActive(false);
          setMaleActive(false);
      }
      onChange({ target: event.target });
    } else if (event.target.name === "file") {
      const file = document.querySelector("#photo").files[0];
      setPhoto(file);
    } else {
      onChange({ target: event.target });
    }
  };
  useEffect(() => {
    console.log(user.gander);
    switch (user.gander) {
      case "male":
        setMaleActive(true);
        break;
      case "female":
        setFemaleActive(true);
        break;
      case "other":
        setOtherActive(true);
        break;
    }
  }, [user]);

  return (
    <div>
      {" "}
      <form id="login-form" onSubmit={onSubmit} action="#">
        <FormLabel component="legend">{strings.editUser.age}</FormLabel>
        <TextField
          label={"current age: " + user.age}
          // error={hasError(errors, "email")}
          // helperText={getError(errors, "email")}
          fullWidth
          autoFocus
          name="age"
          onChange={handleChangeee}
          onKeyPress={keyPress}
          margin="normal"
          value={data.age}
        />

        <FormLabel component="legend">{strings.editUser.midlename}</FormLabel>
        <TextField
          label={"current midlename: " + user.midlename}
          // error={hasError(errors, "email")}
          // helperText={getError(errors, "email")}
          fullWidth
          autoFocus
          name="midlename"
          onChange={handleChangeee}
          onKeyPress={keyPress}
          margin="normal"
          value={data.midlename}
        />

        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gander"
          name="gander"
          value={data.gander}
          onChange={handleChangeee}
        >
          <FormControlLabel
            value="female"
            checked={femaleActive}
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            checked={maleActive}
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            checked={otherActive}
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
        <FormLabel component="legend">{strings.editUser.country}</FormLabel>
        <TextField
          label={"old country : " + user.Country}
          // error={hasError(errors, "email")}
          // helperText={getError(errors, "email")}
          fullWidth
          autoFocus
          name="Country"
          onChange={handleChangeee}
          onKeyPress={keyPress}
          margin="normal"
          value={data.Country}
        />
        <FormLabel component="legend">{strings.editUser.city}</FormLabel>
        <TextField
          label={"current city: " + user.City}
          // error={hasError(errors, "email")}
          // helperText={getError(errors, "email")}
          fullWidth
          autoFocus
          name="City"
          onChange={handleChangeee}
          onKeyPress={keyPress}
          margin="normal"
          value={data.City}
        />
        <FormLabel component="legend">{strings.editUser.birthday}</FormLabel>
        <TextField
          label={"current birthday: " + date}
          // error={ hasError(errors, 'birthday') }
          // helperText={ getError(errors, 'birthday') }
          fullWidth
          autoFocus
          name="birthday"
          type="date"
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          value={data.birthday}
          onChange={handleChangeee}
          onKeyPress={keyPress}
        />
        <FormLabel component="legend">{strings.editUser.phoneNumber}</FormLabel>
        <TextField
          label={"current phoneNumber: " + user.phoneNumber}
          // error={hasError(errors, "email")}
          // helperText={getError(errors, "email")}
          fullWidth
          autoFocus
          name="phoneNumber"
          onChange={handleChangeee}
          onKeyPress={keyPress}
          margin="normal"
          value={data.phoneNumber}
        />

        <div style={{ marginTop: "10px" }}>
          <label>Add image</label>
          <input name="file" onChange={handleChangeee} type="file" id="photo" />
        </div>

        <div className="submit-container">
          <Button
            variant="contained"
            style={{ marginRight: 5 }}
            color="primary"
            onClick={onSubmit}
          >
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={onCancel}>
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeFullScreen: Actions.changeFullScreen
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers }) {
  return { menu: menuReducers };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
);
