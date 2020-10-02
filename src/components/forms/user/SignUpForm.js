import React from "react";
import strings from "../../../localization";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getError, hasError } from "../../../functions/Validation";

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  data,
  keyPress,
  onCancel
}) => {
  return (
    <form id="login-form" onSubmit={onSubmit} action="#">
      <TextField
        label={strings.userForm.email}
        error={hasError(errors, "email")}
        helperText={getError(errors, "email")}
        fullWidth
        autoFocus
        name="email"
        onChange={onChange}
        onKeyPress={keyPress}
        margin="normal"
        value={data.email}
      />

      <TextField
        label={strings.userForm.firstName}
        error={hasError(errors, "firstName")}
        helperText={getError(errors, "firstName")}
        fullWidth
        autoFocus
        name="firstName"
        onChange={onChange}
        onKeyPress={keyPress}
        margin="normal"
        value={data.firstName}
      />

      <TextField
        label={strings.userForm.lastName}
        error={hasError(errors, "lastName")}
        helperText={getError(errors, "lastName")}
        fullWidth
        autoFocus
        name="lastName"
        onChange={onChange}
        onKeyPress={keyPress}
        margin="normal"
        value={data.lastName}
      />

      <TextField
        label="password"
        error={hasError(errors, "password")}
        helperText={getError(errors, "password")}
        fullWidth
        name="password"
        type="password"
        onChange={onChange}
        onKeyPress={keyPress}
        margin="normal"
        value={data.password}
      />

      <div className="submit-container">
        <Button
          variant="contained"
          style={{ marginRight: 5 }}
          color="primary"
          onClick={onSubmit}
        >
          {strings.userForm.ok}
        </Button>
        <Button variant="contained" color="primary" onClick={onCancel}>
          cancel
        </Button>
      </div>
      <p>{errors.firebase}</p>
    </form>
  );
};
export default SignUpForm;
