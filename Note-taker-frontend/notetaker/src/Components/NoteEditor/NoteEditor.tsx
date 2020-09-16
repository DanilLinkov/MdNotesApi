import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";
import MDReactComponent from "markdown-react-js";

const NoteEditor = (props: any) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    UserService.getNoteForNoteId(props.location.state.noteId).then(
      (response) => {
        setTitle(response.data.title);
        setMarkdown(response.data.content);
      }
    );
  }, []);

  const onChange = (e: any) => {
    setMarkdown(e.target.value);
  };

  const onTabPress = (e: any) => {
    if (e.keyCode == 9) {
      e.preventDefault();
      e.target.value += "\t";
    }
  };

  const onClickedBack = () => {
    history.push({
      pathname: "notes",
      state: {
        subjectId: props.location.state.subjectId,
      },
    });
  };

  const onSaveClicked = () => {
    UserService.editNoteForNoteId(
      props.location.state.noteId,
      title,
      markdown,
      props.location.state.subjectId
    ).then((response) => {
      console.log(response.data);
    });
  };

  const onTitleChange = (e: any) => {
      setTitle(e.target.value);
  }

  return (
    <Box
      style={{ width: "90%", margin: "auto", padding: "2em", marginTop: "5%" }}
      bgcolor="#AFDBF5"
      borderRadius="20px"
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid container item direction="row" justify="center">
          <Grid item>
            <Button onClick={onSaveClicked}>Save</Button>
          </Grid>
          <Grid>
            <Button onClick={onClickedBack}>Back</Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            style={{ width: "100%" }}
            variant="outlined"
            autoComplete="off"
            placeholder="title"
            defaultValue={title}
            onChange={(e) => onTitleChange(e)}
          />
        </Grid>
        <Grid item container spacing={4}>
          <Grid item sm={6} xs={12}>
            <TextareaAutosize
              style={{ width: "100%" }}
              rowsMin={45}
              defaultValue={markdown}
              onChange={(e) => onChange(e)}
              onKeyDown={(e) => onTabPress(e)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box bgcolor="#DCDCDC" width="100%" height="97.5%" padding="4px">
              <MDReactComponent text={markdown} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteEditor;
