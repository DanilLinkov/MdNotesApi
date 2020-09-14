import React from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../MyFrield";
import logo from "../../../Resources/Logo.svg";

interface Values {
  Username: string;
  Password: string;
}

const Login = () => {
  const onSubmit = (values: Values) => {
    console.log(values);
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
            <Button>Sign up</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
