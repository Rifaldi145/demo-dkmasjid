import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Text,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    chakra,
    Alert,
    AlertIcon,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Checkbox,
    Textarea,
    Center
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
 import CardBody from "../../components/Card/CardBody.js";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { useHistory } from "react-router-dom";
import {
    FaCalendarWeek,
    FaFileImage,
    FaRegEye
} from "react-icons/fa";
import { CalendarIcon } from '@chakra-ui/icons'
import { useParams } from "react-router";

function LaporanKeuangan() {
    const { id } = useParams();
    let history = useHistory();

   
    let users = JSON.parse(localStorage.getItem('users'));

    const inputRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const editorRef = useRef();

    const [now, setNow] = useState(new Date());
   
    const [fileGambarNetwork, setFileGambarNetwork] = useState(null);
   
    const [preview, setPreview] = useState(null);


    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);
    const [errorSimpan, setErrorSimpan] = useState(null);
    const [successSimpan, setSuccessSimpan] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogNetworkOpen, setDialogNetworkOpen] = useState(false);

    const bgColor = useColorModeValue("#F8F9FA", "gray.800");
    const nameColor = useColorModeValue("gray.500", "white");

    const [saldoAwal, setSaldoAwal] = useState();
    const [saldoAkhir, setSaldoAkhir] = useState();
    const [pemasukan, setPemasukan] = useState();
    const [pengeluaran, setPengeluaran] = useState();
    
    const [priodeAwal, setPriodeAwal] = useState();
    
    const [priodeAkhir, setPriodeAkhir] = useState();
    

    const [ID, setID] = useState();
    const [tm, setTM] = useState(true);
    const [tv, setTV] = useState(true);
    const [hp, setHP] = useState(true);
    const [teks, setTeks] = useState('');

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = num => num.toString().replace(/[^0-9,]/g, "");


  
    const [query, setQuery] = useState("");

    useEffect(() => {
      
        loadData();
    }, []);

    
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
        console.log("Tanggal Sekarang",tgl_skrng);
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
            console.log("Masuk",res);
            setID(res.data.mosques.displays.id);
          
           
           
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
        let myDate = `${('0' + dateObj.getDate()).slice(-2)} ${bulans} ${(dateObj.getUTCFullYear())}`;
        return myDate;
    }

    const tgl_awal = tglIndo(priodeAwal)
    const tgl_akhir = tglIndo(priodeAkhir)

  

    const submitSimpan = async (event) => {

        console.log("ID DISPLAY",ID);
        var postData = {
            display_id : ID,
            konten_type: '6',
            periode_start:tgl_awal,
            periode_end:tgl_akhir,
            saldo_awal:saldoAwal,
            pemasukan:pemasukan,
            pengeluaran:pengeluaran,
            saldo_akhir:saldoAkhir,
            nnotifikasi_hp:'1',
            tv:'1',
            terus_menerus:'1',
        };
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/tambah-konten/simpan?id=${ID}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("Masuk",res);
            alert("Berhasil Menambahkan Laporan Keuangan");
            history.goBack();
           
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


    }


    const onChangeAwal = (event) => {
        setPriodeAwal(event.target.value);
    };

    const onChangeAkhir = (event) => {
        setPriodeAkhir(event.target.value);
    };

    const handleClick = () => inputRef.current?.click();

    const changeSaldoAwal = (event) => {
        setSaldoAwal(addCommas(removeNonNumeric(event.target.value)));
    };

  

    const changeSaldoAkhir = (event) => {
        setSaldoAkhir(addCommas(removeNonNumeric(event.target.value)));
    };

    const changePemasukan = (event) => {
        setPemasukan(addCommas(removeNonNumeric(event.target.value)));
    };

    const changePengeluaran = (event) => {
        setPengeluaran(addCommas(removeNonNumeric(event.target.value)));
    };

    const handleTM = async (event) => {

        let value = event.target.checked;

        await setTM(value);
    };



    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }}
        w={{ sm: "calc(100vw - 0px)", xl: "calc(100vw - 56px - 280px)" }}
        ml={-5}
        >
            {
                loading ?
                    <Loader type="Circles" color="#00BFFF" height={50} width={50} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
                :
                <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                    <chakra.form onSubmit={submitSimpan}>
                        <CardBody>
                            <Flex direction="column" w="100%">
                                <Flex direction="column" w="100%">
                                    <Box p="24px" bg={bgColor} my="22px" borderRadius="10px">
                                        <Flex justify="space-between" w="100%">
                                            <Flex direction="column" w="100%">
                                                <FormControl>
                                                
                                                <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Status Tayang
                                                            </FormLabel>
                                                            {
                                                                tm && tm == true ?
                                                                    <Input type="date"  bgColor="white" id="statusTayang" disabled borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                                :
                                                                <Input type="date"  bgColor="white" id="statusTayang" borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                            }
                                                        </GridItem>
                                                        <br></br>
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <Checkbox size='lg' colorScheme='purple' isChecked={hp} onChange={(v) => setHP(!hp)}>
                                                                Notifikasi HP
                                                            </Checkbox>
                                                        </GridItem>
                                                    </Grid>
                                                    
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <Checkbox size='lg' colorScheme='purple' isChecked={tm} onChange={async (e) => await setTM(!tm)}>
                                                                Terus Menerus
                                                            </Checkbox>
                                                        </GridItem> 
                                                        <br></br>
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <Checkbox size='lg' colorScheme='purple' isChecked={tv} onChange={async (v) => await setTV(!tv)}>
                                                                TV Masjid
                                                            </Checkbox>
                                                        </GridItem>
                                                    </Grid>
                                                    <br></br>
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Periode Awal
                                                            </FormLabel>
                                                            <Input type="date"      onChange={onChangeAwal}  placeholder='Masukan Saldo Awal disini...'  bgColor="white" id="statusTayang" borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                            
                                                        </GridItem>
                                                        
                                                        <GridItem colSpan={1}>
                                                            <FormLabel ms="4px" color="transparent" fontSize="sm"  pt="12px">
                                                                Periode Awal
                                                            </FormLabel>
                                                           <Center>
                                                                <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px" align="center">
                                                                    s.d
                                                                </FormLabel>
                                                            </Center>
                                                        </GridItem>

                                                        <GridItem colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Periode Akhir
                                                            </FormLabel>
                                                            <Input type="date"      onChange={onChangeAkhir}  placeholder='Masukan Pemasukan disini...'  bgColor="white" id="statusTayang" borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                            
                                                        </GridItem>
                                                    </Grid>

                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(4, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={2}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Saldo Awal
                                                            </FormLabel>
                                                            <Input type="text"   onChange={changeSaldoAwal}  placeholder='Masukan Saldo Awal disini...'  bgColor="white" id="statusTayang" borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                            
                                                        </GridItem>

                                                        <GridItem colSpan={2}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Pemasukan
                                                            </FormLabel>
                                                            <Input type="text"   onChange={changePemasukan}  placeholder='Masukan Pemasukan disini...'  bgColor="white" id="statusTayang" borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                            
                                                        </GridItem>
                                                    </Grid>

                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(4, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={2}>
                                                             
                                                             <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Saldo Akhir
                                                            </FormLabel>
                                                            <Input type="text"   onChange={changeSaldoAkhir}  placeholder='Masukan Saldo Akhir disini...'  bgColor="white" id="statusTayang" borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                            
                                                          
                                                        </GridItem>

                                                        <GridItem colSpan={2}>
                                                        <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Pengeluaran
                                                            </FormLabel>
                                                            <Input type="text"   onChange={changePengeluaran}  placeholder='Masukan Pengeluaran disini...'  bgColor="white" id="statusTayang" borderRadius="8px" color={nameColor} fontSize="sm"/>
                                                            
                                                           
                                                        </GridItem>
                                                    </Grid>
                                                   
                                                </FormControl>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                </Flex>
                                {
                                    errorSimpan && (
                                        <Alert status="error" mb="6">
                                        <AlertIcon />
                                            <Text textAlign="justify" fontSize="sm">{errorSimpan}</Text>
                                        </Alert>
                                    )
                                }
                                {
                                    successSimpan && (
                                        <Alert status="success" mb="6">
                                        <AlertIcon />
                                            <Text textAlign="justify" fontSize="sm">{successSimpan}</Text>
                                        </Alert>
                                    )
                                }
                                <Flex justify="space-between" align="center" mt="22px">
                                    <Button
                                        onClick={history.goBack}
                                        size="sm"
                                        borderRadius={'8px'}
                                        bg="#6a5aa3"
                                        color="white"
                                        fontSize="sm"
                                        _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                                    >
                                        <Flex align="center" justifyContent="center" cursor="pointer">
                                            <Text>
                                                Kembali
                                            </Text>
                                        </Flex>
                                    </Button>
                                    <Button
                                        isLoading={isLoadingSimpan}
                                        type="submit"
                                        size="sm"
                                        borderRadius={'8px'}
                                        bg="#6a5aa3"
                                        color="white"
                                        fontSize="sm"
                                        _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                                    >
                                        <Flex align="center" justifyContent="center" cursor="pointer">
                                            <Text>
                                                Simpan
                                            </Text>
                                        </Flex>
                                    </Button>
                                </Flex>
                            </Flex>
                        </CardBody>
                    </chakra.form>
                </Card>
            }
            <Modal onClose={!dialogOpen} isOpen={dialogOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader size="sm" bg="#00A18B" color="white" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        Gambar
                    </ModalHeader>
                    <ModalBody>
                        <img src={preview} />
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" onClick={() => setDialogOpen(false)} mr={3}>Tutup</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal size="sm" onClose={!dialogNetworkOpen} isOpen={dialogNetworkOpen}>
                <ModalOverlay />
                <ModalContent size="sm">
                    <ModalHeader size="sm" bg="#00A18B" color="white" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        Gambar
                    </ModalHeader>
                    <ModalBody>
                        <img src={ `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public${fileGambarNetwork}` } />
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" onClick={() => setDialogNetworkOpen(false)} mr={3}>Tutup</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default LaporanKeuangan;
