import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  IconButton,
  Grid,
  GridItem,
  Image,
  Heading,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { BsGearWide } from "react-icons/bs";
import { api } from "../api/api";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const [post, setPost] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  async function fetchPosts() {
    const response = await api.get("/posts");
    console.log(response.data);
    const { post } = response.data;
    setPost(post);
  }
  console.log(post);
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Box bgColor={"black"} w={"100vw"} h={"720px"}>
      <Box maxW="900px" ml="340px" p={4}>
        <Flex align="center" mb={4} gap={"20px"} h={"140px"}>
          <Flex w={"200px"} h={"100%"} align={"center"} justify={"center"}>
            <Avatar size="2xl" name="John Coe" src="/avatar.jpg" mr={4} />
          </Flex>
          <Flex w={"100%"} h={"100%"} direction={"column"} gap={"20px"}>
            <Flex
              h={"34px"}
              w={"100%"}
              ml={"20px"}
              gap={"24px"}
              align={"center"}
            >
              <Text fontSize={"22px"} fontWeight={"bold"} color={"white"}>
                {" "}
                {userSelector?.name}
              </Text>
              <Button h={"32px"}>Edit Profile</Button>
              <BsGearWide color="white" size={24} />
            </Flex>
            <Flex
              h={"34px"}
              w={"100%"}
              ml={"20px"}
              gap={"24px"}
              align={"center"}
            >
              <Text color={"white"}>1 post</Text>
              <Text color={"white"}>1 follower</Text>
              <Text color={"white"}>1 following</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          mt={"36px"}
          align={"center"}
          justify={"center"}
          gap={"20px"}
          h={"44px"}
          borderTop={"2px"}
        >
          <Text fontSize="lg" fontWeight="bold" color={"white"}>
            Post
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Saved
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Tagged
          </Text>
        </Flex>

        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={"24px"}
          overflowY={"auto"}
          maxH={"470px"}
          css={{
            "&::-webkit-scrollbar": {
              width: "5px", // Adjust the width of the scrollbar as needed
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent", // Hide the default scrollbar track
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray.200", // Color of the scrollbar thumb
            },
          }}
        >
          {post?.map((val, idx) => (
            <>
              <GridItem colSpan={1}>
                <Image src={val.image} alt="Post" w={"270px"} h={"270px"} />
              </GridItem>
            </>
          ))}
        </Grid>

        {/* <Flex mt={4}>
          <IconButton
            icon={<AiOutlineHeart />}
            aria-label="Like"
            size="lg"
            mr={2}
          />
          <IconButton
            icon={<AiOutlineMessage />}
            aria-label="Comment"
            size="lg"
          />
        </Flex> */}
      </Box>
    </Box>
  );
}
