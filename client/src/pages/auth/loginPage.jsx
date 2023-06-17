import { Box, Center, Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { api } from "../../api/api";

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const inptHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  const login = async () => {
    try {
      if (!user.email || !user.password) {
        toast({
          title: "fill in all data.",
          status: "warning",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      } else {
        let token;
        await api
          .post("/users/login", user)
          .then((res) => {
            localStorage.setItem("auth", JSON.stringify(res.data.token));

            token = res.data.token;
          })
          .catch((err) =>
            toast({
              title: "Incorrect password/email",
              status: "error",
              position: "top",
              duration: 1000,
              isClosable: true,
            })
          );

        await api
          .get("/users/v3", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // params: {
            //   token,
            // },
          })
          .then((res) => {
            dispatch({
              type: "login",
              payload: res.data,
            });
            nav("/");
          });
      }
    } catch (err) {
      console.log(err.message);
    }

    //   console.log(result.data);
    //   alert(result.data.message);
    //   if (result.data.message) {
    //   }
    return;
  };

  return (
    <Box w="100vw" h="100vh" bgColor={"#F2F4F7"}>
      <Center w="100%" h="100%">
        <Flex
          bgColor={"white"}
          w="300px"
          flexDir={"column"}
          padding="20px"
          gap="10px"
          borderRadius={"10px"}
        >
          <Box fontWeight={"500"} fontSize={"30px"} fontFamily={"sans-serif"}>
            Log In
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Email
            </Box>
            <Input id="email" onChange={inptHandler}></Input>
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              {" "}
              Password
            </Box>
            <Input type="password" id="password" onChange={inptHandler}></Input>
          </Box>
          {/* <Link to="/"> */}
          <Button
            marginTop={"25px"}
            bgColor="blue"
            color={"white"}
            w="100%"
            onClick={login}
          >
            Sign In
          </Button>
          {/* </Link> */}

          <Link to="/register">
            <Center>don't have an account? register</Center>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
}
