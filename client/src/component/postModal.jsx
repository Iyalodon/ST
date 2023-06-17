import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Image,
  Input,
} from "@chakra-ui/react";
import iconphoto from "../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";

export function Bakpao(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const userSelector = useSelector((state) => state.auth);
  const [post, setPost] = useState({
    caption: "",
    userId: userSelector.id,
  });
  const [image, setImage] = useState(iconphoto);

  //input
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempPost = { ...post };
    tempPost[id] = value;
    console.log(tempPost);
    setPost(tempPost);
  };
  console.log(post);

  // function new post
  const newPost = async () => {
    try {
      const formData = new FormData();
      formData.append("image", SelectedFile);
      formData.append("caption", post.caption);
      formData.append("userId", post.userId);

      await api.post("/posts", formData);

      alert("berhasil menambahkan produk");
      props.onClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Input
                accept="image/png, image/jpeg"
                onChange={handleFile}
                ref={inputFileRef}
                type="file"
                display="none"
                // id="product_url"
              />
              <Image
                src={image}
                w={"300px"}
                h={"300px"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              />
            </Flex>
            <Box>
              Caption
              <Input id="caption" onChange={inputHandler} />
            </Box>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={() => props.onClose()}>
            Close
          </Button> */}

            <Button
              bg={"blue"}
              color={"white"}
              variant="ghost"
              _hover={{ color: "black", bg: "#EEF2F6" }}
              onClick={() => {
                newPost();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
