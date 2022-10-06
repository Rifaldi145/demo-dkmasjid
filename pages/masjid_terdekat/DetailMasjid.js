/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */

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
    GridItem,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Alert,
    AlertIcon,
    AspectRatio,
    useColorModeValue,
    useMediaQuery,
    Button
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
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
import { useHistory } from "react-router-dom";

function DetailMasjid(props) {
    const { id } = useParams();
    let history = useHistory();

    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);
    const [dataMasjid, setDataMasjid] = useState(null);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setErrorLoading(null);
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
        try {
            await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/cms/detail-masjid?id=${id}`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": localStorage.getItem('access_token')
                }
            }).then(async (res) => {
                console.log("res", res);
                setDataMasjid(res.data);
                setLoading(false);
            });
        } catch (err) {
            console.log("err", err);
            if(err.response) {
                if(err.response.status == 401) {
                    loadDataFirst(1);
                } else {
                    setLoading(false);
                    if(err.response.data != null) {
                        setErrorLoading(err.response.data.message);
                    } else {
                        setErrorLoading(JSON.stringify(err.response));
                    }
                }
            } else {
                setLoading(false);
                setErrorLoading(JSON.stringify(err));
            }
        }
    };

    return (
        <Flex position="relative">
            <Flex
                justifyContent="space-between"
                alignItems="center"
                pr={{ sm: 4, lg: 8 }}
                pl={{ sm: 4, lg: 8 }}
                w={'100%'}
            >
                <Flex direction="column" w="100%" h={ loading ? '100vh' : '100%' }>
                    <Center w={'100%'}>
                        <Flex overflowX={{ sm: "scroll", xl: "hidden" }} w={'100%'} justify="center" align="center">
                        {
                            loading ?
                            <Flex p={5}>
                                <Loader type="Circles" color="#B3A5DA" height={40} width={40} style={{position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)'}}></Loader>
                            </Flex>
                            :
                            <Flex direction="column" w={'100%'} h={'100%'}>
                                <Card
                                    w={'100%'}
                                    overflowX={{ sm: "scroll", xl: "hidden" }}
                                    mt={{ sm: '100px', lg: '100px' }}
                                    p={{ sm: 2.5, lg: 5 }}
                                >
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
                                    <Flex direction="column" w="100%" background="transparent">
                                        <Grid gap={{ sm: 0, lg: 8 }} templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}}>
                                            <GridItem colSpan={1}>
                                                <Flex
                                                    style={{ border: '1px solid #c6c5c5' }}
                                                    flexDirection={'column'}
                                                    w={'100%'} h={'100%'}
                                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                                    justify="center" align="center"
                                                >
                                                    <AspectRatio
                                                        w={'100%'} h={'100%'}
                                                        ratio={16/9}
                                                    >
                                                        <Image
                                                            borderRadius={{ sm: '5px', lg: '5px' }}
                                                            w={'100%'} h={'100%'}
                                                            src={`${process.env.NEXT_PUBLIC_API_BACKEND}/` + dataMasjid.mosques.photo.replace("public", "storage")}
                                                            fallbackSrc='/404.jpeg'
                                                            objectFit={'cover'}
                                                        />
                                                    </AspectRatio>
                                                </Flex>
                                            </GridItem>
                                            <GridItem colSpan={3} pt={{ sm: 4, lg: 0 }}>
                                                <Flex flexDirection={'column'} h={{ sm: 'auto', lg: '100%' }} justify={'center'} align={'start'}>
                                                    <Text
                                                        color={textColor}
                                                        fontSize={{ sm: 'xl', lg: '2xl' }}
                                                        fontWeight={'bold'}
                                                        textAlign={'left'}
                                                        pb={1}
                                                    >
                                                        { dataMasjid.mosques.name }
                                                    </Text>
                                                    <ReactStars size={20} value={parseFloat(dataMasjid.mosques.ratings)} edit={false}/>
                                                    <Text
                                                        pt={4}
                                                        color={textColor}
                                                        fontSize={{ sm: 'sm', lg: 'md' }}
                                                        fontWeight={'normal'}
                                                        textAlign={'left'}
                                                    >
                                                        { dataMasjid.mosques.address }
                                                    </Text>
                                                    <Flex flexDirection={'column'} h={'auto'} pt={4} w={'100%'} justify={'center'} align={{ sm: 'center', lg: 'start' }}>
                                                        <Flex flexDirection={'column'} h={'auto'} justify={'center'} align={'center'}>
                                                            <Text
                                                                color={textColor}
                                                                textAlign={'left'}
                                                                fontSize={{ sm: 'lg', lg: 'xl' }}
                                                                fontWeight={'bold'}
                                                            >
                                                                { dataMasjid.mosques.followers }
                                                            </Text>
                                                            <Text
                                                                pt={{ sm: 1, lg: 1 }}
                                                                color={textColor}
                                                                textAlign={'left'}
                                                                fontSize={{ sm: 'sm', lg: 'md' }}
                                                                fontWeight={'normal'}
                                                            >
                                                                Pengikut
                                                            </Text>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </GridItem>
                                        </Grid>
                                    </Flex>
                                </Card>
                                <Accordion allowToggle>
                                    <AccordionItem>
                                        <Card
                                            w={'100%'}
                                            overflowX={{ sm: "scroll", xl: "hidden" }}
                                            mt={{ sm: 2, lg: 4 }}
                                            p={{ sm: 2.5, lg: 5 }}
                                        >
                                            <Flex direction="column" w="100%" background="transparent">
                                                <AccordionButton _expanded={{ bg: 'transparent' }} _focus={{ bg: 'transparent' }} p={0} m={0}>
                                                    <Box borderBottom="2px solid #d7d7d7" w={'100%'} flex='1' textAlign='left'>
                                                        <Text color={textColor} fontSize={{ sm: "xl", lg: "xl" }} pb={4} lineHeight={1.2} fontWeight={'bold'}>
                                                            Lokasi Masjid
                                                        </Text>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel p={0} m={0}>
                                                    <Card p="0px" bg={'#F8F9FA'} minH={300} maxH={300} mt={{ sm: 4, lg: 6 }}>
                                                        <Map
                                                            google={props.google}
                                                            zoom={16}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: '10px'
                                                            }}
                                                            initialCenter={{
                                                                lat: dataMasjid.mosques.latitude,
                                                                lng: dataMasjid.mosques.longitude
                                                            }}
                                                        >
                                                            <Marker 
                                                                name={`${dataMasjid.mosques.name}`}
                                                                icon={{
                                                                    url: '/marker_mosque.png',
                                                                    anchor: new google.maps.Point(17, 46),
                                                                    scaledSize: new google.maps.Size(100, 100)
                                                                }}
                                                            />
                                                        </Map>
                                                    </Card>
                                                </AccordionPanel>
                                            </Flex>
                                        </Card>
                                    </AccordionItem>
                                </Accordion>
                                <Accordion allowToggle>
                                    <AccordionItem>
                                        <Card
                                            borderBottomRadius={0}
                                            w={'100%'}
                                            overflowX={{ sm: "scroll", xl: "hidden" }}
                                            mt={{ sm: 2, lg: 4 }}
                                            p={{ sm: 2.5, lg: 5 }}
                                        >
                                            <Flex direction="column" w="100%" background="transparent">
                                                <AccordionButton _expanded={{ bg: 'transparent' }} _focus={{ bg: 'transparent' }} p={0} m={0}>
                                                    <Box borderBottom="2px solid #d7d7d7" w={'100%'} flex='1' textAlign='left'>
                                                        <Text color={textColor} fontSize={{ sm: "xl", lg: "xl" }} pb={4} lineHeight={1.2} fontWeight={'bold'}>
                                                            Fasilitas Masjid
                                                        </Text>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel p={0} m={0}>
                                                    <Grid gap={{ sm: 1, lg: 2 }} templateColumns={{ sm: 'repeat(4, 1fr)', lg: 'repeat(10, 1fr)'}} pt={{ sm: 4, lg: 6 }}>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.karpet != null ? dataMasjid.mosques.facilities.karpet == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Karpet
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.ac != null ? dataMasjid.mosques.facilities.ac == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                AC
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.wifi != null ? dataMasjid.mosques.facilities.wifi == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Wifi
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.kopi != null ? dataMasjid.mosques.facilities.kopi == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Air Minum/{'\n'}Kopi
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 0 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.sarung_mukena != null ? dataMasjid.mosques.facilities.sarung_mukena == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Sarung/{'\n'}Mukena
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 0 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.tajil != null ? dataMasjid.mosques.facilities.tajil == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Ta`jil{'\n'}Ramadhan
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 0 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.tempat_mandi != null ? dataMasjid.mosques.facilities.tempat_mandi == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Tempat Mandi
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 0 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.closet_duduk != null ? dataMasjid.mosques.facilities.closet_duduk == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Closet Duduk
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 0 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.halaman_parkir != null ? dataMasjid.mosques.facilities.halaman_parkir == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Halaman Parkir
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 0 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.ambulans != null ? dataMasjid.mosques.facilities.ambulans == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Ambulans
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.jenazah != null ? dataMasjid.mosques.facilities.jenazah == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Pengurusan{'\n'}Jenazah
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.tp_alquran != null ? dataMasjid.mosques.facilities.tp_alquran == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                TP Al{'\n'}Qur`an
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.aula != null ? dataMasjid.mosques.facilities.aula == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Aula{'\n'}Pernikahan
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid['mosques']['facilities']['24jam'] != null ? dataMasjid['mosques']['facilities']['24jam'] == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Beroperasi{'\n'}24{'\n'}Jam
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.ramah_disabilitas != null ? dataMasjid.mosques.facilities.ramah_disabilitas == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Ramah{'\n'}Disabilitas
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.klinik != null ? dataMasjid.mosques.facilities.klinik == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Klinik
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.sarana_olahraga != null ? dataMasjid.mosques.facilities.sarana_olahraga == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Gedung/{'\n'}Sarana{'\n'}Olah Raga
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.perpustakaan != null ? dataMasjid.mosques.facilities.perpustakaan == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Perpus{'\n'}takaan
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1} pt={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" justify="center" align="center">
                                                                <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} h={'100%'}>
                                                                    <GridItem colSpan={1} pb={1}>
                                                                        <Flex
                                                                            bg={
                                                                                dataMasjid.mosques.facilities.minimarket != null ? dataMasjid.mosques.facilities.minimarket == 1 ? '#F8F9FA' : '#666666B3' : '#666666B3'
                                                                            }
                                                                            borderRadius={'5px'}
                                                                            pt={2} pb={2}
                                                                            flexDirection="row" justify="center" align="center"
                                                                        >
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
                                                                            <Text textAlign={'center'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                                Minimarket
                                                                            </Text>
                                                                        </Flex>
                                                                    </GridItem>
                                                                </Grid>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </AccordionPanel>
                                            </Flex>
                                        </Card>
                                    </AccordionItem>
                                </Accordion>
                                <Box borderBottomRadius={'5px'} mb={{ sm: '20px', lg: '20px' }} bg={'gray.200'} px={{ sm: 2.5, lg: 5 }} py={{ sm: 2, lg: 4 }}>
                                    <Flex justify="space-between" align="center" w="100%">
                                        <Button
                                            onClick={history.goBack}
                                            size={{ sm: 'sm', lg: 'sm' }}
                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                            bg="gray.400"
                                            color={'white'}
                                            _hover={{ bg: "#B3A5DA", color: textColor }}
                                        >
                                            <Flex align="center" justifyContent="center" cursor="pointer">
                                                <Text>
                                                    Kembali
                                                </Text>
                                            </Flex>
                                        </Button>
                                        <></>
                                    </Flex>
                                </Box>
                            </Flex>
                        }
                        </Flex>
                    </Center>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAjDSV-6RaUaptCIl_NNKAZ5XQO_Geo_pE',
  })(DetailMasjid);