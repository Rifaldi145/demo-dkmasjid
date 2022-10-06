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
    Tooltip,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    AspectRatio,
    IconButton,
    useMediaQuery,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
const { fontfam } = require('../../../../theme/ListFontFamily')
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";
import {
    FaTrashAlt,
} from "react-icons/fa";
import Iframe from 'react-iframe'
import { Radio } from "antd";

export default function MenujuAdzan(props) {
    const [isSm, isMd, isLg] = useMediaQuery([
        '(max-width: 320px)',
        '(min-width: 320px)',
        '(min-width: 768px)',
    ])

    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxMenit = 60;

    const notifyWaktuMenujuAdzan = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissWaktuMenujuAdzan = useCallback(() => {
        toast.dismiss();
    }, []);

    const [arrKonten, setArrKonten] = useState([]);
    const [kontenId, setKontenId] = useState([]);
    const [kontenTypeWaktuMenujuAdzan, setKontenTypeWaktuMenujuAdzan] = useState([]);
    const [kontenWaktuMenujuAdzan, setKontenWaktuMenujuAdzan] = useState([]);
    const [kontenDisplayWarnaBgWaktuMenujuAdzan, setKontenDisplayWarnaBgWaktuMenujuAdzan] = useState([]);
    const [kontenWarnaBgWaktuMenujuAdzan, setKontenWarnaBgWaktuMenujuAdzan] = useState([]);
    const [kontenFileGambarWaktuMenujuAdzan, setKontenFileGambarWaktuMenujuAdzan] = useState([]);
    const [kontenGambarWaktuMenujuAdzan, setKontenGambarWaktuMenujuAdzan] = useState([]);
    const [kontenUrlWaktuMenujuAdzan, setKontenUrlWaktuMenujuAdzan] = useState([]);
    const [openErrorKontenWaktuMenujuAdzan, setOpenErrorKontenWaktuMenujuAdzan] = useState([]);
    const [openErrorWarnaBackgroundWaktuMenujuAdzan, setOpenErrorWarnaBackgroundWaktuMenujuAdzan] = useState([]);
    const [openErrorGambarWaktuMenujuAdzan, setOpenErrorGambarWaktuMenujuAdzan] = useState([]);
    const [openErrorUrlWaktuMenujuAdzan, setOpenErrorUrlWaktuMenujuAdzan] = useState([]);

    const kontenGambarWaktuMenujuAdzanRef = useRef(null);

    const editorRefWaktuMenujuAdzan = useRef();
    const { CKEditorWaktuMenujuAdzan, ClassicEditorWaktuMenujuAdzan } = editorRefWaktuMenujuAdzan.current || {};
    const [editorLoadedWaktuMenujuAdzan, setEditorLoadedWaktuMenujuAdzan] = useState(false);

    // khotbah
    const [waktuMenujuAdzan, setWaktuMenujuAdzan] = useState(10);
    // khotbah

    const [isLoadingSimpanWaktuMenujuAdzan, setIsLoadingSimpanWaktuMenujuAdzan] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRefWaktuMenujuAdzan.current = {
            CKEditorWaktuMenujuAdzan: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditorWaktuMenujuAdzan: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        setEditorLoadedWaktuMenujuAdzan(true);
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays != null) {
                    if(props.dataSetting.mosques.displays.waktu_menuju_adzan != null) {
                        setWaktuMenujuAdzan(props.dataSetting.mosques.displays.waktu_menuju_adzan);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_menuju_adzans.length > 0) {
                        addDataFromServer(props.dataSetting.mosques.displays.konten_wkt_menuju_adzans);
                    }
                }
            }
        }
    }, []);

    function addDataFromServer(konten_wkt_menuju_adzans) {
        var arrKontenFromServer = [];
        var arrKontenIdFromServer = [];
        var arrKontenTypeWaktuMenujuAdzanFromServer = [];
        var arrKontenWaktuMenujuAdzanFromServer = [];
        var arrKontenDisplayWarnaBgWaktuMenujuAdzanFromServer = [];
        var arrKontenWarnaBgWaktuMenujuAdzanFromServer = [];
        var arrKontenFileGambarWaktuMenujuAdzanFromServer = [];
        var arrKontenGambarWaktuMenujuAdzanFromServer = [];
        var arrKontenUrlWaktuMenujuAdzanFromServer = [];
        var arrErrorKontenWaktuMenujuAdzanFromServer = [];
        var arrErrorWarnaBackgroundWaktuMenujuAdzanFromServer = [];
        var arrErrorGambarWaktuMenujuAdzanFromServer = [];
        var arrErrorUrlWaktuMenujuAdzanFromServer = [];

        for(var i = 0; i < konten_wkt_menuju_adzans.length; i++) {
            arrKontenFromServer.push('abc');
            arrKontenIdFromServer.push(konten_wkt_menuju_adzans[i].id);
            arrKontenTypeWaktuMenujuAdzanFromServer.push(konten_wkt_menuju_adzans[i].type);
            arrKontenWaktuMenujuAdzanFromServer.push(konten_wkt_menuju_adzans[i].text);
            arrKontenDisplayWarnaBgWaktuMenujuAdzanFromServer.push(false);
            arrKontenWarnaBgWaktuMenujuAdzanFromServer.push(konten_wkt_menuju_adzans[i].background);
            arrKontenFileGambarWaktuMenujuAdzanFromServer.push(null);
            if(konten_wkt_menuju_adzans[i].gambar != null) {
                arrKontenGambarWaktuMenujuAdzanFromServer.push(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + konten_wkt_menuju_adzans[i].gambar.replace("public", "storage"));
            } else {
                arrKontenGambarWaktuMenujuAdzanFromServer.push(null);
            }
            arrKontenUrlWaktuMenujuAdzanFromServer.push(konten_wkt_menuju_adzans[i].url);
            arrErrorKontenWaktuMenujuAdzanFromServer.push(false);
            arrErrorWarnaBackgroundWaktuMenujuAdzanFromServer.push(false);
            arrErrorGambarWaktuMenujuAdzanFromServer.push(false);
            arrErrorUrlWaktuMenujuAdzanFromServer.push(false);
        }

        setArrKonten(arrKontenFromServer);
        setKontenId(arrKontenIdFromServer);
        setKontenTypeWaktuMenujuAdzan(arrKontenTypeWaktuMenujuAdzanFromServer);
        setKontenWaktuMenujuAdzan(arrKontenWaktuMenujuAdzanFromServer);
        setKontenDisplayWarnaBgWaktuMenujuAdzan(arrKontenDisplayWarnaBgWaktuMenujuAdzanFromServer);
        setKontenWarnaBgWaktuMenujuAdzan(arrKontenWarnaBgWaktuMenujuAdzanFromServer);
        setKontenFileGambarWaktuMenujuAdzan(arrKontenFileGambarWaktuMenujuAdzanFromServer);
        setKontenGambarWaktuMenujuAdzan(arrKontenGambarWaktuMenujuAdzanFromServer);
        setKontenUrlWaktuMenujuAdzan(arrKontenUrlWaktuMenujuAdzanFromServer);
        setOpenErrorKontenWaktuMenujuAdzan(arrErrorKontenWaktuMenujuAdzanFromServer);
        setOpenErrorWarnaBackgroundWaktuMenujuAdzan(arrErrorWarnaBackgroundWaktuMenujuAdzanFromServer);
        setOpenErrorGambarWaktuMenujuAdzan(arrErrorGambarWaktuMenujuAdzanFromServer);
        setOpenErrorUrlWaktuMenujuAdzan(arrErrorUrlWaktuMenujuAdzanFromServer);
    }

    const addInput = () => {
        setArrKonten(arrKonten.concat("abc"));
        setKontenId(kontenId.concat(0));
        setKontenTypeWaktuMenujuAdzan(kontenTypeWaktuMenujuAdzan.concat(0));
        setKontenWaktuMenujuAdzan(kontenWaktuMenujuAdzan.concat(null));
        setKontenDisplayWarnaBgWaktuMenujuAdzan(kontenDisplayWarnaBgWaktuMenujuAdzan.concat(false));
        setKontenWarnaBgWaktuMenujuAdzan(kontenWarnaBgWaktuMenujuAdzan.concat(null));
        setKontenFileGambarWaktuMenujuAdzan(kontenFileGambarWaktuMenujuAdzan.concat(null));
        setKontenGambarWaktuMenujuAdzan(kontenGambarWaktuMenujuAdzan.concat(null));
        setKontenUrlWaktuMenujuAdzan(kontenUrlWaktuMenujuAdzan.concat(""));
        setOpenErrorKontenWaktuMenujuAdzan(openErrorKontenWaktuMenujuAdzan.concat(false));
        setOpenErrorWarnaBackgroundWaktuMenujuAdzan(openErrorWarnaBackgroundWaktuMenujuAdzan.concat(false));
        setOpenErrorGambarWaktuMenujuAdzan(openErrorGambarWaktuMenujuAdzan.concat(false));
        setOpenErrorUrlWaktuMenujuAdzan(openErrorUrlWaktuMenujuAdzan.concat(false));
    };

    const submitSimpanWaktuMenujuAdzan = async (event) => {
        event.preventDefault();
        hideAllErrorMenujuAdzan();
        var arrLanjut = [];
        arrLanjut.push(true);

        for(var i = 0; i < kontenTypeWaktuMenujuAdzan.length; i++) {
            if(kontenTypeWaktuMenujuAdzan[i] == 1) {
                if(kontenWaktuMenujuAdzan[i] == null || kontenWaktuMenujuAdzan[i] == "") {
                    let newArrErrorKontenWaktuMenujuAdzan = [...openErrorKontenWaktuMenujuAdzan];
                    newArrErrorKontenWaktuMenujuAdzan[i] = true;
                    setOpenErrorKontenWaktuMenujuAdzan(newArrErrorKontenWaktuMenujuAdzan);
                    arrLanjut.push(false);
                }
                // if(kontenWarnaBgWaktuMenujuAdzan[i] == null) {
                //     let newArrErrorWarnaBackgroundWaktuMenujuAdzan = [...openErrorWarnaBackgroundWaktuMenujuAdzan];
                //     newArrErrorWarnaBackgroundWaktuMenujuAdzan[i] = true;
                //     setOpenErrorWarnaBackgroundWaktuMenujuAdzan(newArrErrorWarnaBackgroundWaktuMenujuAdzan);
                //     arrLanjut.push(false);
                // }
            } else if(kontenTypeWaktuMenujuAdzan[i] == 2) {
                if(kontenGambarWaktuMenujuAdzan[i] == null) {
                    let newArrErrorGambarWaktuMenujuAdzan = [...openErrorGambarWaktuMenujuAdzan];
                    newArrErrorGambarWaktuMenujuAdzan[i] = true;
                    setOpenErrorGambarWaktuMenujuAdzan(newArrErrorGambarWaktuMenujuAdzan);
                    arrLanjut.push(false);
                }
            } else if(kontenTypeWaktuMenujuAdzan[i] == 3) {
                if(kontenUrlWaktuMenujuAdzan[i] == null || kontenUrlWaktuMenujuAdzan[i] == "") {
                    let newArrErrorUrlWaktuMenujuAdzan = [...openErrorUrlWaktuMenujuAdzan];
                    newArrErrorUrlWaktuMenujuAdzan[i] = true;
                    setOpenErrorUrlWaktuMenujuAdzan(newArrErrorUrlWaktuMenujuAdzan);
                    arrLanjut.push(false);
                }
            }
        }

        console.log("arrLanjut", arrLanjut);
        if(!arrLanjut.includes(false)) {

            setIsLoadingSimpanWaktuMenujuAdzan(true);
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
                formData.append("konten_id", JSON.stringify(kontenId));
                formData.append('waktu_menuju_adzan', waktuMenujuAdzan);
                formData.append("type", JSON.stringify(kontenTypeWaktuMenujuAdzan));
                formData.append("background", JSON.stringify(kontenWarnaBgWaktuMenujuAdzan));
                formData.append("text", JSON.stringify(kontenWaktuMenujuAdzan));
                for(var i = 0; i < kontenTypeWaktuMenujuAdzan.length; i ++) {
                    formData.append("gambar" + i, kontenFileGambarWaktuMenujuAdzan[i]);
                }
                formData.append("url", JSON.stringify(kontenUrlWaktuMenujuAdzan));
                formData.append("screen_size", screenSize);
    
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-jumat/simpan-menuju-adzan`,
                    headers: {
                        "Content-Type": `multipart/form-data`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: formData
                }).then(async (res) => {
                    console.log(res.data);
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessWaktuMenujuAdzan(res.data.message);
                        props.loadData();
                    } else {
                        showErrorWaktuMenujuAdzan(res.data.message);
                    }
                    setIsLoadingSimpanWaktuMenujuAdzan(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanWaktuMenujuAdzan(false);
                if(err.response.data != null) {
                    showErrorWaktuMenujuAdzan(err.response.data.message);
                } else {
                    showErrorWaktuMenujuAdzan(JSON.stringify(err.response));
                }
            }
        }
    };
    
    function showSucessWaktuMenujuAdzan(message) {
        notifyWaktuMenujuAdzan("success", message);
    }
    function showErrorWaktuMenujuAdzan(message) {
        notifyWaktuMenujuAdzan("error", message);
    }

    function hideAllErrorMenujuAdzan() {
        const newArrOpenErrorKontenWaktuMenujuAdzan = openErrorKontenWaktuMenujuAdzan.map((element, index) => {
            return false;
        });
        setOpenErrorKontenWaktuMenujuAdzan(newArrOpenErrorKontenWaktuMenujuAdzan);

        const newArrOpenErrorWarnaBackgroundWaktuMenujuAdzan = openErrorWarnaBackgroundWaktuMenujuAdzan.map((element, index) => {
            return false;
        });
        setOpenErrorWarnaBackgroundWaktuMenujuAdzan(newArrOpenErrorWarnaBackgroundWaktuMenujuAdzan);

        const newArrOpenErrorGambarWaktuMenujuAdzan = openErrorGambarWaktuMenujuAdzan.map((element, index) => {
            return false;
        });
        setOpenErrorGambarWaktuMenujuAdzan(newArrOpenErrorGambarWaktuMenujuAdzan);

        const newArrOpenErrorUrlWaktuMenujuAdzan = openErrorUrlWaktuMenujuAdzan.map((element, index) => {
            return false;
        });
        setOpenErrorUrlWaktuMenujuAdzan(newArrOpenErrorUrlWaktuMenujuAdzan);
    }

    return (
        <chakra.form onSubmit={submitSimpanWaktuMenujuAdzan}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Waktu Menuju Adzan
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
                                                    if(waktuMenujuAdzan > 1) {
                                                        setWaktuMenujuAdzan(waktuMenujuAdzan - 1);
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
                                                        setWaktuMenujuAdzan(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setWaktuMenujuAdzan(maxMenit);
                                                    } else {
                                                        setWaktuMenujuAdzan(event.target.value);
                                                    }
                                                }}
                                                value={waktuMenujuAdzan}
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
                                                    if(waktuMenujuAdzan < maxMenit) {
                                                        setWaktuMenujuAdzan(waktuMenujuAdzan + 1);
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
                {arrKonten.map((input, index) => {
                    return (
                        <Flex pb={2} key={index} flexDirection="column" w={'100%'}>
                            <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                    <Flex flexDirection="row" justify={'space-between'} align="center" w={'100%'} h={'100%'}>
                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Slide {(index + 1)}
                                            </Text>
                                        </Flex>
                                        <IconButton
                                            style={{ padding: '0px', margin: '0px' }}
                                            bgColor={'#B3A5DA'}
                                            color={textColor}
                                            icon={<FaTrashAlt style={{ width: '10px' }} />}
                                            rounded={'full'}
                                            size={{ lg: 'sm', sm: 'xs' }}
                                            onClick={() => {
                                                setKontenId(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setKontenTypeWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setKontenWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setKontenDisplayWarnaBgWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setKontenWarnaBgWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setKontenFileGambarWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setKontenGambarWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setKontenUrlWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setOpenErrorKontenWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setOpenErrorWarnaBackgroundWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setOpenErrorGambarWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setOpenErrorUrlWaktuMenujuAdzan(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                setArrKonten(oldArray => {
                                                    return oldArray.filter((value, i) => i !== index);
                                                });
                                                console.log(index);
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                            </Alert>
                            <Flex p={2} flexDirection="column" w={'100%'} borderWidth={1} borderBottomLeftRadius={{ sm: '5px', lg: '5px' }} borderBottomRightRadius={{ sm: '5px', lg: '5px' }}>
                                <Input
                                    value={kontenId[index]}
                                    type={'hidden'}
                                />
                                <Grid pb={2} templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                                    <GridItem colSpan={1}>
                                        <Flex p={2} flexDirection="column" bg={'gray.200'} borderRadius={{ sm: '5px', lg: '5px' }}>
                                            <Radio.Group
                                                id={'radioGroup' + index}
                                                className={'radioGroup[]'}
                                                onChange={(e) => {
                                                    let newArr = [...kontenTypeWaktuMenujuAdzan];
                                                    newArr[index] = e.target.value;
                                                    setKontenTypeWaktuMenujuAdzan(newArr);
                                                }}
                                                value={kontenTypeWaktuMenujuAdzan[index]}
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
                                                    <GridItem colSpan={1}>
                                                        <Flex flexDirection="row" justify="start" align="center">
                                                            <Radio value={3}></Radio>
                                                            <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                Url
                                                            </Text>
                                                        </Flex> 
                                                    </GridItem>
                                                </Grid>
                                            </Radio.Group>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                                {(() => {
                                    if(kontenTypeWaktuMenujuAdzan[index] == 1) {
                                        return (
                                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background'
                                                    isOpen={openErrorWarnaBackgroundWaktuMenujuAdzan[index]}
                                                >
                                                    <Button
                                                        size={{ sm: 'sm', lg: 'sm' }}
                                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                                        color={textColor}
                                                        bg={kontenWarnaBgWaktuMenujuAdzan[index] == null ? 'white' : kontenWarnaBgWaktuMenujuAdzan[index]}
                                                        style={{ border: '1px solid #c6c5c5' }}
                                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                                        onClick={() => {
                                                            let newArrErrorWarnaBackgroundWaktuMenujuAdzan = [...openErrorWarnaBackgroundWaktuMenujuAdzan];
                                                            newArrErrorWarnaBackgroundWaktuMenujuAdzan[index] = false;
                                                            setOpenErrorWarnaBackgroundWaktuMenujuAdzan(newArrErrorWarnaBackgroundWaktuMenujuAdzan);
                                                            
                                                            let newArrKontenDisplayWarnaBgWaktuMenujuAdzan = [...kontenDisplayWarnaBgWaktuMenujuAdzan];
                                                            if(kontenDisplayWarnaBgWaktuMenujuAdzan[index]) {
                                                                newArrKontenDisplayWarnaBgWaktuMenujuAdzan[index] = false;
                                                                setKontenDisplayWarnaBgWaktuMenujuAdzan(newArrKontenDisplayWarnaBgWaktuMenujuAdzan);
                                                            } else {
                                                                newArrKontenDisplayWarnaBgWaktuMenujuAdzan[index] = true;
                                                                setKontenDisplayWarnaBgWaktuMenujuAdzan(newArrKontenDisplayWarnaBgWaktuMenujuAdzan);
                                                            }
                                                        }}
                                                    >
                                                        {kontenWarnaBgWaktuMenujuAdzan[index] == null ? 'Pilih Warna Background' : kontenWarnaBgWaktuMenujuAdzan[index]}
                                                    </Button>
                                                </Tooltip>
                                            </Flex>
                                        )
                                    } else if(kontenTypeWaktuMenujuAdzan[index] == 2) {
                                        return (
                                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih gambar'
                                                    isOpen={openErrorGambarWaktuMenujuAdzan[index]}
                                                >
                                                    <Button
                                                        size={{ sm: 'sm', lg: 'sm' }}
                                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                                        color={textColor}
                                                        bg={'white'}
                                                        style={{ border: '1px solid #c6c5c5' }}
                                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                                        onClick={(event)=> { 
                                                            event.target.value = null;
                                                            
                                                            let newArrErrorGambarWaktuMenujuAdzan = [...openErrorGambarWaktuMenujuAdzan];
                                                            newArrErrorGambarWaktuMenujuAdzan[index] = false;
                                                            setOpenErrorGambarWaktuMenujuAdzan(newArrErrorGambarWaktuMenujuAdzan);
                                                            
                                                            kontenGambarWaktuMenujuAdzanRef.current?.click()
                                                        }}
                                                    >
                                                        Pilih Gambar
                                                        <input 
                                                            type='file'
                                                            accept="image/*"
                                                            multiple={false}
                                                            style={{ display: 'none' }}
                                                            onChange={(event)=> { 
                                                                let fileObj = event.target.files[0];
                                                                
                                                                let newArrKontenFileGambarWaktuMenujuAdzan = [...kontenFileGambarWaktuMenujuAdzan];
                                                                newArrKontenFileGambarWaktuMenujuAdzan[index] = fileObj;
                                                                setKontenFileGambarWaktuMenujuAdzan(newArrKontenFileGambarWaktuMenujuAdzan);
                                                                
                                                                const objectUrl = URL.createObjectURL(fileObj);
                                                                
                                                                let newArrKontenGambarWaktuMenujuAdzan = [...kontenGambarWaktuMenujuAdzan];
                                                                newArrKontenGambarWaktuMenujuAdzan[index] = objectUrl;
                                                                setKontenGambarWaktuMenujuAdzan(newArrKontenGambarWaktuMenujuAdzan);
                                                            }}
                                                            ref={kontenGambarWaktuMenujuAdzanRef}
                                                        />
                                                    </Button>
                                                </Tooltip>
                                            </Flex>
                                        )
                                    } else if(kontenTypeWaktuMenujuAdzan[index]== 3) {
                                        return (
                                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                                <Tooltip hasArrow bg='red.600' color={'white'} label='Isi url'
                                                    isOpen={openErrorUrlWaktuMenujuAdzan[index]}
                                                >
                                                    <Input
                                                        value={kontenUrlWaktuMenujuAdzan[index]}
                                                        onChange={(event)=> { 
                                                            let newArrErrorUrlWaktuMenujuAdzan = [...openErrorUrlWaktuMenujuAdzan];
                                                            newArrErrorUrlWaktuMenujuAdzan[index] = false;
                                                            setOpenErrorUrlWaktuMenujuAdzan(newArrErrorUrlWaktuMenujuAdzan);
                                                            
                                                            let newArrKontenUrlWaktuMenujuAdzan = [...kontenUrlWaktuMenujuAdzan];
                                                            newArrKontenUrlWaktuMenujuAdzan[index] = event.target.value;
                                                            setKontenUrlWaktuMenujuAdzan(newArrKontenUrlWaktuMenujuAdzan);
                                                        }}
                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        type="text"
                                                        placeholder="Masukkan url"
                                                    />
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
                                            if(kontenTypeWaktuMenujuAdzan[index] == 1) {
                                                return(
                                                    <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                                                        <Flex flexDirection="column" w={'100%'}>
                                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKontenWaktuMenujuAdzan[index]}>
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
                                                                                if((editorLoadedWaktuMenujuAdzan)) {
                                                                                    return (
                                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                                            <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                                                fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                                                lineHeight={1}
                                                                                            >
                                                                                                <CKEditorWaktuMenujuAdzan
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
                                                                                                    onReady={ editorRefWaktuMenujuAdzan => {
                                                                                                        const toolbarElement = editorRefWaktuMenujuAdzan.ui.view.toolbar.element;
                                                                                                        toolbarElement.style.borderTop = 'none';
                                                                                                        toolbarElement.style.borderLeft = 'none';
                                                                                                        toolbarElement.style.borderRight = 'none';
                                                                                                        toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                                        editorRefWaktuMenujuAdzan.editing.view.change( writer => {
                                                                                                            // writer.setStyle( 'height', '100vh', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'background-color', 'transparent', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'margin-top', '0px', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'padding-top', '0px', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'min-height', '100%', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'border', 'none', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'border-bottom-radius', '5px', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'box-shadow', 'none', editorRefWaktuMenujuAdzan.editing.view.document.getRoot());
                                                                                                        } );
                                                                                                        editorRefWaktuMenujuAdzan = editorRefWaktuMenujuAdzan;
                                                                                                    }}
                                                                                                    onError = {
                                                                                                        (error, { willEditorRestart } ) => {
                                                                                                            if(willEditorRestart ) {
                                                                                                                editorRefWaktuMenujuAdzan.ui.view.toolbar.element.remove();
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                    onChange={(event, editor) => {
                                                                                                        const data = editor.getData();
                                                                                                        let newArrErrorKontenWaktuMenujuAdzan = [...openErrorKontenWaktuMenujuAdzan];
                                                                                                        newArrErrorKontenWaktuMenujuAdzan[index] = false;
                                                                                                        setOpenErrorKontenWaktuMenujuAdzan(newArrErrorKontenWaktuMenujuAdzan);

                                                                                                        let newArrKontenWaktuMenujuAdzan = [...kontenWaktuMenujuAdzan];
                                                                                                        newArrKontenWaktuMenujuAdzan[index] = data;
                                                                                                        setKontenWaktuMenujuAdzan(newArrKontenWaktuMenujuAdzan);
                                                                                                    }}
                                                                                                    editor={ ClassicEditorWaktuMenujuAdzan }
                                                                                                    data = {kontenWaktuMenujuAdzan[index]}
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
                                        <GridItem colSpan={1} pt={{ sm: kontenTypeWaktuMenujuAdzan[index] == 1 ? 2 : 0, lg: 0 }} pl={{ lg: kontenTypeWaktuMenujuAdzan[index] == 1 ? 1 : 0, sm: 0 }}>
                                            <Flex flexDirection="column" w={'100%'}>
                                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                Tampilan Slide {(index + 1)}
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
                                                                if(kontenTypeWaktuMenujuAdzan[index] == 0) {
                                                                    return (
                                                                        <Flex
                                                                            w={'100%'} h={'100%'}
                                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                                            style={{ border: '1px solid #c6c5c5' }}
                                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                            justify="center" align="center"
                                                                        >
                                                                            <Image w={'100%'} h={'100%'} src={ '/default_image_menuju_adzan.png' }/>
                                                                        </Flex>
                                                                    )
                                                                } else if(kontenTypeWaktuMenujuAdzan[index] == 1) {
                                                                    if((kontenWaktuMenujuAdzan[index] == null || kontenWaktuMenujuAdzan[index] == "") && kontenWarnaBgWaktuMenujuAdzan[index] == null) {
                                                                        return (
                                                                            <Flex
                                                                                w={'100%'} h={'100%'}
                                                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                                                style={{ border: '1px solid #c6c5c5' }}
                                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                                justify="center" align="center"
                                                                            >
                                                                                <Image w={'100%'} h={'100%'} src={ '/template_image_menuju_adzan.png' }/>
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
                                                                                    bg={kontenWarnaBgWaktuMenujuAdzan[index]}
                                                                                    bgImage={ kontenWarnaBgWaktuMenujuAdzan[index] == null ? "url('/template_image_menuju_adzan.png')" : "url('')"}
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
                                                                                        dangerouslySetInnerHTML={{__html: kontenWaktuMenujuAdzan[index]}}
                                                                                    ></Box>
                                                                                </Box>
                                                                            </Box>
                                                                        )
                                                                    }
                                                                } else if(kontenTypeWaktuMenujuAdzan[index] == 2) {
                                                                    return (
                                                                        <Flex
                                                                            w={'100%'} h={'100%'}
                                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                                            style={{ border: '1px solid #c6c5c5' }}
                                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                            justify="center" align="center"
                                                                        >
                                                                            <Image h={'100%'} src={ kontenGambarWaktuMenujuAdzan[index] == null ? '/default_image_menuju_adzan.png' : kontenGambarWaktuMenujuAdzan[index] }/>
                                                                        </Flex>
                                                                    )
                                                                } else if(kontenTypeWaktuMenujuAdzan[index] == 3) {
                                                                    return (
                                                                        <Flex
                                                                            w={'100%'} h={'100%'}
                                                                            style={{ border: '1px solid #c6c5c5' }}
                                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                            justify="center" align="center"
                                                                        >
                                                                            <Iframe url={kontenUrlWaktuMenujuAdzan[index]}
                                                                                width={'100%'}
                                                                                height={'100%'}
                                                                                id="myId"
                                                                                className="myClassname"
                                                                                display="initial"
                                                                                position="relative"
                                                                            />
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
                            </Flex>
                            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered isOpen={kontenDisplayWarnaBgWaktuMenujuAdzan[index]}>
                                <ModalOverlay
                                    bg='blackAlpha.300'
                                    backdropFilter='blur(10px)'
                                />
                                <ModalContent bgColor={'transparent'} width={'auto'} m={0} p={0}>
                                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }} m={0} p={0}>
                                        <Flex justify="space-between" align="center">
                                            <Box></Box>
                                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => {
                                                let newArrKontenDisplayWarnaBgWaktuMenujuAdzan = [...kontenDisplayWarnaBgWaktuMenujuAdzan];
                                                newArrKontenDisplayWarnaBgWaktuMenujuAdzan[index] = false;
                                                setKontenDisplayWarnaBgWaktuMenujuAdzan(newArrKontenDisplayWarnaBgWaktuMenujuAdzan);
                                            }}/>
                                        </Flex>
                                    </ModalHeader>
                                    <ModalBody m={0} p={0}>
                                        <Center>
                                            <ChromePicker
                                                color={kontenWarnaBgWaktuMenujuAdzan[index] == null ? '#FFFFFF' : kontenWarnaBgWaktuMenujuAdzan[index]}
                                                onChange={(color) => {
                                                    let newArrKontenWarnaBgWaktuMenujuAdzan = [...kontenWarnaBgWaktuMenujuAdzan];
                                                    newArrKontenWarnaBgWaktuMenujuAdzan[index] = color.hex;
                                                    setKontenWarnaBgWaktuMenujuAdzan(newArrKontenWarnaBgWaktuMenujuAdzan);
                                                }}
                                            />
                                        </Center>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </Flex>
                    );
                })}
                <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                    <Button
                        size={{ sm: 'sm', lg: 'sm' }}
                        fontSize={{ sm: 'xs', lg: 'sm' }}
                        color={textColor}
                        bg={'white'}
                        style={{ border: '1px solid #c6c5c5' }}
                        _hover={{ bg: "#B3A5DA", color: textColor }}
                        onClick={addInput}
                    >
                        Tambah Konten
                    </Button>
                </Flex>
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanWaktuMenujuAdzan}
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