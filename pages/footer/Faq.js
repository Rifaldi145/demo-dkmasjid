/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState, useEffect } from "react";
import {
    Flex,
    Container,
    SimpleGrid,
    Image,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    Center,
    Grid,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import axios from 'axios';
import { useParams } from "react-router";
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
import { ReactElement } from 'react';
import Loader from 'react-loader-spinner';
import ReactStars from "react-rating-stars-component";

function Faq() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [dataMasjid, setDataMasjid] = useState(null);

    useEffect(() => {
     
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        if(localStorage.getItem('access_token') != null) {
            loadDataMasjid();
        } else {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/access_token`)
            .then(async (res) => {
                localStorage.setItem('access_token', res.data.access_token);
                loadDataMasjid();
            })
            .catch((err) => {
                setLoading(false);
            })
        }
    };



    async function loadDataFirst() {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/access_token`)
        .then(async (res) => {
            localStorage.setItem('access_token', res.data.access_token);
            loadDataMasjid();
        })
        .catch((err) => {
            setLoading(false);
        })
    };

    async function loadDataMasjid() {
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/cms/detail-masjid?id=${id}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": localStorage.getItem('access_token')
            }
        }).then(async (res) => {
            console.log("res.data", res.data);
            setDataMasjid(res.data);
            setLoading(false);
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                if(err.response.status == 401) {
                    loadDataFirst();
                }
            }
        });
    };

    return (
        <Flex position="relative" mb="40px">
            <Flex justifyContent="space-between" mb="30px" pt={{ sm: "120px", md: "120px" }}
                py="22px"
                mx="auto"
                //width="1044px"
                width="100%"
                maxW="90%"
                alignItems="center"
            >
                <Flex direction="column" w="100%" background="transparent">
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                        <Center>
                        {
                            loading ?
                            <Flex p={5}>
                                <Loader type="Circles" color="#00BFFF" height={40} width={40} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>

                                </Loader>
                            </Flex>
                            :
                            <Flex direction="column" w="100%" background="transparent">
                                <Container maxW={''} py={2}>
                                    {/* //5xl */}
                                    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
                                      
                                        <Center spacing={4}>
                                            <Heading as='h3'fontSize={{ sm: "20", lg: "30" }}>FAQ</Heading>

                                       
                                        </Center>
                                    </SimpleGrid>
                                    
                                 

                                   


                                    <SimpleGrid mt={6} columns={{ base: 1, md: 1 }} spacing={10}>
                                        <Card p="0px" border='1px solid #e9e9e9' >
                                        <Heading  fontSize={{ sm: "17", lg: "20" }} p="5">Instalasi:</Heading>

                                                <Accordion allowToggle>
                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                 Cara pasang STB Kalim
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>

                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                            Cara koneksi ke Internet
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>

                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                Cara tampilkan di banyak TV
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>

                                                </Accordion>


                                                <Heading  fontSize={{ sm: "17", lg: "20" }} p="5">Fitur:</Heading>

                                                <Accordion allowToggle>
                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                 Cara upload konten
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>

                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                  Ukuran/resolusi ideal konten image (image yang dibuat masjid banyaknya square) 
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>

                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                 Ukuran/size maksimal video agar tidak loading di ghirah
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>


                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                 Rujukan jadwal shalat
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>

                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                 Keunggulan (manfaat) dari produk lain (Jasma, Medsos)
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>


                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                            Live streaming
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>

                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                            Kapasitas maksimal jumlah konten yang sudah diupload
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>


                                                    <AccordionItem>
                                                        <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'  fontWeight="bold">
                                                                    Cara jamaah melihat konten Masjid
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                        commodo consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>


                                                </Accordion>


                                                
                                        </Card>
                                    </SimpleGrid>
                                </Container>
                            </Flex>
                        }
                        </Center>
                    </Card>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Faq;