import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/Auth.service";

const Topbar = (props: any) => {
  const [user, setUser] = useState({
    id: null,
    password: "",
    token: "",
    username: "",
  });
  const history = useHistory();

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  const onLogout = () => {
    AuthService.logout();
    history.push("/login");
  };

  const onHomeClick = () => {
    history.push("/");
  };

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
              spacing={4}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6">{user.username}</Typography>
              </Grid>
              <Grid item>
                <Button color="inherit" onClick={onHomeClick}>
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" onClick={onLogout}>
                  log out
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
