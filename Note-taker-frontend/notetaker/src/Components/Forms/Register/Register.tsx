import React, { useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../MyFrield";
import AuthService from "../../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import logo from "../../../Resources/Logo.svg";
import Password from "../Password";

interface Values {
  Username: string;
  Password: string;
  ReEnteredPassword: string;
}

const Register = () => {
  const history = useHistory();
  const [registerStatus, setRegisterStatus] = useState({
    successful: false,
    message: "",
  });
  const [userError, setUserError] = useState("");
  const [userPassError, setPassError] = useState("");
  const [userOverAllError, setOverAllError] = useState("");

  const onBackToLogin = () => {
    history.push("/login");
  };

  const onSubmit = (values: Values) => {
    if (values.Password && values.Username && values.ReEnteredPassword) {
      var temp = true;

      if (
        !checkCorrectLength(values.Username) &&
        checkCorrectLength(values.Password)
      ) {
        temp = false;
        setUserError("Username must be at least 6 characters in length.");
        setPassError("");
      }

      if (
        !checkCorrectLength(values.Password) &&
        checkCorrectLength(values.Username)
      ) {
        temp = false;
        setUserError("");
        setPassError("Password must be at least 6 characters in length.");
      }

      if (
        !checkCorrectLength(values.Password) &&
        !checkCorrectLength(values.Username)
      ) {
        temp = false;
        setUserError("Username must be at least 6 characters in length.");
        setPassError("Password must be at least 6 characters in length.");
      }

      if (
        checkCorrectLength(values.Password) &&
        checkCorrectLength(values.Username)
      ) {
        setUserError("");
        setPassError("");
      }

      if (!checkPassEqual(values.Password, values.ReEnteredPassword)) {
        temp = false;
        setOverAllError("Password and Re-entered password are not equal.");
      }

      if (checkPassEqual(values.Password, values.ReEnteredPassword)) {
        setOverAllError("");
      }

      if (temp) {
        AuthService.register(values.Username, values.Password).then(
          (response) => {
            setRegisterStatus({
              message: response.data.message,
              successful: true,
            });
            history.push("/login");
          },
          (error) => {
            setUserError("Username already exists.");
          }
        );
      }
    } else {
      setUserError("");
      setPassError("");
      setOverAllError("");
    }
  };

  const checkCorrectLength = (s: String) => {
    if (s.length < 6) {
      return false;
    }

    return true;
  };

  const checkPassEqual = (pass: String, repass: String) => {
    if (pass === repass) {
      return true;
    }

    return false;
  };

  return (
    <Box
      style={{
        width: "35em",
        margin: "auto",
        marginTop: "10%",
        textAlign: "center",
        height: "30em",
      }}
      bgcolor="white"
      borderRadius="10px"
    >
      <Formik
        initialValues={{ Username: "", Password: "", ReEnteredPassword: "" }}
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
                error={userError.length > 0}
                helperText={userError}
              />
            </div>
            <div>
              <Field
                name="Password"
                placeholder="Password"
                component={Password}
                error={userPassError.length > 0}
                helperText={userPassError}
              />
            </div>
            <div>
              <Field
                name="ReEnteredPassword"
                placeholder="ReEnteredPassword"
                component={Password}
                error={userOverAllError.length > 0}
                helperText={userOverAllError}
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
