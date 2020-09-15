import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../Forms/MyFrield";
import UserService from "../../Services/User.service";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import logo from "../../../Resources/Logo.svg";

interface Values {
  Title: string;
  Description: string;
}

const EditSubject = (props: any) => {

  const [userId, setuserId] = useState(-1);
  const history = useHistory();

  useEffect(() => {    
    if (AuthService.getCurrentUser()) {
      setuserId(AuthService.getCurrentUser().id);
    } else {
      history.push("/login");
    }
  }, [])  

  const onSubmit = (values: Values) => {
      UserService.editSubjectForSubjectId(
          props.location.state.subjectId,
          values.Title,
          values.Description,userId)
          .then((response) => {
              console.log(response);
              history.push("/");
          });
  };

  const onClickCancel = () => {
    history.push("/");
  }

  return (
    <Box
      style={{
        width: "37em",
        margin: "auto",
        marginTop: "10%",
        textAlign: "center",
        height: "26em",
      }}
      bgcolor="white"
      borderRadius="10px"
    >
      <Formik
        initialValues={{ Title: props.location.state.title, Description: props.location.state.description }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values }) => (
          <Form style={{ padding: "3em" }}>
            <Typography variant="h4">Edit Subject</Typography>
            <div style={{ marginTop: "1em" }}>
              <Field name="Title" placeholder="Title" component={MyField} />
            </div>
            <div>
              <Field
                name="Description"
                placeholder="Description"
                component={MyField}
                rows="5"
              />
            </div>
            <Button style={{ marginTop: "1em", marginRight: "2em" }} type="submit">
              Update
            </Button>
            <Button style={{ marginTop: "1em" }} onClick={onClickCancel}>Cancel</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditSubject;
