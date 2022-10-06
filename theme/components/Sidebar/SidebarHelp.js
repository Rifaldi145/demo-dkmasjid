import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import IconBox from "../Icons/IconBox";
import React from "react";
const SidebarHelpImage = "/SidebarHelpImage.png";

export function SidebarHelp(props) {
  const { children, ...rest } = props;
  return (
    <Flex borderRadius="15px" flexDirection="column" bgImage={SidebarHelpImage} justifyContent="flex-start" alignItems="start" boxSize="border-box" p="16px" h="170px" w="100%">
      <IconBox width="35px" h="35px" bg="white" mb="auto">
        <QuestionIcon color="teal.300" h="18px" w="18px" />
      </IconBox>
      <Text fontSize="sm" color="white" fontWeight="bold">
        Butuh bantuan?
      </Text>
      <Text fontSize="xs" color="white" mb="10px">
        Silahkan periksa dokumentasi kami
      </Text>
      <Link w="100%" href="https://demos.creative-tim.com/docs-purity-ui-dashboard/">
        <Button fontSize="10px" fontWeight="bold" w="100%" bg="white" _hover="none" _active={{bg: "white", transform: "none", borderColor: "transparent"}} _focus={{ boxShadow: "none" }} color="black">
          DOKUMENTASI
        </Button>
      </Link>
    </Flex>
  );
}
