import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserService from "../../Services/User.service";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#FFDEE9",
  },
  media: {
    height: 140,
  },
});

const AddNotesCard = (props: any) => {
  const classes = useStyles();
  const [title, settitle] = useState("Title");
  const [loading, setLoading] = useState(false);

  const onChange = (e: any) => {
    settitle(e.target.value);
  };

  const onSubmit = () => {
    setLoading(true);
    if (title.length < 1) {
      UserService.createNoteForSubjectId("Title", props.subjectId).then(
        (response) => {
          props.addNote(response.data.id, "Title");
          setLoading(false);
        }
      );
    } else {
      UserService.createNoteForSubjectId(title, props.subjectId).then(
        (response) => {
          props.addNote(response.data.id, title);
          setLoading(false);
        }
      );
    }
  };

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
      </CardContent>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button style={{ color: "#e76f51" }} onClick={onSubmit}>
          Add New Note
        </Button>
      )}
    </Card>
  );
};

export default AddNotesCard;
