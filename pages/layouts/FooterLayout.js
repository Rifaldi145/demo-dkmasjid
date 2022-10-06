import {
  Box,
  chakra,
  Container,
  Link as Links,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Tooltip,
  IconButton,
  useColorModeValue,
  Flex,Grid, GridItem,
  Icon,Heading,Center,
} from '@chakra-ui/react';

import {
  FaInstagram,FaFacebook,FaYoutube,FaTwitter,FaGooglePlay,
} from "react-icons/fa";
import IconBox from "../../theme/components/Icons/IconBox";

import { Link } from "react-router-dom";
import React, { createRef, useEffect, useRef, useState } from "react";

export default function FooterLayout() {
 
  const [mount, setMount] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
      setOpen(!open);
  };

  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
);

let greenColor = "#544493";
let variantChange = "0.2s linear";
let navbarIcon = useColorModeValue("gray.700", "gray.200");
let navbarShadow = useColorModeValue(
  "0 -1px 3px rgb(0 0 0 / 10%)",
  "0 -2px 2px rgb(0 0 0 / 6%)",
  "0 0 2px rgb(0 0 0 / 7%)"
);
const textColor = useColorModeValue("gray.600", "white");

 useEffect(() => {
        document.body.style.overflow = "unset";
        setMount(true);
        return function cleanup() {};
    }, []);


  return mount && (
    <Flex
        flexDirection={'column'}
        as="footer" 
        borderTop="2px solid #d3d3d3"
        w="100%"
        justify={'center'} align={'center'}
        pr={{ sm: 4, lg: 8 }}
        pl={{ sm: 4, lg: 8 }}
        bg={navbarBg}
    >
        <Flex flexDirection="column" justify={'center'} align={'center'} w="100%" background="transparent">
            <Flex color='white' mt={5} gap={2} flexDirection="row" justify={'center'} align={'center'} w="100%">
                <IconBox style={{ borderRadius: '7.5px' }} bg={greenColor} color="white" h={{ sm: '30px', lg: '40px' }} w={{ sm: '30px', lg: '40px' }} transition={variantChange}>
                    <Icon as={FaInstagram} color="inherit"/>
                </IconBox>
                <IconBox style={{ borderRadius: '7.5px' }} bg={greenColor} color="white" h={{ sm: '30px', lg: '40px' }} w={{ sm: '30px', lg: '40px' }} transition={variantChange}>
                    <Icon as={FaFacebook} color="inherit"/>
                </IconBox>
                <IconBox style={{ borderRadius: '7.5px' }} bg={greenColor} color="white" h={{ sm: '30px', lg: '40px' }} w={{ sm: '30px', lg: '40px' }} transition={variantChange}>
                    <Icon as={FaYoutube} color="inherit"/>
                </IconBox>
                <IconBox style={{ borderRadius: '7.5px' }} bg={greenColor} color="white" h={{ sm: '30px', lg: '40px' }} w={{ sm: '30px', lg: '40px' }} transition={variantChange}>
                    <Icon as={FaTwitter} color="inherit"/>
                </IconBox>
                <IconBox style={{ borderRadius: '7.5px' }} bg={greenColor} color="white" h={{ sm: '30px', lg: '40px' }} w={{ sm: '30px', lg: '40px' }} transition={variantChange}>
                    <Tooltip hasArrow label='Download Aplikasi Ghirah' placement='bottom'>
                        <Links href={`${process.env.NEXT_PUBLIC_PLAYSTORE}`} target="_blank" >
                            <Flex flexDirection="column" justify={'center'} align={'center'} w="100%" h={'100%'}>
                                <Icon as={FaGooglePlay}  color="inherit"/>
                            </Flex>
                        </Links>
                    </Tooltip>
                </IconBox>
            </Flex>
            <Flex color='white' mt={5} gap={{ sm: 2, lg: 4 }} flexDirection="row" justify={'center'} align={'start'} w="100%">
                <Link to={'#'} rel="noopener noreferrer" fontWeight={'bold'} color="#1a202c" p={0} m={0}>
                    <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} textAlign={'center'}>
                        About Us
                    </Text>
                </Link>
                <Link to={'#'} rel="noopener noreferrer" fontWeight={'bold'} color="#1a202c" p={0} m={0}>
                    <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} textAlign={'center'}>
                        Terms of Use
                    </Text>
                </Link>
                <Link to={'#'} rel="noopener noreferrer" fontWeight={'bold'} color="#1a202c" p={0} m={0}>
                    <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} textAlign={'center'}>
                        Privacy Policy
                    </Text>
                </Link>
                <Link to={'#'} rel="noopener noreferrer" fontWeight={'bold'} color="#1a202c" p={0} m={0}>
                    <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} textAlign={'center'}>
                        FAQ
                    </Text>
                </Link>
                <Link to={'#'} rel="noopener noreferrer" fontWeight={'bold'} color="#1a202c" p={0} m={0}>
                    <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} textAlign={'center'}>
                        Cookie Preferences
                    </Text>
                </Link>
            </Flex>
            <Flex mt={5} mb={5} justifyContent="center">
                <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} justifyContent="center">
                    {new Date().getFullYear()} -{" "}
                    <Link to={'#'} rel="noopener noreferrer">
                        Ghirah. All rights reserved.
                    </Link>
                </Text>
            </Flex>
        </Flex>
    </Flex>
  );
}