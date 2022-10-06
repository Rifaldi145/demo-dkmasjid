/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
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
    Alert,
    AlertIcon,
    Center,
    Tooltip
} from "@chakra-ui/react";
import Card from "../../../components/Card/Card.js";
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import toast from "../../../../components/Toast";

function DetailRekening() {
    const { uid } = useParams();
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
    const [dataRekening, setDataRekening] = useState(null);

    const [id, setId] = useState(null);

    const [openErrorNamaBank, setOpenErrorNamaBank] = useState(false);
    const [namaBank, setNamaBank] = useState("");

    const [openErrorNoRek, setOpenErrorNoRek] = useState(false);
    const [noRek, setNoRek] = useState("");

    const [openErrorNamaPemilikRekening, setOpenErrorNamaPemilikRekening] = useState(false);
    const [namaPemilikRekening, setNamaPemilikRekening] = useState("");

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
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/rekening/detail?uid=${uid}`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                
            }).then(async (res) => {
                setLoading(false);
                setDataRekening(res.data);
                setId(res.data.rek.id);
                if(res.data.rek.nama_bank != null) {
                    setNamaBank(res.data.rek.nama_bank);
                }
                if(res.data.rek.no_rek != null) {
                    setNoRek(res.data.rek.no_rek);
                }
                if(res.data.rek.nama_rek != null) {
                    setNamaPemilikRekening(res.data.rek.nama_rek);
                }
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
            if(err.response.data != null) {
                setErrorLoading(err.response.data.message);
            } else {
                setErrorLoading(JSON.stringify(err.response));
            }
            console.log("err", err.response);
        }
    }

    const submitSimpanRekening = async (event) => {
        event.preventDefault();
        setOpenErrorNamaBank(false);
        setOpenErrorNoRek(false);
        setOpenErrorNoRek(false);
        var lanjut = true;

        if(namaBank == null || namaBank == "") {
            setOpenErrorNamaBank(true);
            lanjut = false;
        }
        if(noRek == null || noRek == "" || noRek == 0) {
            setOpenErrorNoRek(true);
            lanjut = false;
        }
        if(namaPemilikRekening == null || namaPemilikRekening == "") {
            setOpenErrorNamaPemilikRekening(true);
            lanjut = false;
        }

        if(lanjut) {
            setIsLoadingSimpan(true);
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/rekening/simpan`,
                    headers: {
                        "Content-Type": `application/json`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        id: id,
                        nama_bank: namaBank,
                        no_rek: noRek,
                        nama_rek: namaPemilikRekening,
                    }
                }).then(async (res) => {
                    if(res.data.success) {
                        showSucess(res.data.message);
                        loadData();
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
                        <chakra.form onSubmit={submitSimpanRekening}>
                            <FormControl>
                                <Flex flexDirection="column">
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Nama Bank (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi nama bank!' placement='bottom-start' isOpen={openErrorNamaBank}>
                                                    <Input
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        type="text" placeholder="Isi nama bank"
                                                        value={namaBank}
                                                        onChange={(event) => {
                                                            setNamaBank(event.target.value);
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
                                                    No. Rekening (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi nomor rekening!' placement='bottom-start' isOpen={openErrorNoRek}>
                                                    <Input
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        type="number" placeholder="Isi nomor rekening"
                                                        value={noRek}
                                                        onChange={(event) => {
                                                            setNoRek(event.target.value);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}}>
                                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                    Nama Pemilik (*)
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={3}>
                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi nama pemilik rekening!' placement='bottom-start' isOpen={openErrorNamaPemilikRekening}>
                                                    <Input
                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                        bgColor="white"
                                                        color={textColor}
                                                        verticalAlign={'middle'}
                                                        type="text" placeholder="Isi nama pemilik rekening"
                                                        value={namaPemilikRekening}
                                                        onChange={(event) => {
                                                            setNamaPemilikRekening(event.target.value);
                                                        }}
                                                    />
                                                </Tooltip>
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
                                    {
                                        errorLoading == null ?
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
                                        : <></>
                                    }
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

export default DetailRekening;
