import React, { useState, useEffect } from "react";
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Text,
    Tr,
    Td,
    Th,
    useColorModeValue,
    Button,
    Center,
    Icon,
    InputGroup,
    Input,
    Box,
    Image,
    Badge,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
 import CardBody from "../../components/Card/CardBody.js";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator'
import { SearchIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon,ChevronDownIcon } from '@chakra-ui/icons'


export default function Event() {

   

    let users = JSON.parse(localStorage.getItem('users'));
    const [loading, setLoading] = useState(true);
   
    const [dataPetugas, setDataPetugas] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState("");

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = num => num.toString().replace(/[^0-9,]/g, "");

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

    const token = users.token;


    async function loadData() {
        console.log("TEST", users.token);
        var postData = {
            keyword: query
        };
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/petugas`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("Masuk Petugas",res);
            setDataPetugas(res.data);
            setLoading(false);
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                console.log("err.response", err.response.status);
                if(err.response.status == 401) {
                    alert("Maaf Sistem Ini Sedang Ada Perbaikan");
                }
            }
        });
    };

    function tglIndo(date) {
        let dateObj = new Date(date);
        let bulans = "";
        if((dateObj.getMonth() + 1) == 1) {
            bulans = "Januari";
        } else if((dateObj.getMonth() + 1) == 2) {
            bulans = "Februari";
        } else if((dateObj.getMonth() + 1) == 3) {
            bulans = "Maret";
        } else if((dateObj.getMonth() + 1) == 4) {
            bulans = "April";
        } else if((dateObj.getMonth() + 1) == 5) {
            bulans = "Mei";
        } else if((dateObj.getMonth() + 1) == 6) {
            bulans = "Juni";
        } else if((dateObj.getMonth() + 1) == 7) {
            bulans = "Juli";
        } else if((dateObj.getMonth() + 1) == 8) {
            bulans = "Agustus";
        } else if((dateObj.getMonth() + 1) == 9) {
            bulans = "September";
        } else if((dateObj.getMonth() + 1) == 10) {
            bulans = "Oktober";
        } else if((dateObj.getMonth() + 1) == 11) {
            bulans = "November";
        } else if((dateObj.getMonth() + 1) == 12) {
            bulans = "Desember";
        }
        let myDate = `${('0' + dateObj.getDate()).slice(-2)}  ${bulans}, ${(dateObj.getUTCFullYear())} ${('0' + dateObj.getHours()).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}`;
        return myDate;
    }
    
    const changeHandler = (event) => {
        setQuery(event.target.value);
    };

    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }}
        w={{ sm: "calc(100vw - 0px)", xl: "calc(100vw - 56px - 280px)" }}
        ml={-10}
        >
             {
                loading ?
                    <Loader type="Circles" color="#00BFFF" height={50} width={50} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
                :<>
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                  
                            <Box p="16px" bg={bgColor} borderRadius="10px">
                                <Flex direction={{ sm: 'column', lg: 'row' }} justify="space-between" align="center" minWidth="100%" flexWrap="nowrap">
                                    <Flex direction="row" align="center" w="100%">
                                        <InputGroup
                                            size="md"
                                            borderRadius="0" 
                                            borderLeftRadius="8px"
                                            cursor="pointer"
                                            bg={inputBg}
                                            w={{ sm: '70%', lg: '40%' }}
                                            _focus={{borderColor: { mainTeal }}} 
                                            _active={{borderColor: { mainTeal }}}
                                        >
                                            <Input onChange={changeHandler} defaultValue={query} fontSize="sm" color={mainText} placeholder="Cari..." borderRadius="inherit"/>
                                        </InputGroup>
                                        <Button
                                            onClick={() => loadData(0, 4)}
                                            size="md"
                                            borderRadius="0" 
                                            borderRightRadius="8px"
                                            w={{ sm: '30%', lg: '7%' }}
                                            bg="#6a5aa3"
                                            color="white"
                                            fontSize="sm"
                                            _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                                        >
                                            <Flex align="right" justifyContent="center" cursor="pointer">
                                                <Text>
                                                    Cari
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Flex>
                                    <Link align="right" >
                                        <Menu>
                                            <MenuButton
                                                w={{ sm: '100%', lg: '130%' }}
                                                mt={{ sm: '10px', lg: '0px' }}
                                                ml={{ sm: '0px', lg: '-20px' }}
                                                px={4}
                                                py={2}
                                                fontSize="sm"
                                                size="sm"
                                                transition='all 0.2s'
                                                borderRadius='md'
                                                borderWidth='1px'
                                                color="white"
                                                bg="#6a5aa3"
                                                _hover={{ bg: '#6a5aa3' }}
                                                _expanded={{ bg: 'blue.400' }}
                                                _focus={{ boxShadow: 'outline' }}
                                            >
                                                Tambah Event <ChevronDownIcon />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem>
                                                        <Link to={`/admin/tambah-event-rutin`}>
                                                            <Text>
                                                                Event Rutin
                                                            </Text>
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Link to={`/admin/tambah-teks`}>
                                                            <Text>
                                                                Event Khusus
                                                            </Text>
                                                        </Link>
                                                    </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Link>
                                </Flex>
                            </Box>

                            <CardBody>
                            {
                                <Table direction="column" rounded="md" mt="10px">
                                   
                                        <Thead bg="#6a5aa3">
                                            <Tr>
                                                <Th color="white" borderTopLeftRadius="8px">Nama Event</Th>
                                                <Th color="white">Kegiatan</Th>
                                                
                                            </Tr>
                                        </Thead>
                                        <Tbody border="1px" borderColor="gray.200" borderRadius="0px" borderBottomRadius="8px">
                                          
                                                <Tr>
                                                    <Td width="60%" pl="16px">
                                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                                            <Flex >
                                                               
                                                            <Text fontSize={{ sm: '10pt', lg: '11pt' }} color={textColor} fontWeight="bold" minWidth="100%" >
                                                                    {  dataPetugas.user.name }
                                                                </Text>&nbsp;

                                                            </Flex>
                                                        </Flex>

                                                        <Text mt="-2">
                                                                    {
                                                                            dataPetugas.user.active == "1" ?
                                                                            <Badge variant='outline' colorScheme='green'>
                                                                                    Aktif
                                                                            </Badge>

                                                                            :
                                                                            <Badge variant='outline' colorScheme='red'>
                                                                                    Tidak Aktif
                                                                            </Badge>
                                                                        }
                                                            </Text>

                                                             <Text fontSize={{ sm: '8pt', lg: '10pt' }} color={nameColor} fontWeight="normal" mt="1">
                                                                    Dibuat pada
                                                                </Text>

                                                                
                                                               
                                                                <Text fontSize={{ sm: '8pt', lg: '10pt' }} color={nameColor} >
                                                                      {  tglIndo(dataPetugas.user.created_at) }
                                                                </Text>

                                                    </Td>
                                                    
                                                
                                                   
                                                    <Td width="10%" pl="16px">
                                                        <Flex align="left" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                                            <Flex direction="column">

                                                                    <Link style={{ marginLeft: '5px' }} >
                                                                        <Button p="0px" 
                                                                            bg="#6a5aa3"
                                                                            borderRadius="3px"
                                                                            size="xs"
                                                                            fontSize={{ sm: '8pt', lg: '10pt' }}
                                                                            _hover={{ bg: "#6a5aa3" }}
                                                                        >
                                                                            <Flex p="10px" align="center" justifyContent="center" cursor="pointer">
                                                                                <Text color="#fff" >
                                                                                    Urun Dana
                                                                                </Text>
                                                                            </Flex>
                                                                        </Button>
                                                                    </Link>

                                                              
                                                            </Flex>

                                                            <Link style={{ marginLeft: '5px' }} >
                                                                <Button p="0px" 
                                                                    bg="gray.200"
                                                                    borderRadius="8px"
                                                                    size="xs"
                                                                    fontSize="sm"
                                                                    _hover={{ bg: "gray.200" }}
                                                                >
                                                                    <Flex p="10px" align="center" justifyContent="center" py="10px" cursor="pointer">
                                                                        <Text color="#6a5aa3" fontWeight="bold">
                                                                            Detail
                                                                        </Text>
                                                                    </Flex>
                                                                </Button>
                                                            </Link>
                                                        </Flex>
                                                    </Td>
                                                    
                                                </Tr>
                                           
                                        </Tbody>
                                       
                                    
                                </Table>
                                
                               
                            }
                        </CardBody>

                     
                    </Card>
                    

                    </>   
             }
             
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