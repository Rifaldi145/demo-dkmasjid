/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useRef } from "react";
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
    Button
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import ProfilMasjid from "./profil/ProfilMasjid.js";
import RekeningMasjid from "./rekening/RekeningMasjid.js";
import Fasilitas from "./fasilitas/Fasilitas.js";

export default function Pengaturan() {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const [callbackTab, setCallbackTab] = useState(null);

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);
    const [dataMasjid, setDataMasjid] = useState(null);

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
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/profile-masjid`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                
            }).then(async (res) => {
                setLoading(false);
                setDataMasjid(res.data);
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
                            <TabList overflowX="scroll">
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Profil</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Rekening</Tab>
                                <Tab _selected={{ bg: "#B3A5DA" }} color={textColor} borderRadius={'5px'} fontWeight={'bold'} fontSize={{ sm: 'xs', lg: 'sm' }}>Fasilitas</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0}>
                                    <ProfilMasjid
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataMasjid={dataMasjid}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <RekeningMasjid
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataMasjid={dataMasjid}
                                    />
                                </TabPanel>
                                <TabPanel p={0}>
                                    <Fasilitas
                                        loading={loading}
                                        errorLoading={errorLoading}
                                        setCallbackTab={setCallbackTab}
                                        loadData={loadData}
                                        dataMasjid={dataMasjid}
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