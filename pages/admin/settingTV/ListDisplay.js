import React, { useState, useEffect } from "react";
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Text,
    FormControl,
    FormLabel,
    useColorModeValue,
    Button,
    Center,
    Icon,
    InputGroup,
    Input,
    Box,
    Image,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Select,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
   Badge,

} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
 import CardBody from "../../components/Card/CardBody.js";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator'
import { SearchIcon, ArrowRightIcon, ArrowLeftIcon, ChevronDownIcon } from '@chakra-ui/icons'

import ReactPlayer from 'react-player'


export default function ListDisplay() {


    

    let users = JSON.parse(localStorage.getItem('users'));
    const [loading, setLoading] = useState(true);
    //const [dataArtikel, setDataArtikel] = useState([]);
    const [dataSetting, setDataSetting] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState("");

    const [durasi, setDurasi] = useState();
    const [syuruq, setSyuruq] = useState();
    const [tahrim, setTahrim] = useState();
    const [iqamah, setIqamah] = useState();
    const [status, setStatus] = useState();
    const [running, setRunning] = useState();
    const [qurbanDisplay, setQurban] = useState();

    const [ID, setID] = useState();

    
    

    const textColor = useColorModeValue("gray.700", "white");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let mainText = useColorModeValue("gray.700", "gray.200");
    const nameColor = useColorModeValue("gray.500", "white");
    const bgColor = useColorModeValue("#F8F9FA", "gray.800");

    const [width, setWidth] = useState(window.innerWidth);

    const [now, setNow] = useState(new Date());

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogNetworkOpen, setDialogNetworkOpen] = useState(false);

    const [dialogOpen1, setDialogOpen1] = useState(false);
    const [dialogNetworkOpen1, setDialogNetworkOpen1] = useState(false);

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
        loadData();
    }, []);


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

    const token = users.token;
    const id_masjid = users.user_detail.mosque_id;
    const tgl_skrng = formatTgl(now);

    
    async function loadData() {
        console.log("LOCAL STROGE",id_masjid);
        console.log("LOCAL STROGE",tgl_skrng);
        var postData = {
            keyword: query
        };
        
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display?id=${id_masjid}&dates=${tgl_skrng}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("Masuk data",res);
            setDurasi(res.data.mosques.displays.durasi);
            setSyuruq(res.data.mosques.displays.jeda_waktu_syuruq);
            setTahrim(res.data.mosques.displays.jeda_waktu_tarhim);
            setIqamah(res.data.mosques.displays.jeda_waktu_iqamah);
            setStatus(res.data.mosques.displays.status);
            setRunning(res.data.mosques.displays.running_text);
            setQurban(res.data.mosques.displays.aktifkan_qurban);
            setID(res.data.mosques.displays.id);
           
            setDataSetting(res.data.mosques.displays.kontensv1);
            setLoading(false);
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                console.log("err.response", err.response.status);
                if(err.response.status == 401) {
                    
                }
            }
        });
    };



    const changeHandler = (event) => {
        setQuery(event.target.value);
    };
    
    const changeDurasi = (event) => {
        setDurasi(event.target.value);
    };

    const changeSyuruq = (event) => {
        setSyuruq(event.target.value);
    };

    const changeTahrim = (event) => {
        setTahrim(event.target.value);
    };

    const changeIqamah = (event) => {
        setIqamah(event.target.value);
    };

    const changeStatus = (event) => {
        setStatus(event.target.value);
    };

    const changeRunning = (event) => {
        setRunning(event.target.value);
    };

    const changeDisplayQurban = (event) => {
        setQurban(event.target.value);
    };

    
    async function submitData() {
        console.log("LOCAL STROGE",id_masjid);
        console.log("LOCAL STROGE",tgl_skrng);
        var postData = {
            mosque_id : id_masjid,
            durasi: durasi,
            jeda_waktu_syuruq:syuruq,
            jeda_waktu_tarhim:tahrim,
            jeda_waktu_iqamah:iqamah,
            aktifkan_qurban:qurbanDisplay,
            
        };
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/simpan-jadwal?id=${id_masjid}&dates=${tgl_skrng}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("Masuk",res);
            alert("Berhasil Simpan Jadwal Baru")
            loadData();
            setLoading(false);
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                console.log("err.response", err.response.status);
                if(err.response.status == 401) {
                    
                }
            }
        });
    };

    async function submitStatus() {
        console.log("LOCAL STROGE",id_masjid);
        console.log("LOCAL STROGE",tgl_skrng);
        var postData = {
            mosque_id : id_masjid,
            status:status
            
        };
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/simpan/status?id=${id_masjid}&dates=${tgl_skrng}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("Masuk",res);
            alert("Berhasil Update Status");
            setDialogOpen(false);
            loadData();
            setLoading(false);
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                console.log("err.response", err.response.status);
                if(err.response.status == 401) {
                    
                }
            }
        });
    };

    async function submitRunningTeks() {
        console.log("LOCAL STROGE",id_masjid);
        console.log("LOCAL STROGE",tgl_skrng);
        var postData = {
            mosque_id : id_masjid,
            running_text:running
            
        };
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/simpan/running-text?id=${id_masjid}&dates=${tgl_skrng}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("Masuk",res);
            alert("Berhasil Update Teks Running");
            setDialogOpen1(false);
            loadData();
            setLoading(false);
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                console.log("err.response", err.response.status);
                if(err.response.status == 401) {
                    
                }
            }
        });
    };

    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }}
        w={{ sm: "calc(100vw - 0px)", xl: "calc(100vw - 56px - 280px)" }}
        ml={-10}
        >
             {
                loading ?
                    <Loader type="Circles" color="#00BFFF" height={50} width={50} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
                :
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                            <Box p="16px" bg={bgColor} borderRadius="10px">
                                <Flex direction={{ sm: 'column', lg: 'row' }} justify="space-between" align="center" minWidth="100%" flexWrap="nowrap">
                                   
                                    <Link align="right" >
                                        <Button
                                         onClick={() => setDialogOpen1(true)}
                                            w={{ sm: '100%', lg: 'auto' }}
                                            mt={{ sm: '10px', lg: '0px' }}
                                            borderRadius="8px"
                                            bg="#6a5aa3"
                                            color="white"
                                            fontSize="sm"
                                            size="sm"
                                            _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                                        >
                                            
                                            <Flex align="right" justifyContent="center" cursor="pointer">
                                                <Text>
                                                     Edit Teks Berjalan
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Link>
                                        &nbsp;
                                    <Link align="right" >
                                        <Menu>
                                            <MenuButton
                                                w={{ sm: '100%', lg: 'auto' }}
                                                mt={{ sm: '10px', lg: '0px' }}
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
                                                Tambah Konten <ChevronDownIcon />
                                            </MenuButton>
                                            <MenuList>
                                            <MenuItem>
                                                    <Link to={`/admin/list-display`}>
                                                        <Text>
                                                            Lihat Semua Display
                                                        </Text>
                                                    </Link>
                                                </MenuItem>
                                          
                                                <MenuItem>
                                                    <Link to={`/admin/tambah-teks`}>
                                                        <Text>
                                                             Teks Saja
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/tambah-gambar`}>
                                                        <Text>
                                                            Gambar Saja
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/tambah-gambar-teks`}>
                                                        <Text>
                                                            Gambar dan Teks
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/tambah-vidio`}>
                                                        <Text>
                                                            Vidio Saja
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/tambah-vidio-teks`}>
                                                        <Text>
                                                            Vidio dan Teks
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/laporan-keuangan`}>
                                                        <Text>
                                                            Laporan Keungan
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/laporanProyek`}>
                                                        <Text>
                                                            Laporan Proyek
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/jadwal-kegiatan`}>
                                                        <Text>
                                                            Jadwal Kegiatan
                                                        </Text>
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <Link to={`/admin/defaultImage`}>
                                                        <Text>
                                                            Default Image
                                                        </Text>
                                                    </Link>
                                                </MenuItem>
                                                
                                            </MenuList>
                                        </Menu>
                                       
                                    </Link>

                                      &nbsp;
                                        <Link align="right">
                                            <Button
                                                 onClick={() => setDialogOpen(true)}
                                                w={{ sm: '100%', lg: 'auto' }}
                                                mt={{ sm: '10px', lg: '0px' }}
                                                borderRadius="8px"
                                                bg="#6a5aa3"
                                                color="white"
                                                fontSize="sm"
                                                size="sm"
                                                _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                                            >
                                                
                                                <Flex align="right" justifyContent="center" cursor="pointer">
                                                    <Text>
                                                        Edit Status
                                                    </Text>
                                                </Flex>
                                            </Button>
                                        </Link>
                                </Flex>
                            </Box>
                    

                            <CardBody >
                           
                            {

                                        <Table direction="column" rounded="md" mt="10px">
                                                                        
                                        <Thead bg="#6a5aa3">
                                            <Tr>
                                                <Th color="white" borderTopLeftRadius="8px">Kontent Type</Th>
                                                <Th color="white" >Kontent</Th>
                                                <Th color="white" borderTopRightRadius="8px"></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody border="1px" borderColor="gray.200" borderRadius="0px" borderBottomRadius="8px">
                                            {dataSetting.map(function(rows, i) {
                                            return (
                                                <Tr key={i}>
                                                    
                                                    <Td width="30%" pl="16px">
                                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                                            <Flex >
                                                            
                                                              <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >

                                                              {
                                                                    rows.konten_type =="1" ? 
                                                                        <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                            Teks Saja
                                                                        </Text>
                                                                            
                                                                        :
                                                                    rows.konten_type == "2" ?
                                                                        <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                                Gambar Saja
                                                                        </Text>

                                                                    :

                                                                    rows.konten_type == "3" ?
                                                                        <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                                Gambar dan Teks
                                                                        </Text>

                                                                    :

                                                                    rows.konten_type == "4" ?
                                                                    <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                           Video Saja
                                                                    </Text>

                                                                    :

                                                                    rows.konten_type == "5" ?
                                                                    <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                           Video dan Teks
                                                                    </Text>

                                                                    :

                                                                    rows.konten_type == "6" ?
                                                                    <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                           Laporan Keuangan
                                                                    </Text>

                                                                    :

                                                                    rows.konten_type == "7" ?
                                                                    <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                           Laporan Proyek
                                                                    </Text>

                                                                    :

                                                                    rows.konten_type == "8" ?
                                                                    <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                           Jadwal Kegiatan
                                                                    </Text>

                                                                    :

                                                                    rows.konten_type == "9" ?
                                                                    <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                           Default Image
                                                                    </Text>

                                                                    :


                                                                   ""


                                                                }

                                                                </Text>

                                                            </Flex>
                                                        </Flex>
                                                    </Td>

                                                    <Td width="30%" pl="16px">
                                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                                            <Flex >
                                                            
                                                            <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >

                                                                {
                                                                    rows.konten_text ==null ?
                                                                        ""
                                                                    :

                                                                    <Text fontSize="sm" color={textColor} fontWeight="bold" minWidth="100%" >
                                                                      {rows.konten_text }
                                                                    </Text>

                                                                }

                                                                {

                                                                        rows.konten_image == null ?
                                                                        ""
                                                                        :

                                                                        <Image h={'100px'} w={'150px'}
                                                                        src={`${process.env.NEXT_PUBLIC_API_BACKEND}/` + rows.konten_image.replace("public", "storage")}
                                                                        objectFit={'cover'}
                                                                        />
                                                                }

                                                                    {

                                                                    rows.konten_video ==null ?
                                                                         ""
                                                                    :

                                                                    <ReactPlayer height={'100px'} width={'150px'} url={`${process.env.NEXT_PUBLIC_API_BACKEND}/` + rows.konten_video.replace("public", "storage")} controls />
                                                                    }


                                                                  

                                                                </Text>

                                                            </Flex>
                                                        </Flex>
                                                    </Td>
                                                   
                                                    <Td width="10%">
                                                        <Flex direction="row" align="center" w="100%">
                                                            
                                                            <Link style={{ marginLeft: '5px' }} to={`/admin/detail-artikel/${rows.id}`}>
                                                                <Button p="0px" 
                                                                    bg="gray.200"
                                                                    borderRadius="8px"
                                                                    size="sm"
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
                                            );
                                            })}
                                        </Tbody>


                                        </Table>            
                               

                            }


                            </CardBody>

                         
                        
                    </Card>

                  


                
             }

                            <Modal onClose={!dialogOpen} isOpen={dialogOpen}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader size="sm" bg="#6a5aa3" color="white" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                        Edit Status
                                    </ModalHeader>
                                    <ModalBody>
                                    <FormControl>
                                        <FormLabel>Status Masjid</FormLabel>
                                            <Input onChange={changeStatus} value={status}  placeholder='Status Masjid' />
                                        </FormControl>

                                        
                                    </ModalBody>
                                    <ModalFooter>
                                    
                                        <Button size="sm" onClick={() => setDialogOpen(false)} mr={3}>Tutup</Button>

                                        <Button size="sm" colorScheme='blue' mr={3} onClick={() => submitStatus()}>
                                          Update
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                                </Modal>

                                <Modal onClose={!dialogOpen1} isOpen={dialogOpen1}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader size="sm" bg="#6a5aa3" color="white" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                        Edit Teks Running
                                    </ModalHeader>
                                    <ModalBody>
                                    <FormControl>
                                        <FormLabel>Teks Running</FormLabel>
                                            <Input onChange={changeRunning} value={running}  placeholder='Teks Running' />
                                        </FormControl>

                                        
                                    </ModalBody>
                                    <ModalFooter>
                                    
                                        <Button size="sm" onClick={() => setDialogOpen1(false)} mr={3}>Tutup</Button>

                                        <Button size="sm" colorScheme='blue' mr={3} onClick={() => submitRunningTeks()}>
                                          Update
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                                </Modal>
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
    //
    
  }