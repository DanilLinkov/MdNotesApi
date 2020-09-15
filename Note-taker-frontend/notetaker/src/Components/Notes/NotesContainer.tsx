import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Grid } from "@material-ui/core";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";
import NoteCard from "./NoteCard";
import AddNotesCard from "./AddNotesCard";

const NotesContainer = (props: any) => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (AuthService.getCurrentUser() && props.subjectId) {

    } else {
      history.push("/");
    }
  });

  return (
    <Box
      style={{
        width: "50%",
        margin: "auto",
        padding: "2em",
        marginTop: "5%",
        textAlign: "center",
      }}
      bgcolor="#AFDBF5"
      borderRadius="20px"
    >
      <Button style={{ marginBottom: "5px", color: "#e76f51" }}>Back</Button>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4}>
          <AddNotesCard />
        </Grid>
        <Grid item xs={4}>
          <NoteCard />
        </Grid>
        <Grid item xs={4}>
          <NoteCard />
        </Grid>
        <Grid item xs={4}>
          <NoteCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotesContainer;
