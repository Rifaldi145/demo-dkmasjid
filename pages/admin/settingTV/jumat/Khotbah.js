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
    useMediaQuery,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
const { fontfam } = require('../../../../theme/ListFontFamily')
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";
import Iframe from 'react-iframe'
import { Radio } from "antd";

export default function Khotbah(props) {
    const [isSm, isMd, isLg] = useMediaQuery([
        '(max-width: 320px)',
        '(min-width: 320px)',
        '(min-width: 768px)',
    ])

    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxMenit = 60;

    const notifyKhotbah = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissKhotbah = useCallback(() => {
        toast.dismiss();
    }, []);
    
    const [openErrorWarnaBackgroundKhotbah, setOpenErrorWarnaBackgroundKhotbah] = useState(false);
    const [openErrorKontenKhotbah, setOpenErrorKontenKhotbah] = useState(false);
    const [openErrorGambarKhotbah, setOpenErrorGambarKhotbah] = useState(false);
    const [openErrorUrlKhotbah, setOpenErrorUrlKhotbah] = useState(false);

    const editorRefKhotbah = useRef();
    const { CKEditorKhotbah, ClassicEditorKhotbah } = editorRefKhotbah.current || {};
    const [editorLoadedKhotbah, setEditorLoadedKhotbah] = useState(false);

    // khotbah
    const [waktuKhotbah, setWaktuKhotbah] = useState(30);
    const [kontenDisplayWarnaBgKhotbah, setKontenDisplayWarnaBgKhotbah] = useState(false);
    const [kontenWarnaBgKhotbah, setKontenWarnaBgKhotbah] = useState(null);
    const [kontenKhotbah, setKontenKhotbah] = useState(null);
    const [kontenTypeKhotbah, setKontenTypeKhotbah] = useState(0);
    const [kontenFileGambarKhotbah, setKontenFileGambarKhotbah] = useState(null);
    const [kontenGambarKhotbah, setKontenGambarKhotbah] = useState(null);
    const [kontenUrlKhotbah, setKontenUrlKhotbah] = useState("");
    const kontenGambarKhotbahRef = useRef(null);
    // khotbah

    const [isLoadingSimpanKhotbah, setIsLoadingSimpanKhotbah] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRefKhotbah.current = {
            CKEditorKhotbah: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditorKhotbah: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        setEditorLoadedKhotbah(true);
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.waktu_khotbah != null) {
                    setWaktuKhotbah(props.dataSetting.mosques.displays.waktu_khotbah);
                }
                if(props.dataSetting.mosques.displays.konten_jdw_khotbahs != null) {
                    if(props.dataSetting.mosques.displays.konten_jdw_khotbahs.type != null) {
                        setKontenTypeKhotbah(props.dataSetting.mosques.displays.konten_jdw_khotbahs.type);
                    }
                    if(props.dataSetting.mosques.displays.konten_jdw_khotbahs.background != null) {
                        setKontenWarnaBgKhotbah(props.dataSetting.mosques.displays.konten_jdw_khotbahs.background);
                    }
                    if(props.dataSetting.mosques.displays.konten_jdw_khotbahs.text != null) {
                        setKontenKhotbah(props.dataSetting.mosques.displays.konten_jdw_khotbahs.text);
                    }
                    if(props.dataSetting.mosques.displays.konten_jdw_khotbahs.gambar != null) {
                        setKontenGambarKhotbah(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + props.dataSetting.mosques.displays.konten_jdw_khotbahs.gambar.replace("public", "storage"));
                    }
                    if(props.dataSetting.mosques.displays.konten_jdw_khotbahs.url != null) {
                        setKontenUrlKhotbah(props.dataSetting.mosques.displays.konten_jdw_khotbahs.url);
                    }
                }
            }
        }
    }, []);

    const submitSimpanKhotbah = async (event) => {
        event.preventDefault();
        setOpenErrorWarnaBackgroundKhotbah(false);
        setOpenErrorKontenKhotbah(false);
        setOpenErrorGambarKhotbah(false);
        setOpenErrorUrlKhotbah(false);
    
        var lanjut = true;
        if(kontenTypeKhotbah == 1) {
            if(kontenKhotbah == null || kontenKhotbah == "") {
                setOpenErrorKontenKhotbah(true);
                lanjut = false;
            }
            // if(kontenWarnaBgKhotbah == null) {
            //     setOpenErrorWarnaBackgroundKhotbah(true);
            //     lanjut = false;
            // }
        } else if(kontenTypeKhotbah == 2) {
            if(kontenGambarKhotbah == null) {
                setOpenErrorGambarKhotbah(true);
                lanjut = false;
            }
        } else if(kontenTypeKhotbah == 3) {
            if(kontenUrlKhotbah == null || kontenUrlKhotbah == "") {
                setOpenErrorUrlKhotbah(true);
                lanjut = false;
            }
        }
        if(lanjut) {
            setIsLoadingSimpanKhotbah(true);
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
                formData.append('waktu_khotbah', waktuKhotbah);
                formData.append("type", kontenTypeKhotbah);
                if(kontenWarnaBgKhotbah != null && kontenWarnaBgKhotbah != 'null' && kontenWarnaBgKhotbah != '') {
                    formData.append("background", kontenWarnaBgKhotbah);
                }
                formData.append("text", kontenKhotbah);
                formData.append("gambar", kontenFileGambarKhotbah);
                formData.append("url", kontenUrlKhotbah);
                formData.append("screen_size", screenSize);
    
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-jumat/simpan-khotbah`,
                    headers: {
                        "Content-Type": `multipart/form-data`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: formData
                }).then(async (res) => {
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessKhotbah(res.data.message);
                        props.loadData();
                    } else {
                        showErrorKhotbah(res.data.message);
                    }
                    setIsLoadingSimpanKhotbah(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanKhotbah(false);
                if(err.response.data != null) {
                    showErrorKhotbah(err.response.data.message);
                } else {
                    showErrorKhotbah(JSON.stringify(err.response));
                }
            }
        }
    };
    
    function showSucessKhotbah(message) {
        notifyKhotbah("success", message);
    }
    function showErrorKhotbah(message) {
        notifyKhotbah("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanKhotbah}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Waktu Khotbah
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
                                                    if(waktuKhotbah > 1) {
                                                        setWaktuKhotbah(waktuKhotbah - 1);
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
                                                        setWaktuKhotbah(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setWaktuKhotbah(maxMenit);
                                                    } else {
                                                        setWaktuKhotbah(event.target.value);
                                                    }
                                                }}
                                                value={waktuKhotbah}
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
                                                    if(waktuKhotbah < maxMenit) {
                                                        setWaktuKhotbah(waktuKhotbah + 1);
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
                    <Box pb={4} pt={4}>
                        <Separator></Separator>
                    </Box>
                    <Grid pb={2} templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                        <GridItem colSpan={1}>
                            <Flex p={2} flexDirection="column" bg={'gray.200'} borderRadius={{ sm: '5px', lg: '5px' }}>
                                <Radio.Group
                                    onChange={(e) => {
                                        setKontenTypeKhotbah(e.target.value);
                                        setOpenErrorUrlKhotbah(false);
                                        setOpenErrorGambarKhotbah(false);
                                        setOpenErrorKontenKhotbah(false);
                                        setOpenErrorWarnaBackgroundKhotbah(false);
                                    }}
                                    value={kontenTypeKhotbah}
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
                </Flex>
                {(() => {
                    if(kontenTypeKhotbah == 1) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background' isOpen={openErrorWarnaBackgroundKhotbah}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={kontenWarnaBgKhotbah == null ? 'white' : kontenWarnaBgKhotbah}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={() => {
                                            setOpenErrorWarnaBackgroundKhotbah(false);
                                            if(kontenDisplayWarnaBgKhotbah) {
                                                setKontenDisplayWarnaBgKhotbah(false);
                                            } else {
                                                setKontenDisplayWarnaBgKhotbah(true);
                                            }
                                        }}
                                    >
                                        {kontenWarnaBgKhotbah == null ? 'Pilih Warna Background' : kontenWarnaBgKhotbah}
                                    </Button>
                                </Tooltip>
                            </Flex>
                        )
                    } else if(kontenTypeKhotbah== 2) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih gambar' isOpen={openErrorGambarKhotbah}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={'white'}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={(event)=> { 
                                            event.target.value = null;
                                            setOpenErrorGambarKhotbah(false);
                                            kontenGambarKhotbahRef.current?.click()
                                        }}
                                    >
                                        Pilih Gambar
                                        <input 
                                            type='file'
                                            accept="image/*"
                                            multiple={false}
                                            style={{ display: 'none' }}
                                            ref={kontenGambarKhotbahRef}
                                            onChange={(event) => {
                                                let fileObj = event.target.files[0];
                                                setKontenFileGambarKhotbah(fileObj);
                                                const objectUrl = URL.createObjectURL(fileObj)
                                                setKontenGambarKhotbah(objectUrl)
                                            }}
                                        />
                                    </Button>
                                </Tooltip>
                            </Flex>
                        )
                    } else if(kontenTypeKhotbah== 3) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Isi url' isOpen={openErrorUrlKhotbah}>
                                    <Input
                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                        size={{ sm: 'sm' , lg: 'md'}}
                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                        bgColor="white"
                                        color={textColor}
                                        verticalAlign={'middle'}
                                        type="text" placeholder="Masukkan url"
                                        value={kontenUrlKhotbah}
                                        onChange={(event) => {
                                            setOpenErrorUrlKhotbah(false);
                                            setKontenUrlKhotbah(event.target.value);
                                        }}
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
                            if(kontenTypeKhotbah == 1) {
                                return(
                                    <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                                        <Flex flexDirection="column" w={'100%'}>
                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKontenKhotbah}>
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
                                                                if((editorLoadedKhotbah)) {
                                                                    return (
                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                            <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                                fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                                lineHeight={1}
                                                                            >
                                                                                <CKEditorKhotbah
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
                                                                                    onReady={ editorRefKhotbah => {
                                                                                        const toolbarElement = editorRefKhotbah.ui.view.toolbar.element;
                                                                                        toolbarElement.style.borderTop = 'none';
                                                                                        toolbarElement.style.borderLeft = 'none';
                                                                                        toolbarElement.style.borderRight = 'none';
                                                                                        toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                        editorRefKhotbah.editing.view.change( writer => {
                                                                                            // writer.setStyle( 'height', '100vh', editorRefKhotbah.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'background-color', 'transparent', editorRefKhotbah.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'margin-top', '0px', editorRefKhotbah.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'padding-top', '0px', editorRefKhotbah.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'min-height', '100%', editorRefKhotbah.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border', 'none', editorRefKhotbah.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border-bottom-radius', '5px', editorRefKhotbah.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'box-shadow', 'none', editorRefKhotbah.editing.view.document.getRoot());
                                                                                        } );
                                                                                        editorRefKhotbah = editorRefKhotbah;
                                                                                    }}
                                                                                    onError = {
                                                                                        (error, { willEditorRestart } ) => {
                                                                                            if(willEditorRestart ) {
                                                                                                editorRefKhotbah.ui.view.toolbar.element.remove();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    onChange={(event, editor) => {
                                                                                        const data = editor.getData();
                                                                                        setOpenErrorKontenKhotbah(false);
                                                                                        setKontenKhotbah(data);
                                                                                    }}
                                                                                    editor={ ClassicEditorKhotbah }
                                                                                    data = {kontenKhotbah}
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
                        <GridItem colSpan={1} pt={{ sm: kontenTypeKhotbah == 1 ? 2 : 0, lg: 0 }} pl={{ lg: kontenTypeKhotbah == 1 ? 1 : 0, sm: 0 }}>
                            <Flex flexDirection="column" w={'100%'}>
                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Tampil saat waktu khotbah selama {waktuKhotbah} menit
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
                                                if(kontenTypeKhotbah == 0) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image w={'100%'} h={'100%'} src={ '/default_image_waktu_khotbah.png' }/>
                                                        </Flex>
                                                    )
                                                } else if(kontenTypeKhotbah == 1) {
                                                    if((kontenKhotbah == null || kontenKhotbah == "") && kontenWarnaBgKhotbah == null) {
                                                        return (
                                                            <Flex
                                                                w={'100%'} h={'100%'}
                                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                                style={{ border: '1px solid #c6c5c5' }}
                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                justify="center" align="center"
                                                            >
                                                                <Image w={'100%'} h={'100%'} src={ '/template_image_waktu_khotbah.png' }/>
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
                                                                    bg={kontenWarnaBgKhotbah}
                                                                    bgImage={ kontenWarnaBgKhotbah == null ? "url('/template_image_waktu_khotbah.png')" : "url('')"}
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
                                                                        dangerouslySetInnerHTML={{__html: kontenKhotbah}}
                                                                    ></Box>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    }
                                                } else if(kontenTypeKhotbah == 2) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image h={'100%'} src={ kontenGambarKhotbah == null ? '/default_image_waktu_khotbah.png' : kontenGambarKhotbah }/>
                                                        </Flex>
                                                    )
                                                } else if(kontenTypeKhotbah == 3) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Iframe url={kontenUrlKhotbah}
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
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanKhotbah}
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
            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered isOpen={kontenDisplayWarnaBgKhotbah}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent bgColor={'transparent'} width={'auto'} m={0} p={0}>
                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }} m={0} p={0}>
                        <Flex justify="space-between" align="center">
                            <Box></Box>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setKontenDisplayWarnaBgKhotbah(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody m={0} p={0}>
                        <Center>
                            <ChromePicker
                                color={kontenWarnaBgKhotbah == null ? '#FFFFFF' : kontenWarnaBgKhotbah}
                                onChange={(color) => {
                                    setKontenWarnaBgKhotbah(color.hex);
                                }}
                            />
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </chakra.form>
    );
}