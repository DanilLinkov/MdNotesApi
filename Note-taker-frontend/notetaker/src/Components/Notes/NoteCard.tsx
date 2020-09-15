import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
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

const NoteCard = (props: any) => {
  const classes = useStyles();

  const removeCard = () => {
    props.removeCard(props.id);
    UserService.deleteNoteForNoteId(props.id).then((response) => {
      console.log(response);
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h4">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={8}
        >
          <Grid item>
            <Button size="small" color="primary" style={{ color: "#e76f51" }}>
              Go To MarkDown
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="primary"
              style={{ color: "#e76f51" }}
              onClick={removeCard}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
