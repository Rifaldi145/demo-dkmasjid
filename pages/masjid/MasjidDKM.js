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
    Link as Links,
    Text,
    Button,
    SimpleGrid,
   
    useDisclosure,
    Grid, GridItem ,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Drawer,Badge,
 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator'
import { SearchIcon, ArrowRightIcon, ArrowLeftIcon,MdCheckCircle,MdSettings, CloseButton } from '@chakra-ui/icons'
import {
    FaCheck,FaWindowClose,FaRegCheckCircle,FaExclamationCircle
} from "react-icons/fa";

function MasjidDKM() {
    
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
        <Flex position="relative" mb="90px" bg="white">
            
            <Drawer placement={placement}  isOpen={isOpen}>
                <div className="popup_custom_right" >
                        <div className="close_pfda"  onClick={onClose}><FaWindowClose></FaWindowClose></div>
                        <Center >
                            <div className="logo_pfda_right" >
                                <Image src="/baiti_logo.jpg" w="90px" borderRadius="5px" boxShadow="0 1px 8px 0 #c2c2c2" />
                            </div>
                        </Center>
                        <div className="txt_pfda">Download Aplikasi Baiti Untuk Mendapatkan <br></br> Benefit DKM MASJID</div>
                        <div className="market_pfda mt-2" >
                            <Links href={`${process.env.NEXT_PUBLIC_PLAYSTORE_BAITI}`} target="_blank"> 
                                <Button colorScheme='white' size='sm' mt={3}  >
                                    <Image src="/logo_gplay.png" w="110px" borderRadius="5px" boxShadow="0 1px 8px 0 #c2c2c2" />
                                </Button>
                            </Links>
                        </div>
                </div>
            </Drawer>
    

            <Flex justifyContent="space-between" mb="30px" pt={{ sm: "120px", md: "120px" }}
                py="22px"
                mx="auto"
                width="100%"
                maxW="95%"
                alignItems="center"
            >   
                <Flex direction="column" w="100%" background="transparent">
                      
                     
                        <SimpleGrid columns={{ sm: 1, lg: 1 }} mt="-5" spacing={5}>

                           
                                    <Box p={{ sm: "2", lg: "10" }} borderRadius="5px" 
                                       
                                    >   

                                        <Flex >
                                            <Center w={{ sm: "150px", lg: "300px" }} >
                                                <Image src="/dkm.jpg" h={{ sm: "150px", lg: "300px" }}></Image>
                                            </Center>
                                        
                                            <Box flex='1' >
                                                <Stat mt={{ sm: "", lg: "10" }} ml={{ sm: "2", lg: "10" }}>
                                                
                                                    <StatLabel fontSize={{ sm: "15pt", lg: "30pt" }}>Apa itu Baiti ?</StatLabel>
                                                
                                                    <StatHelpText fontSize={{ sm: "7pt", lg: "12pt" }} align="justify">
                                                        Aplikasi Yang Memudahkan pengurus masjid/DKM untuk mengelola dan menyiarkan informasi secara efektif melalui tampilan TV masjid.
                                                        Dengan menggunakan BAITI, jadwal sholat, iqamah dan waktu syuruq yang akurat/realtime, 
                                                        ibadah sholat di masjid dapat ditampilkan secara mudah dan tepat. Pengurus dapat dengan mudah menyebarkan pengumuman dan 
                                                        informasi lainnya melalui ponsel pengurus masjid/DKM untuk ditampilkan di TV masjid serta terkirim ke ponsel jama&apos;ah melalui aplikasi GHIRAH.

                                                    </StatHelpText>
                                                </Stat>
                                            </Box>
                                        </Flex>
                                    

                                    </Box>     
                           

                           

                        </SimpleGrid>

                        <SimpleGrid columns={{ sm: 1, lg: 2 }} mt="5" spacing={5} mb="10">
                                <Box >

                                <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                 _hover={{ bgColor:"#f7f7f7",color:"black" }}>
                                    <Stat>
                                        <StatLabel fontSize={{ sm: "15pt", lg: "20pt" }}>Benefit Baiti</StatLabel>
                                       
                                        <StatHelpText p="2">
                                            <List spacing={{ sm: "5", lg: "3" }}>
                                                    <ListItem>
                                                        <ListIcon as={FaCheck} color='green.500' />
                                                        Pengaturan TV
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListIcon as={FaCheck} color='green.500' />
                                                        Petugas Masjid
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListIcon as={FaCheck} color='green.500' />
                                                        Artikel
                                                    </ListItem>
                                                
                                                    <ListItem>
                                                        <ListIcon as={FaCheck} color='green.500' />
                                                        Urun Dana
                                                    </ListItem>

                                                    <ListItem>
                                                        <ListIcon as={FaCheck} color='green.500' />
                                                        Qurban
                                                    </ListItem>
                                             </List>
                                        </StatHelpText>
                                    </Stat>

                                </Box>                  
                                    

                                </Box>       
                                <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                 _hover={{ bgColor:"#f7f7f7",color:"black" }}>
                                    <Stat>
                                        <StatLabel fontSize={{ sm: "15pt", lg: "20pt" }}>Langkah-langkah gabung</StatLabel>
                                       
                                        <StatHelpText p="2">
                                            <List spacing={{ sm: "5", lg: "3" }} >
                                                    <ListItem>
                                                        <ListIcon as={FaRegCheckCircle} color='green.500' />
                                                             Download Aplikasi Baiti 
                                                             
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListIcon as={FaRegCheckCircle} color='green.500' />
                                                            Lakukan Pendaftaran Menggunakan Email atau No HP DKM
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListIcon as={FaRegCheckCircle} color='green.500' />
                                                        Masukan Nama Masjid 
                                                    </ListItem>
                                                
                                                    <ListItem>
                                                        <ListIcon as={FaRegCheckCircle} color='green.500' />
                                                         Masukan Alamat Sesuai Masjid 
                                                    </ListItem>

                                                    <ListItem>
                                                        <ListIcon as={FaExclamationCircle} color='green.500' />
                                                            Atau Download Panduan Pendaftaraan Baiti Klik Panduan ini  
                                                            <Badge variant='solid' colorScheme='green' ml="1">
                                                                Panduan
                                                            </Badge>
                                                    </ListItem>
                                             </List>
                                        </StatHelpText>
                                    </Stat>

                                </Box>                            
                        </SimpleGrid>
        
        <div className="background-custom">
                        <SimpleGrid columns={{ sm: 1, lg: 1 }}  spacing={5}>
                            <Box borderBottom="2px solid #d7d7d7">
                                 <Text fontSize={{ sm: "15pt", lg: "20pt" }}>Biaya Pemasangan (STB dan Lainnya)</Text>
                            </Box>
                        </SimpleGrid>

                        <SimpleGrid columns={{ sm: 1, lg: 3 }} mt="2" spacing={5}>

                           
                                    <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                          _hover={{ bgColor:"#f7f7f7",color:"black" }}
                                       
                                    >   

                                            <Stat>
                                                <StatLabel>Alat STB dan Pemasangan</StatLabel>
                                                <StatNumber>Rp 1.000.000</StatNumber>
                                                <StatHelpText>
                                                Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan 
                                                untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                                                </StatHelpText>
                                            </Stat>

                                     
                                    

                                    </Box>    

                                    <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                          _hover={{ bgColor:"#f7f7f7",color:"black" }}
                                       
                                    >   

                                            <Stat>
                                                <StatLabel>Alat STB dan Pemasangan</StatLabel>
                                                <StatNumber>Rp 1.000.000</StatNumber>
                                                <StatHelpText>
                                                Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan 
                                                untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                                                </StatHelpText>
                                            </Stat>

                                     
                                    

                                    </Box>    

                                    <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                          _hover={{ bgColor:"#f7f7f7",color:"black" }}
                                       
                                    >   

                                            <Stat>
                                                <StatLabel>Alat STB dan Pemasangan</StatLabel>
                                                <StatNumber>Rp 1.000.000</StatNumber>
                                                <StatHelpText>
                                                Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan 
                                                untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                                                </StatHelpText>
                                            </Stat>

                                     
                                    

                                    </Box>     
                           

                           

                        </SimpleGrid>
                </div>

                
                        <SimpleGrid columns={{ sm: 1, lg: 1 }} mt="10" spacing={5}>
                            <Box borderBottom="2px solid #d7d7d7">
                                 <Text fontSize={{ sm: "15pt", lg: "20pt" }}>Fitur Aplikasi Baiti Secara Garis Besar</Text>
                            </Box>
                        </SimpleGrid>

                        <SimpleGrid columns={{ sm: 1, lg: 3 }} mt="2" spacing={5}>
                            <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px" bg="#5C499E" color="white" >
                                   <Stat>
                                        <StatLabel fontSize="15pt">Pengaturan TV</StatLabel>
                                       
                                        <StatHelpText>
                                        Menampilkan informasi seperti jadwal shalat, jeda iqamah, banner kegiatan, 
                                        laporan keuangan, jadwal kegiatan berupa teks, gambar dan video.
                                        </StatHelpText>
                                    </Stat>

                                </Box>  

                                <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px" bg="#5C499E" color="white" >
                                   <Stat>
                                        <StatLabel fontSize="15pt">Petugas Masjid.</StatLabel>
                                       
                                        <StatHelpText>
                                          Membantu pembagian tugas pengurus masjid/DKM agar program masjid dapat terlaksana sesuai dengan yang diinginkan.
                                        </StatHelpText>
                                    </Stat>

                                </Box>       

                                <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px" bg="#5C499E" color="white" >
                                   <Stat>
                                        <StatLabel fontSize="15pt">Artikel</StatLabel>
                                       
                                        <StatHelpText>
                                             Menyampaikan tulisan-tulisan serta pesan yang bermanfaat untuk jamaah
                                        </StatHelpText>
                                    </Stat>

                                </Box>  

                                <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px" >
                                   <Stat>
                                        <StatLabel fontSize="15pt">Urun Dana</StatLabel>
                                       
                                        <StatHelpText>
                                        Dengan aplikasi Baiti, Masjid dapat dengan mudah dan cepat menginformasikan program-program 
                                        pembangunan yang membutuhkan biaya melalui urun dana yang langsung terkirim ke ponsel jama&apos;ah. 
                                        Usulan serta saran dari jama&apos;ah juga dapat diterima pengurus masjid dengan mudah melalui aplikasi GHIRAH.
                                        </StatHelpText>
                                    </Stat>

                                </Box>       

                                <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px" >
                                   <Stat>
                                        <StatLabel fontSize="15pt">Qurban</StatLabel>
                                       
                                        <StatHelpText>
                                        Baiti menyediakan solusi berqurban dengan mudah dan terpantau mulai dari pembelian hewan qurban 
                                        hingga pendistribusian paket qurban. Jama&apos;ah yang berqurban (muqorib)
                                         pun dapat memantau status hewan qurbannya dari rumah melalui ponsel, 
                                         sehingga dapat hadir pada saat hewan siap disembelih. 
                                        </StatHelpText>
                                    </Stat>

                                </Box> 

                              

                               

                               

                        </SimpleGrid>


                      
                        
                    
                </Flex>
            </Flex>
            
        </Flex>
       
    );
}

export default MasjidDKM;

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