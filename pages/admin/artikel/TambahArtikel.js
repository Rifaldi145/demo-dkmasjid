/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Button,
    Flex,
    Grid,
    GridItem,
    Text,
    useColorModeValue,
    FormControl,
    Input,
    chakra,
    Center,
    Tooltip,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Textarea,
    Alert,
    AlertIcon,
    Stack,
    AspectRatio,
    Image,
    Switch
} from "@chakra-ui/react";
import Loader from 'react-loader-spinner';
import Card from "../../components/Card/Card.js";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import toast from "../../../components/Toast";
import { Radio } from "antd";
import {
    Select,
} from "chakra-react-select";
import {
    ImFilePicture
} from "react-icons/im";

export default function TambahArtikel() {
    let history = useHistory();
    
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;
    
    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const [openErrorPhotoArtikel, setOpenErrorPhotoArtikel] = useState(false);
    const photoArtikelRef = useRef(null);
    const [filePhotoArtikel, setFilePhotoArtikel] = useState(null);
    const [photoArtikel, setPhotoArtikel] = useState(null);

    const [openErrorTitle, setOpenErrorTitle] = useState(false);
    const [title, setTitle] = useState("");

    const [openErrorDescription, setOpenErrorDescription] = useState(false);
    const [description, setDescription] = useState(null);

    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [editorLoaded, setEditorLoaded] = useState(false);

    const [maxDays, setMaxDays] = useState(60);
    const [expiredDays, setExpiredDays] = useState(7);

    const [active, setActive] = useState(true);

    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require('../../../ckeditor5-build-with-htmlembed-master')
        }
        setEditorLoaded(true);
    }, []);

    const submitSimpanArtikel = async (event) => {
        event.preventDefault();
        setOpenErrorPhotoArtikel(false);
        setOpenErrorTitle(false);
        setOpenErrorDescription(false);

        var lanjut = true;

        if(title == null || title == "") {
            setOpenErrorTitle(true);
            lanjut = false;
        }
        if(filePhotoArtikel == null) {
            setOpenErrorPhotoArtikel(true);
            lanjut = false;
        }
        if(description == null || description == "") {
            setOpenErrorDescription(true);
            lanjut = false;
        }

         if(lanjut) {
            setIsLoadingSimpan(true);
            try {
                var formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                if(filePhotoArtikel != null) {
                    formData.append("foto", filePhotoArtikel);
                }
                formData.append('active', active ? 1 : 0);
                formData.append('expired_days', expiredDays);
                
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/article/simpan`,
                    headers: {
                        "Content-Type": `multipart/form-data`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: formData
                }).then(async (res) => {
                    if(res.data.success) {
                        showSucess(res.data.message);
                        history.goBack();
                    } else {
                        showError(res.data.message);
                    }
                    setIsLoadingSimpan(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpan(false);
                if(err.response.data != null) {
                    showError(err.response.data.message);
                } else {
                    showError(JSON.stringify(err.response));
                }
            }
        }
    };
    
    function showSucess(message) {
        notify("success", message);
    }
    
    function showError(message) {
        notify("error", message);
    }
    
    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }} w={'100%'}>
            <Center w={'100%'}>
                <Flex overflowX={{ sm: "scroll", xl: "hidden" }} w={'100%'}
                    justify="center" align="center"
                >
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} p={{ sm: 2.5, lg: 5 }}>
                        <chakra.form onSubmit={submitSimpanArtikel}>
                            <FormControl>
                                <Flex flexDirection="column">
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Foto (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <AspectRatio w={{ sm: '40%', lg: '75%' }} ratio={5/4} cursor={'pointer'}>
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Upload foto!' placement='bottom-start' isOpen={openErrorPhotoArtikel}>
                                                    <Flex flexDirection={'row'} w={'100%'} h={'100%'} borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bg={'#B3A5DA'}
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                            onClick={(event)=> {
                                                                setOpenErrorPhotoArtikel(false);
                                                                event.target.value = null;
                                                                photoArtikelRef.current?.click()
                                                            }}
                                                        >
                                                            <input 
                                                                type='file'
                                                                accept="image/*"
                                                                multiple={false}
                                                                style={{ display: 'none' }}
                                                                ref={photoArtikelRef}
                                                                onChange={(event) => {
                                                                    let fileObj = event.target.files[0];
                                                                    setFilePhotoArtikel(fileObj);
                                                                    const objectUrl = URL.createObjectURL(fileObj)
                                                                    setPhotoArtikel(objectUrl)
                                                                }}
                                                            />
                                                            {
                                                                photoArtikel != null ?
                                                                    <Image borderRadius={{ sm: '7.5px', lg: '7.5px' }} p={'2.5px'} w={'100%'} h={'100%'} src={photoArtikel}/>
                                                                :
                                                                    <ImFilePicture style={{ width: '70%', height: '70%', color: 'white' }} />
                                                            }
                                                        </Flex>
                                                    </Flex>
                                                </Tooltip>
                                            </AspectRatio>
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Judul Artikel (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi judul artikel!' placement='bottom-start' isOpen={openErrorTitle}>
                                                    <Textarea
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        type="text" placeholder="Isi judul"
                                                        value={title}
                                                        rows={2}
                                                        onChange={(event) => {
                                                            setOpenErrorTitle(false);
                                                            setTitle(event.target.value);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Isi Artikel (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi deskripsi artikel!' placement='bottom-start' isOpen={openErrorDescription}>
                                                    <Flex
                                                        flexDirection={'column'}
                                                        w={'100%'}
                                                        justify="center" align="center"
                                                    >
                                                        <Flex flexDirection={'row'} w={'100%'} h={'auto'} justify="center" align="center"
                                                            style={{ border: '1px solid #c6c5c5', borderRadius: '5px' }}
                                                            bg={'blackAlpha.300'}
                                                        >
                                                            {(() => {
                                                                if((editorLoaded)) {
                                                                    return (
                                                                        <Flex flexDirection={'column'} w={'100%'} h={'100%'}>
                                                                            <Flex flexDirection={'column'} w={'100%'} h={'100%'}
                                                                                fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                                lineHeight={1}
                                                                            >
                                                                                <CKEditor
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
                                                                                    onReady={ editorRef => {
                                                                                        const toolbarElement = editorRef.ui.view.toolbar.element;
                                                                                        toolbarElement.style.borderTop = 'none';
                                                                                        toolbarElement.style.borderLeft = 'none';
                                                                                        toolbarElement.style.borderRight = 'none';
                                                                                        toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                        editorRef.editing.view.change( writer => {
                                                                                            // writer.setStyle( 'height', '100vh', editorRef.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'background-color', 'transparent', editorRef.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'margin-top', '0px', editorRef.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'padding-top', '0px', editorRef.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'min-height', '100%', editorRef.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border', 'none', editorRef.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'border-bottom-radius', '5px', editorRef.editing.view.document.getRoot());
                                                                                            writer.setStyle( 'box-shadow', 'none', editorRef.editing.view.document.getRoot());
                                                                                        } );
                                                                                        editorRef = editorRef;
                                                                                    }}
                                                                                    onError = {
                                                                                        (error, { willEditorRestart } ) => {
                                                                                            if(willEditorRestart ) {
                                                                                                editorRef.ui.view.toolbar.element.remove();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    onChange={(event, editor) => {
                                                                                        const data = editor.getData();
                                                                                        setOpenErrorDescription(false);
                                                                                        setDescription(data);
                                                                                    }}
                                                                                    editor={ ClassicEditor }
                                                                                    data = {description}
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
                                                    </Flex>
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Berakhir dalam
                                                </Text>
                                                <Text textAlign={'start'} color={'red'} fontSize={{ sm: 'xs', lg: 'sm' }} fontStyle={'italic'}>
                                                    Durasi dalam hari
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={{ sm: '50%', lg: '60%' }} h={'100%'} justify="start" align="start">
                                                <InputGroup
                                                    w={'100%'}
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
                                                            if(expiredDays > 1) {
                                                                setExpiredDays(expiredDays - 1);
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
                                                                setExpiredDays(1);
                                                            } else if(event.target.value > maxDays) {
                                                                setExpiredDays(maxDays);
                                                            } else {
                                                                setExpiredDays(event.target.value);
                                                            }
                                                        }}
                                                        value={expiredDays}
                                                        w={'100%'}
                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        textAlign={'center'}
                                                        borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                        borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                        type="number"
                                                    />
                                                    <InputRightAddon
                                                        cursor={'pointer'}
                                                        borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                        borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                        onClick={() => {
                                                            if(expiredDays < maxDays) {
                                                                setExpiredDays(expiredDays + 1);
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
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Status
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Switch
                                                    colorscheme="teal" me="10px" isChecked={active}
                                                    onChange={(event) => {
                                                        setActive(event.target.checked);
                                                    }}
                                                />
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                </Flex>
                            </FormControl>
                            <Center>
                                <Flex justify="space-between" align="center" pt={4} w="100%">
                                    <Button
                                        onClick={history.goBack}
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        bg="gray.200"
                                        color={textColor}
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                    >
                                        <Flex align="center" justifyContent="center" cursor="pointer">
                                            <Text>
                                                Kembali
                                            </Text>
                                        </Flex>
                                    </Button>
                                    <Button
                                        isLoading={isLoadingSimpan}
                                        type="submit"
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        bg="#6a5aa3"
                                        color="white"
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                    >
                                        Simpan
                                    </Button>
                                </Flex>
                            </Center>
                        </chakra.form>
                    </Card>
                </Flex>
            </Center>
        </Flex>
    );
}
