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

export default function SholatSegeraDimulai(props) {
    const [isSm, isMd, isLg] = useMediaQuery([
        '(max-width: 320px)',
        '(min-width: 320px)',
        '(min-width: 768px)',
    ])
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const notifySholatSegeraDimulai = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissDilarangSholat = useCallback(() => {
        toast.dismiss();
    }, []);

    const editorRefSholatSegeraDimulai = useRef();
    const { CKEditorSholatSegeraDimulai, ClassicEditorSholatSegeraDimulai } = editorRefSholatSegeraDimulai.current || {};
    const [editorLoadedSholatSegeraDimulai, setEditorLoadedSholatSegeraDimulai] = useState(false);

    const [openErrorWarnaBackgroundSholatSegeraDimulai, setOpenErrorWarnaBackgroundSholatSegeraDimulai] = useState(false);
    const [openErrorKontenSholatSegeraDimulai, setOpenErrorKontenSholatSegeraDimulai] = useState(false);

    const [kontenDisplayWarnaBgSholatSegeraDimulai, setKontenDisplayWarnaBgSholatSegeraDimulai] = useState(false);
    const [kontenWarnaBgSholatSegeraDimulai, setKontenWarnaBgSholatSegeraDimulai] = useState(null);
    const [kontenSholatSegeraDimulai, setKontenSholatSegeraDimulai] = useState(null);
    const [kontenTypeSholatSegeraDimulai, setKontenTypeSholatSegeraDimulai] = useState(0);

    const [isLoadingSimpanSholatSegeraDimulai, setIsLoadingSimpanSholatSegeraDimulai] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRefSholatSegeraDimulai.current = {
            CKEditorSholatSegeraDimulai: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditorSholatSegeraDimulai: require('../../../../ckeditor5-build-with-htmlembed-master/build/ckeditor')
        }
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.konten_sholat_segera_dimulais != null) {
                    if(props.dataSetting.mosques.displays.konten_sholat_segera_dimulais.type != null) {
                        setKontenTypeSholatSegeraDimulai(props.dataSetting.mosques.displays.konten_sholat_segera_dimulais.type);
                    }
                    if(props.dataSetting.mosques.displays.konten_sholat_segera_dimulais.background != null) {
                        setKontenWarnaBgSholatSegeraDimulai(props.dataSetting.mosques.displays.konten_sholat_segera_dimulais.background);
                    }
                    if(props.dataSetting.mosques.displays.konten_sholat_segera_dimulais.text != null) {
                        setKontenSholatSegeraDimulai(props.dataSetting.mosques.displays.konten_sholat_segera_dimulais.text);
                    }
                }
            }
            setEditorLoadedSholatSegeraDimulai(true);
        }
    }, []);
    
    const submitSimpanSholatSegeraDimulai = async (event) => {
        event.preventDefault();
        setOpenErrorWarnaBackgroundSholatSegeraDimulai(false);
        setOpenErrorKontenSholatSegeraDimulai(false);
        var lanjut = true;
        if(kontenTypeSholatSegeraDimulai == 1) {
            if(kontenSholatSegeraDimulai == null || kontenSholatSegeraDimulai == "") {
                setOpenErrorKontenSholatSegeraDimulai(true);
                lanjut = false;
            }
            // if(kontenWarnaBgSholatSegeraDimulai == null) {
            //     setOpenErrorWarnaBackgroundSholatSegeraDimulai(true);
            //     lanjut = false;
            // }
        }
        if(lanjut) {
            setIsLoadingSimpanSholatSegeraDimulai(true);
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
                    type: kontenTypeSholatSegeraDimulai,
                    background: (kontenWarnaBgSholatSegeraDimulai != null && kontenWarnaBgSholatSegeraDimulai != "") ? kontenWarnaBgSholatSegeraDimulai : null,
                    text: (kontenSholatSegeraDimulai != null && kontenSholatSegeraDimulai != "") ? kontenSholatSegeraDimulai : null,
                    screen_size: screenSize
                };
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu/simpan-sholat-segera-dimulai`,
                    headers: {
                        "Content-Type": `application/json`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: postData
                }).then(async (res) => {
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessSholatSegeraDimulai(res.data.message);
                        props.loadData();
                    } else {
                        showErrorSholatSegeraDimulai(res.data.message);
                    }
                    setIsLoadingSimpanSholatSegeraDimulai(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanSholatSegeraDimulai(false);
                if(err.response.data != null) {
                    showErrorSholatSegeraDimulai(err.response.data.message);
                } else {
                    showErrorSholatSegeraDimulai(JSON.stringify(err.response));
                }
            }
        }
    };
    
    function showSucessSholatSegeraDimulai(message) {
        notifySholatSegeraDimulai("success", message);
    }
    function showErrorSholatSegeraDimulai(message) {
        notifySholatSegeraDimulai("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanSholatSegeraDimulai}>
            <FormControl pt={5}>
                <Grid pb={2} templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                    <GridItem colSpan={1}>
                        <Flex p={2} flexDirection="column" bg={'gray.200'} borderRadius={{ sm: '5px', lg: '5px' }}>
                            <Radio.Group
                                onChange={(e) => {
                                    setKontenTypeSholatSegeraDimulai(e.target.value);
                                    setOpenErrorWarnaBackgroundSholatSegeraDimulai(false);
                                    setOpenErrorKontenSholatSegeraDimulai(false);
                                }}
                                value={kontenTypeSholatSegeraDimulai}
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
                    if(kontenTypeSholatSegeraDimulai == 1) {
                        return (
                            <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background' isOpen={openErrorWarnaBackgroundSholatSegeraDimulai}>
                                    <Button
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        color={textColor}
                                        bg={kontenWarnaBgSholatSegeraDimulai == null ? 'white' : kontenWarnaBgSholatSegeraDimulai}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                        onClick={() => {
                                            setOpenErrorWarnaBackgroundSholatSegeraDimulai(false);
                                            if(kontenDisplayWarnaBgSholatSegeraDimulai) {
                                                setKontenDisplayWarnaBgSholatSegeraDimulai(false);
                                            } else {
                                                setKontenDisplayWarnaBgSholatSegeraDimulai(true);
                                            }
                                        }}
                                    >
                                        {kontenWarnaBgSholatSegeraDimulai == null ? 'Pilih Warna Background' : kontenWarnaBgSholatSegeraDimulai}
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
                        if(kontenTypeSholatSegeraDimulai == 1) {
                            return(
                                <GridItem colSpan={1} pr={{ lg: 1, sm: 0 }}>
                                    <Flex flexDirection="column" w={'100%'}>
                                        <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKontenSholatSegeraDimulai}>
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
                                                            if((editorLoadedSholatSegeraDimulai)) {
                                                                return (
                                                                    <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                            fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                            lineHeight={1}
                                                                        >
                                                                            <CKEditorSholatSegeraDimulai
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
                                                                                onReady={ editorRefSholatSegeraDimulai => {
                                                                                    const toolbarElement = editorRefSholatSegeraDimulai.ui.view.toolbar.element;
                                                                                    toolbarElement.style.borderTop = 'none';
                                                                                    toolbarElement.style.borderLeft = 'none';
                                                                                    toolbarElement.style.borderRight = 'none';
                                                                                    toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                    editorRefSholatSegeraDimulai.editing.view.change( writer => {
                                                                                        // writer.setStyle( 'height', '100vh', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'background-color', 'transparent', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'margin-top', '0px', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'padding-top', '0px', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'min-height', '100%', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'border', 'none', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'border-bottom-radius', '5px', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                        writer.setStyle( 'box-shadow', 'none', editorRefSholatSegeraDimulai.editing.view.document.getRoot());
                                                                                    } );
                                                                                    editorRefSholatSegeraDimulai = editorRefSholatSegeraDimulai;
                                                                                }}
                                                                                onError = {
                                                                                    (error, { willEditorRestart } ) => {
                                                                                        if(willEditorRestart ) {
                                                                                            editorRefSholatSegeraDimulai.ui.view.toolbar.element.remove();
                                                                                        }
                                                                                    }
                                                                                }
                                                                                onChange={(event, editor) => {
                                                                                    const data = editor.getData();
                                                                                    setOpenErrorKontenSholatSegeraDimulai(false);
                                                                                    setKontenSholatSegeraDimulai(data);
                                                                                }}
                                                                                editor={ ClassicEditorSholatSegeraDimulai }
                                                                                data = {kontenSholatSegeraDimulai}
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
                    <GridItem colSpan={1} pt={{ sm: kontenTypeSholatSegeraDimulai == 1 ? 2 : 0, lg: 0 }} pl={{ lg: kontenTypeSholatSegeraDimulai == 1 ? 1 : 0, sm: 0 }}>
                        <Flex flexDirection="column" w={'100%'}>
                            <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                    <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                        <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                            Tampil selama 1 menit setelah waktu mundur iqamah
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
                                            if(kontenTypeSholatSegeraDimulai == 0) {
                                                return (
                                                    <Flex
                                                        w={'100%'} h={'100%'}
                                                        bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                        style={{ border: '1px solid #c6c5c5' }}
                                                        borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                        justify="center" align="center"
                                                    >
                                                        <Image w={'100%'} h={'100%'} src={ '/default_image_sholat_segera_dimulai.png' }/>
                                                    </Flex>
                                                )
                                            } else if(kontenTypeSholatSegeraDimulai == 1) {
                                                if((kontenSholatSegeraDimulai == null || kontenSholatSegeraDimulai == "") && kontenWarnaBgSholatSegeraDimulai == null) {
                                                    return (
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                        >
                                                            <Image w={'100%'} h={'100%'} src={ '/template_image_sholat_segera_dimulai.png' }/>
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
                                                                bg={kontenWarnaBgSholatSegeraDimulai}
                                                                bgImage={ kontenWarnaBgSholatSegeraDimulai == null ? "url('/template_image_sholat_segera_dimulai.png')" : "url('')"}
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
                                                                    dangerouslySetInnerHTML={{__html: kontenSholatSegeraDimulai}}
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
                            isLoading={isLoadingSimpanSholatSegeraDimulai}
                            type="submit"
                            size={{ sm: 'sm', lg: 'sm' }}
                            fontSize={{ sm: 'xs', lg: 'sm' }}
                            bg="#6a5aa3"
                            color="white"
                            _hover={{ bg: "#B3A5DA", color: textColor }}
                        >
                            simpan
                        </Button>
                        : <></>
                    }
                </Flex>
            </Center>
            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered isOpen={kontenDisplayWarnaBgSholatSegeraDimulai}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent bgColor={'transparent'} width={'auto'} m={0} p={0}>
                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }} m={0} p={0}>
                        <Flex justify="space-between" align="center">
                            <Box></Box>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setKontenDisplayWarnaBgSholatSegeraDimulai(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody m={0} p={0}>
                        <Center>
                            <ChromePicker
                                color={kontenWarnaBgSholatSegeraDimulai == null ? '#FFFFFF' : kontenWarnaBgSholatSegeraDimulai}
                                onChange={(color) => {
                                    setKontenWarnaBgSholatSegeraDimulai(color.hex);
                                }}
                            />
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </chakra.form>
    );
}