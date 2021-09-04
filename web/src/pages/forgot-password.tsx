import { Alert, AlertIcon, Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useState } from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

export const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [mailTriggered, setMailTriggered] = useState("");
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setMailTriggered("triggered");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="Enter email"
              label="Email"
              type="email"
            />
            {mailTriggered ? (
              <Box mt={4}>
                <Alert status="success">
                  <AlertIcon />
                  An email has been sent to the registered email
                </Alert>
              </Box>
            ) : null}
            <Button mt={4} type="submit" color="teal" isLoading={isSubmitting}>
              Forgot Password
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
