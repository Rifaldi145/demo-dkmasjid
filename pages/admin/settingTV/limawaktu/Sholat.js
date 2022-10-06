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
    FormLabel,
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
    Stack,
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

export default function Sholat(props) {
    const [isSm, isMd, isLg] = useMediaQuery([
        '(max-width: 320px)',
        '(min-width: 320px)',
        '(min-width: 768px)',
    ])

    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxMenit = 60;

    const notifyWaktuSholat = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissWaktuSholat = useCallback(() => {
        toast.dismiss();
    }, []);

    const [openErrorWarnaBackgroundWaktuSholat, setOpenErrorWarnaBackgroundWaktuSholat] = useState(false);
    const [openErrorKontenWaktuSholat, setOpenErrorKontenWaktuSholat] = useState(false);
    const [openErrorGambarWaktuSholat, setOpenErrorGambarWaktuSholat] = useState(false);

    const editorRefWaktuSholat = useRef();
    const { CKEditorWaktuSholat, ClassicEditorWaktuSholat } = editorRefWaktuSholat.current || {};
    const [editorLoadedWaktuSholat, setEditorLoadedWaktuSholat] = useState(false);

    // waktu sholat
    const [padamkanKontenSubuh, setPadamkanKontenSubuh] = useState(15);
    const [padamkanKontenDzuhur, setPadamkanKontenDzuhur] = useState(15);
    const [padamkanKontenAshar, setPadamkanKontenAshar] = useState(15);
    const [padamkanKontenMaghrib, setPadamkanKontenMaghrib] = useState(15);
    const [padamkanKontenIsya, setPadamkanKontenIsya] = useState(15);
    
    const [kontenTypeWaktuSholat, setKontenTypeWaktuSholat] = useState(0);
    const [kontenDisplayWarnaBgWaktuSholat, setKontenDisplayWarnaBgWaktuSholat] = useState(false);
    const [kontenWarnaBgWaktuSholat, setKontenWarnaBgWaktuSholat] = useState(null);
    const [kontenWaktuSholat, setKontenWaktuSholat] = useState(null);
    const [kontenGambarWaktuSholat, setKontenGambarWaktuSholat] = useState(null);
    const [kontenFileGambarWaktuSholat, setKontenFileGambarWaktuSholat] = useState(null);
    const kontenGambarWaktuSholatRef = useRef(null);
    // waktu sholat

    const [isLoadingSimpanWaktuSholat, setIsLoadingSimpanWaktuSholat] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRefWaktuSholat.current = {
            CKEditorWaktuSholat: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditorWaktuSholat: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.adzans != null) {
                    if(props.dataSetting.mosques.displays.adzans.blank_screen_subuh != null) {
                        setPadamkanKontenSubuh(props.dataSetting.mosques.displays.adzans.blank_screen_subuh);
                    }
                    if(props.dataSetting.mosques.displays.adzans.blank_screen_dzuhur != null) {
                        setPadamkanKontenDzuhur(props.dataSetting.mosques.displays.adzans.blank_screen_dzuhur);
                    }
                    if(props.dataSetting.mosques.displays.adzans.blank_screen_ashar != null) {
                        setPadamkanKontenAshar(props.dataSetting.mosques.displays.adzans.blank_screen_ashar);
                    }
                    if(props.dataSetting.mosques.displays.adzans.blank_screen_maghrib != null) {
                        setPadamkanKontenMaghrib(props.dataSetting.mosques.displays.adzans.blank_screen_maghrib);
                    }
                    if(props.dataSetting.mosques.displays.adzans.blank_screen_isya != null) {
                        setPadamkanKontenIsya(props.dataSetting.mosques.displays.adzans.blank_screen_isya);
                    }
                }
                if(props.dataSetting.mosques.displays.konten_wkt_sholats != null) {
                    if(props.dataSetting.mosques.displays.konten_wkt_sholats.type != null) {
                        setKontenTypeWaktuSholat(props.dataSetting.mosques.displays.konten_wkt_sholats.type);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_sholats.background != null) {
                        setKontenWarnaBgWaktuSholat(props.dataSetting.mosques.displays.konten_wkt_sholats.background);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_sholats.text != null) {
                        setKontenWaktuSholat(props.dataSetting.mosques.displays.konten_wkt_sholats.text);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_sholats.gambar != null) {
                        setKontenGambarWaktuSholat(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + props.dataSetting.mosques.displays.konten_wkt_sholats.gambar.replace("public", "storage"));
                    }
                }
            }
            setEditorLoadedWaktuSholat(true);
        }
    }, []);

    const handleClickKontenGambarWaktuSholat = () => kontenGambarWaktuSholatRef.current?.click();

    const kontenGambarWaktuSholatHandler = (event) => {
        let fileObj = event.target.files[0];
        setKontenFileGambarWaktuSholat(fileObj);
        const objectUrl = URL.createObjectURL(fileObj)
        setKontenGambarWaktuSholat(objectUrl)
    }

    async function clickKontenDisplayWarnaBgWaktuSholat() {
        setOpenErrorWarnaBackgroundWaktuSholat(false);
        if(kontenDisplayWarnaBgWaktuSholat) {
            setKontenDisplayWarnaBgWaktuSholat(false);
        } else {
            setKontenDisplayWarnaBgWaktuSholat(true);
        }
    };
    // waktu sholat

    const submitSimpanWaktuSholat = async (event) => {
        event.preventDefault();
        setOpenErrorWarnaBackgroundWaktuSholat(false);
        setOpenErrorKontenWaktuSholat(false);
        setOpenErrorGambarWaktuSholat(false);

        var lanjut = true;
        if(kontenTypeWaktuSholat == 1) {
            if(kontenWaktuSholat == null || kontenWaktuSholat == "") {
                setOpenErrorKontenWaktuSholat(true);
                lanjut = false;
            }
            // if(kontenWarnaBgWaktuSholat == null) {
            //     setOpenErrorWarnaBackgroundWaktuSholat(true);
            //     lanjut = false;
            // }
        } else if(kontenTypeWaktuSholat == 2) {
            if(kontenGambarWaktuSholat == null) {
                setOpenErrorGambarWaktuSholat(true);
                lanjut = false;
            }
        }
        if(lanjut) {
            setIsLoadingSimpanWaktuSholat(true);
            try {
                var screenSize = 'sm';
                if(isSm) {
                    screenSize = 'sm';
                } else if(isMd && !isLg) {
                    screenSize = 'md';
                } else if(isLg) {
                    screenSize = 'lg';
                }

                var formData = new FormData();
                formData.append('blank_screen_subuh', padamkanKontenSubuh);
                formData.append('blank_screen_dzuhur', padamkanKontenDzuhur);
                formData.append('blank_screen_ashar', padamkanKontenAshar);
                formData.append('blank_screen_maghrib', padamkanKontenMaghrib);
                formData.append('blank_screen_isya', padamkanKontenIsya);
                formData.append("type", kontenTypeWaktuSholat);
                if(kontenWarnaBgWaktuSholat != null && kontenWarnaBgWaktuSholat != 'null' && kontenWarnaBgWaktuSholat != '') {
                    formData.append("background", kontenWarnaBgWaktuSholat);
                }
                formData.append("text", kontenWaktuSholat);
                formData.append("gambar", kontenFileGambarWaktuSholat);
                formData.append("screen_size", screenSize);

                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu/simpan-waktu-sholat`,
                    headers: {
                        "Content-Type": `multipart/form-data`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: formData
                }).then(async (res) => {
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessWaktuSholat(res.data.message);
                        props.loadData();
                    } else {
                        showErrorWaktuSholat(res.data.message);
                    }
                    setIsLoadingSimpanWaktuSholat(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanWaktuSholat(false);
                if(err.response.data != null) {
                    showErrorWaktuSholat(err.response.data.message);
                } else {
                    showErrorWaktuSholat(JSON.stringify(err.response));
                }
            }
        }
    };

    function showSucessWaktuSholat(message) {
        notifyWaktuSholat("success", message);
    }
    function showErrorWaktuSholat(message) {
        notifyWaktuSholat("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanWaktuSholat}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Waktu Sholat
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
                                                    if(padamkanKontenSubuh > 1) {
                                                        setPadamkanKontenSubuh(padamkanKontenSubuh  - 1);
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
                                                        setPadamkanKontenSubuh(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPadamkanKontenSubuh(maxMenit);
                                                    } else {
                                                        setPadamkanKontenSubuh(event.target.value);
                                                    }
                                                }}
                                                value={padamkanKontenSubuh}
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
                                                    if(padamkanKontenSubuh < maxMenit) {
                                                        setPadamkanKontenSubuh(padamkanKontenSubuh + 1);
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
                                                    if(padamkanKontenDzuhur > 1) {
                                                        setPadamkanKontenDzuhur(padamkanKontenDzuhur  - 1);
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
                                                        setPadamkanKontenDzuhur(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPadamkanKontenDzuhur(maxMenit);
                                                    } else {
                                                        setPadamkanKontenDzuhur(event.target.value);
                                                    }
                                                }}
                                                value={padamkanKontenDzuhur}
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
                                                    if(padamkanKontenDzuhur < maxMenit) {
                                                        setPadamkanKontenDzuhur(padamkanKontenDzuhur + 1);
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
                                                    if(padamkanKontenAshar > 1) {
                                                        setPadamkanKontenAshar(padamkanKontenAshar  - 1);
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
                                                        setPadamkanKontenAshar(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPadamkanKontenAshar(maxMenit);
                                                    } else {
                                                        setPadamkanKontenAshar(event.target.value);
                                                    }
                                                }}
                                                value={padamkanKontenAshar}
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
                                                    if(padamkanKontenAshar < maxMenit) {
                                                        setPadamkanKontenAshar(padamkanKontenAshar + 1);
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
                                                    if(padamkanKontenMaghrib > 1) {
                                                        setPadamkanKontenMaghrib(padamkanKontenMaghrib  - 1);
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
                                                        setPadamkanKontenMaghrib(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPadamkanKontenMaghrib(maxMenit);
                                                    } else {
                                                        setPadamkanKontenMaghrib(event.target.value);
                                                    }
                                                }}
                                                value={padamkanKontenMaghrib}
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
                                                    if(padamkanKontenMaghrib < maxMenit) {
                                                        setPadamkanKontenMaghrib(padamkanKontenMaghrib + 1);
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
                                                    if(padamkanKontenIsya > 1) {
                                                        setPadamkanKontenIsya(padamkanKontenIsya  - 1);
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
                                                        setPadamkanKontenIsya(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setPadamkanKontenIsya(maxMenit);
                                                    } else {
                                                        setPadamkanKontenIsya(event.target.value);
                                                    }
                                                }}
                                                value={padamkanKontenIsya}
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
                                                    if(padamkanKontenIsya < maxMenit) {
                                                        setPadamkanKontenIsya(padamkanKontenIsya + 1);
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
                    <Grid pb={2} templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                        <GridItem colSpan={1}>
                            <Flex p={2} flexDirection="column" bg={'gray.200'} borderRadius={{ sm: '5px', lg: '5px' }}>
                                <Radio.Group
                                    onChange={(e) => {
                                        setKontenTypeWaktuSholat(e.target.value);
                                        setOpenErrorGambarWaktuSholat(false);
                                        setOpenErrorKontenWaktuSholat(false);
                                        setOpenErrorWarnaBackgroundWaktuSholat(false);
                                    }}
                                    value={kontenTypeWaktuSholat}
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
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="row" justify="start" align="center">
                                                <Radio value={2}></Radio>
                                                <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                    Gambar
                                                </Text>
                                            </Flex> 
                                        </GridItem>
                                    </Grid>
                                </Radio.Group>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Flex>
                {(() => {
                    if(kontenTypeWaktuSholat == 1) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background' isOpen={openErrorWarnaBackgroundWaktuSholat}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={kontenWarnaBgWaktuSholat == null ? 'white' : kontenWarnaBgWaktuSholat}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={() => clickKontenDisplayWarnaBgWaktuSholat()}
                                    >
                                        {kontenWarnaBgWaktuSholat == null ? 'Pilih Warna Background' : kontenWarnaBgWaktuSholat}
                                    </Button>
                                </Tooltip>
                            </Flex>
                        )
                    } else if(kontenTypeWaktuSholat == 2) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih gambar' isOpen={openErrorGambarWaktuSholat}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={'white'}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={(event)=> { 
                                            event.target.value = null;
                                            setOpenErrorGambarWaktuSholat(false);
                                            handleClickKontenGambarWaktuSholat();
                                        }}
                                    >
                                        Pilih Gambar
                                        <input 
                                            type='file'
                                            accept="image/*"
                                            multiple={false}
                                            style={{ display: 'none' }}
                                            ref={kontenGambarWaktuSholatRef}
                                            onChange={kontenGambarWaktuSholatHandler.bind(this)}
                                        />
                                    </Button>
                                </Tooltip>
                            </Flex>
                        )
                    } else {
                        return <></>
                    }
                })()}
                <Flex flexDirection="column" w={'100%'}>
                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                        {(() => {
                            if(kontenTypeWaktuSholat == 1) {
                                return(
                                    <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                                        <Flex flexDirection="column" w={'100%'}>
                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKontenWaktuSholat}>
                                                <Flex
                                                    flexDirection={'column'}
                                                    w={'100%'}
                                                    justify="center" align="center"
                                                >
                                                    <AspectRatio w={'100%'} ratio={{ sm: 16/11.5, lg: 16/10.25 }}>
                                                        <Flex flexDirection={'row'} w={'100%'} h={'100%'} justify="center" align="center"
                                                            style={{ border: '1px solid #c6c5c5', borderRadius: '5px' }}
                                                            bg={'blackAlpha.300'}
                                                        >
                                                            {(() => {
                                                                if((editorLoadedWaktuSholat)) {
                                                                    return (
                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                            <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                                fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                                lineHeight={1}
                                                                            >
                                                                                <CKEditorWaktuSholat
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
                                                                                    onReady={ editorRefWaktuSholat => {
                                                                                        const toolbarElement = editorRefWaktuSholat.ui.view.toolbar.element;
                                                                                        toolbarElement.style.borderTop = 'none';
                                                                                        toolbarElement.style.borderLeft = 'none';
                                                                                        toolbarElement.style.borderRight = 'none';
                                                                                        toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                        editorRefWaktuSholat.editing.view.change( writer => {
                                                                                            // writer.setStyle( 'height', '100vh', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'background-color', 'transparent', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'margin-top', '0px', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'padding-top', '0px', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'min-height', '100%', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border', 'none', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border-bottom-radius', '5px', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'box-shadow', 'none', editorRefWaktuSholat.editing.view.document.getRoot());
                                                                                        } );
                                                                                        editorRefWaktuSholat = editorRefWaktuSholat;
                                                                                    }}
                                                                                    onError = {
                                                                                        (error, { willEditorRestart } ) => {
                                                                                            if(willEditorRestart ) {
                                                                                                editorRefWaktuSholat.ui.view.toolbar.element.remove();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    onChange={(event, editor) => {
                                                                                        const data = editor.getData();
                                                                                        setOpenErrorKontenWaktuSholat(false);
                                                                                        setKontenWaktuSholat(data);
                                                                                    }}
                                                                                    editor={ ClassicEditorWaktuSholat }
                                                                                    data = {kontenWaktuSholat}
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
                        <GridItem colSpan={1} pt={{ sm: kontenTypeWaktuSholat == 1 ? 2 : 0, lg: 0 }} pl={{ lg: kontenTypeWaktuSholat == 1 ? 1 : 0, sm: 0 }}>
                            <Flex flexDirection="column" w={'100%'}>
                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Tampil ketika waktu Sholat dimulai
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
                                    <AspectRatio w={'100%'} ratio={{ lg: 16/9, sm: 16/9.5 }}>
                                        <Flex flexDirection={'row'} style={{width: '100%', height: '100%'}}  borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                            {(() => {
                                                if(kontenTypeWaktuSholat == 0) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image h={'100%'} src={ '/defaultbg.jpeg' }/>
                                                        </Flex>
                                                    )
                                                } else if(kontenTypeWaktuSholat == 1) {
                                                    if((kontenWaktuSholat == null || kontenWaktuSholat == "") && kontenWarnaBgWaktuSholat == null) {
                                                        return (
                                                            <Flex
                                                                w={'100%'} h={'100%'}
                                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                                style={{ border: '1px solid #c6c5c5' }}
                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                justify="center" align="center"
                                                            >
                                                                <Image h={'100%'} src={ '/template_image_waktu_sholat.png' }/>
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
                                                                    bg={kontenWarnaBgWaktuSholat}
                                                                    bgImage={ kontenWarnaBgWaktuSholat == null ? "url('/template_image_waktu_sholat.png')" : "url('')"}
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
                                                                        dangerouslySetInnerHTML={{__html: kontenWaktuSholat}}
                                                                    ></Box>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    }
                                                } else if(kontenTypeWaktuSholat == 2) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image h={'100%'} src={ kontenGambarWaktuSholat == null ? '/defaultbg.jpeg' : kontenGambarWaktuSholat }/>
                                                        </Flex>
                                                    )
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
                <Flex justify="space-between" align="center" pt={7} w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanWaktuSholat}
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
            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered isOpen={kontenDisplayWarnaBgWaktuSholat}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent bgColor={'transparent'} width={'auto'} m={0} p={0}>
                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }} m={0} p={0}>
                        <Flex justify="space-between" align="center">
                            <Box></Box>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setKontenDisplayWarnaBgWaktuSholat(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody m={0} p={0}>
                        <Center>
                            <ChromePicker
                                color={kontenWarnaBgWaktuSholat == null ? '#FFFFFF' : kontenWarnaBgWaktuSholat}
                                onChange={(color) => {
                                    setKontenWarnaBgWaktuSholat(color.hex);
                                }}
                            />
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </chakra.form>
    );
}