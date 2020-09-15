import React, { useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../MyFrield";
import AuthService from "../../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import logo from "../../../Resources/Logo.svg";

interface Values {
  Username: string;
  Password: string;
  ReEnteredPassword: string;
}

const Register = () => {
  const history = useHistory();
  const [registerStatus, setRegisterStatus] = useState({
    successful: false,
    message: ""
  })

  const onBackToLogin = () => {
    history.push("/login");
  }

  const onSubmit = (values: Values) => {
    AuthService.register(
      values.Username,
      values.Password
    ).then(
      response => {
        setRegisterStatus({
          message: response.data.message,
          successful: true
        });
        history.push("/login");
      },
      error => {
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setRegisterStatus({
              message: resMessage,
              successful: false,
            });
      }
    );
  };

  return (
    <Box
      style={{
        width: "30em",
        margin: "auto",
        marginTop: "10%",
        textAlign: "center",
        height: "26em",
      }}
      bgcolor="white"
      borderRadius="10px"
    >
      <Formik
        initialValues={{ Username: "", Password: "" ,ReEnteredPassword: ""}}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values }) => (
          <Form style={{ padding: "2.5em" }}>
            <Typography variant="h4">Note-Taker</Typography>
            <div>
              <Field
                name="Username"
                placeholder="Username"
                component={MyField}
              />
            </div>
            <div>
              <Field
                name="Password"
                placeholder="Password"
                component={MyField}
              />
            </div>
            <div>
              <Field
                name="ReEnteredPassword"
                placeholder="ReEnteredPassword"
                component={MyField}
              />
            </div>
            <Button type="submit">Sign up</Button>
            <Typography>━━━━━━━━or━━━━━━━━</Typography>
            <Button onClick={onBackToLogin}>back to login</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
