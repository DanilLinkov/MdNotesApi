import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserService from "../../Services/User.service";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 140,
  },
});

const AddNotesCard = () => {
  const classes = useStyles();
  const [title, settitle] = useState("title");

  const onChange = (e:any) => {
      settitle(e.target.value);
  }

  const onSubmit = () => {
      console.log(title);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField
          multiline
          style={{ width: "100%" }}
          variant="outlined"
          autoComplete="off"
          placeholder="Title"
          onChange={(e) => onChange(e)}
        />
        <Button style={{ color: "#e76f51" }} onClick={onSubmit}>Add New Note</Button>
      </CardContent>
    </Card>
  );
};

export default AddNotesCard;
