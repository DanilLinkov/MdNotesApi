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
import CircularProgress from "@material-ui/core/CircularProgress";

const NoteEditor = (props: any) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (AuthService.getCurrentUser()&&(props.location.state!==undefined)) {
      UserService.getNoteForNoteId(props.location.state.noteId).then(
        (response) => {
          setTitle(response.data.title);
          setMarkdown(response.data.content);
          setLoading(false);
        }
      );
    }
    else {
      history.push("/");
    }
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
    setSaving(true);
    UserService.editNoteForNoteId(
      props.location.state.noteId,
      title,
      markdown,
      props.location.state.subjectId
    ).then((response) => {
      console.log(response.data);
      setSaving(false);
    });
  };

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const goHome = () => {
    history.push("/");
    return 1;
  }

  return (
    <div>
      {props === undefined ? goHome() : (
        <Box
          style={{
            width: "90%",
            margin: "auto",
            padding: "2em",
            marginTop: "5%",
          }}
          bgcolor="white"
          borderRadius="20px"
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                multiline
                variant="outlined"
                autoComplete="off"
                placeholder="title"
                defaultValue={title}
                onChange={(e) => onTitleChange(e)}
              />
            </Grid>
            {saving ? (
              <Grid item>
                {" "}
                <CircularProgress />{" "}
              </Grid>
            ) : (
              <Grid container item direction="row" justify="center">
                <Grid item>
                  <Button onClick={onSaveClicked} style={{ color: "#e76f51" }}>
                    Save
                  </Button>
                </Grid>
                <Grid>
                  <Button onClick={onClickedBack} style={{ color: "#e76f51" }}>
                    Back
                  </Button>
                </Grid>
              </Grid>
            )}
            {loading ? (
              <CircularProgress />
            ) : (
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
                  <Box
                    bgcolor="#DCDCDC"
                    width="97.6%"
                    height="99.3%"
                    paddingLeft="10px"
                    paddingRight="10px"
                    border={1}
                    style={{ wordBreak: "break-all" }}
                  >
                    <MDReactComponent text={markdown} />
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default NoteEditor;
