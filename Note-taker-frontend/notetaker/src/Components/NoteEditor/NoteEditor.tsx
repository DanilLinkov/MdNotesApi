import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  TextareaAutosize,
} from "@material-ui/core";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";
import MDReactComponent from "markdown-react-js";

const NoteEditor = (props: any) => {
  const [markdown, setMarkdown] = useState(`### Type markdown for your notes!`);

  const onChange = (e: any) => {
    setMarkdown(e.target.value);
  };

  const onTabPress = (e:any) => {
      if(e.keyCode==9)
      {
          e.preventDefault();
          e.target.value+="\t";
      }
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
        <Grid
          container
          item
          direction="row"
          justify="center"
        >
          <Grid item>
            <Button>Save</Button>
          </Grid>
          <Grid>
            <Button>Back</Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          Title
        </Grid>
        <Grid item container spacing={4}>
          <Grid item sm={6} xs={12}>
            <TextareaAutosize
              style={{ width: "100%" }}
              rowsMin={45}
              defaultValue="### Type markdown for your notes!"
              onChange={(e) => onChange(e)}
              onKeyDown={(e)=> onTabPress(e)}              
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
