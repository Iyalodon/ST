import { Flex } from "@chakra-ui/react";
import Sidebar from "../component/sidebar";
import Profile from "../component/profile";

export default function ProfilePage() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Profile />
      </Flex>
    </>
  );
}
