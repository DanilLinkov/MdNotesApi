import React from "react";
import { Button, Box, Typography, Grid } from "@material-ui/core";
import SubjectCard from "./SubjectCard";

const SubjecsContainer = () => {
  return (
    <Box
      style={{ width: "50%", margin: "auto", padding: "2em", marginTop:"5%"}}
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
        <Grid item>
          <Button style={{color:"#e76f51"}}>Add New Subject</Button>
        </Grid>
        <Grid item>
          <SubjectCard />
        </Grid>
        <Grid item>
          <SubjectCard />
        </Grid>
        <Grid item>
          <SubjectCard />
        </Grid>
        <Grid item>
          <SubjectCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubjecsContainer;
