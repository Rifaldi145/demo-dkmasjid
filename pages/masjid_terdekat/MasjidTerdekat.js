/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import {
    Flex,
    useColorModeValue,
    Center,
    Image,
    Text,
    Button,
    SimpleGrid,
    InputGroup,
    Input,
    InputRightElement,
    Alert,
    AlertIcon,
    AspectRatio
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import useGeolocation from "react-hook-geolocation";
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator';
import { SearchIcon, ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';

export default function MasjidTerdekat() {
    const geolocation = useGeolocation();
    
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);

    const [dataMasjid, setDataMasjid] = useState(null);

    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState("");

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    let inputBg = useColorModeValue("white", "gray.800");
    
    // constants
    const outerLimit = 2
    const innerLimit = 1
    const itemPerPage = 1

    const {
        isDisabled,
        pagesQuantity,
        currentPage,
        setCurrentPage,
      } = usePaginator({
        total: totalPage,
        initialState: {
          pageSize: itemPerPage,
          currentPage: 1,
          isDisabled: false,
        },
    });

    useEffect(() => {
        loadData(1);
    }, []);
    
    async function loadData(currentPage) {
        setErrorLoading(null);
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            
            setCurrentPage(currentPage);
            if(localStorage.getItem('access_token') != null) {
                loadDataMasjid(currentPage,position.coords.latitude,position.coords.longitude);
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/access_token`)
                .then(async (res) => {
                    localStorage.setItem('access_token', res.data.access_token);
                    loadDataMasjid(currentPage,position.coords.latitude,position.coords.longitude);
                })
                .catch((err) => {
                    setLoading(false);
                })
            }
        });
    };

    async function loadDataFirst(currentPage) {
        setLoading(true);
        setCurrentPage(currentPage);
        await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/access_token`)
        .then(async (res) => {
            localStorage.setItem('access_token', res.data.access_token);
            loadDataMasjid(currentPage);
        })
        .catch((err) => {
            setLoading(false);
        })
    };

    async function loadDataMasjid(currentPage, latitude, longitude) {
        try {
            var postData = {
                keyword: query
            };
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/ghirahV1/mosque-nearby?page=${currentPage}&lat=${latitude}&lng=${longitude}`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": localStorage.getItem('access_token')
                },
                data: postData
            }).then(async (res) => {
                setCurrentPage(res.data.mosques.current_page);
                setTotalPage(res.data.mosques.last_page);
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
                            <Card
                                w={'100%'}
                                overflowX={{ sm: "scroll", xl: "hidden" }}
                                mt={{ sm: '100px', lg: '100px' }}
                                mb={{ sm: '20px', lg: '20px' }}
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
                                    <Flex direction="row" justifyContent="right" w={'full'} pb={8}>
                                        <InputGroup
                                            size={{ sm: 'sm', lg: 'md' }}
                                            cursor="pointer"
                                            bg={'white'}
                                            w={{ sm: '100%', lg: '25%' }}
                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                        >
                                            <Input
                                                onChange={(event) => {
                                                    setQuery(event.target.value);
                                                }}
                                                value={query}
                                                color={'black'}
                                                placeholder="Cari Masjid..."
                                                border="none"
                                                borderBottom="1px solid grey"
                                                style={{ borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}
                                            />
                                            <InputRightElement
                                                pr={2}
                                                cursor={'pointer'}
                                                onClick={() => loadDataMasjid(1, latitude, longitude)}
                                            >
                                                <Flex flexDirection={'column'} h={'100%'} w={'100%'} justify={'end'} align={'end'}>
                                                    <SearchIcon mt={3} fontSize={{ sm: 'xs', lg: 'sm' }} color='gray.600' onClick={() => loadData(1)}/>
                                                </Flex>
                                            </InputRightElement>
                                        </InputGroup>
                                    </Flex>
                                    <SimpleGrid columns={{ sm: 1, lg: 5 }} gap={{ sm: 4, lg: 4 }}>
                                        {dataMasjid.mosques.data.map(function(rows, i) {
                                            return (
                                                <Flex key={i} flexDirection={'column'} w={'100%'} bg={'blackAlpha.50'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                                                    <AspectRatio w={'100%'} ratio={16/7}>
                                                        <Image h={'full'} w={'full'}
                                                            src={`${process.env.NEXT_PUBLIC_API_BACKEND}/` + rows.photo.replace("public", "storage")}
                                                            fallbackSrc='/404.jpeg'
                                                            objectFit={'cover'}
                                                        />
                                                    </AspectRatio>
                                                    <Flex p={{ sm: 2, lg: 2 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                                        <Flex flexDirection={'column'} h={{ sm: 'auto', lg: '100%' }} justify={'start'}>
                                                            <Text textStyle={'isi'} textAlign="center">
                                                                { rows.name }
                                                            </Text>
                                                        </Flex>
                                                        <Flex flexDirection={'column'} h={'auto'} pt={{ sm: 1, lg: 2 }}>
                                                            <Text textStyle={'isi_isi'} textAlign="center" noOfLines={1} overflow={"hidden"}>
                                                                { rows.address }
                                                            </Text>
                                                        </Flex>
                                                        <Flex flexDirection={'row'} justifyContent="space-between" h={'auto'} pt={{ sm: 2, lg: 4 }} justify={'center'} align={'center'}>
                                                            <Flex flexDirection={'column'} h={'auto'}>
                                                                <Flex flexDirection={'column'} h={'auto'}>
                                                                    <Text textStyle={'isi'} textAlign="center">
                                                                        { rows.followers }
                                                                    </Text>
                                                                </Flex>
                                                                <Flex flexDirection={'column'} h={'auto'} pt={{ sm: 1, lg: 1 }}>
                                                                    <Text textStyle={'isi_isi'} textAlign="center">
                                                                        Pengikut
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                            <Link to={`/detail/${rows.id}/${rows.name.replace(/ /g, '_')}`}>
                                                                <Button variant={'normal'}>
                                                                    Detail
                                                                </Button>
                                                            </Link>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            );
                                        })}
                                    </SimpleGrid>
                                </Flex>
                                <Flex flexDirection={'row'} w={'100%'} justify={{ sm: 'center', lg: 'center' }} align={{ sm: 'center', lg: 'center' }}>
                                    <Paginator
                                        isDisabled={isDisabled}
                                        activeStyles={activeStyles}
                                        innerLimit={innerLimit}
                                        currentPage={currentPage}
                                        outerLimit={outerLimit}
                                        normalStyles={normalStyles}
                                        separatorStyles={separatorStyles}
                                        pagesQuantity={pagesQuantity}
                                        onPageChange={(nextPage) => {
                                            loadDataMasjid(nextPage, latitude, longitude);
                                        }}
                                    >
                                        <Container align='center' w='auto' mt={4}>
                                            <Previous m={1} size={{ sm: 'xs', lg: 'sm' }} bg={'#B3A5DA'} color={'white'}>
                                                <ArrowLeftIcon fontSize={'2xs'}/>
                                            </Previous>
                                            <PageGroup isInline align='center' />
                                            <Next m={1} size={{ sm: 'xs', lg: 'sm' }} bg={'#B3A5DA'} color={'white'}>
                                                <ArrowRightIcon fontSize={'2xs'}/>
                                            </Next>
                                        </Container>
                                    </Paginator>
                                </Flex>
                            </Card>
                        }
                        </Flex>
                    </Center>
                </Flex>
            </Flex>
        </Flex>
    );
}

// styles
const baseStyles = {
    w: 7,
    h: 6,
    fontSize: 10,
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