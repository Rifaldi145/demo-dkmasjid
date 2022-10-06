/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useRef, useCallback } from "react";
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    AspectRatio,
    Tooltip,
    useMediaQuery,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
const { fontfam } = require('../../../../theme/ListFontFamily')
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";
import { Radio } from "antd";

export default function Adzan(props) {
    const [isSm, isMd, isLg] = useMediaQuery([
        '(max-width: 320px)',
        '(min-width: 320px)',
        '(min-width: 768px)',
    ])

    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxMenit = 60;
    const notifyAdzan = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissAdzan = useCallback(() => {
        toast.dismiss();
    }, []);

    const editorRefJedaWaktuAdzan = useRef();
    const { CKEditorJedaWaktuAdzan, ClassicEditorJedaWaktuAdzan } = editorRefJedaWaktuAdzan.current || {};
    const [editorLoadedJedaWaktuAdzan, setEditorLoadedJedaWaktuAdzan] = useState(false);

    const [openErrorWarnaBackgroundAdzan, setOpenErrorWarnaBackgroundAdzan] = useState(false);
    const [openErrorKontenAdzan, setOpenErrorKontenAdzan] = useState(false);

    // penyesuaian waktu
    const [penyesuaianWaktuSubuh, setPenyesuaianWaktuSubuh] = useState(0);
    const [penyesuaianWaktuDzuhur, setPenyesuaianWaktuDzuhur] = useState(0);
    const [penyesuaianWaktuAshar, setPenyesuaianWaktuAshar] = useState(0);
    const [penyesuaianWaktuMaghrib, setPenyesuaianWaktuMaghrib] = useState(0);
    const [penyesuaianWaktuIsya, setPenyesuaianWaktuIsya] = useState(0);
    // penyesuaian waktu

    // JedaWaktuAdzan
    const [jedaWaktuAdzan, setJedaWaktuAdzan] = useState(3);
    const [kontenDisplayWarnaBgJedaWaktuAdzan, setKontenDisplayWarnaBgJedaWaktuAdzan] = useState(false);
    const [kontenWarnaBgJedaWaktuAdzan, setKontenWarnaBgJedaWaktuAdzan] = useState(null);
    const [kontenJedaWaktuAdzan, setKontenJedaWaktuAdzan] = useState(null);
    const [kontenTypeJedaWaktuAdzan, setKontenTypeJedaWaktuAdzan] = useState(0);
    // JedaWaktuAdzan

    const [isLoadingSimpanAdzan, setIsLoadingSimpanAdzan] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRefJedaWaktuAdzan.current = {
            CKEditorJedaWaktuAdzan: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditorJedaWaktuAdzan: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.jeda_waktu_adzan != null) {
                    setJedaWaktuAdzan(props.dataSetting.mosques.displays.jeda_waktu_adzan);
                }
                if(props.dataSetting.mosques.displays.adzans != null) {
                    if(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_subuh != null) {
                        setPenyesuaianWaktuSubuh(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_subuh);
                    }
                    if(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_dzuhur != null) {
                        setPenyesuaianWaktuDzuhur(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_dzuhur);
                    }
                    if(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_ashar != null) {
                        setPenyesuaianWaktuAshar(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_ashar);
                    }
                    if(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_maghrib != null) {
                        setPenyesuaianWaktuMaghrib(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_maghrib);
                    }
                    if(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_isya != null) {
                        setPenyesuaianWaktuIsya(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_isya);
                    }
                }
                if(props.dataSetting.mosques.displays.konten_jdw_adzans != null) {
                    if(props.dataSetting.mosques.displays.konten_jdw_adzans.type != null) {
                        setKontenTypeJedaWaktuAdzan(props.dataSetting.mosques.displays.konten_jdw_adzans.type);
                    }
                    if(props.dataSetting.mosques.displays.konten_jdw_adzans.background != null) {
                        setKontenWarnaBgJedaWaktuAdzan(props.dataSetting.mosques.displays.konten_jdw_adzans.background);
                    }
                    if(props.dataSetting.mosques.displays.konten_jdw_adzans.text != null) {
                        setKontenJedaWaktuAdzan(props.dataSetting.mosques.displays.konten_jdw_adzans.text);
                    }
                }
            }
            setEditorLoadedJedaWaktuAdzan(true);
        }
    }, []);

    const submitSimpanAdzan = async (event) => {
        event.preventDefault();
        setOpenErrorWarnaBackgroundAdzan(false);
        setOpenErrorKontenAdzan(false);
        var lanjut = true;
        if(kontenTypeJedaWaktuAdzan == 1) {
            if(kontenJedaWaktuAdzan == null || kontenJedaWaktuAdzan == "") {
                setOpenErrorKontenAdzan(true);
                lanjut = false;
            }
        }
        if(lanjut) {
            setIsLoadingSimpanAdzan(true);
            try {
                var screenSize = 'sm';
                if(isSm) {
                    screenSize = 'sm';
                } else if(isMd && !isLg) {
                    screenSize = 'md';
                } else if(isLg) {
                    screenSize = 'lg';
                }
                var postData = {
                    jeda_waktu_adzan: jedaWaktuAdzan,
                    penyesuaian_waktu_subuh: penyesuaianWaktuSubuh,
                    penyesuaian_waktu_dzuhur: penyesuaianWaktuDzuhur,
                    penyesuaian_waktu_ashar: penyesuaianWaktuAshar,
                    penyesuaian_waktu_maghrib: penyesuaianWaktuMaghrib,
                    penyesuaian_waktu_isya: penyesuaianWaktuIsya,
                    type: kontenTypeJedaWaktuAdzan,
                    background: (kontenWarnaBgJedaWaktuAdzan != null && kontenWarnaBgJedaWaktuAdzan != "") ? kontenWarnaBgJedaWaktuAdzan : null,
                    text: (kontenJedaWaktuAdzan != null && kontenJedaWaktuAdzan != "") ? kontenJedaWaktuAdzan : null,
                    screen_size: screenSize
                };
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu/simpan-adzan`,
                    headers: {
                        "Content-Type": `application/json`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: postData
                }).then(async (res) => {
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessAdzan(res.data.message);
                        props.loadData();
                    } else {
                        showErrorAdzan(res.data.message);
                    }
                    setIsLoadingSimpanAdzan(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanAdzan(false);
                if(err.response.data != null) {
                    showErrorAdzan(err.response.data.message);
                } else {
                    showErrorAdzan(JSON.stringify(err.response));
                }
            }
        }
    };

    function showSucessAdzan(message) {
        notifyAdzan("success", message);
    }
    function showErrorAdzan(message) {
        notifyAdzan("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanAdzan}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Penyesuaian Waktu Adzan
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
                                                    if(penyesuaianWaktuSubuh > 1) {
                                                        setPenyesuaianWaktuSubuh(penyesuaianWaktuSubuh  - 1);
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
                                                        setPenyesuaianWaktuSubuh(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPenyesuaianWaktuSubuh(maxMenit);
                                                    } else {
                                                        setPenyesuaianWaktuSubuh(event.target.value);
                                                    }
                                                }}
                                                value={penyesuaianWaktuSubuh}
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
                                                    if(penyesuaianWaktuSubuh < maxMenit) {
                                                        setPenyesuaianWaktuSubuh(penyesuaianWaktuSubuh + 1);
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
                                                    if(penyesuaianWaktuDzuhur > 1) {
                                                        setPenyesuaianWaktuDzuhur(penyesuaianWaktuDzuhur  - 1);
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
                                                        setPenyesuaianWaktuDzuhur(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPenyesuaianWaktuDzuhur(maxMenit);
                                                    } else {
                                                        setPenyesuaianWaktuDzuhur(event.target.value);
                                                    }
                                                }}
                                                value={penyesuaianWaktuDzuhur}
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
                                                    if(penyesuaianWaktuDzuhur < maxMenit) {
                                                        setPenyesuaianWaktuDzuhur(penyesuaianWaktuDzuhur + 1);
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
                                                    if(penyesuaianWaktuAshar > 1) {
                                                        setPenyesuaianWaktuAshar(penyesuaianWaktuAshar  - 1);
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
                                                        setPenyesuaianWaktuAshar(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPenyesuaianWaktuAshar(maxMenit);
                                                    } else {
                                                        setPenyesuaianWaktuAshar(event.target.value);
                                                    }
                                                }}
                                                value={penyesuaianWaktuAshar}
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
                                                    if(penyesuaianWaktuAshar < maxMenit) {
                                                        setPenyesuaianWaktuAshar(penyesuaianWaktuAshar + 1);
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
                                                    if(penyesuaianWaktuMaghrib > 1) {
                                                        setPenyesuaianWaktuMaghrib(penyesuaianWaktuMaghrib  - 1);
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
                                                        setPenyesuaianWaktuMaghrib(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPenyesuaianWaktuMaghrib(maxMenit);
                                                    } else {
                                                        setPenyesuaianWaktuMaghrib(event.target.value);
                                                    }
                                                }}
                                                value={penyesuaianWaktuMaghrib}
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
                                                    if(penyesuaianWaktuMaghrib < maxMenit) {
                                                        setPenyesuaianWaktuMaghrib(penyesuaianWaktuMaghrib + 1);
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
                                                    if(penyesuaianWaktuIsya > 1) {
                                                        setPenyesuaianWaktuIsya(penyesuaianWaktuIsya  - 1);
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
                                                        setPenyesuaianWaktuIsya(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPenyesuaianWaktuIsya(maxMenit);
                                                    } else {
                                                        setPenyesuaianWaktuIsya(event.target.value);
                                                    }
                                                }}
                                                value={penyesuaianWaktuIsya}
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
                                                    if(penyesuaianWaktuIsya < maxMenit) {
                                                        setPenyesuaianWaktuIsya(penyesuaianWaktuIsya + 1);
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
                    <Flex flexDirection="column" w={'100%'} h={'100%'}>
                        <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                            Jeda Waktu Adzan
                        </Text>
                        <Text pb={4} color={'red'} fontSize={{ sm: 'xs', lg: 'sm' }} fontStyle={'italic'}>
                            Durasi dalam menit (Maks 60 menit)
                        </Text>
                        <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                            <GridItem colSpan={1}>
                                <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                    <GridItem colSpan={3}>
                                        <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'start', lg: 'start' }} align="end">
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
                                                        if(jedaWaktuAdzan > 1) {
                                                            setJedaWaktuAdzan(jedaWaktuAdzan  - 1);
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
                                                            setJedaWaktuAdzan(1);
                                                        } else if(event.target.value > maxMenit) {
                                                            setJedaWaktuAdzan(maxMenit);
                                                        } else {
                                                            setJedaWaktuAdzan(event.target.value);
                                                        }
                                                    }}
                                                    value={jedaWaktuAdzan}
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
                                                        if(jedaWaktuAdzan < maxMenit) {
                                                            setJedaWaktuAdzan(jedaWaktuAdzan + 1);
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
                                    <GridItem colSpan={2}></GridItem>
                                </Grid>
                            </GridItem>
                        </Grid>
                    </Flex>
                    <Box pb={4} pt={4}>
                        <Separator></Separator>
                    </Box>
                    <Grid pb={2} templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                        <GridItem colSpan={1}>
                            <Flex p={2} flexDirection="column" bg={'gray.200'} borderRadius={{ sm: '5px', lg: '5px' }}>
                                <Radio.Group
                                    onChange={(e) => {
                                        setKontenTypeJedaWaktuAdzan(e.target.value);
                                        setOpenErrorWarnaBackgroundAdzan(false);
                                        setOpenErrorKontenAdzan(false);
                                    }}
                                    value={kontenTypeJedaWaktuAdzan}
                                    style={{ width: "100%" }}
                                >
                                    <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}}>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="row" justify="start" align="center">
                                                <Radio value={0}></Radio>
                                                <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                    Default
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="row" justify="start" align="center">
                                                <Radio value={1}></Radio>
                                                <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                    Teks
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                </Radio.Group>
                            </Flex>
                        </GridItem>
                    </Grid>
                    {(() => {
                        if(kontenTypeJedaWaktuAdzan == 1) {
                            return (
                                <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                    <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background' isOpen={openErrorWarnaBackgroundAdzan}>
                                        <Button
                                            size={{ sm: 'sm', lg: 'sm' }}
                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                            color={textColor}
                                            bg={kontenWarnaBgJedaWaktuAdzan == null ? 'white' : kontenWarnaBgJedaWaktuAdzan}
                                            style={{ border: '1px solid #c6c5c5' }}
                                            _hover={{ bg: "#B3A5DA", color: textColor }}
                                            onClick={() => {
                                                setOpenErrorWarnaBackgroundAdzan(false);
                                                if(kontenDisplayWarnaBgJedaWaktuAdzan) {
                                                    setKontenDisplayWarnaBgJedaWaktuAdzan(false);
                                                } else {
                                                    setKontenDisplayWarnaBgJedaWaktuAdzan(true);
                                                }
                                            }}
                                        >
                                            {kontenWarnaBgJedaWaktuAdzan == null ? 'Pilih Warna Background' : kontenWarnaBgJedaWaktuAdzan}
                                        </Button>
                                    </Tooltip>
                                </Flex>
                            )
                        } else {
                            return <></>
                        }
                    })()}
                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                        {(() => {
                            if(kontenTypeJedaWaktuAdzan == 1) {
                                return(
                                    <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                                        <Flex flexDirection="column" w={'100%'}>
                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKontenAdzan}>
                                                <Flex
                                                    flexDirection={'column'}
                                                    w={'100%'}
                                                    justify="center" align="center"
                                                >
                                                    <AspectRatio w={'100%'} ratio={{ sm: 16/9.2, lg: 16/8.025 }}>
                                                        <Flex flexDirection={'row'} w={'100%'} h={'100%'} justify="center" align="center"
                                                            style={{ border: '1px solid #c6c5c5', borderRadius: '5px' }}
                                                            bg={'blackAlpha.300'}
                                                        >
                                                            {(() => {
                                                                if((editorLoadedJedaWaktuAdzan)) {
                                                                    return (
                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                            <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                                fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                                lineHeight={1}
                                                                            >
                                                                                <CKEditorJedaWaktuAdzan
                                                                                    config={{
                                                                                        heading: {
                                                                                            options: [
                                                                                                { model: 'paragraph', title: 'Paragraph' },
                                                                                                { model: 'heading1', view: 'h1', title: 'Heading 1' },
                                                                                                { model: 'heading2', view: 'h2', title: 'Heading 2' },
                                                                                                { model: 'heading3', view: 'h3', title: 'Heading 3' },
                                                                                                { model: 'heading4', view: 'h4', title: 'Heading 4' }
                                                                                            ]
                                                                                        },
                                                                                        toolbar: {
                                                                                            items: [
                                                                                                'heading', '|',
                                                                                                'fontfamily',
                                                                                                'alignment', '|',
                                                                                                'fontColor', 'fontBackgroundColor', '|',
                                                                                                'bold', 'italic', 'underline', '|',
                                                                                                'link', '|',
                                                                                                'outdent', 'indent', '|',
                                                                                                'bulletedList', 'numberedList', '|',
                                                                                                'undo', 'redo'
                                                                                            ],
                                                                                            viewportTopOffset: 1,
                                                                                        },
                                                                                    }}
                                                                                    onReady={ editorRefJedaWaktuAdzan => {
                                                                                        const toolbarElement = editorRefJedaWaktuAdzan.ui.view.toolbar.element;
                                                                                        toolbarElement.style.borderTop = 'none';
                                                                                        toolbarElement.style.borderLeft = 'none';
                                                                                        toolbarElement.style.borderRight = 'none';
                                                                                        toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                        editorRefJedaWaktuAdzan.editing.view.change( writer => {
                                                                                            // writer.setStyle( 'height', '100vh', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'background-color', 'transparent', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'margin-top', '0px', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'padding-top', '0px', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'min-height', '100%', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border', 'none', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border-bottom-radius', '5px', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'box-shadow', 'none', editorRefJedaWaktuAdzan.editing.view.document.getRoot());
                                                                                        } );
                                                                                        editorRefJedaWaktuAdzan = editorRefJedaWaktuAdzan;
                                                                                    }}
                                                                                    onError = {
                                                                                        (error, { willEditorRestart } ) => {
                                                                                            if(willEditorRestart ) {
                                                                                                editorRefJedaWaktuAdzan.ui.view.toolbar.element.remove();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    onChange={(event, editor) => {
                                                                                        const data = editor.getData();
                                                                                        setOpenErrorKontenAdzan(false);
                                                                                        setKontenJedaWaktuAdzan(data);
                                                                                    }}
                                                                                    editor={ ClassicEditorJedaWaktuAdzan }
                                                                                    data = {kontenJedaWaktuAdzan}
                                                                                />
                                                                            </Flex>
                                                                        </Flex>
                                                                    )
                                                                } else {
                                                                    return(
                                                                        <></>
                                                                    )
                                                                }
                                                            })()}
                                                        </Flex>
                                                    </AspectRatio>
                                                </Flex>
                                            </Tooltip>
                                        </Flex>
                                    </GridItem>
                                )
                            } else {
                                return <></>
                            }
                        })()}
                        <GridItem colSpan={1} pt={{ sm: kontenTypeJedaWaktuAdzan == 1 ? 2 : 0, lg: 0 }} pl={{ lg: kontenTypeJedaWaktuAdzan == 1 ? 1 : 0, sm: 0 }}>
                            <Flex flexDirection="column" w={'100%'}>
                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Tampil selama {jedaWaktuAdzan} menit ketika waktu Adzan dimulai
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
                                    <AspectRatio w={'100%'} ratio={16/9.75}>
                                        <Flex flexDirection={'row'} style={{width: '100%', height: '70%'}}  borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                            {(() => {
                                                if(kontenTypeJedaWaktuAdzan == 0) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image w={'100%'} h={'100%'} src={ '/default_image_waktu_adzan.png' }/>
                                                        </Flex>
                                                    )
                                                } else if(kontenTypeJedaWaktuAdzan == 1) {
                                                    if((kontenJedaWaktuAdzan == null || kontenJedaWaktuAdzan == "") && kontenWarnaBgJedaWaktuAdzan == null) {
                                                        return (
                                                            <Flex
                                                                w={'100%'} h={'100%'}
                                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                                style={{ border: '1px solid #c6c5c5' }}
                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                justify="center" align="center"
                                                            >
                                                                <Image w={'100%'} h={'100%'} src={ '/template_image_waktu_adzan.png' }/>
                                                            </Flex>
                                                        )
                                                    } else {
                                                        return(
                                                            <Box
                                                                w={'100%'} h={'100%'}
                                                                flexDirection="column"
                                                                style={{ border: '1px solid #c6c5c5' }}
                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            >
                                                                <Box
                                                                    w={'100%'} h={'100%'}
                                                                    bg={kontenWarnaBgJedaWaktuAdzan}
                                                                    bgImage={ kontenWarnaBgJedaWaktuAdzan == null ? "url('/template_image_waktu_adzan.png')" : "url('')"}
                                                                    bgSize={'100% 100%'}
                                                                    bgRepeat={'no-repeat'}
                                                                    bgPosition={'center'}
                                                                >
                                                                    <Box
                                                                        pl={{ lg: 2, sm: 1.5 }}
                                                                        pr={{ lg: 2, sm: 1.5 }}
                                                                        pt={{ lg: 4, sm: 2 }}
                                                                        fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                        lineHeight={1}
                                                                        w={'100%'}
                                                                        dangerouslySetInnerHTML={{__html: kontenJedaWaktuAdzan}}
                                                                    ></Box>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    }
                                                } else {
                                                    return <></>
                                                }
                                            })()}
                                        </Flex>
                                    </AspectRatio>
                                </Flex>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Flex>
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanAdzan}
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
            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered isOpen={kontenDisplayWarnaBgJedaWaktuAdzan}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent bgColor={'transparent'} width={'auto'} m={0} p={0}>
                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }} m={0} p={0}>
                        <Flex justify="space-between" align="center">
                            <Box></Box>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setKontenDisplayWarnaBgJedaWaktuAdzan(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody m={0} p={0}>
                        <Center>
                            <ChromePicker
                                color={kontenWarnaBgJedaWaktuAdzan == null ? '#FFFFFF' : kontenWarnaBgJedaWaktuAdzan}
                                onChange={(color) => {
                                    setKontenWarnaBgJedaWaktuAdzan(color.hex);
                                }}
                            />
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </chakra.form>
    );
}