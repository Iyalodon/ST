import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

function CreatePostModal({ isOpen, onClose, onCreatePost }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);
    onCreatePost(formData);
    setCaption("");
    setImage(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Caption</FormLabel>
              <Textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={handleCaptionChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <input type="file" onChange={handleImageChange} required />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreatePostModal;
