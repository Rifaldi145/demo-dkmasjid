/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
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
    Switch,
    Box
} from "@chakra-ui/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";

export default function Tarhim(props) {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const maxMenit = 60;

    const notifyTarhim = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissTarhim = useCallback(() => {
        toast.dismiss();
    }, []);

    const [jedaWaktuTarhim, setJedaWaktuTarhim] = useState(15);

    const audioRef = useRef(null);
    const handleClickAudio = () => audioRef.current?.click();
    const [fileAudioTarhim, setFileAudioTarhim] = useState(null);
    const [audioTarhim, setAudioTarhim] = useState("");
    const [audioNameTarhim, setAudioNameTarhim] = useState("");

    // aktif tarhim
    const [tarhimSubuh, setTarhimSubuh] = useState(false);
    const [tarhimDzuhur, setTarhimDzuhur] = useState(false);
    const [tarhimAshar, setTarhimAshar] = useState(false);
    const [tarhimMaghrib, setTarhimMaghrib] = useState(false);
    const [tarhimIsya, setTarhimIsya] = useState(false);
    // aktif tarhim

    const [isLoadingSimpanTarhim, setIsLoadingSimpanTarhim] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        if(!props.loading && props.errorLoading == null) {
            if(props.dataSetting.mosques.displays != null) {
                if(props.dataSetting.mosques.displays.jeda_waktu_tarhim != null) {
                    setJedaWaktuTarhim(props.dataSetting.mosques.displays.jeda_waktu_tarhim);
                }
                if(props.dataSetting.mosques.displays.audio_tarhim != null) {
                    setAudioTarhim(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + props.dataSetting.mosques.displays.audio_tarhim.replace("public", "storage"));
                }
                if(props.dataSetting.mosques.displays.audio_tarhim_name != null) {
                    setAudioNameTarhim(props.dataSetting.mosques.displays.audio_tarhim_name);
                }
                if(props.dataSetting.mosques.displays.tarhims != null) {
                    if(props.dataSetting.mosques.displays.tarhims.subuh == 1) {
                        setTarhimSubuh(true);
                    } else {
                        setTarhimSubuh(false);
                    }
                    if(props.dataSetting.mosques.displays.tarhims.dzuhur == 1) {
                        setTarhimDzuhur(true);
                    } else {
                        setTarhimDzuhur(false);
                    }
                    if(props.dataSetting.mosques.displays.tarhims.ashar == 1) {
                        setTarhimAshar(true);
                    } else {
                        setTarhimAshar(false);
                    }
                    if(props.dataSetting.mosques.displays.tarhims.maghrib == 1) {
                        setTarhimMaghrib(true);
                    } else {
                        setTarhimMaghrib(false);
                    }
                    if(props.dataSetting.mosques.displays.tarhims.isya == 1) {
                        setTarhimIsya(true);
                    } else {
                        setTarhimIsya(false);
                    }
                }
            }
        }
    }, []);

    const audioHandler = (event) => {
        var file = event.target.files[0]
        setFileAudioTarhim(file);
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setAudioTarhim(reader.result);
            setAudioNameTarhim(file['name']);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    const submitSimpanTarhim = async (event) => {
        event.preventDefault();

        setIsLoadingSimpanTarhim(true);
        try {
            var postData = {
                jeda_waktu_tarhim: jedaWaktuTarhim,
                tarhim_subuh: tarhimSubuh ? 1 : 0,
                tarhim_dzuhur: tarhimDzuhur ? 1 : 0,
                tarhim_ashar: tarhimAshar ? 1 : 0,
                tarhim_maghrib: tarhimMaghrib ? 1 : 0,
                tarhim_isya: tarhimIsya ? 1 : 0,
            };

            var formData = new FormData();
            formData.append('audio_tarhim', fileAudioTarhim);
            formData.append('jeda_waktu_tarhim', jedaWaktuTarhim);
            formData.append('tarhim_subuh', tarhimSubuh ? 1 : 0);
            formData.append('tarhim_dzuhur', tarhimDzuhur ? 1 : 0);
            formData.append('tarhim_ashar', tarhimAshar ? 1 : 0);
            formData.append('tarhim_maghrib', tarhimMaghrib ? 1 : 0);
            formData.append('tarhim_isya', tarhimIsya ? 1 : 0);

            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu/simpan-tarhim`,
                headers: {
                    "Content-Type": `multipart/form-data`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                data: formData
            }).then(async (res) => {
                props.setCallbackTab(res.data.tab);
                if(res.data.success) {
                    showSucessTarhim(res.data.message);
                    props.loadData();
                } else {
                    showErrorTarhim(res.data.message);
                }
                setIsLoadingSimpanTarhim(false);
            });
        } catch (err) {
            console.log("err", err);
            setIsLoadingSimpanTarhim(false);
            if(err.response.data != null) {
                showErrorTarhim(err.response.data.message);
            } else {
                showErrorTarhim(JSON.stringify(err.response));
            }
        }
    };

    function showSucessTarhim(message) {
        notifyTarhim("success", message);
    }
    function showErrorTarhim(message) {
        notifyTarhim("error", message);
    }

    return (
        <chakra.form onSubmit={submitSimpanTarhim}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Flex flexDirection="column" w={'100%'} h={'100%'}>
                        <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                            Jeda Waktu Tarhim
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
                                                        if(jedaWaktuTarhim > 1) {
                                                            setJedaWaktuTarhim(jedaWaktuTarhim - 1);
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
                                                            setJedaWaktuTarhim(1);
                                                        } else if(event.target.value > maxMenit) {
                                                            setJedaWaktuTarhim(maxMenit);
                                                        } else {
                                                            setJedaWaktuTarhim(event.target.value);
                                                        }
                                                    }}
                                                    value={jedaWaktuTarhim}
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
                                                        if(jedaWaktuTarhim < maxMenit) {
                                                            setJedaWaktuTarhim(jedaWaktuTarhim + 1);
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
                        <Text pb={4} color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'}>
                            Murottal/Sholawat Tarhim
                        </Text>
                        <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)'}}>
                            <GridItem colSpan={1} bg={'gray.200'} p={2} borderRadius={{ sm: '5px', lg: '5px' }} mr={{ lg: 1, sm: 0.5 }}>
                                <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Subuh
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="end" align="center">
                                            <Switch
                                                id="remember-login" colorscheme="teal" me="10px" isChecked={tarhimSubuh}
                                                onChange={(event) => {
                                                    setTarhimSubuh(event.target.checked);
                                                }}
                                            />
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </GridItem>
                            <GridItem colSpan={1} bg={'gray.200'} p={2} borderRadius={{ sm: '5px', lg: '5px' }} mr={{ lg: 1, sm: 0 }} ml={{ lg: 1, sm: 0.5 }}>
                                <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Dzuhur
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="end" align="center">
                                            <Switch
                                                id="remember-login" colorscheme="teal" me="10px" isChecked={tarhimDzuhur}
                                                onChange={(event) => {
                                                    setTarhimDzuhur(event.target.checked);
                                                }}
                                            />
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </GridItem>
                            <GridItem colSpan={1} bg={'gray.200'} p={2} borderRadius={{ sm: '5px', lg: '5px' }} mr={{ lg: 1, sm: 0.5 }} ml={{ lg: 1, sm: 0 }} mt={{ sm: 1, lg: 0 }}>
                                <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Ashar
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="end" align="center">
                                            <Switch
                                                id="remember-login" colorscheme="teal" me="10px" isChecked={tarhimAshar}
                                                onChange={(event) => {
                                                    setTarhimAshar(event.target.checked);
                                                }}
                                            />
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </GridItem>
                            <GridItem colSpan={1} bg={'gray.200'} p={2} borderRadius={{ sm: '5px', lg: '5px' }} mr={{ lg: 1, sm: 0 }} ml={{ lg: 1, sm: 0.5 }} mt={{ sm: 1, lg: 0 }}>
                                <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Maghrib
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="end" align="center">
                                            <Switch
                                                id="remember-login" colorscheme="teal" me="10px" isChecked={tarhimMaghrib}
                                                onChange={(event) => {
                                                    setTarhimMaghrib(event.target.checked);
                                                }}
                                            />
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </GridItem>
                            <GridItem colSpan={1} bg={'gray.200'} p={2} borderRadius={{ sm: '5px', lg: '5px' }} mr={{ lg: 1, sm: 0 }} ml={{ lg: 1, sm: 0 }} mt={{ sm: 1, lg: 0 }}>
                                <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="start" align="center">
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Isya
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Flex flexDirection="row" h={'100%'} justify="end" align="center">
                                            <Switch
                                                id="remember-login" colorscheme="teal" me="10px" isChecked={tarhimIsya}
                                                onChange={(event) => {
                                                    setTarhimIsya(event.target.checked);
                                                }}
                                            />
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </GridItem>
                        </Grid>
                    </Flex>
                </Flex>
                <Box pb={4} pt={4}>
                    <Separator></Separator>
                </Box>
                <Flex w={{ sm: '100%', lg: '50%' }} pb={2} flexDirection="row" justify="space-between" width={'100%'} align="center">
                    <Button
                        size={{ sm: 'sm', lg: 'sm' }}
                        fontSize={{ sm: 'xs', lg: 'sm' }}
                        color={textColor}
                        bg={'white'}
                        style={{ border: '1px solid #c6c5c5' }}
                        _hover={{ bg: "#B3A5DA", color: textColor }}
                        onClick={(event)=> { 
                            event.target.value = null;
                            handleClickAudio();
                        }}
                    >
                        Pilih Audio
                        <input 
                            type='file'
                            accept=".mp3,audio/*"
                            multiple={false}
                            style={{ display: 'none' }}
                            ref={audioRef}
                            onChange={audioHandler.bind(this)}
                        />
                    </Button>
                </Flex>
                <Flex flexDirection="column" w={'100%'}>
                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={'100%'}>
                                <Alert h={ 'auto' } px={2} py={{ lg: 2, sm: 1 }} rounded={'md'} status="warning" bg={"gray.200"} w={'100%'} borderBottomRadius={'0px'}>
                                    <Flex flexDirection="column" justify={'start'} align="center" w={'100%'}>
                                        <Flex flexDirection="row" justify={'start'} align="center" w={'100%'} h={'100%'}>
                                            <AlertIcon style={{ width: '14px', marginRight: 5 }} />
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Akan memutar audio selama { (jedaWaktuTarhim - 2) } menit. Dimulai dari { jedaWaktuTarhim } menit sebelum waktu Adzan.
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
                                    {(() => {
                                        if(audioTarhim != null && audioTarhim != "") {
                                            return (
                                                <Flex
                                                    w={'100%'} h={'100%'}
                                                    bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                    style={{ border: '1px solid #c6c5c5' }}
                                                    borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                    justify="center" align="center"
                                                >
                                                    <AudioPlayer
                                                        style={{ borderBottomRadius: '5px' }}
                                                        autoPlay={false}
                                                        autoPlayAfterSrcChange={false}
                                                        src={
                                                            audioTarhim
                                                        }
                                                        onPlay={(e) => console.log("onPlay")}
                                                        showSkipControls={false}
                                                        showJumpControls={false}
                                                        header={`${ audioNameTarhim != null ? audioNameTarhim : '' }`}
                                                    />
                                                </Flex>
                                            )
                                        } else {
                                            return (
                                                <Flex
                                                    w={'100%'} h={'100%'}
                                                    bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                    style={{ border: '1px solid #c6c5c5' }}
                                                    borderBottomRadius={{ sm: '5px', lg: '5px' }}
                                                    justify="center" align="center"
                                                >
                                                    <AudioPlayer
                                                        style={{ borderBottomRadius: '5px' }}
                                                        autoPlay={false}
                                                        autoPlayAfterSrcChange={false}
                                                        src={
                                                            '/tarhim2.mp3'
                                                        }
                                                        onPlay={(e) => console.log("onPlay")}
                                                        showSkipControls={false}
                                                        showJumpControls={false}
                                                        header={`Tarhim.mp3`}
                                                    />
                                                </Flex>
                                            )
                                        }
                                    })()}
                                </Flex>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Flex>
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" pt={7} w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanTarhim}
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