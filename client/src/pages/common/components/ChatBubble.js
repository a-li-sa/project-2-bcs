import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { accentColor, secondaryColor } from "../components";

const useStyles = makeStyles((theme) => ({
  theirInput: {
    color: "black",
    fontSize: 20,
  },
  yourInput: {
    color: "white",
    fontSize: 20,
  },
}));

export const TheirBubble = (props) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        disableUnderline: true,
        classes: { disabled: classes.theirInput },
      }}
      value={props.message}
      disabled
      multiline
      rows={props.rows}
      style={{
        backgroundColor: secondaryColor,
        borderRadius: 25,
        padding: "15px 20px",
      }}
    />
  );
};
export const YourBubble = (props) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        disableUnderline: true,
        classes: { disabled: classes.yourInput },
      }}
      value={props.message}
      disabled
      multiline
      rows={props.rows}
      style={{
        backgroundColor: accentColor,
        borderRadius: 25,
        padding: "15px 20px",
      }}
    />
  );
};
