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
    Select 
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

function TambahEventRutin() {
    const { id } = useParams();
    let history = useHistory();

   
    let users = JSON.parse(localStorage.getItem('users'));

    const inputRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    
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

    const [dataArtikel, setDataArtikel] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState("");

    const [judulArtikel, setDataJudul] = useState(null);
    const [expiredArtikel, setExpired] = useState(null);
    const [deskripsiArtikel, setDeskripsiArtikel] = useState(null);
    const [statusArtikel, setStatusArtikel] = useState(null);

   

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('../../../ckeditor5-build-with-htmlembed-master')
        }
        loadData();
    }, []);


    const token = users.token;

    async function loadData() {
        var postData = {
            keyword: query
        };
        
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/article/detail?id=${id}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("Masuk",res);
            
           
            setDataArtikel(res.data);
            setLoading(false);
        }, (err) => {
            setLoading(false);
            console.log("AXIOS ERROR: ", err);
            if (err.response) {
                console.log("err.response", err.response.status);
                if(err.response.status == 401) {
                    loadDataArtikel(1);
                }
            }
        });
    };

    

    const submitSimpan = async (event) => {
        console.log("FILE GAMBAR",fileGambar);
        var formData = new FormData();
        const imagefile = document.querySelector('#file');
        formData.append("foto", fileGambar);
        formData.append('title', judulArtikel);
        formData.append('expired_days', expiredArtikel);
        formData.append('active', statusArtikel);
        formData.append('description', deskripsiArtikel);

        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/article/simpan`,
            headers: {
                "Content-Type": `multipart/form-data`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: formData
            
        }).then(async (res) => {
            console.log("Berhasil Simpan",res);
            alert("Berhasil Tambah Artikel");
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
    
    const changeJudulArtikel = (event) => {
        setDataJudul(event.target.value);
    };

    const changeExpired = (event) => {
        setExpired(event.target.value);
    };

    const changeStatus = (event) => {
        setStatusArtikel(event.target.value);
    };



    const onChangeStart = (e) => {
        let dateObj = new Date(e.value);
        setDateStart(`${dateObj.toISOString().split('T')[0]}`);
    };

    const onChangeEnd = (e) => {
        let dateObj = new Date(e.value);
        setDateEnd(`${dateObj.toISOString().split('T')[0]}`);
    };

    const handleClick = () => inputRef.current?.click();

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
                                                                    <Icon  mr="8px" ><FaFileImage/></Icon>
                                                                    <Text>
                                                                        Upload Gambar
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
                                                        </GridItem>
                                                    </Grid>
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Judul Event(*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Input type="text" value={judulArtikel} onChange={changeJudulArtikel} bgColor="white" borderRadius="8px" placeholder="Judul" color={nameColor} fontSize="sm"/>
                                                        </GridItem>
                                                    </Grid>
                                                    
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Penyelengara(*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Input type="text" value={judulArtikel} onChange={changeJudulArtikel} bgColor="white" borderRadius="8px" placeholder="Masukan Moderator,pengisi acara, dan lain-lain" color={nameColor} fontSize="sm"/>
                                                        </GridItem>
                                                    </Grid>

                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Tanggal Event (*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <InputGroup>
                                                            <InputLeftElement
                                                                    pointerEvents='none'
                                                                    borderLeftRadius="8px"
                                                                    bg="gray.200"
                                                                    ml="-4px"
                                                                  
                                                                >
                                                                    <CalendarIcon color='gray.400' />
                                                                </InputLeftElement>
                                                                <Input type="date" value={expiredArtikel} onChange={changeExpired}  bgColor="white" borderRadius="8px" fontSize="sm"  placeholder="Berapa Hari Expired" color={nameColor}/>
                                                            </InputGroup>
                                                            <Text fontSize="8pt" align="center" color="#cfcfcf">Expired Artikel Berapa Hari</Text>
                                                        </GridItem>

                                                     
                                                       
                                                    </Grid>
                                                   
                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Deskripsi(*)
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <CKEditor
                                                                    editor={
                                                                        ClassicEditor
                                                                    }
                                                                    config={{
                                                                        removePlugins: ["EasyImage","ImageUpload","MediaEmbed", "Table"]
                                                                    }}
                                                                    data={deskripsiArtikel}
                                                                    onReady={() => {
                                                                        // You can store the "editor" and use when it is needed.
                                                                        
                                                                    }}
                                                                    onChange={(event, editor) => {
                                                                        const data = editor.getData()
                                                                        setDeskripsiArtikel(data);
                                                                    }}
                                                                />
                                                         </GridItem>
                                                    </Grid>

                                                    <Grid templateColumns={{ sm: '1fr', lg: 'repeat(3, 1fr)'}} gap={4} mb="16px">
                                                        <GridItem rowSpan={1} colSpan={1}>
                                                            <FormLabel ms="4px" color={nameColor} fontSize="sm" fontWeight="bold" pt="12px">
                                                                Pilih Event
                                                            </FormLabel>
                                                        </GridItem>
                                                        <GridItem colSpan={2}>
                                                            <Select placeholder='Pilih Salah Satu Event' value={statusArtikel} onChange={changeStatus}>
                                                                <option value='1'>Rutin</option>
                                                                <option value='0'>Khusus</option>
                                                             </Select>
                                                            
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
                       
                        {/* <Image h={'100px'} w={'150px'} src={`${process.env.NEXT_PUBLIC_API_BACKEND}/` + rows.header_picture.replace("public", "storage")}
                                objectFit={'cover'}
                            /> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" onClick={() => setDialogNetworkOpen(false)} mr={3}>Tutup</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default TambahEventRutin;
