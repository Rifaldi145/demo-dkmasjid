/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    chakra,
    Alert,
    AlertIcon,
    Switch,
    Grid,
    GridItem,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Center,
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import Loader from 'react-loader-spinner';
import {
    Select,
} from "chakra-react-select";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

export default function DetailWebview() {
    let history = useHistory();
    const { id } = useParams();

    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;
    
    const [dataWebview, setDataWebview] = useState([]);
    const [maxUrut, setMaxUrut] = useState(1);
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);

    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);
    const [errorSimpan, setErrorSimpan] = useState(null);
    const [successSimpan, setSuccessSimpan] = useState(null);

    const [kustomisasi, setKustomisasi] = useState(false);
    const [arrCustom, setArrCustom] = useState([]);

    const [url, setUrl] = useState('');
    const [durasi, setDurasi] = useState(1);
    const [hari, setHari] = useState(1);
    const [terusMenerus, setTerusMenerus] = useState(true);
    const [urut, setUrut] = useState(1);
    const [active, setActive] = useState(false);

    const textColor = useColorModeValue("gray.700", "white");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let mainText = useColorModeValue("gray.700", "gray.200");
    const nameColor = useColorModeValue("gray.500", "white");
    const bgColor = useColorModeValue("#F8F9FA", "gray.800");

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        setErrorLoading(null);
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/webview/detail/${id}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            
        }).then(async (res) => {
            console.log("dataWebview", res.data.webview);
            setLoading(false);
            setDataWebview(res.data.webview);
            setUrl(res.data.webview.url);
            setDurasi(res.data.webview.durasi_slide);
            if(res.data.webview.durasi_tayang == null) {
                setTerusMenerus(true);
            } else {
                setTerusMenerus(false);
                setHari(res.data.webview.durasi_tayang);
            }
            if(res.data.webview.active == 1) {
                setActive(true);
            } else {
                setActive(false);
            }
            setUrut(res.data.webview.urut);
            setMaxUrut(res.data.maxUrut);
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

    const changeUrl = (event) => {
        setUrl(event.target.value);
    };

    const changeDurasi = (event) => {
        if(event.target.value < 1) {
            setDurasi(1);
        } else {
            setDurasi(event.target.value);
        }
    };

    const changeHari = (event) => {
        if(event.target.value < 1) {
            setHari(1);
        } else if(event.target.value > 30) {
            setHari(30);
        } else {
            setHari(event.target.value);
        }
    };

    const changeUrut = (event) => {
        if(event.target.value < 1) {
            setUrut(1);
        } else if(event.target.value > maxUrut) {
            setUrut(maxUrut);
        } else {
            setUrut(event.target.value);
        }
    };

    async function minusDurasi(duration) {
        var durations = parseInt(duration);
        if(durations > 1) {
            durations = durations - 1;
            setDurasi(durations);
        }
    };

    async function plusDurasi(duration) {
        var durations = parseInt(duration);
        durations = durations + 1;
        setDurasi(durations);
    };

    async function minusHari(days) {
        var day = parseInt(days);
        if(day > 1) {
            day = day - 1;
            setHari(day);
        }
    };

    async function plusHari(days) {
        var day = parseInt(days);
        if(day < 30) {
            day = day + 1;
            setHari(day);
        }
    };

    async function minusUrut(sorts) {
        var sort = parseInt(sorts);
        if(sort > 1) {
            sort = sort - 1;
            setUrut(sort);
        }
    };

    async function plusUrut(sorts) {
        var sort = parseInt(sorts);
        if(sort < maxUrut) {
            sort = sort + 1;
            setUrut(sort);
        }
    };

    const changeKustomisasi = (event) => {
        const isChecked = event.target.checked;
        setKustomisasi(isChecked);
    };

    const changeSelaluTayang = (event) => {
        const isChecked = event.target.checked;
        setTerusMenerus(isChecked);
    };

    const changeActive = (event) => {
        const isChecked = event.target.checked;
        setActive(isChecked);
    };

    const submitSimpan = async (event) => {
        event.preventDefault();
        setErrorSimpan(null);
        setSuccessSimpan(null);
        if(url == null || url == '') {
            setErrorSimpan("Isi url!");
        } else if(durasi == 0 || durasi == '') {
            setErrorSimpan("Isi durasi!");
        } else if(!terusMenerus == 0 && (hari == 0 || hari == '')) {
            setErrorSimpan("Isi waktu tayang!");
        } else {
            setIsLoadingSimpan(true);

            var postData = {
                id : id,
                url : url,
                durasi_slide: durasi,
                durasi_tayang: terusMenerus ? null : hari,
                active: active ? 1 : 0,
                urut: urut
            };
            
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/webview/update-konten`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                data: postData
                
            }).then(async (res) => {
                console.log("res", res);
                setIsLoadingSimpan(false);
                if(res.data.success) {
                    setSuccessSimpan(res.data.message);
                } else {
                    setErrorSimpan(res.data.message);
                }
            }, (error) => {
                setIsLoadingSimpan(false);
                if(error.response) {
                    console.log("error.response", error.response.data);
                    setErrorSimpan(JSON.stringify(error.response.data));
                } else {
                    console.log("error.message", error.message);
                    setErrorSimpan(JSON.stringify(error.message));
                }
            });
        }
    };


    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }}
            w={{ sm: "calc(100vw - 0px)", xl: "calc(100vw - 56px - 280px)" }}
            ml={-10}
        >
             <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
             {
                loading ?
                <Flex p={5}>
                    <Loader type="Circles" color="#00BFFF" height={40} width={40} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>

                    </Loader>
                </Flex>
                :
                <chakra.form onSubmit={submitSimpan}>
                    <CardBody>
                        <Flex direction="column" w="100%">
                            <Flex direction="column" w="100%">
                                <Box p="24px" bg={bgColor} my="22px" borderRadius="10px">
                                    <Flex justify="space-between" w="100%">
                                        <Flex direction="column" w="100%">
                                            <Flex justify="space-between" align="center">
                                                <FormControl display="flex" alignItems="center" mb={ kustomisasi ? '0' : '5' }>
                                                    <Switch id="remember-login" colorscheme="teal" me="10px" checked={kustomisasi} onChange={changeKustomisasi}/>
                                                    <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal" color={nameColor} fontSize="14px">
                                                        Kustomisasi
                                                    </FormLabel>
                                                </FormControl>
                                            </Flex>
                                            {
                                                !kustomisasi ?
                                                <FormControl>
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Url Webview (*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Input value={url} onChange={changeUrl} bgColor="white" borderRadius="8px" fontSize="sm" type="text" placeholder="Masukkan url" color={nameColor}/>
                                                        </GridItem>
                                                    </Grid>
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} mb="16px">
                                                        <GridItem colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Durasi (*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Flex>
                                                                <InputGroup>
                                                                    <InputLeftAddon style={{ cursor: 'pointer' }} onClick={() => minusDurasi(durasi)} children={
                                                                        <Center>
                                                                            <Text color={nameColor} fontSize="md" fontWeight="bold">-</Text>
                                                                        </Center>
                                                                    }/>
                                                                    <Input verticalAlign="center" textAlign={'center'} w='80px' bgColor="white" borderRadius="8px" fontSize="sm" type="number" placeholder="0" color={nameColor}
                                                                        value={durasi} onChange={changeDurasi}
                                                                    />
                                                                    <InputRightAddon style={{ cursor: 'pointer' }} onClick={() => plusDurasi(durasi)} children={
                                                                        <Center>
                                                                            <Text color={nameColor} fontSize="md" fontWeight="bold">+</Text>
                                                                        </Center>
                                                                    }/>
                                                                    <Center ml={5}>
                                                                        <Text color={nameColor} fontSize="sm" fontWeight="bold">Detik</Text>
                                                                    </Center>
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} mb="16px">
                                                        <GridItem colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                {
                                                                    terusMenerus ? 'Selalu Tayang (*)' : 'Batas Tayang (*)'
                                                                }
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Flex>
                                                                <InputGroup>
                                                                    {
                                                                        !terusMenerus ?
                                                                        <InputLeftAddon style={{ cursor: 'pointer' }} onClick={() => minusHari(hari)} children={
                                                                            <Center>
                                                                                <Text color={nameColor} fontSize="md" fontWeight="bold">-</Text>
                                                                            </Center>
                                                                        }/> : <></>
                                                                    }
                                                                    {
                                                                        !terusMenerus ?
                                                                        <Input verticalAlign="center" textAlign={'center'} w='80px' bgColor="white" borderRadius="8px" fontSize="sm" type="number" placeholder="0" color={nameColor}
                                                                            value={hari} onChange={changeHari}
                                                                        /> : <></>
                                                                    }
                                                                    {
                                                                        !terusMenerus ?
                                                                        <InputRightAddon style={{ cursor: 'pointer' }} onClick={() => plusHari(hari)} children={
                                                                            <Center>
                                                                                <Text color={nameColor} fontSize="md" fontWeight="bold">+</Text>
                                                                            </Center>
                                                                        }/> : <></>
                                                                    }
                                                                    {
                                                                        !terusMenerus ?
                                                                        <Center ml={5}>
                                                                            <Text color={nameColor} fontSize="sm" fontWeight="bold">Hari</Text>
                                                                        </Center> : <></>
                                                                    }
                                                                    <Center ml={ !terusMenerus ? 5 : 0 }>
                                                                        <Switch colorscheme="teal" me="10px" isChecked={terusMenerus} onChange={changeSelaluTayang}/>
                                                                    </Center>
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} mb="16px">
                                                        <GridItem colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Urut (*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Flex>
                                                                <InputGroup>
                                                                    <InputLeftAddon style={{ cursor: 'pointer' }} onClick={() => minusUrut(urut)} children={
                                                                        <Center>
                                                                            <Text color={nameColor} fontSize="md" fontWeight="bold">-</Text>
                                                                        </Center>
                                                                    }/>
                                                                    <Input verticalAlign="center" textAlign={'center'} w='80px' bgColor="white" borderRadius="8px" fontSize="sm" type="number" placeholder="0" color={nameColor}
                                                                        value={urut} onChange={changeUrut}
                                                                    />
                                                                    <InputRightAddon style={{ cursor: 'pointer' }} onClick={() => plusUrut(urut)} children={
                                                                        <Center>
                                                                            <Text color={nameColor} fontSize="md" fontWeight="bold">+</Text>
                                                                        </Center>
                                                                    }/>
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} mb="16px">
                                                        <GridItem colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Aktif (*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Switch colorscheme="teal" me="10px" isChecked={active} onChange={changeActive}/>
                                                        </GridItem>
                                                    </Grid>
                                                </FormControl>
                                                :
                                                <></>
                                            }
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardBody>
                    {
                        errorSimpan && (
                            <Alert status="error" mb="6">
                            <AlertIcon />
                                <Text textAlign="justify" fontSize="sm">{errorSimpan}</Text>
                            </Alert>
                        )
                    }
                    {
                        successSimpan && (
                            <Alert status="success" mb="6">
                            <AlertIcon />
                                <Text textAlign="justify" fontSize="sm">{successSimpan}</Text>
                            </Alert>
                        )
                    }
                    <Flex justify="space-between" align="center" mt="10px">
                        <Button
                            onClick={history.goBack}
                            size="sm"
                            borderRadius={'8px'}
                            bg="gray.200"
                            color="#6a5aa3"
                            fontSize="sm"
                            _hover={{ bg: "gray.200", color: "#6a5aa3" }}
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
                            size="sm"
                            borderRadius={'8px'}
                            bg="#6a5aa3"
                            color="white"
                            fontSize="sm"
                            _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                        >
                            <Flex align="center" justifyContent="center" cursor="pointer">
                                <Text>
                                    Simpan
                                </Text>
                            </Flex>
                        </Button>
                    </Flex>
                </chakra.form>
             }
            </Card>
        </Flex>
    );
}


// styles
const baseStyles = {
    w: 7,
    h:6,
    fontSize:10,

    //fontSize:"sm",
  }
  
  const normalStyles = {
    ...baseStyles,
    _hover: {
      bg: '#B3A5DA',
    },
    color: 'white',
    bg: 'gray.300',
  }
  
  const activeStyles = {
    ...baseStyles,
    _hover: {
      bg: '#B3A5DA',
    },
    color: 'white',
    bg: '#544493',
  }
  
  const separatorStyles = {
    w: 7,
    h:6,
    bg: 'gray.200',
    
  }