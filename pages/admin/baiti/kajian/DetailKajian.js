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
    Switch,
   
} from "@chakra-ui/react";
import Loader from 'react-loader-spinner';
import Card from "../../../components/Card/Card.js";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import toast from "../../../../components/Toast";
import { Radio } from "antd";
import {
     Select,
} from "chakra-react-select";
import {
    ImFilePicture
} from "react-icons/im";
import { useParams } from "react-router";
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

export default function DetailKajian() {
    const { id } = useParams();
    let history = useHistory();
    var _ciphertext = CryptoAES.decrypt(decodeURIComponent(id).toString(), `${process.env.NEXT_PUBLIC_ENC_WORD}`);
    const [decId, setDecId] = useState(_ciphertext.toString(CryptoENC));
    
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;
    
    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);

    const [openErrorPhotoKajian, setOpenErrorPhotoKajian] = useState(false);
    const photoKajianRef = useRef(null);
    const [filePhotoKajian, setFilePhotoKajian] = useState(null);
    const [photoKajian, setPhotoKajian] = useState(null);

    const [openErrorNama, setOpenErrorNama] = useState(false);
    const [nama, setNama] = useState("");

    const [openErrorDescription, setOpenErrorDescription] = useState(false);
    const [description, setDescription] = useState(null);

    const [openErrorUstadz, setOpenErrorUstadz] = useState(false);
    const [ustadz, setUstadz] = useState(null);

    const [allUstadz, setAllUstadz] = useState([]);

    const [openErrorStart, setOpenErrorStart] = useState(false);
    const [startdate, setStart] = useState("");

    const [openErrorEnd, setOpenErrorEnd] = useState(false);
    const [enddate, setEnd] = useState("");

    const [openErrorWaktu, setOpenErrorWaktu] = useState(false);
    const [waktu, setWaktu] = useState(null);

    const [kontentKajian, setKontenKajian] = useState(1);

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
            ClassicEditor: require('../../../../ckeditor5-build-with-htmlembed-master')
        }
        setEditorLoaded(true);
        loadData();
    }, []);


    async function loadData() {
       
        setLoading(true);
        setErrorLoading(null);
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/ustadz`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            
        }).then(async (res) => {
            setLoading(false);
            console.log("DATA LIST USTADZ",res);
            setAllUstadz(res.data.ustadz);
            loadDataDetail();
        }, (error) => {
            setLoading(false);
            if(error.response) {    
                console.log("error.response", error.response.data);
                setErrorLoading(JSON.stringify(error.response.data));
            } else {
                console.log("error.message", error.message);
                setErrorLoading(JSON.stringify(error.message));
            }
        });
    }

    async function loadDataDetail() {
        setLoading(true);
        setErrorLoading(null);
        try {
            await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/kajian/detail?id=${decId}`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
            }).then(async (res) => {
                console.log(res.data);
                if(res.data.kajian.picture != null) {
                    setPhotoKajian(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + res.data.kajian.picture.replace("public", "storage"));
                }
                if(res.data.kajian.nama != null) {
                    setNama(res.data.kajian.nama);
                }
                if(res.data.kajian.description != null) {
                    setDescription(res.data.kajian.description);
                }

              

                if(res.data.kajian.ustadz_id != null) {
                    setUstadz({
                        
                        value: res.data.kajian.ustadz_id,
                    });
                }

                if(res.data.kajian.kajian != null) {
                    setKontenKajian(res.data.kajian.kajian);
                }

                if(res.data.kajian.start_date != null) {
                    setStart(res.data.kajian.start_date);
                }

                if(res.data.kajian.end_date != null) {
                    setEnd(res.data.kajian.end_date);
                }

                if(res.data.kajian.waktu != null) {
                    setWaktu(res.data.kajian.waktu);
                }
               
                if(res.data.kajian.active != null) {
                    setActive(res.data.kajian.active);
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

    const submitSimpanKajian = async (event) => {
        event.preventDefault();
      
        setOpenErrorNama(false);
        setOpenErrorDescription(false);
        setOpenErrorUstadz(false);
        setOpenErrorStart(false);
        setOpenErrorEnd(false);
        setOpenErrorWaktu(false);

        var lanjut = true;

        if(nama == null || nama == "") {
            setOpenErrorNama(true);
            lanjut = false;
        }
      
        if(description == null || description == "") {
            setOpenErrorDescription(true);
            lanjut = false;
        }

        if(ustadz == null || ustadz == "") {
            setOpenErrorUstadz(true);
            lanjut = false;
        }

         if(lanjut) {
            setIsLoadingSimpan(true);
            try {
                var formData = new FormData();
                formData.append('id', decId);
                formData.append('ustadz_id', ustadz.value);
                formData.append('nama', nama);
                formData.append('kajian', kontentKajian);
                formData.append('description', description);
                formData.append("picture", filePhotoKajian);
                formData.append('waktu', waktu);
                formData.append('start_date', startdate);
                formData.append('end_date', enddate);
                formData.append('active', active ? 1 : 0);
               
                
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/kajian/detail/simpan`,
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

    async function handleChangeUstadz(selectedOptions) {
        setUstadz(selectedOptions);
    }

    async function handleChangeWaktu(selectedOptions) {
        setWaktu(selectedOptions);
    }

    const chakraStyles = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            background: '#FFF',
            // p: { sm: 2, lg: 4 },
            fontSize: { sm: 'xs', lg: 'sm' },
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
        }),
        menuList: (provided, state) => ({
            ...provided,
            fontSize: { sm: 'xs', lg: 'sm' },
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: { sm: 'xs', lg: 'sm' },
            bgColor: state.isSelected ? '#B3A5DA' : 'white',
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
        }),
        control: (provided, state) => ({
            ...provided,
            fontSize: { sm: 'xs', lg: 'sm' },
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
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
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} p={{ sm: 2.5, lg: 5 }}>
                        <chakra.form onSubmit={submitSimpanKajian}>
                            <FormControl>
                                <Flex flexDirection="column">
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Foto
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <AspectRatio w={{ sm: '40%', lg: '75%' }} ratio={5/4} cursor={'pointer'}>
                                                    <Flex flexDirection={'row'} w={'100%'} h={'100%'} borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bg={'#B3A5DA'}
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                            onClick={(event)=> {
                                                                setOpenErrorPhotoKajian(false);
                                                                event.target.value = null;
                                                                photoKajianRef.current?.click()
                                                            }}
                                                        >
                                                            <input 
                                                                type='file'
                                                                accept="image/*"
                                                                multiple={false}
                                                                style={{ display: 'none' }}
                                                                ref={photoKajianRef}
                                                                onChange={(event) => {
                                                                    let fileObj = event.target.files[0];
                                                                    setFilePhotoKajian(fileObj);
                                                                    const objectUrl = URL.createObjectURL(fileObj)
                                                                    setPhotoKajian(objectUrl)
                                                                }}
                                                            />
                                                            {
                                                                photoKajian != null ?
                                                                    <Image borderRadius={{ sm: '7.5px', lg: '7.5px' }} p={'2.5px'} w={'100%'} h={'100%'} src={photoKajian}/>
                                                                :
                                                                    <ImFilePicture style={{ width: '70%', height: '70%', color: 'white' }} />
                                                            }
                                                        </Flex>
                                                    </Flex>
                                              
                                            </AspectRatio>
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Nama Kajian (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi Nama Kajian' placement='bottom-start' isOpen={openErrorNama}>
                                                    <Input
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        type="text" 
                                                        placeholder="Masukan Nama Kajian"
                                                        value={nama}
                                                        rows={2}
                                                        onChange={(event) => {
                                                            setOpenErrorNama(false);
                                                            setNama(event.target.value);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Deskripsi (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi Deskripsi' placement='bottom-start' isOpen={openErrorDescription}>
                                                    <Textarea
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        type="text" 
                                                        placeholder="Masukan Deskripsi"
                                                        value={description}
                                                        rows={2}
                                                        onChange={(event) => {
                                                            setOpenErrorDescription(false);
                                                            setDescription(event.target.value);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>

                                    </Grid>


                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Ustadz 
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Pilih Ustad' placement='bottom-start' isOpen={openErrorUstadz}>
                                                        <Stack w={'100%'} h={'100%'}>  
                                                                <Select
                                                                   
                                                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                                                    cursor="pointer"
                                                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                    focusBorderColor="#B3A5DA"
                                                                    selectedOptionColor="purple"
                                                                    chakraStyles={chakraStyles}
                                                                    placeholder={ustadz} 
                                                                    value={ustadz}
                                                                    onChange={handleChangeUstadz}
                                                                    options={
                                                                        allUstadz.map(function(rows, i) {
                                                                            return (
                                                                                {
                                                                                    label: rows.name,
                                                                                    value: rows.id,
                                                                                }
                                                                            );
                                                                        })
                                                                    }
                                                                />
                                                        </Stack>
                                                    
                                                   
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>

                                    </Grid>

                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Kajian 
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Pilih Ustad' placement='bottom-start' isOpen={openErrorUstadz}>
                                                <Radio.Group
                                                    onChange={(e) => {
                                                        setKontenKajian(e.target.value);
                                                       
                                                    }}
                                                    value={kontentKajian}
                                                    style={{ width: "100%" }}
                                                >
                                                            <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}}>
                                                                <GridItem colSpan={1}>
                                                                    <Flex flexDirection="row" justify="start" align="center">
                                                                        <Radio value={1}></Radio>
                                                                        <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                            Rutin
                                                                        </Text>
                                                                    </Flex>
                                                                </GridItem>
                                                                <GridItem colSpan={1}>
                                                                    <Flex flexDirection="row" justify="start" align="center">
                                                                        <Radio value={0}></Radio>
                                                                        <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                            Tertentu
                                                                        </Text>
                                                                    </Flex>
                                                                </GridItem>
                                                               
                                                            </Grid>
                                                        </Radio.Group>
                                                    
                                                   
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>

                                    </Grid>

                                    
                        {(() => {
                            if(kontentKajian == 0) {
                                return (
                            
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}}  gap={2} pb={2}>
                                        <GridItem  colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Tgl Mulai - Selesai
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi Tanggal Mulai Kajian' placement='bottom-start' isOpen={openErrorStart}>
                                                    <Input type="date"
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            bgColor="white"
                                                            color={textColor}
                                                            verticalAlign={'middle'}
                                                            placeholder="Start date"
                                                            value={startdate}
                                                            rows={2}
                                                            onChange={(event) => {
                                                                setOpenErrorStart(false);
                                                                setStart(event.target.value);
                                                            }}
                                                        />
                                                </Tooltip>

                                                
                                            </Flex>
                                        </GridItem>
                                                   
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi Tanggal Selesai Kajian' placement='bottom-start' isOpen={openErrorEnd}>
                                                    <Input type="date"
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            bgColor="white"
                                                            color={textColor}
                                                            verticalAlign={'middle'}
                                                            placeholder="End date"
                                                            value={enddate}
                                                            rows={2}
                                                            onChange={(event) => {
                                                                setOpenErrorEnd(false);
                                                                setEnd(event.target.value);
                                                            }}
                                                        />
                                                </Tooltip>

                                                
                                            </Flex>
                                        </GridItem>

                                    </Grid>
                                  )
                                } else {
                                    return <></>
                                }
                            })()}

                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={4}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Waktu Pelaksanaan
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Masukan Waktu Pelaksanaan' placement='bottom-start' isOpen={openErrorWaktu}>
                                                    <Input borderRadius={{ sm: '5px', lg: '5px' }}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        type="text" 
                                                        placeholder="Masukan Waktu Pelaksanaan"
                                                        value={waktu}
                                                        rows={2}
                                                        onChange={(event) => {
                                                            setOpenErrorWaktu(false);
                                                            setWaktu(event.target.value);
                                                        }}>
                                                       
                                                    </Input>
                                                    
                                                   
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>

                                    </Grid>
                                  
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Aktif
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
                                        variant={'normal'}
                                        onClick={history.goBack}
                                        type="button"
                                        bg="gray.200"
                                        color={'#4F4F4F'}
                                    >
                                        Kembali
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
