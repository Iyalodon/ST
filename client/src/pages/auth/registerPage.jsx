import React from "react";
import {
  Box,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Flex,
  Center,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const toast = useToast({ position: "top" });
  const nav = useNavigate();

  const inputHandler = async (
    values,
    { resetForm, setSubmitting, setFieldError }
  ) => {
    try {
      await api.post("/users", values);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      nav("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration Failed";
      if (errorMessage.includes("password")) {
        // Handle password-related error
        setFieldError("password", errorMessage); // Set error message for "password" field
      } else {
        // Handle other errors
        setFieldError("email", errorMessage); // Set error message for "email" field
      }
      toast({
        title: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box
        w={"400px"}
        borderWidth={"2px"}
        borderRadius={"8px"}
        boxShadow={"md"}
        p={"16px"}
      >
        <Center>
          <Heading mb={"16Px"}>Register</Heading>
        </Center>
        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
            verifPassword: "",
            showPassword: false,
            showVerifPassword: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email(
                "* This email is invalid. Make sure it's written like example@email.com"
              )
              .required("* Email is required"),
            name: Yup.string().required("* Username is required"),
            password: Yup.string()
              .min(8, "* Password must be at least 8 characters")
              .matches(
                /[A-Z]/,
                "* Password must contain at least one uppercase letter"
              )
              .required("* Password is required"),
            verifPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords do not match")
              .required("* Please verify your password"),
          })}
          onSubmit={inputHandler}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input type="email" id="email" {...field} />
                    <Box
                      h={"20px"}
                      w={"100%"}
                      overflow={"hidden"}
                      position={"relative"}
                    >
                      <ErrorMessage
                        name="email"
                        component={FormErrorMessage}
                        style={{
                          fontSize: "12px",
                          position: "absolute",
                          bottom: 0,
                        }}
                      />
                    </Box>
                  </FormControl>
                )}
              </Field>

              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input type="text" id="name" {...field} />
                    <Box
                      h={"20px"}
                      w={"100%"}
                      overflow={"hidden"}
                      position={"relative"}
                    >
                      <ErrorMessage
                        name="name"
                        component={FormErrorMessage}
                        style={{
                          fontSize: "12px",
                          position: "absolute",
                          bottom: 0,
                        }}
                      />
                    </Box>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        type={values.showPassword ? "text" : "password"}
                        id="password"
                        {...field}
                      />
                      <InputRightElement w={"48px"}>
                        <Button
                          h="20px"
                          size="sm"
                          onClick={() =>
                            setFieldValue("showPassword", !values.showPassword)
                          }
                          bgColor={"white"}
                          _hover={"white"}
                        >
                          {values.showPassword ? (
                            <Icon
                              as={AiOutlineEye}
                              w={"100%"}
                              h={"100%"}
                              color={"grey"}
                            />
                          ) : (
                            <Icon
                              as={AiOutlineEyeInvisible}
                              w={"100%"}
                              h={"100%"}
                              color={"grey"}
                            />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Box
                      h={"20px"}
                      w={"100%"}
                      overflow={"hidden"}
                      position={"relative"}
                    >
                      <ErrorMessage
                        name="password"
                        component={FormErrorMessage}
                        style={{
                          fontSize: "12px",
                          position: "absolute",
                          bottom: 0,
                        }}
                      />
                    </Box>
                  </FormControl>
                )}
              </Field>

              <Field name="verifPassword">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.verifPassword && form.touched.verifPassword
                    }
                  >
                    <FormLabel>Verify Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        type={values.showVerifPassword ? "text" : "password"}
                        {...field}
                      />
                      <InputRightElement w={"48px"}>
                        <Button
                          h="20px"
                          size="sm"
                          onClick={() =>
                            setFieldValue(
                              "showVerifPassword",
                              !values.showVerifPassword
                            )
                          }
                          bgColor={"white"}
                          _hover={"white"}
                        >
                          {values.showVerifPassword ? (
                            <Icon
                              as={AiOutlineEye}
                              w={"100%"}
                              h={"100%"}
                              color={"grey"}
                            />
                          ) : (
                            <Icon
                              as={AiOutlineEyeInvisible}
                              w={"100%"}
                              h={"100%"}
                              color={"grey"}
                            />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Box
                      h={"20px"}
                      w={"100%"}
                      overflow={"hidden"}
                      position={"relative"}
                    >
                      <ErrorMessage
                        name="verifPassword"
                        component={FormErrorMessage}
                        style={{
                          fontSize: "12px",
                          position: "absolute",
                          bottom: 0,
                        }}
                      />
                    </Box>
                  </FormControl>
                )}
              </Field>

              <Button
                mt={"16px"}
                colorScheme="blue"
                bgColor={"blue"}
                isLoading={isSubmitting}
                type="submit"
                w={"100%"}
              >
                Register
              </Button>
              <Link to={"/login"}>
                <Center pt={"15px"}>Back to Sign in</Center>
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
