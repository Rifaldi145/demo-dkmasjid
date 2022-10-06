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
    AspectRatio,
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
    chakra
} from "@chakra-ui/react";
import Card from "../../../components/Card/Card.js";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Separator } from "../../../../theme/components/Separator/Separator";
import toast from "../../../../components/Toast";
import { Link } from "react-router-dom";
import {
    MdModeEdit
} from "react-icons/md";
import Iframe from 'react-iframe'

export default function KontenLainnya() {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const notifyTampilkanTv = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissTampilkanTv = useCallback(() => {
        toast.dismiss();
    }, []);

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
    const [dataKonten, setDataKonten] = useState(null);
    const [isLoadingHapus, setIsLoadingHapus] = useState(false);
    const [isLoadingTampilkanTv, setIsLoadingTampilkanTv] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    const [dateNow, setDateNow] = useState(new Date());
    const tgl_skrng = formatTgl(dateNow);
    
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
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        setErrorLoading(null);
        try {
            await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/konten-lainnya`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                
            }).then(async (res) => {
                setDataKonten(res.data.konten);
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

    const hapusKonten = async (event) => {
        event.preventDefault();
        setIsLoadingHapus(true);
        try {
            var postData = {
                uid: uidHapus,
            };
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/delete-konten-lainnya`,
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

    const submitTampilkanTv = async (event) => {
        event.preventDefault();
        setIsLoadingTampilkanTv(true);
        try {
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/konten-lainnya/push-tv`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
            }).then(async (res) => {
                if(res.data.success) {
                    showSucessTampilkanTv(res.data.message);
                    loadData();
                } else {
                    showErrorTampilkanTv(res.data.message);
                }
                setIsLoadingTampilkanTv(false);
            });
        } catch (err) {
            console.log("err", err);
            setIsLoadingTampilkanTv(false);
            if(err.response.data != null) {
                showErrorTampilkanTv(err.response.data.message);
            } else {
                showErrorTampilkanTv(JSON.stringify(err.response));
            }
        }
    };
    
    function showSucessTampilkanTv(message) {
        notifyTampilkanTv("success", message);
    }
    
    function showErrorTampilkanTv(message) {
        notifyTampilkanTv("error", message);
    }

    const globalStyles = {
        textStyles: {
            html: {
                fontFamily: 'Inter'
            },
            h1: {
                fontSize: { sm: '6.4vw', md: '6.8vw', 'lg': '5.25vw' },
                fontWeight: 'bold',
                lineHeight: 1,
                padding: 0,
                margin: 0,
            },
            p: {
                fontSize: { sm: '3.6vw', md: '3.85vw', lg: '2.84vw' },
                fontWeight: 'normal',
                lineHeight: 1,
                padding: 0,
                margin: 0,
            },
        },
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
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} bg={'transparent'} px={1} pt={0}>
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
                            <Flex flexDirection={'row'} justify="end" align="end" w="100%" pb={{ sm: 4, md: 4, lg: 4 }}>
                                <Flex mr={2} align="center" justifyContent="center" cursor="pointer">
                                    <chakra.form onSubmit={submitTampilkanTv}>
                                        <Button
                                            variant={'normal'}
                                            isLoading={isLoadingTampilkanTv}
                                            type="submit"
                                        >
                                            Tampilkan ke TV
                                        </Button>
                                    </chakra.form>
                                </Flex>
                                <Link align="right" to={`/admin/pengaturan-tv/tambah-konten-lainnya`}>
                                    <Button
                                        variant={'normal'}
                                        type="button"
                                    >
                                        Tambah
                                    </Button>
                                </Link>
                            </Flex>
                            <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}} gap={4}>
                                {dataKonten.map(function(konten, i) {
                                    var date_1 = null;
                                    var date_2 = null;
                                    var difference = null;
                                    var hariBerakhir = 0;
                                    if(konten.selalu_tayang != 1) {
                                        if(konten.selesai_tayang != null) {
                                            date_1 = new Date(formatTgl(konten.created_at));
                                            date_1.setDate(date_1.getDate() + konten.selesai_tayang);
                                            date_2 = new Date(tgl_skrng);
                                            difference = date_1.getTime() - date_2.getTime();
                                            hariBerakhir = Math.ceil(difference / (1000 * 3600 * 24));
                                        }
                                    }

                                    return (
                                        <GridItem key={i} colSpan={1}>
                                            <Card p={{ sm: 0, lg: 0 }}
                                                boxShadow={'base'}
                                            >
                                                <Flex
                                                    flexDirection={'column'}
                                                    w={'100%'}
                                                    borderBottomRadius={'7.5px'}
                                                    justify="center" align="center"
                                                >
                                                    <AspectRatio w={'100%'} ratio={1920/720}>
                                                        <Flex flexDirection={'row'} style={{width: '100%', height: '100%'}} justify="center" align="center">
                                                            {(() => {
                                                                if(konten.type == 0) {
                                                                    return (
                                                                        <Flex
                                                                            w={'100%'} h={'100%'}
                                                                            bg={'white'}
                                                                            borderTopRadius={'7.5px'}
                                                                            justify="center" align="center"
                                                                            position={'relative'}
                                                                        >
                                                                            <Flex
                                                                                top={0}
                                                                                right={0}
                                                                                position={'absolute'}
                                                                                m={1.5}
                                                                                size={'xs'}
                                                                            >
                                                                                <Menu p={0} m={0}>
                                                                                    <MenuButton
                                                                                        variant={'normal'}
                                                                                        as={IconButton}
                                                                                        rightIcon={<MdModeEdit />}
                                                                                        p={1}
                                                                                    >
                                                                                        <Text textStyle='isi_isi' color={'white'}>
                                                                                            {konten.urut}
                                                                                        </Text>
                                                                                    </MenuButton>
                                                                                    <MenuList minWidth={'auto'} maxWidth={'auto'} size={'xs'}>
                                                                                        <Link to={`/admin/pengaturan-tv/edit-konten-lainnya/${konten.uid}`}>
                                                                                            <MenuItem>
                                                                                                <Text textStyle='isi_isi'>
                                                                                                    Edit
                                                                                                </Text>
                                                                                            </MenuItem>
                                                                                        </Link>
                                                                                        <MenuItem
                                                                                            fontSize={{ sm: '2xs', lg: 'xs' }}
                                                                                            onClick={() => {
                                                                                                setUidHapus(konten.uid);
                                                                                                setOpenDialogHapus(true);
                                                                                            }}
                                                                                        >
                                                                                            <Text textStyle='isi_isi'>
                                                                                                Hapus
                                                                                            </Text>
                                                                                        </MenuItem>
                                                                                    </MenuList>
                                                                                </Menu>
                                                                            </Flex>
                                                                            <Image borderTopRadius={'7.5px'} w={'100%'} h={'100%'} src={ `${process.env.NEXT_PUBLIC_API_BACKEND}/${konten.default}` } fallbackSrc='/404.jpeg'/>
                                                                        </Flex>
                                                                    )
                                                                } else if(konten.type == 1) {
                                                                    return (
                                                                        <Box
                                                                            w={'100%'} h={'100%'}
                                                                            flexDirection="column"
                                                                            borderTopRadius={'7.5px'}
                                                                            bg={'white'}
                                                                        >
                                                                            <Box
                                                                                w={'100%'} h={'100%'}
                                                                                borderTopRadius={'7.5px'}
                                                                                bg={konten.background}
                                                                                bgImage={ konten.background == null ? `url(${process.env.NEXT_PUBLIC_API_BACKEND}/${konten.template})` : "url('')"}
                                                                                bgSize={'100% 100%'}
                                                                                bgRepeat={'no-repeat'}
                                                                                bgPosition={'center'}
                                                                            >
                                                                                <Flex
                                                                                    top={0}
                                                                                    right={0}
                                                                                    position={'absolute'}
                                                                                    m={1.5}
                                                                                >
                                                                                    <Menu p={0} m={0}>
                                                                                        <MenuButton
                                                                                            variant={'normal'}
                                                                                            as={IconButton}
                                                                                            rightIcon={<MdModeEdit />}
                                                                                            p={1}
                                                                                        >
                                                                                            <Text textStyle='isi_isi' color={'white'}>
                                                                                                {konten.urut}
                                                                                            </Text>
                                                                                        </MenuButton>
                                                                                        <MenuList minWidth={'auto'} maxWidth={'auto'} size={'xs'}>
                                                                                            <Link to={`/admin/pengaturan-tv/edit-konten-lainnya/${konten.uid}`}>
                                                                                                <MenuItem>
                                                                                                    <Text textStyle='isi_isi'>
                                                                                                        Edit
                                                                                                    </Text>
                                                                                                </MenuItem>
                                                                                            </Link>
                                                                                            <MenuItem
                                                                                                fontSize={{ sm: '2xs', lg: 'xs' }}
                                                                                                onClick={() => {
                                                                                                    setUidHapus(konten.uid);
                                                                                                    setOpenDialogHapus(true);
                                                                                                }}
                                                                                            >
                                                                                                <Text textStyle='isi_isi'>
                                                                                                    Hapus
                                                                                                </Text>
                                                                                            </MenuItem>
                                                                                        </MenuList>
                                                                                    </Menu>
                                                                                </Flex>
                                                                                <Box
                                                                                    sx={{
                                                                                        'h1': {
                                                                                            fontSize: { sm: '6.66vw', md: '6.95vw', 'lg': '2.67vw' },
                                                                                            fontWeight: 'bold',
                                                                                            lineHeight: 1.2,
                                                                                            padding: 0,
                                                                                            margin: 0,
                                                                                        },
                                                                                        'h2': {
                                                                                            fontSize: { sm: '5.4vw', md: '5.64vw', 'lg': '2.16vw' },
                                                                                            fontWeight: 'bold',
                                                                                            lineHeight: 1.2,
                                                                                            padding: 0,
                                                                                            margin: 0,
                                                                                        },
                                                                                        'h3': {
                                                                                            fontSize: { sm: '4.13vw', md: '4.31vw', 'lg': '1.65vw' },
                                                                                            fontWeight: 'bold',
                                                                                            lineHeight: 1.2,
                                                                                            padding: 0,
                                                                                            margin: 0,
                                                                                        },
                                                                                        'p': {
                                                                                            fontSize: { sm: '2.855vw', md: '2.98vw', 'lg': '1.14vw' },
                                                                                            fontWeight: 'normal',
                                                                                            lineHeight: 1.2,
                                                                                            padding: 0,
                                                                                            margin: 0,
                                                                                        },
                                                                                    }}
                                                                                    lineHeight={1}
                                                                                    w={'100%'}
                                                                                    h={'100%'}
                                                                                    dangerouslySetInnerHTML={{__html: konten.text}}
                                                                                ></Box>
                                                                            </Box>
                                                                        </Box>
                                                                    )
                                                                } else if(konten.type == 2) {
                                                                    return (
                                                                        <Flex
                                                                            w={'100%'} h={'100%'}
                                                                            bg={'white'}
                                                                            borderTopRadius={'7.5px'}
                                                                            justify="center" align="center"
                                                                            bgImage={ konten.gambar == null ? `url('/template_image_konten_lainnya.png')` : `url('${`${process.env.NEXT_PUBLIC_API_BACKEND}/` + konten.gambar.replace("public", "storage")}')`}
                                                                            bgSize={konten.gambar_size == null ? 'contain' : konten.gambar_size}
                                                                            bgRepeat={'no-repeat'}
                                                                            bgPosition={'center'}
                                                                            position={'relative'}
                                                                        >
                                                                            <Flex
                                                                                top={0}
                                                                                right={0}
                                                                                position={'absolute'}
                                                                                m={1.5}
                                                                                size={'xs'}
                                                                            >
                                                                                <Menu p={0} m={0}>
                                                                                    <MenuButton
                                                                                        variant={'normal'}
                                                                                        as={IconButton}
                                                                                        rightIcon={<MdModeEdit />}
                                                                                        p={1}
                                                                                    >
                                                                                        <Text textStyle='isi_isi' color={'white'}>
                                                                                            {konten.urut}
                                                                                        </Text>
                                                                                    </MenuButton>
                                                                                    <MenuList minWidth={'auto'} maxWidth={'auto'} size={'xs'}>
                                                                                        <Link to={`/admin/pengaturan-tv/edit-konten-lainnya/${konten.uid}`}>
                                                                                            <MenuItem>
                                                                                                <Text textStyle='isi_isi'>
                                                                                                    Edit
                                                                                                </Text>
                                                                                            </MenuItem>
                                                                                        </Link>
                                                                                        <MenuItem
                                                                                            fontSize={{ sm: '2xs', lg: 'xs' }}
                                                                                            onClick={() => {
                                                                                                setUidHapus(konten.uid);
                                                                                                setOpenDialogHapus(true);
                                                                                            }}
                                                                                        >
                                                                                            <Text textStyle='isi_isi'>
                                                                                                Hapus
                                                                                            </Text>
                                                                                        </MenuItem>
                                                                                    </MenuList>
                                                                                </Menu>
                                                                            </Flex>
                                                                        </Flex>
                                                                    )
                                                                } else if(konten.type == 3) {
                                                                    return (
                                                                        <Flex
                                                                            w={'100%'} h={'100%'}
                                                                            bg={'white'}
                                                                            borderTopRadius={'7.5px'}
                                                                            justify="center" align="center"
                                                                            position={'relative'}
                                                                        >
                                                                            <Flex
                                                                                top={0}
                                                                                right={0}
                                                                                position={'absolute'}
                                                                                m={1.5}
                                                                                size={'xs'}
                                                                            >
                                                                                <Menu p={0} m={0}>
                                                                                    <MenuButton
                                                                                        variant={'normal'}
                                                                                        as={IconButton}
                                                                                        rightIcon={<MdModeEdit />}
                                                                                        p={1}
                                                                                    >
                                                                                        <Text textStyle='isi_isi' color={'white'}>
                                                                                            {konten.urut}
                                                                                        </Text>
                                                                                    </MenuButton>
                                                                                    <MenuList minWidth={'auto'} maxWidth={'auto'} size={'xs'}>
                                                                                        <Link to={`/admin/pengaturan-tv/edit-konten-lainnya/${konten.uid}`}>
                                                                                            <MenuItem>
                                                                                                <Text textStyle='isi_isi'>
                                                                                                    Edit
                                                                                                </Text>
                                                                                            </MenuItem>
                                                                                        </Link>
                                                                                        <MenuItem
                                                                                            fontSize={{ sm: '2xs', lg: 'xs' }}
                                                                                            onClick={() => {
                                                                                                setUidHapus(konten.uid);
                                                                                                setOpenDialogHapus(true);
                                                                                            }}
                                                                                        >
                                                                                            <Text textStyle='isi_isi'>
                                                                                                Hapus
                                                                                            </Text>
                                                                                        </MenuItem>
                                                                                    </MenuList>
                                                                                </Menu>
                                                                            </Flex>
                                                                            <Iframe
                                                                                url={konten.url}
                                                                                style={{ borderTopRadius: '7.5px' }}
                                                                                width={'100%'}
                                                                                height={'100%'}
                                                                                display="initial"
                                                                            />
                                                                        </Flex>
                                                                    )
                                                                } else if(konten.type == 4) {
                                                                    return (
                                                                        <Flex
                                                                            flexDirection={'column'}
                                                                            w={'100%'} h={'100%'}
                                                                            bg={'white'}
                                                                            borderTopRadius={'7.5px'}
                                                                            justify="center" align="center"
                                                                            bgImage={ konten.textarea_background == null ? `url('/template_image_konten_lainnya.png')` : `url('/${konten.textarea_background}')`}
                                                                            bgSize={'100% 100%'}
                                                                            bgRepeat={'no-repeat'}
                                                                            bgPosition={'center'}
                                                                            position={'relative'}
                                                                        >
                                                                            <Flex
                                                                                top={0}
                                                                                right={0}
                                                                                position={'absolute'}
                                                                                m={1.5}
                                                                                size={'xs'}
                                                                            >
                                                                                <Menu p={0} m={0}>
                                                                                    <MenuButton
                                                                                        variant={'normal'}
                                                                                        as={IconButton}
                                                                                        rightIcon={<MdModeEdit />}
                                                                                        p={1}
                                                                                    >
                                                                                        <Text textStyle='isi_isi' color={'white'}>
                                                                                            {konten.urut}
                                                                                        </Text>
                                                                                    </MenuButton>
                                                                                    <MenuList minWidth={'auto'} maxWidth={'auto'} size={'xs'}>
                                                                                        <Link to={`/admin/pengaturan-tv/edit-konten-lainnya/${konten.uid}`}>
                                                                                            <MenuItem>
                                                                                                <Text textStyle='isi_isi'>
                                                                                                    Edit
                                                                                                </Text>
                                                                                            </MenuItem>
                                                                                        </Link>
                                                                                        <MenuItem
                                                                                            fontSize={{ sm: '2xs', lg: 'xs' }}
                                                                                            onClick={() => {
                                                                                                setUidHapus(konten.uid);
                                                                                                setOpenDialogHapus(true);
                                                                                            }}
                                                                                        >
                                                                                            <Text textStyle='isi_isi'>
                                                                                                Hapus
                                                                                            </Text>
                                                                                        </MenuItem>
                                                                                    </MenuList>
                                                                                </Menu>
                                                                            </Flex>
                                                                            <Flex
                                                                                p={0}
                                                                                m={0}
                                                                                w={'100%'}
                                                                                h={'31.5%'}
                                                                                flexDirection={'column'}
                                                                                justify={'center'}
                                                                                align={'center'}
                                                                                // bg='grey'
                                                                            >
                                                                                <Text
                                                                                    pl={'1%'}
                                                                                    pr={'1%'}
                                                                                    margin={0}
                                                                                    w={'100%'}
                                                                                    textAlign={'center'}
                                                                                    bgColor="transparent"
                                                                                    lineHeight={1.2}
                                                                                    color={'white'}
                                                                                    whiteSpace={'pre'}
                                                                                    fontWeight={'bold'}
                                                                                    fontSize={{ sm: '11pt', md: '24.9pt', lg: '17pt' }}
                                                                                >
                                                                                    {konten.textarea_judul}
                                                                                </Text>
                                                                            </Flex>
                                                                            <Box w={'100%'} h={'2.5%'}></Box>
                                                                            <Flex
                                                                                p={0}
                                                                                m={0}
                                                                                w={'100%'}
                                                                                h={'63.5%'}
                                                                                flexDirection={'column'}
                                                                                justify={'center'}
                                                                                align={'center'}
                                                                                // bg='blue'
                                                                            >
                                                                                <Text
                                                                                    pl={'1%'}
                                                                                    pr={'1%'}
                                                                                    margin={0}
                                                                                    w={'100%'}
                                                                                    textAlign={'center'}
                                                                                    bgColor="transparent"
                                                                                    lineHeight={1.2}
                                                                                    color={'white'}
                                                                                    whiteSpace={'pre'}
                                                                                    fontWeight={'normal'}
                                                                                    fontSize={{ sm: '7.8pt', md: '17.5pt', lg: '12.5pt' }}
                                                                                >
                                                                                    {konten.textarea_isi}
                                                                                </Text>
                                                                            </Flex>
                                                                            <Box w={'100%'} h={'2.5%'}></Box>
                                                                        </Flex>
                                                                    )
                                                                } else {
                                                                    return <></>
                                                                }
                                                            })()}
                                                        </Flex>
                                                    </AspectRatio>
                                                    <Flex p={4} flexDirection="column" w={'100%'} style={{ borderTop: '0.5px solid #c6c5c5' }}>
                                                        <Grid templateColumns={{ sm: 'repeat(6, 1fr)', lg: 'repeat(6, 1fr)'}}>
                                                            <GridItem colSpan={1}>
                                                                <Text textStyle='isi_isi'>
                                                                    Durasi
                                                                </Text>
                                                            </GridItem>
                                                            <GridItem colSpan={5}>
                                                                <Text textStyle='isi_isi'>
                                                                    : {konten.durasi} Detik
                                                                </Text>
                                                            </GridItem>
                                                        </Grid>
                                                        {(() => {
                                                            if(konten.selalu_tayang == 1) {
                                                                return (
                                                                    <Grid pt={1} templateColumns={{ sm: 'repeat(6, 1fr)', lg: 'repeat(6, 1fr)'}}>
                                                                        <GridItem colSpan={1}>
                                                                            <Text textStyle='isi_isi'>
                                                                                Tayang
                                                                            </Text>
                                                                        </GridItem>
                                                                        <GridItem colSpan={5}>
                                                                            <Text textStyle='isi_isi'>
                                                                                : Terus menerus
                                                                            </Text>
                                                                        </GridItem>
                                                                    </Grid>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Grid pt={2} templateColumns={{ sm: 'repeat(6, 1fr)', lg: 'repeat(6, 1fr)'}}>
                                                                         <GridItem colSpan={1}>
                                                                            <Text textStyle='isi_isi'>
                                                                                Tayang
                                                                            </Text>
                                                                        </GridItem>
                                                                        <GridItem colSpan={5}>
                                                                            <Text textStyle='isi_isi'>
                                                                                : Berakhir dalam {hariBerakhir} hari
                                                                            </Text>
                                                                        </GridItem>
                                                                    </Grid>
                                                                )
                                                            }
                                                        })()}
                                                        <Grid pt={4} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                                            <GridItem colSpan={1}>
                                                                <Flex flexDirection={'row'} w={'100%'} justify="start" align="center">
                                                                    <Badge variant='solid' colorScheme='blue' px={2} py={1}>
                                                                        <Text textStyle='isi_isi' color={'white'}>
                                                                            Dibuat {formatTgl(konten.created_at)}
                                                                        </Text>
                                                                    </Badge>
                                                                </Flex>
                                                            </GridItem>
                                                            <GridItem colSpan={1}>
                                                                <Flex flexDirection={'row'} w={'100%'} justify="end" align="center">
                                                                    <Badge variant='solid' colorScheme={ konten.active == 1 ? 'green' : 'red' } px={2} py={1}>
                                                                        <Text textStyle='isi_isi' color={'white'}>
                                                                            { konten.active == 1 ? 'Aktif' : 'Tidak Aktif' }
                                                                        </Text>
                                                                    </Badge>
                                                                </Flex>
                                                            </GridItem>
                                                        </Grid>

                                                    </Flex>
                                                </Flex>
                                            </Card>
                                        </GridItem>
                                    );
                                })}
                            </Grid>
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
                <chakra.form onSubmit={hapusKonten}>
                    <ModalContent ml={{ sm: 4, lg: 0 }} mr={{ sm: 4, lg: 0 }} padding={0} margin={0}>
                        <ModalHeader size="xs" borderTopRadius={'7.5px'} p={{ sm: 2, lg: 3 }}>
                            <Flex justify="space-between" align="center">
                                <Text textStyle='sub_sub_judul'>
                                    Hapus Konten?
                                </Text>
                                <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => {
                                    setUidHapus(null);
                                    setOpenDialogHapus(false);
                                }}/>
                            </Flex>
                        </ModalHeader>
                        <ModalFooter size="xs" borderBottomRadius={'7.5px'} pb={{ sm: 1, lg: 2 }} p={{ sm: 2, lg: 3 }}>
                            <Flex justify="space-between" align="end">
                                <Button
                                    variant={'normal'}
                                    isLoading={isLoadingHapus}
                                    type="submit"
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