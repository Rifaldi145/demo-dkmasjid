/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import {
    Flex,
    useColorModeValue,
    Center,
    Box,
    Image,
    Link as Links,
    Text,
    Button,
    SimpleGrid,
    useDisclosure,
    Grid, GridItem ,
    Input,
    InputGroup,
    InputRightElement,
    InputRightAddon,
    InputLeftAddon,
    FormControl,
    FormLabel,
    chakra,
    Container,
    Divider,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    CloseButton,
    ModalBody,
    
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
    FaCheck,
    FaRegCheckCircle,
} from "react-icons/fa";
import Iframe from 'react-iframe';
import AuthLayout from "../layouts/AuthLayout.js";
import Card from "../components/Card/Card.js";
import toast from "../../components/Toast";
import axios from 'axios';
import Router from "next/router";
import { reload } from "firebase/auth";



export default function Magang() {
    
    
    const [openErrorNama, setOpenErrorNama] = useState(false);
    const [nama, setNama] = useState("");

    const [openErrorJurusan, setOpenErrorJurusan] = useState(false);
    const [jurusan, setJurusan] = useState("");

    const [openErrorSekolah, setOpenErrorSekolah] = useState(false);
    const [sekolah, setSekolah] = useState("");

    const [openDialogHapus, setOpenDialogHapus] = useState(false);


    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })

    useEffect(() => {
        
    }, []);

    const submitAbsen = async (event) => {
           
            var formData = new FormData();
            formData.append("nama", nama);
            formData.append('jurusan', jurusan);
            formData.append('sekolah', sekolah);
          
            
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/magang/absen/simpan`,
                headers: {
                    "Content-Type": `multipart/form-data`,
                    "Accept": `application/json`,
                   
                },
                data: formData
                
            }).then(async (res) => {
                console.log("Berhasil Absen",res);
                setOpenDialogHapus(true);
            
              
            }, (err) => {
                
                console.log("AXIOS ERROR: ", err);
                if (err.response) {
                    console.log("err.response", err.response.status);
                    if(err.response.status == 401) {
                        
                    }
                }
            });
        }

    return (     
        <Flex pt={{ base: "90px", lg: "85px" }} flexDirection="column" w={'100%'} h={'100vh'} justify={'center'} align={'center'} p={{ sm: 2, lg: 4 }}  >
                <Flex flexDirection="column" w={'100%'} h={'100vh'} justify={'center'} align={'center'}>
                    <Card boxShadow='base' borderRadius={{ sm: '5px', lg: '5px' }} border="1px solid #bcbcbc" p={{ sm: 2, lg: 4 }} w={{ sm: '90%', lg: '55%' }}
                        mt={{ sm: '-20%', lg: '-5%' }}
                    >
                    <chakra.form onSubmit={submitAbsen}>
                        <Box >
                            <Text align="center" fontSize="20pt"> Absensi Magang </Text>
                            <Divider orientation='horizontal' mt="3" mb="5"/>
                               
                                            <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} pb={{ sm: 5, lg: 6 }}>
                                                        <GridItem colSpan={1} pb={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                                <Text pl={1}  fontSize={{ sm: 'sm', lg: 'md' }} fontWeight={'bold'}>
                                                                    Nama Lengkap
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi Nama!' placement='bottom-start' isOpen={openErrorNama}>
                                                                    <Input
                                                                        onChange={(event) => {
                                                                            setNama(event.target.value);
                                                                            setOpenErrorNama(false);
                                                                        }}
                                                                        value={nama}
                                                                        w={'100%'}
                                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                        bgColor="white"
                                                                        
                                                                        verticalAlign={'middle'}
                                                                        textAlign={'left'}
                                                                        placeholder={'Masukkan Nama Lengkap'}
                                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                                        type="text"
                                                                        autoComplete="new-password"
                                                                    />
                                                                </Tooltip>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>

                                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} pb={{ sm: 5, lg: 6 }}>
                                                        <GridItem colSpan={1} pb={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                                <Text pl={1}  fontSize={{ sm: 'sm', lg: 'md' }} fontWeight={'bold'}>
                                                                    Jurusan
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi Nama!' placement='bottom-start' isOpen={openErrorJurusan}>
                                                                    <Input
                                                                        onChange={(event) => {
                                                                            setJurusan(event.target.value);
                                                                            setOpenErrorJurusan(false);
                                                                        }}
                                                                        value={jurusan}
                                                                        w={'100%'}
                                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                        bgColor="white"
                                                                        
                                                                        verticalAlign={'middle'}
                                                                        textAlign={'left'}
                                                                        placeholder={'Masukkan Jurusan'}
                                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                                        type="text"
                                                                        autoComplete="new-password"
                                                                    />
                                                                </Tooltip>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>

                                                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)'}} w={'100%'} pb={{ sm: 5, lg: 6 }}>
                                                        <GridItem colSpan={1} pb={{ sm: 2, lg: 2 }}>
                                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                                <Text pl={1}  fontSize={{ sm: 'sm', lg: 'md' }} fontWeight={'bold'}>
                                                                    Sekolah
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                                                <Tooltip hasArrow bg='red.600' color={'white'} fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }} label='Isi Nama!' placement='bottom-start' isOpen={openErrorSekolah}>
                                                                    <Input
                                                                        onChange={(event) => {
                                                                            setSekolah(event.target.value);
                                                                            setOpenErrorSekolah(false);
                                                                        }}
                                                                        value={sekolah}
                                                                        w={'100%'}
                                                                        size={{ sm: 'sm' , lg: 'md'}}
                                                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                                        bgColor="white"
                                                                        
                                                                        verticalAlign={'middle'}
                                                                        textAlign={'left'}
                                                                        placeholder={'Masukkan Nama Sekolah'}
                                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                                        type="text"
                                                                        autoComplete="new-password"
                                                                    />
                                                                </Tooltip>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                            <Flex justify="space-between" align="center" w="100%">
                                                <Flex></Flex>
                                                <Flex flexDirection={'row'} gap={1} justify="center" align="end" w="100%">
                                                    <Button

                                                        id="sign-in-button"
                                                        type="submit"
                                                        size={{ sm: 'sm', lg: 'md' }}
                                                        w={{ sm: 'sm', lg: 'sm' }}
                                                        fontSize={{ sm: 'xs', lg: 'sm' }}
                                                        bg="#6a5aa3"
                                                        color="white"
                                                        _hover={{ bg: "#B3A5DA" }}
                                                        justifyContent="center"
                                                       
                                                    >
                                                        Absen
                                                    </Button>
                                                 </Flex>
                                            </Flex>
                              </Box>
                        </chakra.form>
                    </Card>

                            <Modal closeOnOverlayClick={false} isCentered size={'xs'} isOpen={openDialogHapus}>
                                    <ModalOverlay
                                        bg='blackAlpha.300'
                                        backdropFilter='blur(10px)'
                                    />
                                
                                        <ModalContent ml={{ sm: 4, lg: 0 }} mr={{ sm: 4, lg: 0 }} padding={0} margin={0}>
                                            <ModalHeader size="xs" borderTopRadius={{ sm: '5px', lg: '5px' }} p={{ sm: 2, lg: 3 }}>
                                                <Flex justify="space-between" align="center">
                                                    <Text fontSize={{ sm: 'xs', lg: 'sm' }}  fontWeight={'bold'}>
                                                       PT INAMART SUKSES JAYA
                                                    </Text>
                                                   
                                                </Flex>
                                            </ModalHeader>
                                            <ModalBody>
                                                Berhasil Absen, Terimakasih
                                            </ModalBody>
                                            <ModalFooter size="xs" borderBottomRadius={{ sm: '5px', lg: '5px' }} pb={{ sm: 1, lg: 2 }} p={{ sm: 2, lg: 3 }}>
                                                <Flex justify="space-between" align="end">
                                                    
                                                <Link to={`/magang`} >
                                                    <Button variant={'normal'}>
                                                        Terimakasih
                                                    </Button>
                                                 </Link>
                                                  
                                                </Flex>
                                            </ModalFooter>
                                        </ModalContent>
                               
                         </Modal>

                </Flex>
         </Flex>
    );
}