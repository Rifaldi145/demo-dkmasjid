/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
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
    Button,
    chakra,
} from "@chakra-ui/react";
import Card from "../../../components/Card/Card.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Adzan from "./Adzan";
import Iqamah from "./Iqamah";
import Sholat from "./Sholat";
import Tarhim from "./Tarhim";
import Syuruq from "./Syuruq";
import toast from "../../../../components/Toast";
import DilarangSholat from "./DilarangSholat.js";
import SholatSegeraDimulai from "./SholatSegeraDimulai.js";

export default function LimaWaktu() {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const notifyTampilkanTv = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissTampilkanTv = useCallback(() => {
        toast.dismiss();
    }, []);

    const [dateNow, setDateNow] = useState(new Date());
    const tgl_skrng = formatTgl(dateNow);

    const [callbackTab, setCallbackTab] = useState(null);

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);
    const [dataSetting, setDataSetting] = useState(null);

    const nameColor = useColorModeValue("gray.500", "white");
    const textColor = useColorModeValue("black.600", "white");

    const [isLoadingTampilkanTv, setIsLoadingTampilkanTv] = useState(false);

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
        let myDate = ` ${(dateObj.getUTCFullYear())}/${bulans}/${('0' + dateObj.getDate()).slice(-2)} `;
        return myDate;
    }

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        setErrorLoading(null);
        try {
            await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                
            }).then(async (res) => {
                setLoading(false);
                setDataSetting(res.data);
                setEditorLoaded(true);
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

    const submitTampilkanTv = async (event) => {
        event.preventDefault();
        setIsLoadingTampilkanTv(true);
        try {
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/sholat-5-waktu/push-tv`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
            }).then(async (res) => {
                if(res.data.success) {
                    showSucessTampilkanTv(res.data.message);
                    loadData();
                } else {
                    showErrorTampilkanTv(res.data.message);
                }
                setIsLoadingTampilkanTv(false);
            });
        } catch (err) {
            console.log("err", err);
            setIsLoadingTampilkanTv(false);
            if(err.response.data != null) {
                showErrorTampilkanTv(err.response.data.message);
            } else {
                showErrorTampilkanTv(JSON.stringify(err.response));
            }
        }
    };
    
    function showSucessTampilkanTv(message) {
        notifyTampilkanTv("success", message);
    }
    
    function showErrorTampilkanTv(message) {
        notifyTampilkanTv("error", message);
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
                        <Tabs variant='enclosed' size={'md'} defaultIndex={ callbackTab == null ? 0 : callbackTab }>
                            <chakra.form onSubmit={submitTampilkanTv}>
                                <Flex justify="space-between" align="center" w="100%" pb={4}>
                                    <Flex align="center" justifyContent="center" cursor="pointer">
                                        
                                    </Flex>
                                    <Button
                                        isLoading={isLoadingTampilkanTv}
                                        type="submit"
                                        size={{ sm: 'sm', lg: 'sm' }}
                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                        bg="#6a5aa3"
                                        color="white"
                                        _hover={{ bg: "#B3A5DA", color: textColor }}
                                    >
                                        Tampilkan ke TV
                                    </Button>
                                </Flex>
                            </chakra.form>
                            <TabList overflowX="scroll">
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Adzan</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Iqamah</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Sholat</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Tarhim</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Syuruq</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Larangan Sholat</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Mulai Sholat</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0}>
                                    <Adzan
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataSetting={dataSetting}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <Iqamah
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataSetting={dataSetting}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <Sholat
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataSetting={dataSetting}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <Tarhim
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataSetting={dataSetting}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <Syuruq
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataSetting={dataSetting}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <DilarangSholat
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataSetting={dataSetting}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <SholatSegeraDimulai
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataSetting={dataSetting}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Card>
                }
                </Flex>
            </Center>
        </Flex>
    );
}