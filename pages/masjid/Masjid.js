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
   
    Text,
    Button,
    SimpleGrid,
   
    useDisclosure,
    Grid, GridItem ,
    Spacer,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator'
import { SearchIcon, ArrowRightIcon, ArrowLeftIcon} from '@chakra-ui/icons'

function Masjid() {
    
    const [loading, setLoading] = useState(true);
    const [dataMasjid, setDataMasjid] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState("");

    const titleColor = useColorModeValue("#5C499E", "white");
    const subTitleColor = useColorModeValue("gray.500", "white");
    let inputBg = useColorModeValue("white", "gray.800");




    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
    const [placement, setPlacement] = React.useState('bottom')



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
            console.log("Masuk",res);
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

            <Drawer placement={placement}  isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Situs ini menggunakan cookie</DrawerHeader>
                <DrawerBody>
                    <p>Kami menggunakan cookie untuk mengingat detail login, 
                        menyediakan login yang aman, meningkatkan fungsionalitas situs, 
                        dan mengirimkan konten yang dipersonalisasi. Dengan terus menelusuri situs, Anda menerima cookie.</p>
                    
                </DrawerBody>

                <DrawerFooter>
                    
                    <Button bg='#6a5aa3' color='white' onClick={onClose}>Agree</Button>
                </DrawerFooter>

                </DrawerContent>
            </Drawer>

            <Flex justifyContent="space-between" mb="30px" pt={{ sm: "120px", md: "120px" }}
                py="22px"
                mx="auto"
                width="100%"
                maxW="95%"
                alignItems="center"
            >   
                <Flex direction="column" w="100%" background="transparent">
                      
                        <Grid
                            h={{sm:'auto',lg:'170px'}}
                            templateColumns='repeat(4, 1fr)'
                            mb={5}
                            mt={-4}
                            gap={4}
                            >
                            
                            <GridItem 
                                colSpan={{sm:'4',lg:'2'}}
                                bg=''
                                borderLeftRadius="10px" 
                               
                                >
                               
                                        <Image src="/masjid.png" h="170px" w="100%"   borderRadius="5px" />
                                
                            </GridItem>

                            <GridItem 
                                colSpan={{sm:'4',lg:'2'}}
                               
                                borderRadius="5px" border="1px solid #e3e3e3" bg="#6a5aa3" >
                                    <Box p={8}>
                                        <Center>
                                            <Box  fontSize={30} color="white" fontWeight={10}>
                                                 Jadwal kelas pelatihan
                                            </Box>
                                             
                                        </Center>
                                        <Center>
                                            <Flex mt={2}>
                                                <Button
                                                    size='md'
                                                    height='40px'
                                                    width='200px'
                                                    border='2px'
                                                    borderColor='white'
                                                    bg="transparent"
                                                    color="white"
                                                    borderRadius="50px"
                                                    fontWeight={10}
                                                    >
                                                    Daftarkan Segera
                                                </Button>
                                            </Flex>
                                        </Center>
                                    </Box>
                                       
                                
                            </GridItem>
                        
                        </Grid>


                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} borderRadius="2px">
                        <Center>
                        {
                            loading ?
                            <Flex p={5}>
                                <Loader type="Circles" color="#00BFFF" height={40} width={40} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>

                                </Loader>
                            </Flex>
                            :
                            <Flex direction="column" w="100%" background="transparent">
                              
                                <Flex direction="row" justifyContent="left" w={'full'} mb={6}  >
                                        <Text fontSize={{ sm: "11pt", xl: "xl" }} mt={{sm:"-2px",xl:""}}>Masjid yang terdaftar di Ghirah</Text>
                                        <Spacer />
                                     <Link to={`/cari-masjid`}>
                                        <Text fontSize='xs' > Lihat Semua</Text>
                                     </Link>
                                </Flex>
                                <SimpleGrid columns={{ sm: 1, lg: 5 }} spacing={10}>
                                    {dataMasjid.mosques.data.map(function(rows, i) {
                                        return (
                                            <Box key={i} maxW={'100%'}
                                                bg={'white'}
                                                border='1px' borderColor='gray.200'
                                                rounded={'md'}
                                                overflow={'hidden'}
                                            >
                                                <Image h={'120px'} w={'full'}
                                                    src={`${process.env.NEXT_PUBLIC_API_BACKEND}/` + rows.photo.replace("public", "storage")}
                                                    objectFit={'cover'}
                                                />
                                                <Box p={2}>
                                                    <Stack spacing={0} align={'center'} mb={2}>
                                                        <Flex h={'50px'}>
                                                            <Center>
                                                                <Text color={titleColor} fontSize={'sm'} fontWeight={500} align="center">
                                                                    { rows.name }
                                                                </Text>
                                                            </Center>
                                                        </Flex>
                                                        <Text fontSize={'xs'} color={subTitleColor} textAlign="center" pt={2} noOfLines={1} overflow={"hidden"}>
                                                            { rows.address }
                                                        </Text>
                                                    </Stack>

                                                    <Stack direction={'row'} justify={'center'} spacing={6} mb={2}>
                                                        <Stack spacing={0} align={'center'}>
                                                            <Text fontSize={'sm'} fontWeight={600}>{ rows.followers }</Text>
                                                            <Text fontSize={'xs'} color={'gray.500'}>
                                                                Pengikut
                                                            </Text>
                                                        </Stack>
                                                    </Stack>
                                                    <Link to={`/detail/${rows.id}/${rows.name.replace(/ /g, '_')}`}>
                                                        <Center pb={2}>
                                                            {/* <Text bgImage="url('/button_purple2.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'} _hover={{ bgColor:"transparent", bgImage:"url('/button_orange2.png')" }}
                                                                px={10} py={1.5} fontSize={'xs'} color={'white'}
                                                            >
                                                                DETAIL
                                                            </Text> */}
                                                            <Button bg="#6a5aa3" size='sm' fontSize={'xs'} color="white" w="200px"> 
                                                                Detail
                                                            </Button>
                                                        </Center>
                                                    </Link>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </SimpleGrid>

                                <Link to={`/cari-masjid`}>
                                    <Center pb={2}  mt={10}>
                                        {/* <Text bgImage="url('/button_purple2.png')" bgSize={'100% 100%'} bgRepeat={'no-repeat'} _hover={{ bgColor:"transparent", bgImage:"url('/button_orange2.png')" }}
                                            px={10} py={1.5} fontSize={'xs'} color={'white'}
                                            >
                                            LIHAT SEMUA MASJID
                                        </Text> */}

                                        <Button bg="#6a5aa3" size='sm' fontSize={'xs'} color="white" w="300px"> 
                                            LIHAT SEMUA MASJID  
                                        </Button>
                                    </Center>
                                </Link>
                            </Flex>
                        }
                        </Center>
                    </Card>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Masjid;

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