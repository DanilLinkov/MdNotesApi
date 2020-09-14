import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";

const Topbar = (props: any) => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5">Note-Taker</Typography>
          </Grid>
          <div>
            <Grid
              item
              container
              spacing={2}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Username</Typography>
              </Grid>
              <Grid item>
                <Button color="inherit">Home</Button>
              </Grid>
              <Grid item>
                <Button color="inherit">log out</Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
