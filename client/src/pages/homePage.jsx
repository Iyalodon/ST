import { Flex } from "@chakra-ui/react";
import Sidebar from "../component/sidebar";
import Home from "../component/home";

export default function HomePage() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Home />
      </Flex>
    </>
  );
}
