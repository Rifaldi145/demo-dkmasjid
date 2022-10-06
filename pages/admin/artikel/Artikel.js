/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useCallback } from "react";
import {
    Flex,
    useColorModeValue,
    Center,
    Text,
    Grid,
    GridItem,
    Box,
    Button,
    Image,
    Badge,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Alert,
    AlertIcon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    CloseButton,
    chakra,
    Wrap,
    WrapItem,
    Input,
    InputGroup,
    InputRightAddon,
    Stack,
    AspectRatio
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Separator } from "../../../theme/components/Separator/Separator";
import toast from "../../../components/Toast";
import { Link } from "react-router-dom";
import {
    MdModeEdit
} from "react-icons/md";
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

export default function Artikel() {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);
    const [openDialogHapus, setOpenDialogHapus] = useState(false);
    const [uidHapus, setUidHapus] = useState(null);

    const [dataArtikel, setDataArtikel] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [query, setQuery] = useState(null);

    const [isLoadingHapus, setIsLoadingHapus] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    const [dateNow, setDateNow] = useState(new Date());
    const tgl_skrng = formatTgl(dateNow);

    const outerLimit = 2;
    const innerLimit = 1;
    const itemPerPage = 1;

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
        let myDate = `${(dateObj.getUTCFullYear())}-${bulans}-${('0' + dateObj.getDate()).slice(-2)}`;
        return myDate;
    }
    
    useEffect(() => {
        loadData(1);
    }, []);

    async function loadData(currentPage) {
        setLoading(true);
        setErrorLoading(null);
        try {
            var postData = {
                keyword: query
            };
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/article?pages=10&page=${currentPage}`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                data: postData
            }).then(async (res) => {
                console.log(res.data.articles.data);
                setCurrentPage(res.data.articles.current_page);
                setTotalPage(res.data.articles.last_page);
                setDataArtikel(res.data.articles);
                setLoading(false);
            });
        } catch (err) {
            setLoading(false);
            if(err.response.data != null) {
                setErrorLoading(err.response.data.message);
            } else {
                setErrorLoading(JSON.stringify(err.response));
            }
            console.log("err", err.response);
        }
    }

    const hapusArtikel = async (event) => {
        event.preventDefault();
        setIsLoadingHapus(true);
        var _ciphertext = CryptoAES.decrypt(decodeURIComponent(uidHapus).toString(), `${process.env.NEXT_PUBLIC_ENC_WORD}`);
        var decId = _ciphertext.toString(CryptoENC);
        try {
            var postData = {
                id: decId,
            };
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/article-hapus-satu`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                data: postData
            }).then(async (res) => {
                if(res.data.success) {
                    showSucessHapus(res.data.message);
                    loadData();
                } else {
                    showErrorHapus(res.data.message);
                }
                setIsLoadingHapus(false);
            });
        } catch (err) {
            console.log("err", err);
            setIsLoadingHapus(false);
            if(err.response.data != null) {
                showErrorHapus(err.response.data.message);
            } else {
                showErrorHapus(JSON.stringify(err.response));
            }
        }
    }

    function showSucessHapus(message) {
        setUidHapus(null);
        setOpenDialogHapus(false);
        notify("success", message);
    }
    function showErrorHapus(message) {
        setUidHapus(null);
        setOpenDialogHapus(false);
        notify("error", message);
    }

    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }} w={'100%'}>
            <Center w={'100%'}>
                <Flex overflowX={{ sm: "scroll", xl: "hidden" }} w={'100%'}
                    justify="center" align="center"
                >
                {
                    loading ?
                    <Flex p={5}>
                        <Loader type="Circles" color="#B3A5DA" height={40} width={40} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                            
                        </Loader>
                    </Flex>
                    :
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} p={{ sm: 2.5, lg: 5 }}>
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
                        <Flex flexDirection="column" w={'100%'}>
                            <Grid templateColumns={{ sm: 'repeat(7, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                <GridItem colSpan={{ sm: 5, lg: 1 }}>
                                    <Flex flexDirection="row" height={'100%'} w="100%">
                                        <InputGroup
                                            w={'100%'}
                                            size={{ sm: 'sm', lg: 'md' }}
                                            fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                            verticalAlign={'middle'}
                                            textAlign={'center'}
                                        >
                                            <Input
                                                onChange={(event) => {
                                                    setQuery(event.target.value);
                                                }}
                                                value={query}
                                                w={'100%'}
                                                size={{ sm: 'sm' , lg: 'md'}}
                                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                                bgColor="white"
                                                color={textColor}
                                                verticalAlign={'middle'}
                                                textAlign={'left'}
                                                placeholder={'Cari artikel'}
                                                borderLeftRadius={{ sm: '5px', lg: '5px' }}
                                                borderRightRadius={{ sm: '0px', lg: '0px' }}
                                                type="text"
                                            />
                                            <InputRightAddon
                                                cursor={'pointer'}
                                                borderLeftRadius={{ sm: '0px', lg: '0px' }}
                                                borderRightRadius={{ sm: '5px', lg: '5px' }}
                                                onClick={() => {
                                                    loadData(1);
                                                }}
                                                children={
                                                <Center>
                                                    <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                        Cari
                                                    </Text>
                                                </Center>
                                            }/>
                                        </InputGroup>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={{ sm: 2, lg: 1 }}>
                                    <Flex flexDirection="row" justify={'end'} align={'center'} height={'100%'} w="100%">
                                        <Link align="right" to={`/admin/manajemen/tambah-artikel`}>
                                            <Button
                                                type="button"
                                                size={{ sm: 'sm', lg: 'sm' }}
                                                fontSize={{ sm: 'xs', lg: 'sm' }}
                                                bg="#6a5aa3"
                                                color="white"
                                                _hover={{ bg: "#B3A5DA", color: textColor }}
                                            >
                                                Tambah
                                            </Button>
                                        </Link>
                                    </Flex>
                                </GridItem>
                            </Grid>
                            <Box pb={4} pt={4}>
                                <Separator></Separator>
                            </Box>
                            <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                                {dataArtikel.data.map(function(article, i) {
                                    var encId = encodeURIComponent(CryptoAES.encrypt(article.id.toString(), `${process.env.NEXT_PUBLIC_ENC_WORD}`).toString());

                                    var date_1 = null;
                                    var date_2 = null;
                                    var difference = null;
                                    var hariBerakhir = 0;
                                    if(article.expired_days != null) {
                                        date_1 = new Date(formatTgl(article.created_at));
                                        date_1.setDate(date_1.getDate() + article.expired_days);
                                        date_2 = new Date(tgl_skrng);
                                        difference = date_1.getTime() - date_2.getTime();
                                        hariBerakhir = Math.ceil(difference / (1000 * 3600 * 24));
                                    }

                                    return (
                                        <GridItem key={i} colSpan={1} p={1}>
                                            <Box boxShadow='base' borderRadius={{ sm: '5px', lg: '5px' }} bg={'gray.100'} p={{ sm: 2, lg: 4 }}>
                                                <Flex flexDirection="column" w={'100%'}>
                                                    <Grid templateColumns={{ sm: 'repeat(21, 1fr)', lg: 'repeat(21, 1fr)'}} pb={2}>
                                                        <GridItem colSpan={20}>
                                                            <Flex flexDirection="row" w={'100%'} justify="start" align="start">
                                                                <Flex bg={'#B3A5DA'} borderRadius={{ sm: '5px', lg: '5px' }} flexDirection="row" w={{ sm: '37.5%', lg: '18%' }} h={'100%'} justify="start" align="start">
                                                                    <AspectRatio w={'100%'} ratio={5/4}>
                                                                        {(() => {
                                                                            if(article.header_picture != null) {
                                                                                return (
                                                                                    <Flex flexDirection="column" h={'100%'} justify="center" align="center">
                                                                                        <IconButton
                                                                                            p={'2.5px'} 
                                                                                            bgColor={'#B3A5DA'}
                                                                                            w={'100%'} h={'100%'}
                                                                                            boxShadow='base'
                                                                                        >
                                                                                            <Image w={'100%'} h={'100%'} rounded={'5px'} src={`${process.env.NEXT_PUBLIC_API_BACKEND}/` + article.header_picture.replace("public", "storage")} fallbackSrc='/broken-image.png'/>
                                                                                        </IconButton>
                                                                                    </Flex>
                                                                                )
                                                                            }
                                                                            return (
                                                                                <Flex flexDirection="column" h={'100%'} justify="center" align="center">
                                                                                    <IconButton
                                                                                        p={'2.5px'} 
                                                                                        bgColor={'#B3A5DA'}
                                                                                        w={'100%'} h={'100%'}
                                                                                        boxShadow='base'
                                                                                    >
                                                                                        <Image w={'100%'} h={'100%'} rounded={'5px'} src='/broken-image.png'/>
                                                                                    </IconButton>
                                                                                </Flex>
                                                                            )
                                                                        })()}
                                                                    </AspectRatio>
                                                                </Flex>
                                                                <Flex pl={2} pr={2} flexDirection="column" w={'100%'} h={'100%'} justify="center" align="start">
                                                                    <Text noOfLines={1} textOverflow={'ellipsis'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'bold'}>
                                                                        {article.title}
                                                                    </Text>
                                                                    <Text dangerouslySetInnerHTML={{__html: article.description}} pt={1} noOfLines={2} textOverflow={'ellipsis'} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection="row" w={'100%'} justify="center" align="end">
                                                                <Menu p={0} m={0} size={'xs'}>
                                                                    <MenuButton
                                                                        size={{ sm: 'xs', lg: 'xs' }}
                                                                        bgColor={'#B3A5DA'}
                                                                        color={textColor}
                                                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                                                        as={IconButton}
                                                                        _hover={{ bgColor: "#6a5aa3", color: 'white' }}
                                                                        style={{ padding: 0 }}
                                                                    >
                                                                        <Center>
                                                                            <MdModeEdit/>
                                                                        </Center>
                                                                    </MenuButton>
                                                                    <MenuList minWidth={'auto'} maxWidth={'auto'} size={'xs'}>
                                                                        <Link to={`/admin/manajemen/detail-artikel/${encId}`}>
                                                                            <MenuItem fontSize={{ sm: '2xs', lg: 'xs' }}>
                                                                                Edit
                                                                            </MenuItem>
                                                                        </Link>
                                                                        <MenuItem
                                                                            fontSize={{ sm: '2xs', lg: 'xs' }}
                                                                            onClick={() => {
                                                                                setUidHapus(encId);
                                                                                setOpenDialogHapus(true);
                                                                            }}
                                                                        >Hapus</MenuItem>
                                                                    </MenuList>
                                                                </Menu>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                    {(() => {
                                                        if(article.expired_days != null) {
                                                            if(hariBerakhir > 0) {
                                                                return (
                                                                    <Grid pt={1} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                                                        <GridItem colSpan={1}>
                                                                            <Flex flexDirection={'row'} w={'100%'} justify="start" align="center">
                                                                                <Badge variant='solid' colorScheme='yellow'>
                                                                                    Berakhir dalam {hariBerakhir} hari
                                                                                </Badge>
                                                                            </Flex>
                                                                        </GridItem>
                                                                    </Grid>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Grid pt={1} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                                                        <GridItem colSpan={1}>
                                                                            <Flex flexDirection={'row'} w={'100%'} justify="start" align="center">
                                                                                <Badge variant='solid' colorScheme='red'>
                                                                                    Sudah berakhir
                                                                                </Badge>
                                                                            </Flex>
                                                                        </GridItem>
                                                                    </Grid>
                                                                )
                                                            }
                                                        }
                                                        return (
                                                            <Grid pt={1} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                                                <GridItem colSpan={1}>
                                                                    <Flex flexDirection={'row'} w={'100%'} justify="start" align="center">
                                                                        <Badge variant='solid' colorScheme='yellow'>
                                                                            Berakhir dalam - hari
                                                                        </Badge>
                                                                    </Flex>
                                                                </GridItem>
                                                            </Grid>
                                                        )
                                                    })()}
                                                    <Grid pt={1} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection={'row'} w={'100%'} justify="start" align="center">
                                                                <Badge variant='solid' colorScheme='blue' size={'xs'} fontSize={{ sm: '2xs', lg: 'xs' }}>
                                                                    Dibuat {tglIndo(article.created_at)}
                                                                </Badge>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={1}>
                                                            <Flex flexDirection={'row'} w={'100%'} justify="end" align="center">
                                                                <Badge variant='solid' colorScheme={ article.active == 1 ? 'green' : 'red' } size={'xs'} fontSize={{ sm: '2xs', lg: 'xs' }}>
                                                                    { article.active == 1 ? 'Aktif' : 'Tidak Aktif' }
                                                                </Badge>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Flex>
                                            </Box>
                                        </GridItem>
                                    );
                                })}
                            </Grid>
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
                                    loadData(nextPage)
                                }}
                            >
                                <Container align='center' w='auto' mt={4}>
                                    <Previous m={1} size={'sm'} bg={'#B3A5DA'} color={'white'}>
                                        <ArrowLeftIcon fontSize={'2xs'}/>
                                    </Previous>
                                    <PageGroup isInline align='center' />
                                    <Next m={1} size={'sm'} bg={'#B3A5DA'} color={'white'}>
                                        <ArrowRightIcon fontSize={'2xs'}/>
                                    </Next>
                                </Container>
                            </Paginator>
                        </Flex>
                    </Card>
                }
                </Flex>
            </Center>
            <Modal closeOnOverlayClick={false} isCentered size={'xs'} isOpen={openDialogHapus}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <chakra.form onSubmit={hapusArtikel}>
                    <ModalContent ml={{ sm: 4, lg: 0 }} mr={{ sm: 4, lg: 0 }} padding={0} margin={0}>
                        <ModalHeader size="xs" borderTopRadius={{ sm: '5px', lg: '5px' }} p={{ sm: 2, lg: 3 }}>
                            <Flex justify="space-between" align="center">
                                <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} fontWeight={'bold'}>
                                    Hapus Artikel?
                                </Text>
                                <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => {
                                    setUidHapus(null);
                                    setOpenDialogHapus(false);
                                }}/>
                            </Flex>
                        </ModalHeader>
                        <ModalFooter size="xs" borderBottomRadius={{ sm: '5px', lg: '5px' }} pb={{ sm: 1, lg: 2 }} p={{ sm: 2, lg: 3 }}>
                            <Flex justify="space-between" align="end">
                                <Button
                                    isLoading={isLoadingHapus}
                                    type="submit"
                                    size={{ sm: 'sm', lg: 'sm' }}
                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                    bg="#6a5aa3"
                                    color="white"
                                    _hover={{ bg: "#B3A5DA", color: textColor }}
                                >
                                    Ya
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </chakra.form>
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
    
  }