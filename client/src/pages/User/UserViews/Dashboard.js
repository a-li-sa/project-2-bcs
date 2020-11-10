import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { Donut, LineGraph, PersonalHighScores } from "../../common";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});
const user = localStorage.getItem("user");
console.log(user);

export const Dashboard = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState();
  
  useEffect(() => {
      axios.get(`/api/scores/${user}`).then(res => {
        setUserData(res.data)
      })
  }, []);

  return userData ? (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item container xs={12} md={6} lg={5}>
          <Grid item xs={12}>
            <Box mt={3}>
              <Typography component="h3" variant="h5">
                Accuracy
              </Typography>
              <Donut userData={userData} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box m={3}>
              <Typography component="h3" variant="h5">
                Recent Scores
              </Typography>
              <PersonalHighScores userData={userData} />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Box m={3}>
            <Typography component="h3" variant="h5">
              Progress
            </Typography>
            <LineGraph userData={userData} />
          </Box>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>Loading...</div>
  )
};
