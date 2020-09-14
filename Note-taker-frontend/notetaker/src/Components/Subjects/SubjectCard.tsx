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

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
  },
  media: {
    height: 140,
  },
});

const SubjectCard = (props: any) => {
  const classes = useStyles();
  const { Title,description,id } = props;

  return (
    <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Button size="small" color="primary" style={{color:"#e76f51"}}>
              Go To Notes
            </Button>
          </Grid>
          <Grid item>
            <Button size="small" color="primary" style={{color:"#e76f51"}}>
              edit
            </Button>
            <Button size="small" color="primary" style={{color:"#e76f51"}}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SubjectCard;
