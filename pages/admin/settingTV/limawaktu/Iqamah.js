/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    useColorModeValue,
    FormControl,
    Input,
    chakra,
    Alert,
    AlertIcon,
    Grid,
    GridItem,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Center,
    Image,
    AspectRatio
} from "@chakra-ui/react";
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";

export default function Iqamah(props) {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxMenit = 60;

    const notifyIqamah = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissIqamah = useCallback(() => {
        toast.dismiss();
    }, []);

    // jeda waktu iqamah
    const [iklanIqamah, setIklanIqamah] = useState(null);
    const [jedaWaktuIqamahSubuh, setJedaWaktuIqamahSubuh] = useState(15);
    const [jedaWaktuIqamahDzuhur, setJedaWaktuIqamahDzuhur] = useState(10);
    const [jedaWaktuIqamahAshar, setJedaWaktuIqamahAshar] = useState(10);
    const [jedaWaktuIqamahMaghrib, setJedaWaktuIqamahMaghrib] = useState(12);
    const [jedaWaktuIqamahIsya, setJedaWaktuIqamahIsya] = useState(10);
    // jeda waktu iqamah

    const [isLoadingSimpanIqamah, setIsLoadingSimpanIqamah] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.iklan != null) {
                if(props.dataSetting.iklan.image != null) {
                    setIklanIqamah(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + props.dataSetting.iklan.image.replace("public", "storage"));
                }
            }
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.adzans != null) {
                    if(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_subuh != null) {
                        setJedaWaktuIqamahSubuh(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_subuh);
                    }
                    if(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_dzuhur != null) {
                        setJedaWaktuIqamahDzuhur(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_dzuhur);
                    }
                    if(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_ashar != null) {
                        setJedaWaktuIqamahAshar(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_ashar);
                    }
                    if(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_maghrib != null) {
                        setJedaWaktuIqamahMaghrib(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_maghrib);
                    }
                    if(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_isya != null) {
                        setJedaWaktuIqamahIsya(props.dataSetting.mosques.displays.adzans.jeda_waktu_iqamah_isya);
                    }
                }
            }
        }
    }, []);

    const submitSimpanIqamah = async (event) => {
        event.preventDefault();
        setIsLoadingSimpanIqamah(true);

        try {
            var postData = {
                jeda_waktu_iqamah_subuh: jedaWaktuIqamahSubuh,
                jeda_waktu_iqamah_dzuhur: jedaWaktuIqamahDzuhur,
                jeda_waktu_iqamah_ashar: jedaWaktuIqamahAshar,
                jeda_waktu_iqamah_maghrib: jedaWaktuIqamahMaghrib,
                jeda_waktu_iqamah_isya: jedaWaktuIqamahIsya,
            };
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu/simpan-iqamah`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                data: postData
            }).then(async (res) => {
                props.setCallbackTab(res.data.tab);
                if(res.data.success) {
                    showSucessIqamah(res.data.message);
                    props.loadData();
                } else {
                    showErrorIqamah(res.data.message);
                }
                setIsLoadingSimpanIqamah(false);
            });
        } catch (err) {
            console.log("err", err);
            setIsLoadingSimpanIqamah(false);
            if(err.response.data != null) {
                showErrorIqamah(err.response.data.message);
            } else {
                showErrorIqamah(JSON.stringify(err.response));
            }
        }
    };

    function showSucessIqamah(message) {
        notifyIqamah("success", message);
    }
    function showErrorIqamah(message) {
        notifyIqamah("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanIqamah}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Jeda Waktu Iqamah
                    </Text>
                    <Text pb={4} color={'red'} fontSize={{ sm: 'xs', lg: 'sm' }} fontStyle={'italic'}>
                        Durasi dalam menit (Maks 60 menit)
                    </Text>
                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                        <GridItem colSpan={1} pb={2}>
                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                <GridItem colSpan={2}>
                                    <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                            Subuh
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                        <InputGroup
                                            w={{ sm: '75%', lg: '50%' }}
                                            size={{ sm: 'sm', lg: 'md' }}
                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                            verticalAlign={'middle'}
                                            textAlign={'center'}
                                        >
                                            <InputLeftAddon
                                                cursor={'pointer'}
                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahSubuh > 1) {
                                                        setJedaWaktuIqamahSubuh(jedaWaktuIqamahSubuh  - 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        -
                                                    </Text>
                                                </Center>
                                            }/>
                                            <Input
                                                onChange={(event) => {
                                                    if(event.target.value < 1) {
                                                        setJedaWaktuIqamahSubuh(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setJedaWaktuIqamahSubuh(maxMenit);
                                                    } else {
                                                        setJedaWaktuIqamahSubuh(event.target.value);
                                                    }
                                                }}
                                                value={jedaWaktuIqamahSubuh}
                                                w={'100%'}
                                                size={{ sm: 'sm' , lg: 'md'}}
                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                bgColor="white"
                                                color={textColor}
                                                verticalAlign={'middle'}
                                                textAlign={'center'}
                                                borderRadius={{ sm: 0, md: 0, lg: 0 }}
                                                type="number"
                                            />
                                            <InputRightAddon
                                                cursor={'pointer'}
                                                borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahSubuh < maxMenit) {
                                                        setJedaWaktuIqamahSubuh(jedaWaktuIqamahSubuh + 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        +
                                                    </Text>
                                                </Center>
                                            }/>
                                        </InputGroup>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </GridItem>
                        <GridItem colSpan={1} pb={2}>
                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                <GridItem colSpan={2}>
                                    <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                            Dzuhur
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                        <InputGroup
                                            w={{ sm: '75%', lg: '50%' }}
                                            size={{ sm: 'sm', lg: 'md' }}
                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                            verticalAlign={'middle'}
                                            textAlign={'center'}
                                        >
                                            <InputLeftAddon
                                                cursor={'pointer'}
                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahDzuhur > 1) {
                                                        setJedaWaktuIqamahDzuhur(jedaWaktuIqamahDzuhur  - 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        -
                                                    </Text>
                                                </Center>
                                            }/>
                                            <Input
                                                onChange={(event) => {
                                                    if(event.target.value < 1) {
                                                        setJedaWaktuIqamahDzuhur(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setJedaWaktuIqamahDzuhur(maxMenit);
                                                    } else {
                                                        setJedaWaktuIqamahDzuhur(event.target.value);
                                                    }
                                                }}
                                                value={jedaWaktuIqamahDzuhur}
                                                w={'100%'}
                                                size={{ sm: 'sm' , lg: 'md'}}
                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                bgColor="white"
                                                color={textColor}
                                                verticalAlign={'middle'}
                                                textAlign={'center'}
                                                borderRadius={{ sm: 0, md: 0, lg: 0 }}
                                                type="number"
                                            />
                                            <InputRightAddon
                                                cursor={'pointer'}
                                                borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahDzuhur < maxMenit) {
                                                        setJedaWaktuIqamahDzuhur(jedaWaktuIqamahDzuhur + 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        +
                                                    </Text>
                                                </Center>
                                            }/>
                                        </InputGroup>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </GridItem>
                        <GridItem colSpan={1} pb={2}>
                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                <GridItem colSpan={2}>
                                    <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                            Ashar
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                        <InputGroup
                                            w={{ sm: '75%', lg: '50%' }}
                                            size={{ sm: 'sm', lg: 'md' }}
                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                            verticalAlign={'middle'}
                                            textAlign={'center'}
                                        >
                                            <InputLeftAddon
                                                cursor={'pointer'}
                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahAshar > 1) {
                                                        setJedaWaktuIqamahAshar(jedaWaktuIqamahAshar  - 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        -
                                                    </Text>
                                                </Center>
                                            }/>
                                            <Input
                                                onChange={(event) => {
                                                    if(event.target.value < 1) {
                                                        setJedaWaktuIqamahAshar(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setJedaWaktuIqamahAshar(maxMenit);
                                                    } else {
                                                        setJedaWaktuIqamahAshar(event.target.value);
                                                    }
                                                }}
                                                value={jedaWaktuIqamahAshar}
                                                w={'100%'}
                                                size={{ sm: 'sm' , lg: 'md'}}
                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                bgColor="white"
                                                color={textColor}
                                                verticalAlign={'middle'}
                                                textAlign={'center'}
                                                borderRadius={{ sm: 0, md: 0, lg: 0 }}
                                                type="number"
                                            />
                                            <InputRightAddon
                                                cursor={'pointer'}
                                                borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahAshar < maxMenit) {
                                                        setJedaWaktuIqamahAshar(jedaWaktuIqamahAshar + 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        +
                                                    </Text>
                                                </Center>
                                            }/>
                                        </InputGroup>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </GridItem>
                        <GridItem colSpan={1} pb={2}>
                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                <GridItem colSpan={2}>
                                    <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                            Maghrib
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                        <InputGroup
                                            w={{ sm: '75%', lg: '50%' }}
                                            size={{ sm: 'sm', lg: 'md' }}
                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                            verticalAlign={'middle'}
                                            textAlign={'center'}
                                        >
                                            <InputLeftAddon
                                                cursor={'pointer'}
                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahMaghrib > 1) {
                                                        setJedaWaktuIqamahMaghrib(jedaWaktuIqamahMaghrib  - 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        -
                                                    </Text>
                                                </Center>
                                            }/>
                                            <Input
                                                onChange={(event) => {
                                                    if(event.target.value < 1) {
                                                        setJedaWaktuIqamahMaghrib(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setJedaWaktuIqamahMaghrib(maxMenit);
                                                    } else {
                                                        setJedaWaktuIqamahMaghrib(event.target.value);
                                                    }
                                                }}
                                                value={jedaWaktuIqamahMaghrib}
                                                w={'100%'}
                                                size={{ sm: 'sm' , lg: 'md'}}
                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                bgColor="white"
                                                color={textColor}
                                                verticalAlign={'middle'}
                                                textAlign={'center'}
                                                borderRadius={{ sm: 0, md: 0, lg: 0 }}
                                                type="number"
                                            />
                                            <InputRightAddon
                                                cursor={'pointer'}
                                                borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahMaghrib < maxMenit) {
                                                        setJedaWaktuIqamahMaghrib(jedaWaktuIqamahMaghrib + 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        +
                                                    </Text>
                                                </Center>
                                            }/>
                                        </InputGroup>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                <GridItem colSpan={2}>
                                    <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                            Isya
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                        <InputGroup
                                            w={{ sm: '75%', lg: '50%' }}
                                            size={{ sm: 'sm', lg: 'md' }}
                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                            verticalAlign={'middle'}
                                            textAlign={'center'}
                                        >
                                            <InputLeftAddon
                                                cursor={'pointer'}
                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahIsya > 1) {
                                                        setJedaWaktuIqamahIsya(jedaWaktuIqamahIsya  - 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        -
                                                    </Text>
                                                </Center>
                                            }/>
                                            <Input
                                                onChange={(event) => {
                                                    if(event.target.value < 1) {
                                                        setJedaWaktuIqamahIsya(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setJedaWaktuIqamahIsya(maxMenit);
                                                    } else {
                                                        setJedaWaktuIqamahIsya(event.target.value);
                                                    }
                                                }}
                                                value={jedaWaktuIqamahIsya}
                                                w={'100%'}
                                                size={{ sm: 'sm' , lg: 'md'}}
                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                bgColor="white"
                                                color={textColor}
                                                verticalAlign={'middle'}
                                                textAlign={'center'}
                                                borderRadius={{ sm: 0, md: 0, lg: 0 }}
                                                type="number"
                                            />
                                            <InputRightAddon
                                                cursor={'pointer'}
                                                borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    if(jedaWaktuIqamahIsya < maxMenit) {
                                                        setJedaWaktuIqamahIsya(jedaWaktuIqamahIsya + 1);
                                                    }
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        +
                                                    </Text>
                                                </Center>
                                            }/>
                                        </InputGroup>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </GridItem>
                    </Grid>
                    <Box pb={4} pt={4}>
                        <Separator></Separator>
                    </Box>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)'}}>
                        <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                            <Flex flexDirection="column" w={'100%'}>
                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Tampil ketika waktu mundur Iqamah
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Alert>
                                <Flex
                                    flexDirection={'row'}
                                    w={'100%'}
                                    borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                    justify="center" align="center"
                                >
                                    <AspectRatio w={'100%'} ratio={16/6.25}>
                                        <Flex flexDirection={'row'} w={'100%'} h={'100%'} borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                            <Box
                                                w={'60%'} h={'100%'}
                                                justify="center" align="center"
                                                borderBottomLeftRadius={{ sm: '5px', lg: '5px' }}
                                                backgroundImage="url('/bgadzan3.png')"
                                                bgPosition="center"
                                                backgroundSize={'cover'}
                                                bgRepeat="no-repeat"
                                            >
                                                <Flex flexDirection={'row'} w={'100%'} h={'70%'} justify="center" align="center">
                                                    <Box w={'21.5%'} h={'80%'} borderRadius={{ sm: '5px', lg: '5px' }} bgColor={'#999e9e9e'}>
                                                        <Center h={'100%'}>
                                                            <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                                0
                                                            </Text>
                                                        </Center>
                                                    </Box>
                                                    <Box w={'2%'} h={'80%'}></Box>
                                                    <Box w={'21.5%'} h={'80%'} borderRadius={{ sm: '5px', lg: '5px' }} bgColor={'#999e9e9e'}>
                                                        <Center h={'100%'}>
                                                            <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                                0
                                                            </Text>
                                                        </Center>
                                                    </Box>
                                                    <Box w={'4%'} h={'80%'}>
                                                        <Center h={'100%'}>
                                                            <Text textAlign={"center"} fontSize={{ sm: '1xl', lg: '5xl' }} color={"#FFE606"}>
                                                                :
                                                            </Text>
                                                        </Center>
                                                    </Box>
                                                    <Box w={'21.5%'} h={'80%'} borderRadius={{ sm: '5px', lg: '5px' }} bgColor={'#999e9e9e'}>
                                                        <Center h={'100%'}>
                                                            <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                                0
                                                            </Text>
                                                        </Center>
                                                    </Box>
                                                    <Box w={'2%'} h={'80%'}></Box>
                                                    <Box w={'21.5%'} h={'80%'} borderRadius={{ sm: '5px', lg: '5px' }} bgColor={'#999e9e9e'}>
                                                        <Center h={'100%'}>
                                                            <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                                0
                                                            </Text>
                                                        </Center>
                                                    </Box>
                                                </Flex>
                                                <Flex flexDirection={'row'} w={'100%'} h={'30%'} justify="center" align="center">
                                                    <Center>
                                                        <Text textAlign={"center"} fontSize={{ sm: 'lg', lg: '3xl' }} color={"#FFF9C2"}>
                                                            Menuju Iqamah
                                                        </Text>
                                                    </Center>
                                                </Flex>
                                            </Box>
                                            <Flex
                                                flexDirection={'row'}
                                                w={'40%'} h={'100%'}
                                                justify="center" align="center"
                                                borderBottomRightRadius={{ sm: '5px', lg: '5px' }}
                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                            >
                                                {
                                                    iklanIqamah != null ?
                                                    <Image
                                                        objectFit='fill'
                                                        w={'100%'}
                                                        h={'100%'}
                                                        src={ iklanIqamah }
                                                    />
                                                    :
                                                    <></>
                                                }
                                            </Flex>
                                        </Flex>
                                    </AspectRatio>
                                </Flex>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Flex>
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" pt={10} w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanIqamah}
                            type="submit"
                            size={{ sm: 'sm', lg: 'sm' }}
                            fontSize={{ sm: 'xs', lg: 'sm' }}
                            bg="#6a5aa3"
                            color="white"
                            _hover={{ bg: "#B3A5DA", color: textColor }}
                        >
                            Simpan
                        </Button>
                        : <></>
                    }
                </Flex>
            </Center>
        </chakra.form>
    );
}