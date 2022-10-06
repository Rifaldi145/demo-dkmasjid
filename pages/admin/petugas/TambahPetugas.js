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
    Textarea,
    Alert,
    AlertIcon,
    Stack,
    AspectRatio,
    Image
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

export default function TambahPetugas() {
    let history = useHistory();
    
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

    const photoPetugasRef = useRef(null);
    const [filePhotoPetugas, setFilePhotoPetugas] = useState(null);
    const [photoPetugas, setPhotoPetugas] = useState(null);

    const [openErrorNamaLengkap, setOpenErrorNamaLengkap] = useState(false);
    const [namaLengkap, setNamaLengkap] = useState("");

    const [openErrorBinBinti, setOpenErrorBinBinti] = useState(false);
    const [binBinti, setBinBinti] = useState(null);

    const [openErrorNamaBinBinti, setOpenErrorNamaBinBinti] = useState(false);
    const [namaBinBinti, setNamaBinBinti] = useState("");

    const [openErrorNoHp, setOpenErrorNoHp] = useState(false);
    const [noHp, setNoHp] = useState("");

    const [openErrorAlamat, setOpenErrorAlamat] = useState(false);
    const [alamat, setAlamat] = useState("");

    const [openErrorRole, setOpenErrorRole] = useState(false);
    const [role, setRole] = useState([]);

    const [listRole, setListRole] = useState([]);
    const [hasRolePetugas, setHasRolePetugas] = useState(false);
    const [listPetugas, setListPetugas] = useState([]);

    const [openErrorPetugas, setOpenErrorPetugas] = useState(false);
    const [petugas, setPetugas] = useState([]);
    
    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        setErrorLoading(null);
        try {
            await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/petugas-tambah`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
            }).then(async (res) => {
                console.log(res.data);
                setListRole(res.data.roles);
                setListPetugas(res.data.petugas);
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

    const submitSimpanPetugas = async (event) => {
        event.preventDefault();
        setOpenErrorNamaLengkap(false);
        setOpenErrorBinBinti(false);
        setOpenErrorNamaBinBinti(false);
        setOpenErrorNoHp(false);
        setOpenErrorAlamat(false);
        setOpenErrorRole(false);

        var lanjut = true;

        if(namaLengkap == null || namaLengkap == "") {
            setOpenErrorNamaLengkap(true);
            lanjut = false;
        }
        if(binBinti == null) {
            setOpenErrorBinBinti(true);
            lanjut = false;
        }
        if(namaBinBinti == null || namaBinBinti == "") {
            setOpenErrorNamaBinBinti(true);
            lanjut = false;
        }
        if(noHp == null || noHp == "" || noHp == 0) {
            setOpenErrorNoHp(true);
            lanjut = false;
        }
        if(alamat == null || alamat == "") {
            setOpenErrorAlamat(true);
            lanjut = false;
        }
        if(role.length == 0) {
            setOpenErrorRole(true);
            lanjut = false;
        } else {
            var arrSelectRole = [];
            role.map(function(roles, i) {
                arrSelectRole.push(roles.label);
            });
            if(arrSelectRole.includes('Petugas')) {
                if(petugas.length == 0) {
                    setOpenErrorPetugas(true);
                    lanjut = false;
                }
            }
        }

        if(lanjut) {
            setIsLoadingSimpan(true);
            try {
                var formData = new FormData();
                formData.append('name', namaLengkap);
                formData.append('binbinti', binBinti);
                formData.append('last_name', namaBinBinti);
                formData.append('phone', noHp);
                formData.append('address', alamat);
                if(filePhotoPetugas != null) {
                    formData.append("foto", filePhotoPetugas);
                }
                var arrSelectRole = [];
                role.map(function(roles, i) {
                    arrSelectRole.push(roles.value);
                });
                formData.append("roles", JSON.stringify(arrSelectRole));

                var arrSelectPetugas = [];
                petugas.map(function(petugases, i) {
                    arrSelectPetugas.push(petugases.value);
                });
                if(arrSelectPetugas.length > 0) {
                    formData.append("petugas", JSON.stringify(arrSelectPetugas));
                }
    
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/petugas-tambah-simpan`,
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
    
    async function handleChangeRole(selectedOptions) {
        setOpenErrorRole(false);
        setRole(selectedOptions);
        var arrSelectRole = [];
        selectedOptions.map(function(roles, i) {
            arrSelectRole.push(roles.label);
        });
        if(arrSelectRole.includes('Petugas')) {
            setHasRolePetugas(true);
        } else {
            setHasRolePetugas(false);
            setPetugas([]);
        }
    }

    async function handleChangePetugas(selectedOptions) {
        setOpenErrorPetugas(false);
        setPetugas(selectedOptions);
    }

    const chakraStyles = {
        multiValue: (provided, state) => ({
            ...provided,
            fontSize: { sm: 'xs', lg: 'sm' },
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
            ml: 0,
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            background: '#B3A5DA',
            p: { sm: 2, lg: 4 },
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
                            <chakra.form onSubmit={submitSimpanPetugas}>
                                <FormControl>
                                    <Flex flexDirection="column">
                                        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                            <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                                <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                        Foto Profil
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <AspectRatio w={'40%'} ratio={1/1} cursor={'pointer'}>
                                                    <Flex flexDirection={'row'} w={'100%'} h={'100%'} borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                                        <Flex
                                                            w={'100%'} h={'100%'}
                                                            bg={'#B3A5DA'}
                                                            style={{ border: '1px solid #c6c5c5' }}
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            justify="center" align="center"
                                                            onClick={(event)=> { 
                                                                event.target.value = null;
                                                                photoPetugasRef.current?.click()
                                                            }}
                                                        >
                                                            <input 
                                                                type='file'
                                                                accept="image/*"
                                                                multiple={false}
                                                                style={{ display: 'none' }}
                                                                ref={photoPetugasRef}
                                                                onChange={(event) => {
                                                                    let fileObj = event.target.files[0];
                                                                    setFilePhotoPetugas(fileObj);
                                                                    const objectUrl = URL.createObjectURL(fileObj)
                                                                    setPhotoPetugas(objectUrl)
                                                                }}
                                                            />
                                                            {
                                                                photoPetugas != null ?
                                                                    <Image borderRadius={{ sm: '7.5px', lg: '7.5px' }} p={'2.5px'} h={'100%'} src={photoPetugas}/>
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
                                                        Nama Lengkap (*)
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                    <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi nama lengkap!' placement='bottom-start' isOpen={openErrorNamaLengkap}>
                                                        <Input
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            size={{ sm: 'sm' , lg: 'md'}}
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            bgColor="white"
                                                            color={textColor}
                                                            verticalAlign={'middle'}
                                                            type="text" placeholder="Isi nama lengkap"
                                                            value={namaLengkap}
                                                            onChange={(event) => {
                                                                setOpenErrorNamaLengkap(false);
                                                                setNamaLengkap(event.target.value);
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
                                                        Bin/Binti (*)
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Pilih bin/binti!' placement='bottom-start' isOpen={openErrorBinBinti}>
                                                    <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                        <Radio.Group
                                                            onChange={(e) => {
                                                                setOpenErrorBinBinti(false);
                                                                setBinBinti(e.target.value);
                                                            }}
                                                            value={binBinti}
                                                            style={{ width: "100%" }}
                                                        >
                                                            <Grid templateColumns={{ sm: 'repeat(4, 1fr)', lg: 'repeat(8, 1fr)'}}>
                                                                <GridItem colSpan={1}>
                                                                    <Flex flexDirection="row" justify="start" align="center">
                                                                        <Radio value={'Bin'}></Radio>
                                                                        <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                            Bin
                                                                        </Text>
                                                                    </Flex>
                                                                </GridItem>
                                                                <GridItem colSpan={1}>
                                                                    <Flex flexDirection="row" justify="start" align="center">
                                                                        <Radio value={'Binti'}></Radio>
                                                                        <Text pl={2} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                            Binti
                                                                        </Text>
                                                                    </Flex>
                                                                </GridItem>
                                                            </Grid>
                                                        </Radio.Group>
                                                    </Flex>
                                                </Tooltip>
                                            </GridItem>
                                        </Grid>
                                        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                            <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                                <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                        Nama Bin/Binti (*)
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                    <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi nama bin/binti!' placement='bottom-start' isOpen={openErrorNamaBinBinti}>
                                                        <Input
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            size={{ sm: 'sm' , lg: 'md'}}
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            bgColor="white"
                                                            color={textColor}
                                                            verticalAlign={'middle'}
                                                            type="text" placeholder="Isi nama bin/binti"
                                                            value={namaBinBinti}
                                                            onChange={(event) => {
                                                                setOpenErrorNamaBinBinti(false);
                                                                setNamaBinBinti(event.target.value);
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
                                                        Nomor HP (*)
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                                    <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi nomor HP!' placement='bottom-start' isOpen={openErrorNoHp}>
                                                        <InputGroup
                                                            w={'100%'}
                                                            size={{ sm: 'sm', lg: 'md' }}
                                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                                            verticalAlign={'middle'}
                                                            textAlign={'center'}
                                                        >
                                                            <InputLeftAddon
                                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                                children={
                                                                <Center>
                                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                                        +62
                                                                    </Text>
                                                                </Center>
                                                            }/>
                                                            <Input
                                                                onChange={(event) => {
                                                                    setOpenErrorNoHp(false);
                                                                    setNoHp(event.target.value.replace(/^0+/, ''));
                                                                }}
                                                                value={noHp}
                                                                w={'100%'}
                                                                size={{ sm: 'sm' , lg: 'md'}}
                                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                bgColor="white"
                                                                color={textColor}
                                                                verticalAlign={'middle'}
                                                                textAlign={'left'}
                                                                placeholder={'Isi nomor HP'}
                                                                borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                                borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                                type="number"
                                                            />
                                                        </InputGroup>
                                                    </Tooltip>
                                                </Flex>
                                            </GridItem>
                                        </Grid>
                                        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                            <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                                <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                        Alamat(*)
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                    <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi alamat!' placement='bottom-start' isOpen={openErrorAlamat}>
                                                        <Textarea
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            bgColor="white"
                                                            color={textColor}
                                                            verticalAlign={'middle'}
                                                            type="text" placeholder="Isi alamat"
                                                            value={alamat}
                                                            rows={3}
                                                            onChange={(event) => {
                                                                setOpenErrorAlamat(false);
                                                                setAlamat(event.target.value);
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
                                                        Role (*)
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih role!' placement='bottom-start' isOpen={openErrorRole}>
                                                    <Stack w={'100%'} h={'100%'}>
                                                        <Select
                                                            isMulti
                                                            w={'100%'} h={'100%'} 
                                                            cursor="pointer"
                                                            fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                            focusBorderColor="#B3A5DA"
                                                            selectedOptionColor="purple"
                                                            chakraStyles={chakraStyles}
                                                            placeholder="Pilih Role" 
                                                            value={role}
                                                            onChange={handleChangeRole}
                                                            options={
                                                                listRole.map(function(roles, i) {
                                                                    return (
                                                                        {
                                                                            label: roles.name,
                                                                            value: roles.id,
                                                                        }
                                                                    );
                                                                })
                                                            }
                                                        />
                                                    </Stack>
                                                </Tooltip>
                                            </GridItem>
                                        </Grid>
                                        {
                                            hasRolePetugas ?
                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                                    <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                                        <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                Petugas (*)
                                                            </Text>
                                                        </Flex>
                                                    </GridItem>
                                                    <GridItem colSpan={3}>
                                                        <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih petugas!' placement='bottom-start' isOpen={openErrorPetugas}>
                                                            <Stack w={'100%'} h={'100%'}>
                                                                <Select
                                                                    isMulti
                                                                    w={'100%'} h={'100%'} 
                                                                    cursor="pointer"
                                                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                    focusBorderColor="#B3A5DA"
                                                                    selectedOptionColor="purple"
                                                                    chakraStyles={chakraStyles}
                                                                    placeholder="Pilih Petugas" 
                                                                    value={petugas}
                                                                    onChange={handleChangePetugas}
                                                                    options={
                                                                        listPetugas.map(function(petugases, i) {
                                                                            return (
                                                                                {
                                                                                    label: petugases.name,
                                                                                    value: petugases.name,
                                                                                }
                                                                            );
                                                                        })
                                                                    }
                                                                />
                                                            </Stack>
                                                        </Tooltip>
                                                    </GridItem>
                                                </Grid>
                                            : <></>
                                        }
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
                    }
                </Flex>
            </Center>
        </Flex>
    );
}
