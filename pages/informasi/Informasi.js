/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import {
    Flex,
    useColorModeValue,
    Center,
    Box,
    Image,
    Stack,
    Heading,
    Text,
    Button,
    SimpleGrid,
    InputGroup,
    Input,
    useDisclosure,
    Grid, GridItem ,
    LinkBox, LinkOverlay,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import Card from "../components/Card/Card.js";

import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator'

function Informasi() {
    
    const [loading, setLoading] = useState(true);
    const [dataMasjid, setDataMasjid] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState("");

    const titleColor = useColorModeValue("#5C499E", "white");
    const subTitleColor = useColorModeValue("gray.500", "white");
    let inputBg = useColorModeValue("white", "gray.800");



   // const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })





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
        setLoading(true);
        setCurrentPage(currentPage);
        if(localStorage.getItem('access_token') != null) {
            loadDataMasjid(currentPage);
        } else {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/access_token`)
            .then(async (res) => {
                localStorage.setItem('access_token', res.data.access_token);
                loadDataMasjid(currentPage);
            })
            .catch((err) => {
                setLoading(false);
            })
        }
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

    async function loadDataMasjid(currentPage) {
        var postData = {
            keyword: query
        };
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/cms/all-masjid?page=${currentPage}`,
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
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                console.log("err.response", err.response.status);
                if(err.response.status == 401) {
                    loadDataFirst(1);
                }
            }
        });
    };

    const changeHandler = (event) => {
        setQuery(event.target.value);
    };

    return (
     

        <Flex position="relative" mb="40px">

    

            <Flex justifyContent="space-between" mb="30px" pt={{ sm: "120px", md: "120px" }}
                py="22px"
                mx="auto"
                width="100%"
                maxW="95%"
                alignItems="center"
            >   
                <Flex direction="column" w="100%" background="transparent">


                    <Alert status='success' variant='left-accent' mb="3" mt="-5">
                        <AlertIcon />
                         Dapatkan semua informasi Jadwal Pelatihan Atau Traning Aplikasi
                    </Alert>

                    
 
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
                              
                               
                                <SimpleGrid columns={{ sm: 1, lg: 3 }} spacing={3}>
                                    {dataMasjid.mosques.data.map(function(rows, i) {
                                        return (
                                            <Box key={i} maxW={'100%'}
                                            bg={'white'}
                                            border='1px' borderColor='gray.100'
                                            rounded={'md'}
                                            overflow={'hidden'}
                                             >   

                                                <LinkBox as='article' maxW='xl' p='5' borderWidth='1px' rounded='md'>
                                                    <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
                                                    13 days ago
                                                    </Box>
                                                    <Heading size='md' my='2'>
                                                        <LinkOverlay href='#'>
                                                                 { rows.name }
                                                        </LinkOverlay>
                                                    </Heading>
                                                    <Text mb='3'>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        
                                                    
                                                    </Text>
                                                    <Box as='a' color='teal.400' href='#' fontWeight='bold'>
                                                        Daftarkan Segera
                                                    </Box>
                                                </LinkBox>
                                          </Box>
                                        );
                                    })}
                                </SimpleGrid>

                                
                            </Flex>
                        }
                        </Center>
                    </Card>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Informasi;

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