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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 140,
  },
});

const SubjectCard = (props: any) => {
  const classes = useStyles();
  const { title, description, id } = props;

  const onDelete = () => {
    props.removeCard(id);
    UserService.deleteSubjectForSubjectId(id).then(
      (response) => {
        console.log(response.data);
        
      }
    )
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
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
            <Button size="small" color="primary" style={{ color: "#e76f51" }}>
              Go To Notes
            </Button>
          </Grid>
          <Grid item>
            <Button size="small" color="primary" style={{ color: "#e76f51" }}>
              edit
            </Button>
            <Button size="small" color="primary" style={{ color: "#e76f51" }} onClick={onDelete}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SubjectCard;
