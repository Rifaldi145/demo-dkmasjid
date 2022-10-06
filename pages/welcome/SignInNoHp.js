/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import {
    Flex,
    useColorModeValue,
    Center,
    Box,
    Stack,
    Heading,
    Text,
    Button,
    Input,InputGroup,InputRightElement,
    FormControl,
    FormLabel,
    chakra,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRouter  } from "next/router";
import axios from 'axios';
import {
    FaEye,FaEyeSlash
} from "react-icons/fa"
import { Redirect, Route, Switch, NavLink, useLocation, useHistory } from "react-router-dom";

//import { firebase, auth } from '../firebase';

function SignInNoHp() {
 


    return (
        <Flex position="relative" mb="40px">
            
              
        </Flex>
        
    );
}

export default SignInNoHp;