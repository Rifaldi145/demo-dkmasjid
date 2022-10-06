/* eslint-disable react-hooks/rules-of-hooks */
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Link,
    useColorModeValue,
    Text
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PengurusNavbarLinks from "./PengurusNavbarLinks";
const headerImage = "/header1.png";

export default function PengurusNavbar(props) {
    const [scrolled, setScrolled] = useState(false);
    const {
        brandText
    } = props;

    let mainText = useColorModeValue("gray.700", "gray.200");
    let secondaryText = useColorModeValue("gray.400", "gray.200");
    // let navbarPosition = "absolute";
    let navbarPosition = "fixed";
    let navbarFilter = "none";
    let navbarBackdrop = "blur(21px)";
    let navbarShadow = "none";
    // let navbarBg = "gray.100";
    let navbarBg = "none";
    let navbarBorder = "transparent";
    let secondaryMargin = "0px";
    let paddingX = "15px";
    if (props.fixed === true)
        if (scrolled === true) {
            navbarPosition = "fixed";
            navbarShadow = useColorModeValue(
                "0px 7px 23px rgba(0, 0, 0, 0.05)",
                "none"
            );
            navbarBg = useColorModeValue(
                "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
                "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
            );
            navbarBorder = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");
            navbarFilter = useColorModeValue(
                "none",
                "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
            );
        }
    if (props.secondary) {
        navbarBackdrop = "none";
        // navbarPosition = "absolute";
        navbarPosition = "fixed";
        mainText = "white";
        secondaryText = "white";
        secondaryMargin = "22px";
        paddingX = "30px";
    }
    const changeNavbar = () => {
        if (window.scrollY > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    window.addEventListener("scroll", changeNavbar);
    return (
        <Flex
            position={navbarPosition}
            boxShadow={navbarShadow}
            bgImage={headerImage}
            bgRepeat="no-repeat" 
            bgPosition="100%"
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            borderWidth="1.5px"
            borderStyle="solid"
            transitionDelay="0s, 0s, 0s, 0s"
            transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
            transition-property="box-shadow, background-color, filter, border"
            transitionTimingFunction="linear, linear, linear, linear"
            alignItems={{ xl: "center" }}
            borderBottomRadius="10px"
            display="flex"
            minH="95px"
            maxW="100%"
            justifyContent={{ xl: "center" }}
            lineHeight="25.6px"
            mx="auto"
            pb="8px"
            left={{ sm: "15px", ld: document.documentElement.dir === "rtl" ? "30px" : "" }}
            right={{ sm: '0px', lg: "27px" }}
            pl={{ sm:"16px" }}
            ps={{
                xl: "12px",
            }}
             w={{ sm: "calc(100vw - 0px)", xl: "calc(100vw - 56px - 290px)" }}
             //w={{ sm: "calc(100vw - 0px)", xl: "79.3%" }}
        >
            <Flex w="100%" flexDirection={{sm: "column", md: "row"}} alignItems={{ xl: "center" }}>
                <Box mb={{ sm: "8px", md: "0px" }} mt={{ sm : "5%", md: "0px"}}>
                    <Breadcrumb>
                        <BreadcrumbItem color="white">
                            <Text fontSize={{ sm: 'sm', lg: 'md' }} color="white">
                                Pages
                            </Text>
                        </BreadcrumbItem>
                        <BreadcrumbItem color="white">
                            <Text fontSize={{ sm: 'sm', lg: 'md' }} color="white">
                                {brandText}
                            </Text>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    {/* Here we create navbar brand, based on route name */}
                    <Text
                        color="white"
                        href="#"
                        bg="inherit"
                        borderRadius="inherit"
                        fontWeight="bold"
                        _hover={{ color: { mainText } }}
                        _active={{
                        bg: "inherit",
                        transform: "none",
                        borderColor: "transparent",
                        }}
                        _focus={{
                        boxShadow: "none",
                        }}
                        fontSize={{ sm: 'sm', lg: 'md' }}
                    >
                        {brandText}
                    </Text>
                </Box>
                {/* w={{ sm: "100%", md: "unset" }} */}
                <Box ms="auto" w={{ sm: "unset", md: "unset" }} mt={{ sm : "-12%", md: "0"}}>
                    <PengurusNavbarLinks onOpen={props.onOpen} logoText={props.logoText} secondary={props.secondary} fixed={props.fixed}/>
                </Box>
            </Flex>
        </Flex>
    );
}

PengurusNavbar.propTypes = {
    brandText: PropTypes.string,
    variant: PropTypes.string,
    secondary: PropTypes.bool,
    fixed: PropTypes.bool,
    onOpen: PropTypes.func,
};
