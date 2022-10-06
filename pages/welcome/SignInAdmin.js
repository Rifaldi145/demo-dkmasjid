/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Flex,
    useColorModeValue,
    Center,
    Box,
    Stack,
    Heading,
    Text,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    InputRightAddon,
    InputLeftAddon,
    FormControl,
    FormLabel,
    chakra,
    Alert,
    AlertIcon,
    Switch,
    Grid,
    GridItem,
    Tooltip
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRouter  } from "next/router";
import axios from 'axios';
import {
    FaEye,FaEyeSlash
} from "react-icons/fa"
import { useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithPhoneNumber, RecaptchaVerifier
} from "firebase/auth";
import {
    getFirestore, query, getDocs, collection, where, addDoc,
} from "firebase/firestore";
import Card from "../components/Card/Card.js";
import toast from "../../components/Toast";

const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
    measurementId: `${process.env.NEXT_PUBLIC_FIREBAE_MEASUREMENT_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SignInAdmin() {
    let history = useHistory();
    const router = useRouter()

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const [openErrorEmail, setOpenErrorEmail] = useState(false);
    const [email, setEmail] = useState("");

    const [openErrorPassword, setOpenErrorPassword] = useState(false);
    const [password, setPassword] = useState("");

    const [openErrorPhone, setOpenErrorPhone] = useState(false);
    const [code, setCode] = useState("+62");
    const [phone, setPhone] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingVerifikasi, setIsLoadingVerifikasi] = useState(false);
    const [confirmationResults, setConfirmationResults] = useState(null);
    const [error, setError] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [openErrorPin, setOpenErrorPin] = useState(false);
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");

    const [loginPhone, setLoginPhone] = useState(false);
    
    const [show, setShow] = React.useState(false);
    
    const textColor = useColorModeValue("gray.600", "white");
    const nameColor = useColorModeValue("gray.500", "white");

    useEffect(() => {
        // clearTimer(getDeadTime());
    }, []);

    const Ref = useRef(null);
    const [timer, setTimer] = useState('01:30');
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if(total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
    const clearTimer = (e) => {
        setTimer('01:30');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 90);
        return deadline;
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if(!loginPhone) {
            setError(null);
            loginWithEmailForm();
        } else {
            if(isConfirmed) {
                if(timer != '01:30' && timer != '00:00') {
                    setError('Harap menunggu waktu OTP selesai')
                } else {
                    setIsLoadingVerifikasi(false);
                    setError(null);
                    setIsConfirmed(false);
                    loginWithPhoneForm();
                }
            } else {
                setIsLoadingVerifikasi(false);
                setError(null);
                setIsConfirmed(false);
                loginWithPhoneForm();
            }
        }
    };

    async function loginWithEmailForm() {
        setOpenErrorEmail(false);
        setOpenErrorPassword(false);
        var lanjut = true;
        if(email == null || email == "") {
            setOpenErrorEmail(true);
            lanjut = false;
        }
        if(password == null || password == "") {
            setOpenErrorPassword(true);
            lanjut = false;
        }
        if(lanjut) {
            setIsLoading(true);
            try {
                var postData = {
                    email: email,
                    password: password
                };
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/login-email`,
                    headers: {
                        "Content-Type": `application/json`,
                        "Accept": `application/json`,
                    },
                    data: postData
                }).then(async (res) => {
                    setIsLoading(false);
                    if(res.data.success) {
                        showSucessLogin(res.data.message);
                        localStorage.setItem('users', JSON.stringify(res.data));
                        history.push('/admin/dashboard');
                    } else {
                        console.log("error 1", res.data.message);
                        setError(res.data.message);
                    }
                });
            } catch (err) {
                console.log("err", err);
                setIsLoading(false);
                if(err.response.data != null) {
                    console.log("error 2", err.response.data.message);
                    setError(err.response.data.message);
                } else {
                    console.log("error 3", JSON.stringify(err));
                    setError(JSON.stringify(err));
                }
            }
        }
    }

    async function loginWithPhoneForm() {
        setOpenErrorPhone(false);
        var lanjut = true;
        if(phone == null || phone == "") {
            setOpenErrorPhone(true);
            lanjut = false;
        }

        if(lanjut) {
            setIsLoading(true);
            try {
                var postData = {
                    phone: '+62' + phone,
                };
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/login-handphone/check`,
                    headers: {
                        "Content-Type": `application/json`,
                        "Accept": `application/json`,
                    },
                    data: postData
                }).then(async (res) => {
                    if(res.data.success) {
                        if(res.data.success_google == true) {
                            lanjutLoginHandphone();
                        } else {
                            onSignInSubmit();
                        }
                    } else {
                        setIsLoading(false);
                        console.log("error 4", res.data.message);
                        setError(res.data.message);
                    }
                });
            } catch (err) {
                console.log("err", err);
                setIsLoading(false);
                if(err.response.data != null) {
                    console.log("error 5", err.response.data.message);
                    setError(err.response.data.message);
                } else {
                    console.log("error 6", JSON.stringify(err));
                    setError(JSON.stringify(err));
                }
            }
        }
    }

    async function lanjutLoginHandphone() {
        try {
            var postData = {
                phone: '+62' + phone,
            };
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/login-handphone`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                },
                data: postData
            }).then(async (res) => {
                setIsLoading(false);
                if(res.data.success) {
                    localStorage.setItem('users', JSON.stringify(res.data));
                    history.push('/admin/dashboard');
                } else {
                    console.log("error 7", res.data.message);
                    setError(res.data.message);
                }
            });
        } catch (err) {
            console.log("err", err);
            setIsLoading(false);
            if(err.response.data != null) {
                console.log("error 8", err.response.data.message);
                setError(err.response.data.message);
            } else {
                console.log("error 9", JSON.stringify(err.response));
                setError(JSON.stringify(err.response));
            }
        }
    }

    const configureCaptcha = () => {
        console.log("configurecaptcha working");
        window.recaptchaVerifier = new RecaptchaVerifier(
          "sign-in-button",
          {
            size: "invisible",
            callback: (response) => {
              onSignInSubmit();
              console.log("Recaptcha verified");
            },
            defaultCountry: "ID"
          },
          auth
        );
    };

    const onSignInSubmit = async () => {
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, "+62" + phone, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log("confirmationResult", confirmationResult);
            setConfirmationResults(confirmationResult);
            setIsConfirmed(true);
            setIsLoading(false);
            clearTimer(getDeadTime());
        }).catch((error) => {
            setIsLoading(false);
            if(error.code != 'auth/invalid-phone-number') {
                setIsConfirmed(false);
                console.log("error 10", error.code);
                const errorCode = error.code;
                console.log("error 11", error.message);
                const errorMessage = error.message;
                setError(errorMessage);
                setError(errorMessage);
            }
        });
    };
    
    function showSucessLogin(message) {
        notify("success", message);
    }

    const ValidateOtp = () => {
        setError(null);
        
        var lanjut = true;

        if(
            (pin1 == null || pin1 == "") ||
            (pin2 == null || pin2 == "") ||
            (pin3 == null || pin3 == "") ||
            (pin4 == null || pin4 == "") ||
            (pin5 == null || pin5 == "") ||
            (pin6 == null || pin6 == "")
        ) {
            setOpenErrorPin(true);
            lanjut = false;
        }

        if(lanjut) {
            setIsLoadingVerifikasi(true);
            confirmationResults.confirm(pin1+pin2+pin3+pin4+pin5+pin6).then(async (result) => {
                console.log(result);
                await loginHandphone();
            }, (err) => {
                setIsLoadingVerifikasi(false);
                if(err.response) {
                    setError(err.response.message);
                    console.log("error 12", err.response.message);
                } else {
                    setError(JSON.stringify(err));
                    console.log("error 13", JSON.stringify(err));
                }
            });
        }
    }

    async function loginHandphone() {
        var postData = {
            phone: "+62" + phone,
        };
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/login-handphone`,
            data: postData
        }).then(async (res) => {
            if(res.data.success == false) {
                setIsLoading(false);
                setIsLoadingVerifikasi(false);
                setError(res.data.message);
                console.log("error 14", res.data.message);
            } else {
                localStorage.setItem('users', JSON.stringify(res.data));
                setIsLoading(false);
                setIsLoadingVerifikasi(false);
                history.push('/admin/dashboard');
            }
        }, (err) => {
            setIsLoadingVerifikasi(false);
            setIsLoading(false);
            console.log("AXIOS ERROR: ", err);
            if(err.response) {
                console.log("error 15", err.response.message);
                setError(err.response.message);
            } else {
                console.log("error 16", JSON.stringify(err));
                setError(JSON.stringify(err));
            }
        });
    }


    return (
        <Flex pt={{ base: "90px", lg: "85px" }} flexDirection="column" w={'100%'} h={'100vh'} justify={'center'} align={'center'}>
            <Flex flexDirection="column" w={'100%'} h={'100vh'} justify={'center'} align={'center'}>
                <Card bgImage="url('/bgpattern.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'} boxShadow={'xl'} w={{ sm: '90%', lg: '25%' }} overflowX={{ sm: "scroll", xl: "hidden" }} p={{ sm: 5, lg: 6 }}>
                    <chakra.form onSubmit={submitHandler}>
                        <Flex flexDirection="column" w={'100%'} justify={'center'} align={'center'}>
                            <Heading color={textColor} pb={{ sm: 5, lg: 6 }} fontSize={{ sm: 'xl', lg: '3xl' }}>Masuk</Heading>
                            {
                                error && (
                                    <Alert borderRadius={'5px'} status="error" mb="6">
                                    <AlertIcon />
                                        <Text textAlign="justify" fontSize="sm">{error}</Text>
                                    </Alert>
                                )
                            }
                            {
                                !loginPhone ?
                                <Flex flexDirection="column" w={'100%'} justify={'center'} align={'center'}>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} pb={{ sm: 5, lg: 6 }}>
                                        <GridItem colSpan={1} pb={{ sm: 2, lg: 2 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text pl={1} color={textColor} fontSize={{ sm: 'sm', lg: 'md' }} fontWeight={'bold'}>
                                                    Email
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi email!' placement='bottom-start' isOpen={openErrorEmail}>
                                                    <Input
                                                        onChange={(event) => {
                                                            setEmail(event.target.value);
                                                            setOpenErrorEmail(false);
                                                        }}
                                                        value={email}
                                                        w={'100%'}
                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        textAlign={'left'}
                                                        placeholder={'Masukkan email'}
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        type="email"
                                                        autoComplete="new-password"
                                                    />
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} pb={{ sm: 7, lg: 8 }}>
                                        <GridItem colSpan={1} pb={{ sm: 2, lg: 2 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text pl={1} color={textColor} fontSize={{ sm: 'sm', lg: 'md' }} fontWeight={'bold'}>
                                                    Password
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi password!' placement='bottom-start' isOpen={openErrorPassword}>
                                                    <InputGroup
                                                        w={'100%'}
                                                        size={{ sm: 'sm', lg: 'md' }}
                                                        fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                                        verticalAlign={'middle'}
                                                        textAlign={'center'}
                                                    >
                                                        <Input
                                                            onChange={(event) => {
                                                                setPassword(event.target.value);
                                                                setOpenErrorPassword(false);
                                                            }}
                                                            value={password}
                                                            w={'100%'}
                                                            size={{ sm: 'sm' , lg: 'md'}}
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            bgColor="white"
                                                            color={textColor}
                                                            verticalAlign={'middle'}
                                                            textAlign={'left'}
                                                            placeholder={'Masukkan password'}
                                                            borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                            borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                            type={show ? 'text' : 'password'}
                                                            autoComplete="new-password"
                                                        />
                                                        <InputRightAddon
                                                            cursor={'pointer'}
                                                            borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                            borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                            onClick={(event)=> {
                                                                if(show) {
                                                                    setShow(false);
                                                                } else {
                                                                    setShow(true);
                                                                }
                                                            }}
                                                            children={
                                                            <Center>
                                                                {show ? <FaEyeSlash/> : <FaEye/>}
                                                            </Center>
                                                        }/>
                                                    </InputGroup>
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                </Flex>
                                :
                                <Flex flexDirection="column" w={'100%'} justify={'center'} align={'center'}>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} pb={{ sm: 5, lg: 6 }}>
                                        <GridItem colSpan={1} pb={{ sm: 2, lg: 2 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text pl={1} color={textColor} fontSize={{ sm: 'sm', lg: 'md' }} fontWeight={'bold'}>
                                                    Nomor Handphone
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi nomor handphone!' placement='bottom-start' isOpen={openErrorPhone}>
                                                    <InputGroup
                                                        w={'100%'}
                                                        size={{ sm: 'sm', lg: 'md' }}
                                                        fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                                        verticalAlign={'middle'}
                                                        textAlign={'center'}
                                                    >
                                                        <InputLeftAddon
                                                            borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                            borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                            children={
                                                            <Center>
                                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                    +62
                                                                </Text>
                                                            </Center>
                                                        }/>
                                                        <Input
                                                            onChange={(event) => {
                                                                setPhone(event.target.value.replace(/^0+/, ''));
                                                                setOpenErrorPhone(false);
                                                            }}
                                                            value={phone}
                                                            w={'100%'}
                                                            size={{ sm: 'sm' , lg: 'md'}}
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            bgColor="white"
                                                            color={textColor}
                                                            verticalAlign={'middle'}
                                                            textAlign={'left'}
                                                            placeholder={'Masukkan nomor HP'}
                                                            borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                            borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                            type={'number'}
                                                            autoComplete="new-password"
                                                        />
                                                    </InputGroup>
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                    {
                                        isConfirmed ?
                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                            <Text textAlign={'left'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} pb={1}>
                                                Masukkan kode OTP sebelum waktu berikut
                                            </Text>
                                            <Text textAlign={'left'} color={textColor} fontSize={{ sm: 'md', lg: 'lg' }} fontWeight={'bold'} pb={1}>
                                                {timer}
                                            </Text>
                                            <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi kode OTP!' placement='bottom-start' isOpen={openErrorPin}>
                                                <Grid gap={1} templateColumns={{ sm: 'repeat(6, 1fr)', lg: 'repeat(6, 1fr)'}} w={'100%'} pb={{ sm: 5, lg: 6 }}>
                                                    <GridItem colSpan={1}>
                                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                            <Input
                                                                onChange={(event) => {
                                                                    setOpenErrorPin(false);
                                                                    if(event.target.value.length < 2) {
                                                                        setPin1(event.target.value);
                                                                    }
                                                                }}
                                                                value={pin1}
                                                                max={1}
                                                                w={'100%'}
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                bgColor="white"
                                                                color={textColor}
                                                                verticalAlign={'middle'}
                                                                textAlign={'center'}
                                                                borderRadius={{ sm: '5px', lg: '5px' }}
                                                                type="number"
                                                                autoComplete="new-password"
                                                            />
                                                        </Flex>
                                                    </GridItem>
                                                    <GridItem colSpan={1}>
                                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                            <Input
                                                                onChange={(event) => {
                                                                    setOpenErrorPin(false);
                                                                    if(event.target.value.length < 2) {
                                                                        setPin2(event.target.value);
                                                                    }
                                                                }}
                                                                value={pin2}
                                                                w={'100%'}
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                bgColor="white"
                                                                color={textColor}
                                                                verticalAlign={'middle'}
                                                                textAlign={'center'}
                                                                borderRadius={{ sm: '5px', lg: '5px' }}
                                                                type="number"
                                                                autoComplete="new-password"
                                                            />
                                                        </Flex>
                                                    </GridItem>
                                                    <GridItem colSpan={1}>
                                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                            <Input
                                                                onChange={(event) => {
                                                                    setOpenErrorPin(false);
                                                                    if(event.target.value.length < 2) {
                                                                        setPin3(event.target.value);
                                                                    }
                                                                }}
                                                                value={pin3}
                                                                w={'100%'}
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                bgColor="white"
                                                                color={textColor}
                                                                verticalAlign={'middle'}
                                                                textAlign={'center'}
                                                                borderRadius={{ sm: '5px', lg: '5px' }}
                                                                type="number"
                                                                autoComplete="new-password"
                                                            />
                                                        </Flex>
                                                    </GridItem>
                                                    <GridItem colSpan={1}>
                                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                            <Input
                                                                onChange={(event) => {
                                                                    setOpenErrorPin(false);
                                                                    if(event.target.value.length < 2) {
                                                                        setPin4(event.target.value);
                                                                    }
                                                                }}
                                                                value={pin4}
                                                                w={'100%'}
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                bgColor="white"
                                                                color={textColor}
                                                                verticalAlign={'middle'}
                                                                textAlign={'center'}
                                                                borderRadius={{ sm: '5px', lg: '5px' }}
                                                                type="number"
                                                                autoComplete="new-password"
                                                            />
                                                        </Flex>
                                                    </GridItem>
                                                    <GridItem colSpan={1}>
                                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                            <Input
                                                                onChange={(event) => {
                                                                    setOpenErrorPin(false);
                                                                    if(event.target.value.length < 2) {
                                                                        setPin5(event.target.value);
                                                                    }
                                                                }}
                                                                value={pin5}
                                                                w={'100%'}
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                bgColor="white"
                                                                color={textColor}
                                                                verticalAlign={'middle'}
                                                                textAlign={'center'}
                                                                borderRadius={{ sm: '5px', lg: '5px' }}
                                                                type="number"
                                                                autoComplete="new-password"
                                                            />
                                                        </Flex>
                                                    </GridItem>
                                                    <GridItem colSpan={1}>
                                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                            <Input
                                                                onChange={(event) => {
                                                                    setOpenErrorPin(false);
                                                                    if(event.target.value.length < 2) {
                                                                        setPin6(event.target.value);
                                                                    }
                                                                }}
                                                                value={pin6}
                                                                w={'100%'}
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                bgColor="white"
                                                                color={textColor}
                                                                verticalAlign={'middle'}
                                                                textAlign={'center'}
                                                                borderRadius={{ sm: '5px', lg: '5px' }}
                                                                type="number"
                                                                autoComplete="new-password"
                                                            />
                                                        </Flex>
                                                    </GridItem>
                                                </Grid>
                                            </Tooltip>
                                        </Flex>
                                        :
                                        <></>
                                    }
                                </Flex>
                            }
                            <FormControl display="flex" alignItems="center" pb={{ sm: 7, lg: 8 }}>
                                <Switch colorScheme="purple2" me="10px" checked={loginPhone}
                                    onChange={(event) => {
                                        const isChecked = event.target.checked;
                                        if(isChecked) {
                                            setEmail("");
                                            setPassword("");
                                            configureCaptcha();
                                        } else {
                                            setPhone("");
                                        }
                                        setLoginPhone(isChecked);
                                        setOpenErrorEmail(false);
                                        setOpenErrorPassword(false);
                                        setOpenErrorPhone(false);
                                    }}
                                />
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Masuk menggunakan nomor handphone
                                </Text>
                            </FormControl>
                            <Flex justify="space-between" align="center" w="100%">
                                <Flex></Flex>
                                <Flex flexDirection={'row'} gap={1} justify="end" align="end" w="100%">
                                    <Button
                                        isLoading={isLoading}
                                        id="sign-in-button"
                                        type="submit"
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        bg="#6a5aa3"
                                        color="white"
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                    >
                                        Masuk
                                    </Button>
                                    {
                                        isConfirmed ?
                                        <Button
                                            isLoading={isLoadingVerifikasi}
                                            onClick={ValidateOtp}
                                            type="button"
                                            id="sign-in-button"
                                            size={{ sm: 'sm', lg: 'sm' }}
                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                            bg="#6a5aa3"
                                            color="white"
                                            _hover={{ bg: "#B3A5DA", color: textColor }}
                                        >
                                            Verifikasi
                                        </Button>
                                        :
                                        <></>
                                    }
                                </Flex>
                            </Flex>
                        </Flex>
                    </chakra.form>
                </Card>
            </Flex>
        </Flex>
    );
}

export default SignInAdmin;