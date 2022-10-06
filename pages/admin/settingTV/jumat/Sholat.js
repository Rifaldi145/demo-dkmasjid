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

    const notifyWaktuSholatJumat = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissWaktuSholatJumat = useCallback(() => {
        toast.dismiss();
    }, []);
    
    const [openErrorWarnaBackgroundWaktuSholatJumat, setOpenErrorWarnaBackgroundWaktuSholatJumat] = useState(false);
    const [openErrorKontenWaktuSholatJumat, setOpenErrorKontenWaktuSholatJumat] = useState(false);
    const [openErrorGambarWaktuSholatJumat, setOpenErrorGambarWaktuSholatJumat] = useState(false);

    const editorRefWaktuSholatJumat = useRef();
    const { CKEditorWaktuSholatJumat, ClassicEditorWaktuSholatJumat } = editorRefWaktuSholatJumat.current || {};
    const [editorLoadedWaktuSholatJumat, setEditorLoadedWaktuSholatJumat] = useState(false);

    // khotbah
    const [waktuSholatJumat, setWaktuSholatJumat] = useState(10);
    const [kontenDisplayWarnaBgWaktuSholatJumat, setKontenDisplayWarnaBgWaktuSholatJumat] = useState(false);
    const [kontenWarnaBgWaktuSholatJumat, setKontenWarnaBgWaktuSholatJumat] = useState(null);
    const [kontenWaktuSholatJumat, setKontenWaktuSholatJumat] = useState(null);
    const [kontenTypeWaktuSholatJumat, setKontenTypeWaktuSholatJumat] = useState(0);
    const [kontenFileGambarWaktuSholatJumat, setKontenFileGambarWaktuSholatJumat] = useState(0);
    const [kontenGambarWaktuSholatJumat, setKontenGambarWaktuSholatJumat] = useState(null);
    const kontenGambarWaktuSholatJumatRef = useRef(null);
    // khotbah

    const [isLoadingSimpanWaktuSholatJumat, setIsLoadingSimpanWaktuSholatJumat] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRefWaktuSholatJumat.current = {
            CKEditorWaktuSholatJumat: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditorWaktuSholatJumat: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        setEditorLoadedWaktuSholatJumat(true);
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.waktu_sholat_jumat != null) {
                    setWaktuSholatJumat(props.dataSetting.mosques.displays.waktu_sholat_jumat);
                }
                if(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats != null) {
                    if(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.type != null) {
                        setKontenTypeWaktuSholatJumat(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.type);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.background != null) {
                        setKontenWarnaBgWaktuSholatJumat(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.background);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.text != null) {
                        setKontenWaktuSholatJumat(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.text);
                    }
                    if(props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.gambar != null) {
                        setKontenGambarWaktuSholatJumat(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + props.dataSetting.mosques.displays.konten_wkt_sholat_jumats.gambar.replace("public", "storage"));
                    }
                }
            }
        }
    }, []);

    const submitSimpanWaktuSholatJumat = async (event) => {
        event.preventDefault();
        setOpenErrorWarnaBackgroundWaktuSholatJumat(false);
        setOpenErrorKontenWaktuSholatJumat(false);
        setOpenErrorGambarWaktuSholatJumat(false);
    
        var lanjut = true;
        if(kontenTypeWaktuSholatJumat == 1) {
            if(kontenWaktuSholatJumat == null || kontenWaktuSholatJumat == "") {
                setOpenErrorKontenWaktuSholatJumat(true);
                lanjut = false;
            }
            // if(kontenWarnaBgWaktuSholatJumat == null) {
            //     setOpenErrorWarnaBackgroundWaktuSholatJumat(true);
            //     lanjut = false;
            // }
        } else if(kontenTypeWaktuSholatJumat == 2) {
            if(kontenGambarWaktuSholatJumat == null) {
                setOpenErrorGambarWaktuSholatJumat(true);
                lanjut = false;
            }
        }
        if(lanjut) {
            setIsLoadingSimpanWaktuSholatJumat(true);
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
                formData.append('waktu_sholat_jumat', waktuSholatJumat);
                formData.append("type", kontenTypeWaktuSholatJumat);
                if(kontenWarnaBgWaktuSholatJumat != null && kontenWarnaBgWaktuSholatJumat != 'null' && kontenWarnaBgWaktuSholatJumat != '') {
                    formData.append("background", kontenWarnaBgWaktuSholatJumat);
                }
                formData.append("text", kontenWaktuSholatJumat);
                formData.append("gambar", kontenFileGambarWaktuSholatJumat);
                formData.append("screen_size", screenSize);
    
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-jumat/simpan-waktu-sholat-jumat`,
                    headers: {
                        "Content-Type": `multipart/form-data`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: formData
                }).then(async (res) => {
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessWaktuSholatJumat(res.data.message);
                        props.loadData();
                    } else {
                        showErrorWaktuSholatJumat(res.data.message);
                    }
                    setIsLoadingSimpanWaktuSholatJumat(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanWaktuSholatJumat(false);
                if(err.response.data != null) {
                    showErrorWaktuSholatJumat(err.response.data.message);
                } else {
                    showErrorWaktuSholatJumat(JSON.stringify(err.response));
                }
            }
        }
    };
    
    function showSucessWaktuSholatJumat(message) {
        notifyWaktuSholatJumat("success", message);
    }
    function showErrorWaktuSholatJumat(message) {
        notifyWaktuSholatJumat("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanWaktuSholatJumat}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                        Waktu Sholat Jumat
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
                                                    if(waktuSholatJumat > 1) {
                                                        setWaktuSholatJumat(waktuSholatJumat - 1);
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
                                                        setWaktuSholatJumat(1);
                                                    } else if(event.target.value > maxMenit) {
                                                        setWaktuSholatJumat(maxMenit);
                                                    } else {
                                                        setWaktuSholatJumat(event.target.value);
                                                    }
                                                }}
                                                value={waktuSholatJumat}
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
                                                    if(waktuSholatJumat < maxMenit) {
                                                        setWaktuSholatJumat(waktuSholatJumat + 1);
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
                                        setKontenTypeWaktuSholatJumat(e.target.value);
                                        setOpenErrorGambarWaktuSholatJumat(false);
                                        setOpenErrorKontenWaktuSholatJumat(false);
                                        setOpenErrorWarnaBackgroundWaktuSholatJumat(false);
                                    }}
                                    value={kontenTypeWaktuSholatJumat}
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
                    if(kontenTypeWaktuSholatJumat == 1) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background' isOpen={openErrorWarnaBackgroundWaktuSholatJumat}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={kontenWarnaBgWaktuSholatJumat == null ? 'white' : kontenWarnaBgWaktuSholatJumat}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={() => {
                                            setOpenErrorWarnaBackgroundWaktuSholatJumat(false);
                                            if(kontenDisplayWarnaBgWaktuSholatJumat) {
                                                setKontenDisplayWarnaBgWaktuSholatJumat(false);
                                            } else {
                                                setKontenDisplayWarnaBgWaktuSholatJumat(true);
                                            }
                                        }}
                                    >
                                        {kontenWarnaBgWaktuSholatJumat == null ? 'Pilih Warna Background' : kontenWarnaBgWaktuSholatJumat}
                                    </Button>
                                </Tooltip>
                            </Flex>
                        )
                    } else if(kontenTypeWaktuSholatJumat== 2) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih gambar' isOpen={openErrorGambarWaktuSholatJumat}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={'white'}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={(event)=> { 
                                            event.target.value = null;
                                            setOpenErrorGambarWaktuSholatJumat(false);
                                            kontenGambarWaktuSholatJumatRef.current?.click();
                                        }}
                                    >
                                        Pilih Gambar
                                        <input 
                                            type='file'
                                            accept="image/*"
                                            multiple={false}
                                            style={{ display: 'none' }}
                                            ref={kontenGambarWaktuSholatJumatRef}
                                            onChange={(event) => {
                                                let fileObj = event.target.files[0];
                                                setKontenFileGambarWaktuSholatJumat(fileObj);
                                                const objectUrl = URL.createObjectURL(fileObj)
                                                setKontenGambarWaktuSholatJumat(objectUrl)
                                            }}
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
                            if(kontenTypeWaktuSholatJumat == 1) {
                                return(
                                    <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                                        <Flex flexDirection="column" w={'100%'}>
                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKontenWaktuSholatJumat}>
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
                                                                if((editorLoadedWaktuSholatJumat)) {
                                                                    return (
                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                            <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                                fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                                lineHeight={1}
                                                                            >
                                                                                <CKEditorWaktuSholatJumat
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
                                                                                    onReady={ editorRefWaktuSholatJumat => {
                                                                                        const toolbarElement = editorRefWaktuSholatJumat.ui.view.toolbar.element;
                                                                                        toolbarElement.style.borderTop = 'none';
                                                                                        toolbarElement.style.borderLeft = 'none';
                                                                                        toolbarElement.style.borderRight = 'none';
                                                                                        toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                        editorRefWaktuSholatJumat.editing.view.change( writer => {
                                                                                            // writer.setStyle( 'height', '100vh', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'background-color', 'transparent', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'margin-top', '0px', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'padding-top', '0px', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'min-height', '100%', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border', 'none', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border-bottom-radius', '5px', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'box-shadow', 'none', editorRefWaktuSholatJumat.editing.view.document.getRoot());
                                                                                        } );
                                                                                        editorRefWaktuSholatJumat = editorRefWaktuSholatJumat;
                                                                                    }}
                                                                                    onError = {
                                                                                        (error, { willEditorRestart } ) => {
                                                                                            if(willEditorRestart ) {
                                                                                                editorRefWaktuSholatJumat.ui.view.toolbar.element.remove();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    onChange={(event, editor) => {
                                                                                        const data = editor.getData();
                                                                                        setOpenErrorKontenWaktuSholatJumat(false);
                                                                                        setKontenWaktuSholatJumat(data);
                                                                                    }}
                                                                                    editor={ ClassicEditorWaktuSholatJumat }
                                                                                    data = {kontenWaktuSholatJumat}
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
                        <GridItem colSpan={1} pt={{ sm: kontenTypeWaktuSholatJumat == 1 ? 2 : 0, lg: 0 }} pl={{ lg: kontenTypeWaktuSholatJumat == 1 ? 1 : 0, sm: 0 }}>
                            <Flex flexDirection="column" w={'100%'}>
                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Tampil saat waktu sholat jumat selama {waktuSholatJumat} menit
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
                                                if(kontenTypeWaktuSholatJumat == 0) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image w={'100%'} h={'100%'} src={ '/defaultbg.jpeg' }/>
                                                        </Flex>
                                                    )
                                                } else if(kontenTypeWaktuSholatJumat == 1) {
                                                    if((kontenWaktuSholatJumat == null || kontenWaktuSholatJumat == "") && kontenWarnaBgWaktuSholatJumat == null) {
                                                        return (
                                                            <Flex
                                                                w={'100%'} h={'100%'}
                                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                                style={{ border: '1px solid #c6c5c5' }}
                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                justify="center" align="center"
                                                            >
                                                                <Image w={'100%'} h={'100%'} src={ '/template_image_waktu_sholat_jumat.png' }/>
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
                                                                    bg={kontenWarnaBgWaktuSholatJumat}
                                                                    bgImage={ kontenWarnaBgWaktuSholatJumat == null ? "url('/template_image_waktu_sholat_jumat.png')" : "url('')"}
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
                                                                        dangerouslySetInnerHTML={{__html: kontenWaktuSholatJumat}}
                                                                    ></Box>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    }
                                                } else if(kontenTypeWaktuSholatJumat == 2) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image h={'100%'} src={ kontenGambarWaktuSholatJumat == null ? '/defaultbg.jpeg' : kontenGambarWaktuSholatJumat }/>
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
                            isLoading={isLoadingSimpanWaktuSholatJumat}
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
            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered isOpen={kontenDisplayWarnaBgWaktuSholatJumat}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent bgColor={'transparent'} width={'auto'} m={0} p={0}>
                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }} m={0} p={0}>
                        <Flex justify="space-between" align="center">
                            <Box></Box>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setKontenDisplayWarnaBgWaktuSholatJumat(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody m={0} p={0}>
                        <Center>
                            <ChromePicker
                                color={kontenWarnaBgWaktuSholatJumat == null ? '#FFFFFF' : kontenWarnaBgWaktuSholatJumat}
                                onChange={(color) => {
                                    setKontenWarnaBgWaktuSholatJumat(color.hex);
                                }}
                            />
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </chakra.form>
    );
}