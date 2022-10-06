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

function SignUpAdmin() {
    let history = useHistory();
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const textColor = useColorModeValue("gray.400", "white");
    useEffect(() => {
        
    }, []);

    const changeHandler = (event) => {
        setEmail(event.target.value);
    };
    const changeHandler1 = (event) => { 
        setPassword(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setError(null);
        if(email == "" || email == null) {
            setError("Isi email!");
        } else if(password == "" || password == null) {
            setError("Isi Password!");
        } else {
            setIsLoading(true);
            setRegis();
        }
    };

    async function setRegis() {
        alert("Maaf Untuk Daftar Masih dalam proses pengerjaan");
    };

    


    return (
        <Flex position="relative" mb="40px">
            <Flex justifyContent="space-between" mb="30px" pt={{ sm: "120px", md: "120px" }}
                py="22px"
                mx="auto"
                width="1044px"
                maxW="90%"
                alignItems="center"
            >
                <Flex direction="column" w="100%" background="transparent">
                    <Center>
                        <Flex direction="column" w="100%">
                            <Stack w="100%" mx={'auto'} maxW={'sm'}>
                                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'xl'} p={{ sm: '2', lg: '8' }}  bgImage="url('/bgpattern.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'}>
                                    <Stack align={'center'} mb="40px">
                                        <Heading fontSize={'3xl'}>Daftar</Heading>
                                    </Stack>
                                    {
                                        error && (
                                            <Alert status="error" mb="6">
                                            <AlertIcon />
                                                <Text textAlign="justify" fontSize="sm">{error}</Text>
                                            </Alert>
                                        )
                                    }
                                    <chakra.form onSubmit={submitHandler}>
                                        <Stack spacing={4} mb="40px">
                                            <FormLabel pl="16px" mb="0px" pb="0px">
                                                Email
                                            </FormLabel>
                                            <FormControl id="email" bgImage="url('/textbox.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'} px={5} py={1} fontSize={'xs'} color={'gray'}>
                                                <Input _autofill={{ 
                                                    textFillColor: "gray",
                                                    transition: "background-color 5000s ease-in-out 0s",
                                                }} p="0px" m="0px" bgColor={"transparent"} focusBorderColor="none" border={'none'} fontSize={'sm'} type="text" value={email} onChange={changeHandler}/>
                                            </FormControl>

                                            <FormLabel pl="16px" mb="0px" pb="0px">
                                                No HP
                                            </FormLabel>
                                            <FormControl id="email" bgImage="url('/textbox.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'} px={5} py={1} fontSize={'xs'} color={'gray'}>
                                                <Input _autofill={{ 
                                                    textFillColor: "gray",
                                                    transition: "background-color 5000s ease-in-out 0s",
                                                }} p="0px" m="0px" bgColor={"transparent"} focusBorderColor="none" border={'none'} fontSize={'sm'} type="text" value={email} onChange={changeHandler}/>
                                            </FormControl>

                                            <FormLabel pl="16px" mb="0px" pb="0px">
                                                Password
                                            </FormLabel>
                                            <FormControl id="password" bgImage="url('/textbox.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'} px={5} py={1} fontSize={'xs'} color={'gray'}>
                                               
                                                <InputGroup size='md'>
                                                     <Input _autofill={{ 
                                                        textFillColor: "gray",
                                                        transition: "background-color 5000s ease-in-out 0s",
                                                    }} p="0px" m="0px" bgColor={"transparent"} focusBorderColor="none" border={'none'} fontSize={'sm'}  type={show ? 'text' : 'password'} value={password} onChange={changeHandler1    }/>
                                                    
                                                    <InputRightElement width='4.5rem'>
                                                        <Button h='1.75rem' size='sm' onClick={handleClick} bgColor="#5c499e" color="#fff" fontSize={40} ml={10}>
                                                        {show ? <FaEyeSlash/> : <FaEye/>}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>
                                            <Stack pt="10px" spacing={10}>
                                                <Center>
                                                    {/* <Button _hover={{ bgColor:"transparent", bgImage:"url('/button_orange2.png')" }} bgColor="transparent" bgImage="url('/button_purple2.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'} px={16} py={1} fontSize={'xs'} color={'white'}
                                                        isLoading={isLoading} type="submit"
                                                    > */}
                                                    <Button bg="#6a5aa3" size='sm' fontSize={'xs'} color="white" w="200px"  isLoading={isLoading} type="submit">
                                                        Daftar
                                                    </Button>
                                                </Center>
                                            </Stack>
                                        </Stack>
                                    </chakra.form>
                                </Box>
                            </Stack>
                        </Flex>
                    </Center>
                </Flex>
            </Flex>
        </Flex>
        
    );
}

export default SignUpAdmin;