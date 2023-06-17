import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCompass,
  FiHeart,
  FiUser,
  FiPlusCircle,
} from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Bakpao } from "./postModal";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  console.log(userSelector);

  async function logout() {
    localStorage.removeItem("auth");
    nav("/login");
  }

  return (
    <Box
      bg="white"
      w="300px"
      h="100vh"
      borderRight="1px"
      borderColor="gray.200"
      position={"absolute"}
      left={"0px"}
    >
      <Flex direction="column" h="full">
        <Box p="4">
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            Instagram
          </Text>
        </Box>
        <VStack spacing="4" align="start" px="4" py="2">
          <Link to={"/"}>
            <Flex align="center">
              <Icon as={FiHome} boxSize="6" color="gray.700" />
              <Text ml="2" fontSize="md" fontWeight="semibold" color="gray.800">
                Home
              </Text>
            </Flex>
          </Link>
          <Flex align="center">
            <Icon as={FiCompass} boxSize="6" color="gray.700" />
            <Text ml="2" fontSize="md" fontWeight="semibold" color="gray.800">
              Explore
            </Text>
          </Flex>

          <Flex align="center">
            <Icon as={FiHeart} boxSize="6" color="gray.700" />
            <Text ml="2" fontSize="md" fontWeight="semibold" color="gray.800">
              Notifications
            </Text>
          </Flex>
          <Flex
            align="center"
            // onClick={handleOpenModal}
            onClick={onOpen}
          >
            <Icon as={FiPlusCircle} boxSize="6" color="gray.700" />
            <Text ml="2" fontSize="md" fontWeight="semibold" color="gray.800">
              Create
            </Text>
            {/* <PostModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              // onCreatePost={handleCreatePost}
            /> */}
            <Bakpao isOpen={isOpen} onClose={onClose} />
          </Flex>
          <Link to={"/profile"}>
            <Flex align="center">
              <Icon as={FiUser} boxSize="6" color="gray.700" />

              <Text ml="2" fontSize="md" fontWeight="semibold" color="gray.800">
                Profile
              </Text>
            </Flex>
          </Link>
        </VStack>
        <Flex align="center" justify="flex-start" p="4">
          <Box
            bg="white"
            w="10"
            h="10"
            borderRadius="full"
            boxShadow="md"
          ></Box>
          <Text ml="3" fontSize="md" fontWeight="semibold" color="gray.800">
            {userSelector?.name}
          </Text>
        </Flex>
        <Flex
          position={"absolute"}
          bottom={"0px"}
          p={"16px"}
          w={"100%"}
          align={"center"}
          justify={"center"}
        >
          <Menu placement="bottom-start">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<RxHamburgerMenu />}
              variant="outline"
              w={"240px"}
            />

            <MenuList>
              <MenuItem onClick={logout}>Log out</MenuItem>
              {/* <MenuItem>New Window</MenuItem>
              <MenuItem>Open Closed Tab</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
