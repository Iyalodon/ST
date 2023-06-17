import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Image,
  Text,
  Flex,
  IconButton,
  Spacer,
  Divider,
  Avatar,
  Badge,
  Stack,
  AspectRatio,
  ChakraProvider,
} from "@chakra-ui/react";
import { RiHeart3Line, RiChat3Line, RiBookmark3Line } from "react-icons/ri";
import { api } from "../api/api";

export default function Home() {
  const [post, setPost] = useState([]);

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
    <ChakraProvider>
      <Container maxW="container.md" mt={10}>
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          overflowY={"auto"}
          maxH={"680px"}
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
          {post.map((val) => (
            <GridItem key={post.id}>
              <Card {...val} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </ChakraProvider>
  );
}

export function Card(props) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={props.image} alt="Post" />

      <Box p={4}>
        <Flex alignItems="center" mb={2}>
          <Avatar name={props.username} size="sm" mr={2} />
          <Text fontWeight="bold">{props.username}</Text>
        </Flex>

        <Flex alignItems="center">
          <IconButton
            icon={<RiHeart3Line />}
            aria-label="Like"
            variant="ghost"
            size="sm"
            mr={2}
          />
          <IconButton
            icon={<RiChat3Line />}
            aria-label="Comment"
            variant="ghost"
            size="sm"
            mr={2}
          />
          <Spacer />
          <IconButton
            icon={<RiBookmark3Line />}
            aria-label="Save"
            variant="ghost"
            size="sm"
          />
        </Flex>

        <Divider mt={4} mb={2} />

        <Flex alignItems="center">
          <Text fontWeight="bold" mr={2}>
            {props.likes}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Likes
          </Text>
          <Spacer />
          <Text fontWeight="bold" mr={2}>
            {props.comments}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Comments
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
