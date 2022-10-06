/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    chakra,
    FormControl,
    Flex,
    useColorModeValue,
    Center,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    Alert,
    AlertIcon,
    Text,
    Grid,
    GridItem,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Input,
    Switch,
    Box,
    Tooltip,
    Button,
    AspectRatio,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    useMediaQuery,
    Textarea
} from "@chakra-ui/react";
import Card from "../../../components/Card/Card.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { ChromePicker } from "react-color";
const { fontfam } = require('../../../../theme/ListFontFamily')
import { Separator } from "../../../../theme/components/Separator/Separator";
import toast from "../../../../components/Toast";
import { Radio } from "antd";
import Iframe from 'react-iframe'
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { BsArrowsFullscreen } from "react-icons/bs";
import {
    Select
} from "chakra-react-select";
import TextareaAutosize from 'react-textarea-autosize';

export default function EditKontenLainnya() {
    const [isSm, isMd, isLg] = useMediaQuery([
        '(max-width: 320px)',
        '(min-width: 320px)',
        '(min-width: 768px)',
    ])

    let history = useHistory();
    const { uid } = useParams();

    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxDetik = 6400;
    const maxHari = 30;

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const [dateNow, setDateNow] = useState(new Date());
    const tgl_skrng = formatTgl(dateNow);

    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);

    const [openErrorWarnaBackground, setOpenErrorWarnaBackground] = useState(false);
    const [openErrorKonten, setOpenErrorKonten] = useState(false);
    const [openErrorGambar, setOpenErrorGambar] = useState(false);
    const [openErrorUrl, setOpenErrorUrl] = useState(false);

    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [editorLoaded, setEditorLoaded] = useState(false);

    const [hariBerakhir, setHariBerakhir] = useState(null);
    const [durasi, setDurasi] = useState(5);
    const [maxUrut, setMaxUrut] = useState(1);
    const [urut, setUrut] = useState(1);
    const [terusMenerus, setTerusMenerus] = useState(true);
    const [batasTayang, setBatasTayang] = useState(7);
    const [active, setActive] = useState(true);
    
    
    const [kontenTypeSelect, setKontenTypeSelect] = useState(null);
    const [kontenType, setKontenType] = useState(0);

    const [kontenDisplayWarnaBg, setKontenDisplayWarnaBg] = useState(false);
    const [kontenWarnaBg, setKontenWarnaBg] = useState(null);

    const [konten, setKonten] = useState(null);

    const [kontenFileGambar, setKontenFileGambar] = useState(null);
    const [kontenGambar, setKontenGambar] = useState(null);
    const [kontenGambarResize, setKontenGambarResize] = useState('100% 100%');
    const kontenGambarRef = useRef(null);

    const [kontenTypeTexarea, setKontenTypeTexarea] = useState(0);
    const [kontenTypeSelectTextarea, setKontenTypeSelectTextarea] = useState(null);

    const [kontenTypeTexareaGambar1, setKontenTypeTexareaGambar1] = useState('template_image_konten_lainnya.png');
    const [kontenTypeTexareaGambar2, setKontenTypeTexareaGambar2] = useState('template_image_waktu_sholat_jumat.png');
    const [kontenTextareaJudul, setKontenTextareaJudul] = useState("");
    const [kontenTextareaIsi, setKontenTextareaIsi] = useState("");

    const [kontenUrl, setKontenUrl] = useState("");

    
    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    function formatTgl(date) {
        let dateObj = new Date(date);
        let bulans = "";
        if((dateObj.getMonth() + 1) == 1) {
            bulans = "01";
        } else if((dateObj.getMonth() + 1) == 2) {
            bulans = "02";
        } else if((dateObj.getMonth() + 1) == 3) {
            bulans = "03";
        } else if((dateObj.getMonth() + 1) == 4) {
            bulans = "04";
        } else if((dateObj.getMonth() + 1) == 5) {
            bulans = "05";
        } else if((dateObj.getMonth() + 1) == 6) {
            bulans = "06";
        } else if((dateObj.getMonth() + 1) == 7) {
            bulans = "07";
        } else if((dateObj.getMonth() + 1) == 8) {
            bulans = "08";
        } else if((dateObj.getMonth() + 1) == 9) {
            bulans = "09";
        } else if((dateObj.getMonth() + 1) == 10) {
            bulans = "10";
        } else if((dateObj.getMonth() + 1) == 11) {
            bulans = "11";
        } else if((dateObj.getMonth() + 1) == 12) {
            bulans = "12";
        }
        let myDate = `${(dateObj.getUTCFullYear())}-${bulans}-${('0' + dateObj.getDate()).slice(-2)}`;
        return myDate;
    }

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        setEditorLoaded(true);
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        setErrorLoading(null);
        try {
            await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/edit-konten-lainnya/${uid}`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
            }).then(async (res) => {
                if(res.data.konten.durasi != null) {
                    setDurasi(res.data.konten.durasi);
                }
                if(res.data.konten.urut != null) {
                    setUrut(res.data.konten.urut);
                }
                if(res.data.konten.selalu_tayang == 1) {
                    setTerusMenerus(true);
                } else {
                    setTerusMenerus(false);
                    if(res.data.konten.selesai_tayang != null) {
                        var date_1 = new Date(formatTgl(res.data.konten.created_at));
                        date_1.setDate(date_1.getDate() + res.data.konten.selesai_tayang);
                        var date_2 = new Date(tgl_skrng);
                        var difference = date_1.getTime() - date_2.getTime();
                        setHariBerakhir(Math.ceil(difference / (1000 * 3600 * 24)));
                        setBatasTayang(res.data.konten.selesai_tayang);
                    }
                }
                if(res.data.konten.active == 1) {
                    setMaxUrut(parseInt(res.data.maxUrut));
                    setActive(true);
                } else {
                    setMaxUrut(parseInt(res.data.maxUrut) + 1);
                    setUrut(parseInt(res.data.maxUrut) + 1);
                    setActive(false);
                }

                if(res.data.konten.type != null) {
                    setKontenTypeSelect({
                        label: (res.data.konten.type == 0) ? 'Default' : (res.data.konten.type == 1) ? 'Teks' : (res.data.konten.type == 2) ? 'Gambar' : (res.data.konten.type == 3) ? 'Url' : (res.data.konten.type == 4) ? 'Teks & Gambar' : 'Pilih Tipe Konten',
                        value: res.data.konten.type,
                    });
                    setKontenType(res.data.konten.type);
                } else {
                    setKontenTypeSelect({
                        label: 'Default',
                        value: '0',
                    });
                    setKontenType(0);
                }
                
                if(res.data.konten.background != null) {
                    setKontenWarnaBg(res.data.konten.background);
                }
                if(res.data.konten.text != null) {
                    setKonten(res.data.konten.text);
                }
                if(res.data.konten.gambar != null) {
                    setKontenGambar(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + res.data.konten.gambar.replace("public", "storage"));
                    console.log(res.data.konten.gambar_size);
                    if(res.data.konten.gambar_size != null) {
                        setKontenGambarResize(res.data.konten.gambar_size);
                    }
                }
                if(res.data.konten.url != null) {
                    setKontenUrl(res.data.konten.url);
                }

                if(res.data.konten.textarea_type != null) {
                    setKontenTypeSelectTextarea({
                        label: (res.data.konten.type == 0) ? 'Gambar 1' : (res.data.konten.type == 1) ? 'Gambar 2' : 'Pilih Gambar',
                        value: res.data.konten.textarea_type,
                    });
                    setKontenTypeTexarea(res.data.konten.textarea_type);
                } else {
                    setKontenTypeSelectTextarea({
                        label: 'Gambar 1',
                        value: '0',
                    });
                    setKontenTypeTexarea(0);
                }

                if(res.data.konten.textarea_judul != null) {
                    setKontenTextareaJudul(res.data.konten.textarea_judul);
                }

                if(res.data.konten.textarea_isi != null) {
                    setKontenTextareaIsi(res.data.konten.textarea_isi);
                }

                setLoading(false);
            });
        } catch (err) {
            setLoading(false);
            if(err.response.data != null) {
                setErrorLoading(err.response.data.message);
            } else {
                setErrorLoading(JSON.stringify(err.response));
            }
            console.log("err", err.response);
        }
    }

    async function handleChangeKontenType(selectedOptions) {
        setKontenTypeSelect(selectedOptions);
        setKontenType(selectedOptions.value);
    }

    async function handleChangeKontenTypeTextArea(selectedOptions) {
        setKontenTypeSelectTextarea(selectedOptions);
        setKontenTypeTexarea(selectedOptions.value);
    }

    const submitSimpan = async (event) => {
        event.preventDefault();
        setOpenErrorWarnaBackground(false);
        setOpenErrorKonten(false);
        setOpenErrorGambar(false);
        setOpenErrorUrl(false);
    
        var lanjut = true;
        if(kontenType == 1) {
            if(konten == null || konten == "") {
                setOpenErrorKonten(true);
                lanjut = false;
            }
            // if(kontenWarnaBg == null) {
            //     setOpenErrorWarnaBackground(true);
            //     lanjut = false;
            // }
        } else if(kontenType == 2) {
            if(kontenGambar == null) {
                setOpenErrorGambar(true);
                lanjut = false;
            }
        } else if(kontenType == 3) {
            if(kontenUrl == null || kontenUrl == "") {
                setOpenErrorUrl(true);
                lanjut = false;
            }
        }
        if(lanjut) {
            setIsLoadingSimpan(true);
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
                formData.append('uid', uid);
                formData.append('durasi', durasi);
                formData.append('urut', urut);
                formData.append('selalu_tayang', terusMenerus ? 1 : 0);
                formData.append('selesai_tayang', batasTayang);
                formData.append('active', active ? 1 : 0);
                formData.append("type", kontenType);
                if(kontenWarnaBg != null && kontenWarnaBg != 'null' && kontenWarnaBg != '') {
                    formData.append("background", kontenWarnaBg);
                }
                formData.append("text", konten);
                formData.append("gambar", kontenFileGambar);
                formData.append("gambar_size", kontenGambarResize);
                formData.append("textarea_judul", kontenTextareaJudul);
                formData.append("textarea_isi", kontenTextareaIsi);
                formData.append("textarea_background", kontenTypeTexarea == 0 ? kontenTypeTexareaGambar1 : kontenTypeTexareaGambar2);
                formData.append("textarea_type", kontenTypeTexarea);
                formData.append("url", kontenUrl);
                formData.append("screen_size", screenSize);
    
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/tambah-konten-lainnya/update`,
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

    const chakraStyles = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            p: { sm: 2, lg: 4 },
            background: 'purple2.soft',
            fontSize: { sm: '14px', lg: '16px' },
            fontWeight: 'normal',
            lineHeight: 1.2,
            color:'white'
        }),
        menuList: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            background: 'white',
            fontSize: { sm: '14px', lg: '16px' },
            fontWeight: 'normal',
            lineHeight: 1.2,
            color:'#4F4F4F'
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            background: state.isSelected ? 'purple2.soft' : 'white',
            fontSize: { sm: '14px', lg: '16px' },
            fontWeight: 'normal',
            lineHeight: 1.2,
            color: state.isSelected ? 'white' : '#4F4F4F'
        }),
        control: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            background: 'white',
            fontSize: { sm: '14px', lg: '16px' },
            fontWeight: 'normal',
            lineHeight: 1.2,
            color:'#4F4F4F',
            p: 0,
            m: 0,
        }),
    };

    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }} w={'100%'}>
            <Center w={'100%'}>
                <Flex overflowX={{ sm: "scroll", xl: "hidden" }} w={'100%'}
                    justify="center" align="center"
                >
                {
                    loading ?
                    <Flex p={5}>
                        <Loader type="Circles" color="#B3A5DA" height={40} width={40} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                            
                        </Loader>
                    </Flex>
                    :
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} p={{ sm: 2.5, lg: 5 }}>
                        {(() => {
                            if(errorLoading) {
                                return (
                                    <Alert rounded={'md'} status="error" mb="6">
                                        <AlertIcon />
                                        <Text color={textColor} fontSize={{ sm: '2xs', lg: 'sm' }} fontWeight={'bold'}>
                                            {errorLoading}
                                        </Text>
                                    </Alert>
                                )
                            } else {
                                return(
                                    <></>
                                )
                            }
                        })()}
                        <chakra.form onSubmit={submitSimpan}>
                            <FormControl>
                                <Flex flexDirection="column">
                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}} pb={2}>
                                        <GridItem colSpan={1}>
                                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                <GridItem colSpan={2}>
                                                    <Flex flexDirection="column" h={'100%'} justify="center" align="start">
                                                        <Text textStyle='isi' pb={1}>
                                                            Durasi
                                                        </Text>
                                                        <Text textStyle='isi_12' color={'red'} fontStyle={'italic'}>
                                                            Durasi dalam detik
                                                        </Text>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan={3}>
                                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                                        <InputGroup
                                                            w={{ sm: '75%', lg: '50%' }}
                                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                                            verticalAlign={'middle'}
                                                            textAlign={'center'}
                                                        >
                                                            <InputLeftAddon
                                                                cursor={'pointer'}
                                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                                onClick={() => {
                                                                    if(durasi > 1) {
                                                                        setDurasi(durasi - 1);
                                                                    }
                                                                }}
                                                                children={
                                                                <Center>
                                                                    <Text textStyle='isi'>
                                                                        -
                                                                    </Text>
                                                                </Center>
                                                            }/>
                                                            <Input
                                                                onChange={(event) => {
                                                                    if(event.target.value < 1) {
                                                                        setDurasi(1);
                                                                    } else if(event.target.value > maxDetik) {
                                                                        setDurasi(maxDetik);
                                                                    } else {
                                                                        setDurasi(event.target.value);
                                                                    }
                                                                }}
                                                                value={durasi}
                                                                w={'100%'}
                                                                fontSize={{ sm: '14px', lg: '16px' }}
                                                                fontWeight={'normal'}
                                                                lineHeight={1.2}
                                                                color={'#4F4F4F'}
                                                                bgColor="white"
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
                                                                    if(durasi < maxDetik) {
                                                                        setDurasi(durasi + 1);
                                                                    }
                                                                }}
                                                                children={
                                                                <Center>
                                                                    <Text textStyle='isi'>
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
                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1}>
                                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                <GridItem colSpan={2}>
                                                    <Flex flexDirection="column" h={'100%'} justify="center" align="start">
                                                        <Text textStyle='isi'>
                                                            Urut
                                                        </Text>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan={3}>
                                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                                        <InputGroup
                                                            w={{ sm: '75%', lg: '50%' }}
                                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                                            verticalAlign={'middle'}
                                                            textAlign={'center'}
                                                        >
                                                            <InputLeftAddon
                                                                cursor={'pointer'}
                                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                                onClick={() => {
                                                                    if(urut > 1) {
                                                                        setUrut(urut - 1);
                                                                    }
                                                                }}
                                                                children={
                                                                <Center>
                                                                    <Text textStyle='isi'>
                                                                        -
                                                                    </Text>
                                                                </Center>
                                                            }/>
                                                            <Input
                                                                onChange={(event) => {
                                                                    if(event.target.value < 1) {
                                                                        setUrut(1);
                                                                    } else if(event.target.value > maxUrut) {
                                                                        setUrut(maxUrut);
                                                                    } else {
                                                                        setUrut(event.target.value);
                                                                    }
                                                                }}
                                                                value={urut}
                                                                w={'100%'}
                                                                fontSize={{ sm: '14px', lg: '16px' }}
                                                                fontWeight={'normal'}
                                                                lineHeight={1.2}
                                                                color={'#4F4F4F'}
                                                                bgColor="white"
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
                                                                    if(urut < maxUrut) {
                                                                        setUrut(urut + 1);
                                                                    }
                                                                }}
                                                                children={
                                                                <Center>
                                                                    <Text textStyle='isi'>
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
                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1}>
                                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                <GridItem colSpan={2}>
                                                    <Flex flexDirection="column" h={'100%'} justify="center" align="start">
                                                        <Text textStyle='isi'>
                                                            Selalu Tayang
                                                        </Text>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan={3}>
                                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                                        <Switch
                                                            colorScheme="purple2" isChecked={terusMenerus}
                                                            onChange={(event) => {
                                                                setTerusMenerus(event.target.checked);
                                                            }}
                                                        />
                                                    </Flex>
                                                </GridItem>
                                            </Grid>
                                        </GridItem>
                                    </Grid>
                                    {(() => {
                                        if(!terusMenerus) {
                                            return (
                                                <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}} pb={4}>
                                                    <GridItem colSpan={1}>
                                                        <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                            <GridItem colSpan={2}>
                                                                <Flex flexDirection="column" h={'100%'} justify="center" align="start">
                                                                    <Text textStyle='isi' pb={1}>
                                                                        Batas Tayang
                                                                    </Text>
                                                                    <Text textStyle='isi_12' color={'red'} fontStyle={'italic'}>
                                                                        Durasi dalam hari
                                                                    </Text>
                                                                </Flex>
                                                            </GridItem>
                                                            <GridItem colSpan={3}>
                                                                <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                                                    <InputGroup
                                                                        w={{ sm: '75%', lg: '50%' }}
                                                                        fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                                                        verticalAlign={'middle'}
                                                                        textAlign={'center'}
                                                                    >
                                                                        <InputLeftAddon
                                                                            cursor={'pointer'}
                                                                            borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                                            borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                                            onClick={() => {
                                                                                if(batasTayang > 1) {
                                                                                    setBatasTayang(batasTayang - 1);
                                                                                    setHariBerakhir(hariBerakhir - 1);
                                                                                }
                                                                            }}
                                                                            children={
                                                                            <Center>
                                                                                <Text textStyle='isi'>
                                                                                    -
                                                                                </Text>
                                                                            </Center>
                                                                        }/>
                                                                        <Input
                                                                            onChange={(event) => {
                                                                                if(event.target.value < 1) {
                                                                                    setBatasTayang(1);
                                                                                } else if(event.target.value > maxHari) {
                                                                                    setBatasTayang(maxHari);
                                                                                } else {
                                                                                    setBatasTayang(event.target.value);
                                                                                }
                                                                            }}
                                                                            value={batasTayang}
                                                                            w={'100%'}
                                                                            fontSize={{ sm: '14px', lg: '16px' }}
                                                                            fontWeight={'normal'}
                                                                            lineHeight={1.2}
                                                                            color={'#4F4F4F'}
                                                                            bgColor="white"
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
                                                                                if(batasTayang < maxHari) {
                                                                                    setBatasTayang(batasTayang + 1);
                                                                                    setHariBerakhir(hariBerakhir + 1);
                                                                                }
                                                                            }}
                                                                            children={
                                                                            <Center>
                                                                                <Text textStyle='isi'>
                                                                                    +
                                                                                </Text>
                                                                            </Center>
                                                                        }/>
                                                                    </InputGroup>
                                                                    {
                                                                        hariBerakhir != null ?
                                                                        <Text textAlign={'start'} color={'red'} fontSize={{ sm: 'xs', lg: 'sm' }} fontStyle={'italic'}>
                                                                            Berakhir dalam {hariBerakhir} hari
                                                                        </Text>
                                                                        : <></>
                                                                    }
                                                                </Flex>
                                                            </GridItem>
                                                        </Grid>
                                                    </GridItem>
                                                </Grid>
                                            )
                                        } else {
                                            return <></>
                                        }
                                    })()}
                                    <Grid pb={4} templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                                        <GridItem colSpan={1}>
                                            <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                <GridItem colSpan={2}>
                                                    <Flex flexDirection="column" h={'100%'} justify="center" align="start">
                                                        <Text textStyle='isi'>
                                                            Aktif
                                                        </Text>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan={3}>
                                                    <Flex flexDirection="row" h={'100%'} w={'100%'} justify={{ sm: 'end', lg: 'start' }} align="end">
                                                        <Switch
                                                            colorScheme="purple2" isChecked={active}
                                                            onChange={(event) => {
                                                                setActive(event.target.checked);
                                                            }}
                                                        />
                                                    </Flex>
                                                </GridItem>
                                            </Grid>
                                        </GridItem>
                                    </Grid>
                                    <Box pb={4} pt={4}>
                                        <Separator></Separator>
                                    </Box>
                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                                        <GridItem colSpan={1}>
                                            <Select
                                                w={'100%'} h={'100%'} 
                                                size={{ sm: 'sm' , lg: 'md'}}
                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                focusBorderColor="#B3A5DA"
                                                selectedOptionColor="purple"
                                                chakraStyles={chakraStyles}
                                                placeholder="Pilih Tipe Konten" 
                                                value={kontenTypeSelect}
                                                onChange={handleChangeKontenType}
                                                options={
                                                    [
                                                        {
                                                            label: "Default",
                                                            value: "0",
                                                        },
                                                        {
                                                            label: "Teks",
                                                            value: "1",
                                                        },
                                                        {
                                                            label: "Gambar",
                                                            value: "2",
                                                        },
                                                        {
                                                            label: "Teks & Gambar",
                                                            value: "4",
                                                        },
                                                        {
                                                            label: "URL",
                                                            value: "3",
                                                        },
                                                    ]
                                                }
                                            />
                                        </GridItem>
                                        {(() => {
                                            if(kontenType == 1) {
                                                return (
                                                    <GridItem colSpan={1} pl={{ sm: 0, lg: 2 }} pt={{ sm: 2, lg: 0 }}>
                                                        <Flex w={'100%'} h={'100%'} flexDirection="column" justify="center" align="end">
                                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih warna background' isOpen={openErrorWarnaBackground}>
                                                                <Button
                                                                    variant={'normal'}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setOpenErrorWarnaBackground(false);
                                                                        if(kontenDisplayWarnaBg) {
                                                                            setKontenDisplayWarnaBg(false);
                                                                        } else {
                                                                            setKontenDisplayWarnaBg(true);
                                                                        }
                                                                    }}
                                                                >
                                                                    {kontenWarnaBg == null ? 'Pilih Warna Background' : `Warna ${kontenWarnaBg}`}
                                                                </Button>
                                                            </Tooltip>
                                                        </Flex>
                                                    </GridItem>
                                                )
                                            } else if(kontenType == 2) {
                                                return (
                                                    <GridItem colSpan={1} pl={{ sm: 0, lg: 2 }} pt={{ sm: 2, lg: 0 }}>
                                                        <Flex w={'100%'} h={'100%'} flexDirection="column" justify="center" align="end">
                                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih gambar' isOpen={openErrorGambar}>
                                                                <Button
                                                                    variant={'normal'}
                                                                    type="button"
                                                                    onClick={(event)=> { 
                                                                        event.target.value = null;
                                                                        setOpenErrorGambar(false);
                                                                        kontenGambarRef.current?.click()
                                                                    }}
                                                                >
                                                                    Pilih Gambar
                                                                    <input 
                                                                        type='file'
                                                                        accept="image/*"
                                                                        multiple={false}
                                                                        style={{ display: 'none' }}
                                                                        ref={kontenGambarRef}
                                                                        onChange={(event) => {
                                                                            let fileObj = event.target.files[0];
                                                                            setKontenFileGambar(fileObj);
                                                                            const objectUrl = URL.createObjectURL(fileObj)
                                                                            setKontenGambar(objectUrl)
                                                                        }}
                                                                    />
                                                                </Button>
                                                            </Tooltip>
                                                        </Flex>
                                                    </GridItem>
                                                )
                                            } else if(kontenType == 3) {
                                                return (
                                                    <GridItem colSpan={1} pl={{ sm: 0, lg: 2 }} pt={{ sm: 2, lg: 0 }}>
                                                        <Flex w={'100%'} h={'100%'} flexDirection="column" justify="center" align="end">
                                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Isi url' isOpen={openErrorUrl}>
                                                                <Input
                                                                    value={kontenUrl}
                                                                    w={'100%'}
                                                                    fontSize={{ sm: '14px', lg: '16px' }}
                                                                    fontWeight={'normal'}
                                                                    lineHeight={1.2}
                                                                    color={'#4F4F4F'}
                                                                    bgColor="white"
                                                                    verticalAlign={'middle'}
                                                                    textAlign={'start'}
                                                                    borderRadius={'5px'}
                                                                    placeholder={'Masukkan URL'}
                                                                    onChange={(event) => {
                                                                        setOpenErrorUrl(false);
                                                                        setKontenUrl(event.target.value);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </Flex>
                                                    </GridItem>
                                                )
                                            } else if(kontenType == 4) {
                                                return (
                                                    <GridItem colSpan={1} pl={{ sm: 0, lg: 2 }} pt={{ sm: 2, lg: 0 }}>
                                                        <Flex w={'100%'} h={'100%'} flexDirection="column" justify="center">
                                                            <Select
                                                                w={'100%'} h={'100%'} 
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                focusBorderColor="#B3A5DA"
                                                                selectedOptionColor="purple"
                                                                chakraStyles={chakraStyles}
                                                                placeholder="Pilih Tipe Konten" 
                                                                value={kontenTypeSelectTextarea}
                                                                onChange={handleChangeKontenTypeTextArea}
                                                                options={
                                                                    [
                                                                        {
                                                                            label: "Gambar 1",
                                                                            value: "0",
                                                                        },
                                                                        {
                                                                            label: "Gambar 2",
                                                                            value: "1",
                                                                        },
                                                                    ]
                                                                }
                                                            />
                                                        </Flex>
                                                    </GridItem>
                                                )
                                            } else {
                                                return <></>
                                            }
                                        })()}
                                    </Grid>
                                </Flex>
                                <Flex flexDirection="column" w={'100%'}>
                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(1, 1fr)'}}>
                                        {(() => {
                                            if(kontenType == 1) {
                                                return(
                                                    <GridItem colSpan={1} pt={2}>
                                                        <Flex flexDirection="column" w={'100%'}>
                                                            <Tooltip hasArrow bg='red.600' color={'white'} label='Isi konten' isOpen={openErrorKonten}>
                                                                <Flex
                                                                    flexDirection={'column'}
                                                                    w={'100%'}
                                                                    justify="center" align="center"
                                                                >
                                                                    <AspectRatio w={'100%'} ratio={{ sm: 1920/950, md: 1920/820, lg: 1920/800 }}>
                                                                        <Flex flexDirection={'row'} w={'100%'} h={'100%'} justify="center" align="center"
                                                                            style={{ border: '0.5px solid #c6c5c5', borderRadius: '5px' }}
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
                                                                                                                { model: 'paragraph', title: 'Isi' },
                                                                                                                { model: 'heading1', view: 'h1', title: 'Judul' },
                                                                                                                { model: 'heading2', view: 'h2', title: 'Judul 2' },
                                                                                                                { model: 'heading3', view: 'h3', title: 'Judul 3' }
                                                                                                            ]
                                                                                                        },
                                                                                                        toolbar: {
                                                                                                            items: [
                                                                                                                'heading', '|',
                                                                                                                'fontfamily',
                                                                                                                'alignment', '|',
                                                                                                                'fontColor', '|',
                                                                                                                'bold', 'italic', 'underline', '|',
                                                                                                                'outdent', 'indent', '|',
                                                                                                                'undo', 'redo'
                                                                                                            ],
                                                                                                            viewportTopOffset: 1,
                                                                                                        },
                                                                                                    }}
                                                                                                    onReady={ editorRef => {
                                                                                                        const toolbarElement = editorRef.ui.view.toolbar.element;
                                                                                                        toolbarElement.style.margin = '0px';
                                                                                                        toolbarElement.style.borderTop = 'none';
                                                                                                        toolbarElement.style.borderLeft = 'none';
                                                                                                        toolbarElement.style.borderRight = 'none';
                                                                                                        toolbarElement.style.borderBottom = '1px solid #c6c5c5';

                                                                                                        editorRef.editing.view.change( writer => {
                                                                                                            // writer.setStyle( 'height', '100vh', editorRef.editing.view.document.getRoot());
                                                                                                            writer.removeClass( 'ck-editor__editable_inline', editorRef.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'line-height', '1', editorRef.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'background-color', 'transparent', editorRef.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'margin', '0px', editorRef.editing.view.document.getRoot());
                                                                                                            writer.setStyle( 'padding', '0px', editorRef.editing.view.document.getRoot());
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
                                                                                                        setOpenErrorKonten(false);
                                                                                                        setKonten(data);
                                                                                                    }}
                                                                                                    editor={ ClassicEditor }
                                                                                                    data = {konten}
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
                                        <GridItem colSpan={1} pt={2}>
                                            <Flex flexDirection="column" w={'100%'}>
                                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                                            <Text textStyle='isi_isi'>
                                                                Tampil pada urutan {urut} selama {durasi} detik
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
                                                    <AspectRatio w={'100%'} ratio={1920/720}>
                                                        <Flex flexDirection={'row'} style={{width: '100%', height: '100%'}}  borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                                            {(() => {
                                                                if(kontenType == 0) {
                                                                    return (
                                                                        <Flex
                                                                            flexDirection={'row'} justify="center" align="center"
                                                                            w={'100%'} h={'100%'}
                                                                            style={{ border: '0.5px solid #c6c5c5' }}
                                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                        >
                                                                            <Image w={'100%'} h={'100%'} src={ '/template_image_konten_lainnya.png' }/>
                                                                        </Flex>
                                                                    )
                                                                } else if(kontenType == 1) {
                                                                    if((konten == null || konten == "") && kontenWarnaBg == null) {
                                                                        return (
                                                                            <Flex
                                                                                flexDirection={'row'} justify="center" align="center"
                                                                                w={'100%'} h={'100%'}
                                                                                style={{ border: '0.5px solid #c6c5c5' }}
                                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                            >
                                                                                <Image w={'100%'} h={'100%'} src={ '/template_image_konten_lainnya.png' }/>
                                                                            </Flex>
                                                                        )
                                                                    } else {
                                                                        return(
                                                                            <Flex
                                                                                flexDirection={'row'} justify="center" align="center"
                                                                                w={'100%'} h={'100%'}
                                                                                style={{ border: '0.5px solid #c6c5c5' }}
                                                                                borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                            >
                                                                                <Box
                                                                                    w={'100%'} h={'100%'}
                                                                                    bg={kontenWarnaBg}
                                                                                    bgImage={ kontenWarnaBg == null ? "url('/template_image_konten_lainnya.png')" : "url('')"}
                                                                                    bgSize={'100% 100%'}
                                                                                    bgRepeat={'no-repeat'}
                                                                                    bgPosition={'center'}
                                                                                >
                                                                                    <Box
                                                                                        id="display"
                                                                                        fontSize={{ lg: 'sm', md: 'sm', sm: '2xs' }}
                                                                                        lineHeight={1}
                                                                                        w={'100%'}
                                                                                        dangerouslySetInnerHTML={{__html: konten}}
                                                                                    ></Box>
                                                                                </Box>
                                                                            </Flex>
                                                                        )
                                                                    }
                                                                } else if(kontenType == 2) {
                                                                    return (
                                                                        <Flex
                                                                            flexDirection={'row'} justify="center" align="center"
                                                                            w={'100%'} h={'100%'}
                                                                            style={{ border: '0.5px solid #c6c5c5' }}
                                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                            bgImage={ kontenGambar == null ? "url('/template_image_konten_lainnya.png')" : "url('"+kontenGambar+"')"}
                                                                            bgSize={kontenGambarResize}
                                                                            bgRepeat={'no-repeat'}
                                                                            bgPosition={'center'}
                                                                        >
                                                                            <Flex
                                                                                bottom={0}
                                                                                right={0}
                                                                                position={'absolute'}
                                                                                m={4}
                                                                                size={'xs'}
                                                                            >
                                                                                <BsArrowsFullscreen
                                                                                    cursor={'pointer'} size="25" color="#B8B8B8"
                                                                                    onClick={() => {
                                                                                        if(kontenGambarResize == '100% 100%') {
                                                                                            setKontenGambarResize('contain');
                                                                                        } else {
                                                                                            setKontenGambarResize('100% 100%');
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </Flex>
                                                                        </Flex>
                                                                    )
                                                                } else if(kontenType == 3) {
                                                                    return (
                                                                        <Flex
                                                                            flexDirection={'row'} justify="center" align="center"
                                                                            w={'100%'} h={'100%'}
                                                                            style={{ border: '0.5px solid #c6c5c5' }}
                                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                        >
                                                                            <Iframe url={kontenUrl}
                                                                                width={'100%'}
                                                                                height={'100%'}
                                                                                id="myId"
                                                                                className="myClassname"
                                                                                display="initial"
                                                                                position="relative"
                                                                            />
                                                                        </Flex>
                                                                    )
                                                                } else if(kontenType == 4) {
                                                                    return (
                                                                        <Flex
                                                                            flexDirection={'column'} justify="start" align="center"
                                                                            w={'100%'} h={'100%'}
                                                                            style={{ border: '0.5px solid #c6c5c5' }}
                                                                            borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                                            bgImage={ kontenTypeTexarea == 0 ? `url('/${kontenTypeTexareaGambar1}')` : `url('/${kontenTypeTexareaGambar2}')` }
                                                                            bgSize={'100% 100%'}
                                                                            bgRepeat={'no-repeat'}
                                                                            bgPosition={'center'}
                                                                        >
                                                                            <Flex
                                                                                p={0}
                                                                                m={0}
                                                                                w={'100%'}
                                                                                h={'31.5%'}
                                                                                flexDirection={'column'}
                                                                                justify={'center'}
                                                                                align={'center'}
                                                                                fontSize= {{ sm: '3.9vw', md: '4.1vw', lg: '3.3vw' }}
                                                                                // bg='grey'
                                                                            >
                                                                                <TextareaAutosize
                                                                                    onChange={(event) => {
                                                                                        setKontenTextareaJudul(event.target.value);
                                                                                    }}
                                                                                    placeholder={'Masukkan Judul'}
                                                                                    value={kontenTextareaJudul}
                                                                                    style={{
                                                                                        paddingLeft: '1%',
                                                                                        paddingRight: '1%',
                                                                                        width: '100%',
                                                                                        verticalAlign: 'middle',
                                                                                        textAlign: 'center',
                                                                                        backgroundColor: "transparent",
                                                                                        lineHeight: 1.2,
                                                                                        color: 'white',
                                                                                        border: 'none',
                                                                                        overflow: 'auto',
                                                                                        outline: 'none',
                                                                                        webkitBoxShadow: 'none',
                                                                                        mozBoxShadow: 'none',
                                                                                        boxShadow: 'none',
                                                                                        resize: 'none',
                                                                                        fontWeight: 'bold',
                                                                                    }}
                                                                                    maxLength={'250'}
                                                                                    type="text"
                                                                                />
                                                                            </Flex>
                                                                            <Box w={'100%'} h={'2.5%'}></Box>
                                                                            <Flex
                                                                                p={0}
                                                                                m={0}
                                                                                w={'100%'}
                                                                                h={'63.5%'}
                                                                                flexDirection={'column'}
                                                                                justify={'center'}
                                                                                align={'center'}
                                                                                fontSize={{ sm: '2.65vw', md: '2.89vw', lg: '2.3vw' }}
                                                                                // bg='blue'
                                                                            >
                                                                                <TextareaAutosize
                                                                                    onChange={(event) => {
                                                                                        setKontenTextareaIsi(event.target.value);
                                                                                    }}
                                                                                    placeholder={'Masukkan Isi'}
                                                                                    value={kontenTextareaIsi}
                                                                                    style={{
                                                                                        paddingLeft: '1%',
                                                                                        paddingRight: '1%',
                                                                                        width: '100%',
                                                                                        verticalAlign: 'middle',
                                                                                        textAlign: 'center',
                                                                                        backgroundColor: "transparent",
                                                                                        lineHeight: 1.2,
                                                                                        color: 'white',
                                                                                        border: 'none',
                                                                                        overflow: 'auto',
                                                                                        outline: 'none',
                                                                                        webkitBoxShadow: 'none',
                                                                                        mozBoxShadow: 'none',
                                                                                        boxShadow: 'none',
                                                                                        resize: 'none',
                                                                                        fontWeight: 'normal',
                                                                                    }}
                                                                                    maxLength={'1000'}
                                                                                    type="text"
                                                                                />
                                                                            </Flex>
                                                                            <Box w={'100%'} h={'2.5%'}></Box>
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
                                <Flex justify="space-between" align="center" w="100%" pt={5}>
                                    <Button
                                        variant={'normal'}
                                        onClick={history.goBack}
                                        type="button"
                                        bg="gray.200"
                                        color={'#4F4F4F'}
                                    >
                                        Kembali
                                    </Button>
                                    {
                                        errorLoading == null ?
                                        <Button
                                            variant={'normal'}
                                            isLoading={isLoadingSimpan}
                                            type="submit"
                                        >
                                            Simpan
                                        </Button>
                                        : <></>
                                    }
                                </Flex>
                            </Center>
                            <Modal bgColor={'transparent'} size={'xs'} closeOnOverlayClick={false} isCentered onClose={!kontenDisplayWarnaBg} isOpen={kontenDisplayWarnaBg}>
                                <ModalOverlay
                                    bg='none'
                                    backdropFilter='auto'
                                    backdropInvert='80%'
                                    backdropBlur='2px'
                                />
                                <ModalContent bgColor={'transparent'}>
                                    <ModalHeader color={'white'} bgColor={'transparent'} size="xs" borderRadius={{ sm: '5px', lg: '5px' }}>
                                        <Flex justify="space-between" align="center">
                                            <Box></Box>
                                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setKontenDisplayWarnaBg(false)}/>
                                        </Flex>
                                    </ModalHeader>
                                    <ModalBody>
                                        <Center>
                                            <ChromePicker
                                                color={kontenWarnaBg == null ? '#FFFFFF' : kontenWarnaBg}
                                                onChange={(color) => {
                                                    setKontenWarnaBg(color.hex);
                                                }}
                                            />
                                        </Center>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </chakra.form>
                    </Card>
                }
                </Flex>
            </Center>
        </Flex>
    );
}