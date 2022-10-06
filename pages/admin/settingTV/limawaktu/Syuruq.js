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
    AspectRatio,
    Tooltip,
    useMediaQuery,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
} from "@chakra-ui/react";
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";
import { ChromePicker } from "react-color";
import { Radio } from "antd";

export default function Syuruq(props) {
    const [isSm, isMd, isLg] = useMediaQuery([
        '(max-width: 320px)',
        '(min-width: 320px)',
        '(min-width: 768px)',
    ])
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxMenit = 60;

    const notifySyuruq = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissSyuruq = useCallback(() => {
        toast.dismiss();
    }, []);

    const editorRefWaktuSyuruq = useRef();
    const { CKEditorWaktuSyuruq, ClassicEditorWaktuSyuruq } = editorRefWaktuSyuruq.current || {};
    const [editorLoadedWaktuSyuruq, setEditorLoadedWaktuSyuruq] = useState(false);

    const [openErrorWarnaBackgroundWaktuSyuruq, setOpenErrorWarnaBackgroundWaktuSyuruq] = useState(false);
    const [openErrorKontenWaktuSyuruq, setOpenErrorKontenWaktuSyuruq] = useState(false);

    const [jedaWaktuSyuruq, setJedaWaktuSyuruq] = useState(8);
    const [penyesuaianWaktuSyuruq, setPenyesuaianWaktuSyuruq] = useState(0);
    const [kontenDisplayWarnaBgWaktuSyuruq, setKontenDisplayWarnaBgWaktuSyuruq] = useState(false);
    const [kontenWarnaBgWaktuSyuruq, setKontenWarnaBgWaktuSyuruq] = useState(null);
    const [kontenWaktuSyuruq, setKontenWaktuSyuruq] = useState(null);
    const [kontenTypeWaktuSyuruq, setKontenTypeWaktuSyuruq] = useState(0);

    const [isLoadingSimpanSyuruq, setIsLoadingSimpanSyuruq] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRefWaktuSyuruq.current = {
            CKEditorWaktuSyuruq: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditorWaktuSyuruq: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.jeda_waktu_syuruq != null) {
                    setJedaWaktuSyuruq(props.dataSetting.mosques.displays.jeda_waktu_syuruq);
                }
                if(props.dataSetting.mosques.displays.adzans != null) {
                    if(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_syuruq != null) {
                        setPenyesuaianWaktuSyuruq(props.dataSetting.mosques.displays.adzans.penyesuaian_waktu_syuruq);
                    }
                }
                if(props.dataSetting.mosques.displays.konten_wkt_syuruqs != null) {
                    if(props.dataSetting.mosques.displays.konten_wkt_syuruqs.type != null) {
                        setKontenTypeWaktuSyuruq(props.dataSetting.mosques.displays.konten_wkt_syuruqs.type);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_syuruqs.background != null) {
                        setKontenWarnaBgWaktuSyuruq(props.dataSetting.mosques.displays.konten_wkt_syuruqs.background);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_syuruqs.text != null) {
                        setKontenWaktuSyuruq(props.dataSetting.mosques.displays.konten_wkt_syuruqs.text);
                    }
                }
            }
            setEditorLoadedWaktuSyuruq(true);
        }
    }, []);

    const submitSimpanSyuruq = async (event) => {
        event.preventDefault();
        setOpenErrorWarnaBackgroundWaktuSyuruq(false);
        setOpenErrorKontenWaktuSyuruq(false);
        var lanjut = true;
        if(kontenTypeWaktuSyuruq == 1) {
            if(kontenWaktuSyuruq == null || kontenWaktuSyuruq == "") {
                setOpenErrorKontenWaktuSyuruq(true);
                lanjut = false;
            }
            // if(kontenWarnaBgWaktuSyuruq == null) {
            //     setOpenErrorWarnaBackgroundWaktuSyuruq(true);
            //     lanjut = false;
            // }
        }
        if(lanjut) {
            setIsLoadingSimpanSyuruq(true);
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
                    jeda_waktu_syuruq: jedaWaktuSyuruq,
                    penyesuaian_waktu_syuruq: penyesuaianWaktuSyuruq,
                    type: kontenTypeWaktuSyuruq,
                    background: (kontenWarnaBgWaktuSyuruq != null && kontenWarnaBgWaktuSyuruq != "") ? kontenWarnaBgWaktuSyuruq : null,
                    text: (kontenWaktuSyuruq != null && kontenWaktuSyuruq != "") ? kontenWaktuSyuruq : null,
                    screen_size: screenSize
                };
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu/simpan-syuruq`,
                    headers: {
                        "Content-Type": `application/json`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: postData
                }).then(async (res) => {
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessSyuruq(res.data.message);
                        props.loadData();
                    } else {
                        showErrorSyuruq(res.data.message);
                    }
                    setIsLoadingSimpanSyuruq(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanSyuruq(false);
                if(err.response.data != null) {
                    showErrorSyuruq(err.response.data.message);
                } else {
                    showErrorSyuruq(JSON.stringify(err.response));
                }
            }
        }
    };
    
    function showSucessSyuruq(message) {
        notifySyuruq("success", message);
    }
    function showErrorSyuruq(message) {
        notifySyuruq("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanSyuruq}>
            <FormControl pt={5}>
                <Flex flexDirection="column" w={'100%'} h={'100%'}>
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Jeda Waktu Syuruq
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
                                                    if(jedaWaktuSyuruq > 1) {
                                                        setJedaWaktuSyuruq(jedaWaktuSyuruq - 1);
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
                                                        setJedaWaktuSyuruq(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setJedaWaktuSyuruq(maxMenit);
                                                    } else {
                                                        setJedaWaktuSyuruq(event.target.value);
                                                    }
                                                }}
                                                value={jedaWaktuSyuruq}
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
                                                    if(jedaWaktuSyuruq < maxMenit) {
                                                        setJedaWaktuSyuruq(jedaWaktuSyuruq + 1);
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
                <Flex flexDirection="column" w={'100%'} h={'100%'}>
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Penyesuaian Waktu Syuruq
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
                                                    if(penyesuaianWaktuSyuruq > 0) {
                                                        setPenyesuaianWaktuSyuruq(penyesuaianWaktuSyuruq - 1);
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
                                                        if(event.target.value == "") {
                                                            setPenyesuaianWaktuSyuruq(0);
                                                        } else {
                                                            setPenyesuaianWaktuSyuruq(0);
                                                        }
                                                    } else if(event.target.value > maxMenit) {
                                                        setPenyesuaianWaktuSyuruq(maxMenit);
                                                    } else {
                                                        setPenyesuaianWaktuSyuruq(event.target.value);
                                                    }
                                                }}
                                                value={penyesuaianWaktuSyuruq}
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
                                                    if(penyesuaianWaktuSyuruq < maxMenit) {
                                                        setPenyesuaianWaktuSyuruq(penyesuaianWaktuSyuruq + 1);
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
                                    setKontenTypeWaktuSyuruq(e.target.value);
                                    setOpenErrorWarnaBackgroundWaktuSyuruq(false);
                                    setOpenErrorKontenWaktuSyuruq(false);
                                }}
                                value={kontenTypeWaktuSyuruq}
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
                    if(kontenTypeWaktuSyuruq == 1) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background' isOpen={openErrorWarnaBackgroundWaktuSyuruq}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={kontenWarnaBgWaktuSyuruq == null ? 'white' : kontenWarnaBgWaktuSyuruq}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={() => {
                                            setOpenErrorWarnaBackgroundWaktuSyuruq(false);
                                            if(kontenDisplayWarnaBgWaktuSyuruq) {
                                                setKontenDisplayWarnaBgWaktuSyuruq(false);
                                            } else {
                                                setKontenDisplayWarnaBgWaktuSyuruq(true);
                                            }
                                        }}
                                    >
                                        {kontenWarnaBgWaktuSyuruq == null ? 'Pilih Warna Background' : kontenWarnaBgWaktuSyuruq}
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
                        if(kontenTypeWaktuSyuruq == 1) {
                            return(
                                <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                                    <Flex flexDirection="column" w={'100%'}>
                                        <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKontenWaktuSyuruq}>
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
                                                            if((editorLoadedWaktuSyuruq)) {
                                                                return (
                                                                    <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                            fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                            lineHeight={1}
                                                                        >
                                                                            <CKEditorWaktuSyuruq
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
                                                                                onReady={ editorRefWaktuSyuruq => {
                                                                                    const toolbarElement = editorRefWaktuSyuruq.ui.view.toolbar.element;
                                                                                    toolbarElement.style.borderTop = 'none';
                                                                                    toolbarElement.style.borderLeft = 'none';
                                                                                    toolbarElement.style.borderRight = 'none';
                                                                                    toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                    editorRefWaktuSyuruq.editing.view.change( writer => {
                                                                                        // writer.setStyle( 'height', '100vh', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'background-color', 'transparent', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'margin-top', '0px', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'padding-top', '0px', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'min-height', '100%', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'border', 'none', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'border-bottom-radius', '5px', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'box-shadow', 'none', editorRefWaktuSyuruq.editing.view.document.getRoot());
                                                                                    } );
                                                                                    editorRefWaktuSyuruq = editorRefWaktuSyuruq;
                                                                                }}
                                                                                onError = {
                                                                                    (error, { willEditorRestart } ) => {
                                                                                        if(willEditorRestart ) {
                                                                                            editorRefWaktuSyuruq.ui.view.toolbar.element.remove();
                                                                                        }
                                                                                    }
                                                                                }
                                                                                onChange={(event, editor) => {
                                                                                    const data = editor.getData();
                                                                                    setOpenErrorKontenWaktuSyuruq(false);
                                                                                    setKontenWaktuSyuruq(data);
                                                                                }}
                                                                                editor={ ClassicEditorWaktuSyuruq }
                                                                                data = {kontenWaktuSyuruq}
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
                    <GridItem colSpan={1} pt={{ sm: kontenTypeWaktuSyuruq == 1 ? 2 : 0, lg: 0 }} pl={{ lg: kontenTypeWaktuSyuruq == 1 ? 1 : 0, sm: 0 }}>
                        <Flex flexDirection="column" w={'100%'}>
                            <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                    <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                        <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                        Tampil selama 1 menit setelah waktu Syuruq sudah berlalu { jedaWaktuSyuruq } menit
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
                                            if(kontenTypeWaktuSyuruq == 0) {
                                                return (
                                                    <Flex
                                                        w={'100%'} h={'100%'}
                                                        bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                        style={{ border: '1px solid #c6c5c5' }}
                                                        borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                        justify="center" align="center"
                                                    >
                                                        <Image w={'100%'} h={'100%'} src={ '/default_image_waktu_syuruq.png' }/>
                                                    </Flex>
                                                )
                                            } else if(kontenTypeWaktuSyuruq == 1) {
                                                if((kontenWaktuSyuruq == null || kontenWaktuSyuruq == "") && kontenWarnaBgWaktuSyuruq == null) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image w={'100%'} h={'100%'} src={ '/template_image_waktu_syuruq.png' }/>
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
                                                                bg={kontenWarnaBgWaktuSyuruq}
                                                                bgImage={ kontenWarnaBgWaktuSyuruq == null ? "url('/template_image_waktu_syuruq.png')" : "url('')"}
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
                                                                    dangerouslySetInnerHTML={{__html: kontenWaktuSyuruq}}
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
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanSyuruq}
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
            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered isOpen={kontenDisplayWarnaBgWaktuSyuruq}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent bgColor={'transparent'} width={'auto'} m={0} p={0}>
                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }} m={0} p={0}>
                        <Flex justify="space-between" align="center">
                            <Box></Box>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setKontenDisplayWarnaBgWaktuSyuruq(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody m={0} p={0}>
                        <Center>
                            <ChromePicker
                                color={kontenWarnaBgWaktuSyuruq == null ? '#FFFFFF' : kontenWarnaBgWaktuSyuruq}
                                onChange={(color) => {
                                    setKontenWarnaBgWaktuSyuruq(color.hex);
                                }}
                            />
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </chakra.form>
    );
}