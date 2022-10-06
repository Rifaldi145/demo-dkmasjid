import {
    Box,
    Flex,
    HStack,
    Link,
    useColorModeValue,
    Image
} from "@chakra-ui/react";
import {
    DocumentIcon,
} from "../../../theme/components/Icons/Icons";
// import { SidebarResponsive } from "../../../theme/components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
// import SignIn from "../../../pages/views/Pages/SignIn.js";

export default function AuthNavbar(props) {
    const { logo, logoText, secondary, ...rest } = props;
    let navbarIcon = useColorModeValue("gray.700", "gray.200");
    let mainText = useColorModeValue("gray.700", "gray.200");
    let navbarBg = useColorModeValue(
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
    );
    let navbarBorder = useColorModeValue(
        "1.5px solid #FFFFFF",
        "1.5px solid rgba(255, 255, 255, 0.31)"
    );
    let navbarShadow = useColorModeValue(
        "0px 7px 23px rgba(0, 0, 0, 0.05)",
        "none"
    );
    let navbarFilter = useColorModeValue(
        "none",
        "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
    );
    let navbarBackdrop = "blur(21px)";
    let bgButton = useColorModeValue(
        "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
        "gray.800"
    );
    let navbarPosition = "fixed";
    let colorButton = "white";
    if (props.secondary === true) {
        navbarIcon = "white";
        navbarBg = "none";
        navbarBorder = "none";
        navbarShadow = "initial";
        navbarFilter = "initial";
        navbarBackdrop = "none";
        bgButton = "white";
        colorButton = "gray.700";
        mainText = "white";
        navbarPosition = "absolute";
    }
    var brand = (
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/#/dashboard`} display="flex" lineHeight="100%" fontWeight="bold" justifyContent="center" alignItems="center" color={mainText}>
            <Image src="/apple-icon.png" w="150px" h="43px" me="10px" />
            {/* <Text fontsize="sm" mt="3px">
                {logoText}
            </Text> */}
        </Link>
    );
    var linksAuth = (
        <HStack display={{ sm: "none", lg: "flex" }}>
            {/* <NavLink to="/auth/signup">
                <Button fontSize="sm" ms="0px" me="0px" px="0px" me={{ sm: "2px", md: "16px" }} color={navbarIcon} variant="transparent-with-icon" leftIcon={<RocketIcon color={navbarIcon} w="12px" h="12px" me="0px" />}>
                    <Text>Sign Up</Text>
                </Button>
            </NavLink> */}
            {/* <NavLink to="/auth/signin">
                <Button fontSize="sm" ms="0px" px="0px" me={{ sm: "2px", md: "16px" }} color={navbarIcon} variant="transparent-with-icon" leftIcon={<DocumentIcon color={navbarIcon} w="12px" h="12px" me="0px" />}>
                    <Text>Sign In</Text>
                </Button>
            </NavLink> */}
        </HStack>
    );
    return (
        <Flex
            position={navbarPosition}
            top="16px"
            left="50%"
            transform="translate(-50%, 0px)"
            background={navbarBg}
            border={navbarBorder}
            boxShadow={navbarShadow}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            borderRadius="15px"
            px="16px"
            py="22px"
            mx="auto"
            width="1044px"
            maxW="90%"
            alignItems="center"
        >
            <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
                {brand}
                <Box ms={{ base: "auto", lg: "0px" }} display={{ base: "flex", lg: "none" }}>
                    {/* <SidebarResponsive 
                        logoText={props.logoText} 
                        secondary={props.secondary} 
                        routes={
                            [
                                {
                                    path: "/signin",
                                    name: "Sign In",
                                    rtlName: "لوحة القيادة",
                                    icon: <DocumentIcon color="inherit" />,
                                    component: SignIn,
                                    layout: "/auth",
                                }
                            ]
                        } 
                        {...rest}
                    /> */}
                </Box>
                {linksAuth}
            </Flex>
        </Flex>
    );
}

AuthNavbar.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    brandText: PropTypes.string,
};
