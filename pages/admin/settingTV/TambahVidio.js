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

function TambahVidio() {
    const { id } = useParams();
    let history = useHistory();

   
    let users = JSON.parse(localStorage.getItem('users'));

    const inputRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const editorRef = useRef();

    const [now, setNow] = useState(new Date());
   
    const [fileGambarNetwork, setFileGambarNetwork] = useState(null);
    const [fileGambar, setFileGambar] = useState(null);
    const [preview, setPreview] = useState(null);


    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);
    const [errorSimpan, setErrorSimpan] = useState(null);
    const [successSimpan, setSuccessSimpan] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogNetworkOpen, setDialogNetworkOpen] = useState(false);

    const bgColor = useColorModeValue("#F8F9FA", "gray.800");
    const nameColor = useColorModeValue("gray.500", "white");

    const [inputTeks, setInputTeks] = useState();
    
    const [ID, setID] = useState();
    
    const [tm, setTM] = useState(true);
    const [tv, setTV] = useState(true);
    const [hp, setHP] = useState(true);
  
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


    const submitSimpan = async (event) => {

        console.log("ID DISPLAY",ID);

        var formData = new FormData();
        const imagefile = document.querySelector('#file');
        formData.append("konten_video", fileGambar);
        formData.append("display_id", ID);
        formData.append("konten_type", "4");
    
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/tambah-konten/simpan?id=${ID}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: formData
            
        }).then(async (res) => {
            console.log("Masuk",res);
            alert("Berhasil Menambahkan Konten Vidio")
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

    const handleClick = () => inputRef.current?.click();

    const changeInputTeks = (event) => {
        setInputTeks(event.target.value);
    };



    const fileHandler = (event) => {
        let fileObj = event.target.files[0];
        setFileGambar(fileObj);
        const objectUrl = URL.createObjectURL(fileObj)
        setPreview(objectUrl)
    }

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
                                                    <br></br>
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
                                                        <GridItem colSpan={3}>
                                                            <Button onClick={(event)=> { 
                                                                    event.target.value = null;
                                                                    handleClick();
                                                                }}
                                                                cursor="pointer"
                                                                size="sm"
                                                                borderRadius={'8px'}
                                                                bg="#6a5aa3"
                                                                color="white"
                                                                fontSize="sm"
                                                                _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                                                                type="button"
                                                            >
                                                                <Flex align="center" justifyContent="center" cursor="pointer">
                                                                    <Icon  mr="8px" fontSize="16pt"><FaFileImage/></Icon>
                                                                    <Text>
                                                                        Upload Vidio
                                                                    </Text>
                                                                    <input 
                                                                        type='file' 
                                                                        multiple={false}
                                                                        style={{ display: 'none' }}
                                                                        ref={inputRef}
                                                                        id="file"
                                                                        onChange={fileHandler.bind(this)}
                                                                    />
                                                                </Flex>
                                                            </Button>
                                                            {
                                                                fileGambar != null ?
                                                                <Button
                                                                    onClick={() => setDialogOpen(true)}
                                                                    ml='5px'
                                                                    cursor="pointer"
                                                                    type="button"
                                                                    size="sm"
                                                                    borderRadius={'8px'}
                                                                    bg="#F3603F"
                                                                    color="white"
                                                                    fontSize="sm"
                                                                    _hover={{ bg: "gray.200", color: "#00A18B" }}
                                                                >
                                                                    <Flex align="center" justifyContent="center" cursor="pointer">
                                                                        <Icon as={FaRegEye}/>
                                                                    </Flex>
                                                                </Button>
                                                                :
                                                                fileGambarNetwork != null ?
                                                                    <Button
                                                                        onClick={() => setDialogNetworkOpen(true)}
                                                                        ml='5px'
                                                                        cursor="pointer"
                                                                        type="button"
                                                                        size="sm"
                                                                        borderRadius={'8px'}
                                                                        bg="#F3603F"
                                                                        color="white"
                                                                        fontSize="sm"
                                                                        _hover={{ bg: "gray.200", color: "#00A18B" }}
                                                                    >
                                                                        <Flex align="center" justifyContent="center" cursor="pointer">
                                                                            <Icon as={FaRegEye}/>
                                                                        </Flex>
                                                                    </Button>
                                                                    :
                                                                    <></>
                                                            }
                                                            
                                                             <FormLabel color="red" fontSize="10pt" mt="3">
                                                                    (<i>*Vidio yang diupload jgn lebih dari 5mb</i>)
                                                                </FormLabel>
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
                        Vidio
                    </ModalHeader>
                    <ModalBody>
                        <video autoPlay loop style={{ width: '500px', height: '500px' }}>
                            <source src={preview}/>
                        </video>
                      
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

export default TambahVidio;
