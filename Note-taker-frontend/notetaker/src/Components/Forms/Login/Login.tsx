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
}

const Login = (props:any) => {
  const history = useHistory();

  const [loginStatus, setLoginStatus] = useState({
    message: "",
    loading: false,
  })

  const onSignUpClick = () => {
    history.push("/register");
  }

  const onSubmit = (values: Values) => {

    AuthService.login(values.Username,values.Password).then(
      () => {
        history.push("/");
        window.location.reload();
      },
      error => {
        const resMessage = (error.response && error.response.data &&
          error.reposonse.data.message) || error.message || error.toString();

          setLoginStatus({
            loading: false,
            message: resMessage,          
          });
      }
    )
  };

  return (
    <Box
      style={{
        width: "30em",
        margin: "auto",
        marginTop: "10%",
        textAlign: "center",
        height: "22em",
      }}
      bgcolor="white"
      borderRadius="10px"
    >
      <Formik
        initialValues={{ Username: "", Password: "" }}
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
            <Button type="submit">login</Button>
            <Typography>━━━━━━━━or━━━━━━━━</Typography>
            <Button onClick={onSignUpClick}>Sign up</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
