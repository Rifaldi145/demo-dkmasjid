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
    Textarea,
    Checkbox
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
const { fontfam } = require('../../../../theme/ListFontFamily')
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";
import Iframe from 'react-iframe'
import { Radio } from "antd";
import {
    Select,
} from "chakra-react-select";
import {
    FaMosque,
} from "react-icons/fa";
import Card from "../../../components/Card/Card.js";

export default function Fasilitas(props) {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const notifyFasilitasMasjid = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissFasilitasMasjid = useCallback(() => {
        toast.dismiss();
    }, []);

    const [keterangan, setKeterangan] = useState(null);
    const [karpet, setKarpet] = useState(false);
    const [ac, setAC] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [air, setAir] = useState(false);
    const [sarung, setSarung] = useState(false);
    const [tajil, setTajil] = useState(false);
    const [tempatMandi, setTempatMandi] = useState(false);
    const [closet, setCloset] = useState(false);
    const [parkir, setParkir] = useState(false);
    const [ambulance, setAmbulance] = useState(false);
    const [jenazah, setJenazah] = useState(false);
    const [tpa, setTPA] = useState(false);
    const [aula, setAula] = useState(false);
    const [operasi, setOperasi] = useState(false);
    const [ramah, setRamah] = useState(false);
    const [klinik, setKlinik] = useState(false);
    const [gedung, setGedung] = useState(false);
    const [perpus, setPerpus] = useState(false);
    const [market, setMarket] = useState(false);

    const [isLoadingSimpanFasilitasMasjid, setIsLoadingSimpanFasilitasMasjid] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        if(!props.loading && props.errorLoading == null) {
            if(props.dataMasjid.profile != null) {
                setKeterangan(props.dataMasjid.profile.facilities.keterangan != null ? props.dataMasjid.profile.facilities.keterangan : null);
                setKarpet(props.dataMasjid.profile.facilities.karpet === 1 ? true : false);
                setAC(props.dataMasjid.profile.facilities.ac === 1 ? true : false);
                setWifi(props.dataMasjid.profile.facilities.wifi === 1 ? true : false);
                setAir(props.dataMasjid.profile.facilities.kopi === 1 ? true : false);
                setSarung(props.dataMasjid.profile.facilities.sarung_mukena === 1 ? true : false);
                setTajil(props.dataMasjid.profile.facilities.tajil === 1 ? true : false);
                setTempatMandi(props.dataMasjid.profile.facilities.tempat_mandi === 1 ? true : false);
                setCloset(props.dataMasjid.profile.facilities.closet_duduk === 1 ? true : false);
                setParkir(props.dataMasjid.profile.facilities.halaman_parkir === 1 ? true : false);
                setAmbulance(props.dataMasjid.profile.facilities.ambulans === 1 ? true : false);
                setJenazah(props.dataMasjid.profile.facilities.jenazah === 1 ? true : false);
                setTPA(props.dataMasjid.profile.facilities.tp_alquran === 1 ? true : false);
                setAula(props.dataMasjid.profile.facilities.aula === 1 ? true : false);
                setOperasi(props.dataMasjid.profile.facilities['24jam'] === 1 ? true : false);
                setRamah(props.dataMasjid.profile.facilities.ramah_disabilitas === 1 ? true : false);
                setKlinik(props.dataMasjid.profile.facilities.klinik === 1 ? true : false);
                setGedung(props.dataMasjid.profile.facilities.sarana_olahraga === 1 ? true : false);
                setPerpus(props.dataMasjid.profile.facilities.perpustakaan === 1 ? true : false);
                setMarket(props.dataMasjid.profile.facilities.minimarket === 1 ? true : false);
            }
        }
    }, []);

    const submitSimpanFasilitasMasjid = async (event) => {
        event.preventDefault();
        setIsLoadingSimpanFasilitasMasjid(true);
        try {
            var formData = new FormData();
            formData.append("keterangan", keterangan ? keterangan : '');
            formData.append("karpet", karpet ? 1 : 0);
            formData.append("ac", ac ? 1 : 0);
            formData.append("wifi", wifi ? 1 : 0);
            formData.append("closet_duduk", closet ? 1 : 0);
            formData.append("halaman_parkir", parkir ? 1 : 0);
            formData.append("ambulance", ambulance ? 1 : 0);
            formData.append("jenazah", jenazah ? 1 : 0);
            formData.append("tp_alquran", tpa ? 1 : 0);
            formData.append("aula", aula ? 1 : 0);
            formData.append("24jam", operasi ? 1 : 0);
            formData.append("ramah_disabilitas", ramah ? 1 : 0);
            formData.append("klinik", klinik ? 1 : 0);
            formData.append("sarana_olahraga", gedung ? 1 : 0);
            formData.append("perpustakaan", perpus ? 1 : 0);
            formData.append("minimarket", market ? 1 : 0);
            formData.append("kopi", air ? 1 : 0);
            formData.append("sarung_mukena", sarung ? 1 : 0);
            formData.append("tajil", tajil ? 1 : 0);
            formData.append("tempat_mandi", tempatMandi ? 1 : 0);

            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/fasilitas/simpan`,
                headers: {
                    "Content-Type": `multipart/form-data`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                data: formData
            }).then(async (res) => {
                props.setCallbackTab(res.data.tab);
                if(res.data.success) {
                    showSucessFasilitasMasjid(res.data.message);
                    props.loadData();
                } else {
                    showErrorFasilitasMasjid(res.data.message);
                }
                setIsLoadingSimpanFasilitasMasjid(false);
            });
        } catch (err) {
            console.log("err", err);
            setIsLoadingSimpanFasilitasMasjid(false);
            if(err.response.data != null) {
                showErrorFasilitasMasjid(err.response.data.message);
            } else {
                showErrorFasilitasMasjid(JSON.stringify(err.response));
            }
        }
        
    };
    
    function showSucessFasilitasMasjid(message) {
        notifyFasilitasMasjid("success", message);
    }
    
    function showErrorFasilitasMasjid(message) {
        notifyFasilitasMasjid("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanFasilitasMasjid}>
            <FormControl pt={4}>
                <Flex flexDirection="column">
                    <Grid templateColumns={{ sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)'}} pb={{ sm: 4, lg: 6 }}>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={karpet}
                                                onChange={(event) => {
                                                    setKarpet(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_karpet.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Karpet
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={ac}
                                                onChange={(event) => {
                                                    setAC(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_ac.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                AC
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={wifi}
                                                onChange={(event) => {
                                                    setWifi(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_wifi.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Wifi
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={air}
                                                onChange={(event) => {
                                                    setAir(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_kopi.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Air Minum/{'\n'}Kopi
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={sarung}
                                                onChange={(event) => {
                                                    setSarung(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_sarung_mukena.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Sarung/{'\n'}Mukena
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={tajil}
                                                onChange={(event) => {
                                                    setTajil(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_tajil.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Ta`jil{'\n'}Ramadhan
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                    </Grid>

                    <Grid templateColumns={{ sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)'}} pb={{ sm: 4, lg: 6 }}>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={tempatMandi}
                                                onChange={(event) => {
                                                    setTempatMandi(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_tempat_mandi.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Tempat Mandi
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={closet}
                                                onChange={(event) => {
                                                    setCloset(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_closet_duduk.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Closet Duduk
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={parkir}
                                                onChange={(event) => {
                                                    setParkir(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_halaman_parkir.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Halaman Parkir
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={ambulance}
                                                onChange={(event) => {
                                                    setAmbulance(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_ambulans.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Ambulans
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={jenazah}
                                                onChange={(event) => {
                                                    setJenazah(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_jenazah.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Pengurusan{'\n'}Jenazah
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={tpa}
                                                onChange={(event) => {
                                                    setTPA(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_tp_alquran.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                TP Al{'\n'}Qur`an
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                    </Grid>

                    <Grid templateColumns={{ sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)'}} pb={{ sm: 4, lg: 6 }}>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={aula}
                                                onChange={(event) => {
                                                    setAula(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_aula.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Aula{'\n'}Pernikahan
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={operasi}
                                                onChange={(event) => {
                                                    setOperasi(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_duaempatjam.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Beroperasi{'\n'}24 Jam
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={ramah}
                                                onChange={(event) => {
                                                    setRamah(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_ramah_disabilitas.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Ramah{'\n'}Disabilitas
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={klinik}
                                                onChange={(event) => {
                                                    setKlinik(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_klinik.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Klinik
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={gedung}
                                                onChange={(event) => {
                                                    setGedung(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_sarana_olahraga.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Gedung/{'\n'}Sarana
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={perpus}
                                                onChange={(event) => {
                                                    setPerpus(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_perpustakaan.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Perpustakaan
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                    </Grid>

                    <Grid templateColumns={{ sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)'}}>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" justify="center" align="center">
                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}}>
                                    <GridItem colSpan={1} pb={1}>
                                        <Flex flexDirection="row" justify="center" align="center">
                                            <Checkbox colorScheme='purple'
                                                pr={2}
                                                isChecked={market}
                                                onChange={(event) => {
                                                    setMarket(event.target.checked);
                                                }}
                                                size={{ sm: 'sm', lg: 'md'}}
                                            ></Checkbox>
                                            <Image
                                                align={'center'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                rounded={'md'}
                                                alt={'feature image'}
                                                src={`/icon_fasilitas_minimarket.png`}
                                                objectFit={'fill'}
                                                w={{ sm:'35px', lg:'75px' }}
                                                h={{ sm:'40px', lg:'85px' }}
                                            />
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" w={'100%'} h={'100%'} justify="center" align="center">
                                            <Text pl={5} textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                Minimarket
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Box pb={4} pt={4}>
                        <Separator></Separator>
                    </Box>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Keterangan
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Textarea
                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                    bgColor="white"
                                    color={textColor}
                                    verticalAlign={'middle'}
                                    type="text" placeholder="Isi keterangan"
                                    value={keterangan}
                                    rows={3}
                                    onChange={(event) => {
                                        setKeterangan(event.target.value);
                                    }}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                </Flex>
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" pt={4} w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanFasilitasMasjid}
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