/* eslint-disable jsx-a11y/alt-text */
import "@fontsource/scada";
import "@fontsource/inter";
import {
    ChakraProvider,
    Portal,
    useDisclosure,
    useColorModeValue,
    Button,
    Flex,
    Box,
    Link,
    Image,
    Text,
    Center,
    IconButton,
} from "@chakra-ui/react";
import PengurusNavbar from "../components/Navbars/PengurusNavbar.js";
import React, { useState, createRef, useEffect } from "react";

import { Redirect, Route, Switch, useLocation, NavLink } from "react-router-dom";
import routes from "../../lib/routes.js";
import theme from "../../theme/theme.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import AuthContent from "../../lib/AuthContent";

import Dashboards from "../admin/dashboard/Dashboard.js";
import Artikels from "../admin/artikel/Artikel.js";
import DetailArtikel from "../admin/artikel/DetailArtikel.js";
import TambahArtikel from "../admin/artikel/TambahArtikel.js";

import LimaWaktu from "../admin/settingTV/limawaktu/LimaWaktu.js";
import SholatJumat from "../admin/settingTV/jumat/SholatJumat.js";

import KontenLainnya from "../admin/settingTV/lainnya/KontenLainnya.js";
import TambahKontenLainnya from "../admin/settingTV/lainnya/TambahKontenLainnya.js";
import EditKontenLainnya from "../admin/settingTV/lainnya/EditKontenLainnya.js";
import TambahTeks from "../admin/settingTV/TambahTeks.js";
import TambahGambar from "../admin/settingTV/TambahGambar.js";
import TambahGambarTeks from "../admin/settingTV/TambahGambarTeks.js";
import TambahVidio from "../admin/settingTV/TambahVidio.js";
import TambahVidioTeks from "../admin/settingTV/TambahVidioTeks.js";
import LaporanKeuangan from "../admin/settingTV/LaporanKeuangan.js";
import LaporanProyek from "../admin/settingTV/LaporanProyek.js";
import JadwalKegiatan from "../admin/settingTV/JadwalKegiatan.js";
import DefaultImage from "../admin/settingTV/DefaultImage.js";
import ListDisplay from "../admin/settingTV/ListDisplay.js";

import Pelatihan from "../admin/pelatihan/Pelatihan.js";

import Event from "../admin/event/Event.js";
import TambahEventRutin from "../admin/event/TambahEventRutin.js";
import Ustadz from "../admin/ustadz/Ustadz.js";
import Yayasan from "../admin/yayasan/Yayasan.js";
import Petugas from "../admin/petugas/Petugas.js";
import DetailPetugas from "../admin/petugas/DetailPetugas.js";
import TambahPetugas from "../admin/petugas/TambahPetugas.js";
import Pengaturan from "../admin/pengaturan/Pengaturan.js";
import DetailRekening from "../admin/pengaturan/rekening/DetailRekening.js";
import TambahRekening from "../admin/pengaturan/rekening/TambahRekening.js";

import Kajian from "../admin/baiti/kajian/Kajian.js";
import TambahKajian from "../admin/baiti/kajian/TambahKajian.js";
import DetailKajian from "../admin/baiti/kajian/DetailKajian.js";


import { Separator } from "../../theme/components/Separator/Separator";
import {
    FaHome,
    FaTv,
    FaUserInjured,
    FaMosque,
    FaUsers,
    FaRegCalendarAlt,
    FaPray,
    FaClipboardList,
    FaBook
} from "react-icons/fa";
import {
    GiFamilyHouse,
    GiTeacher
} from "react-icons/gi";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdAdminPanelSettings,
    MdConnectedTv
} from "react-icons/md";
import {
    ImProfile
} from "react-icons/im";
import {
    RiArticleFill
} from "react-icons/ri";

export default function AdminLayout(props) {

    const [mount, setMount] = useState(false);
    const location = useLocation();
    const { ...rest } = props;
    const [fixed, setFixed] = useState(false);
    const mainPanel = createRef();

    let variantChange = "0.2s linear";
    let sidebarMargins = "0px";
    let sidebarRadius = "10px";

    let purpleColor = "#6a5aa3";
    //active
    let activeBg = useColorModeValue("#B3A5DA", "gray.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    //inactive
    let inactiveBg = useColorModeValue("white", "gray.700");
    let inactiveColor = useColorModeValue("#6a5aa3", "white");
    let sidebarInactiveShadow = "0px 0px 0px rgba(0, 0, 0, 0)";

    const [showManagement, setShowManagement] = useState(false);
    async function handleToggleManagement() {
        if(showManagement) {
            setShowManagement(false);
        } else {
            setShowManagement(true);
            setShowPelatihan(false);
            setShowBaiti(false);
            setShowPengaturan(false);
        }
    };

    const [showPelatihan, setShowPelatihan] = useState(false);
    async function handleTogglePelatihan() {
        if(showPelatihan) {
            setShowPelatihan(false);
        } else {
            setShowPelatihan(true);
            setShowManagement(false);
            setShowPengaturan(false);
            setShowBaiti(false);
        }
    };

    const [showPengaturan, setShowPengaturan] = useState(false);
    async function handleTogglePengaturan() {
        if(showPengaturan) {
            setShowPengaturan(false);
        } else {
            setShowPengaturan(true);
            setShowManagement(false);
            setShowPelatihan(false);
            setShowBaiti(false);
        }
    };

    const [showBaiti, setShowBaiti] = useState(false);
    async function handleToggleBaiti() {
        if(showBaiti) {
            setShowBaiti(false);
        } else {
            setShowBaiti(true);
            setShowManagement(false);
            setShowPengaturan(false);
            setShowPelatihan(false);
        }
    };

    useEffect(() => {
        if(location.pathname == "/admin/yayasan" ||
        (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ||
        (location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin")) ||
        (location.pathname == "/admin/ustadz") ||
        (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel")) {
            setShowManagement(true);
            setShowPelatihan(false);
            setShowPengaturan(false);
        }
        if(location.pathname == "/admin/pelatihan") {
            setShowPelatihan(true);
            setShowManagement(false);
            setShowPengaturan(false);
        }
        if(location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ||
        location.pathname == "/admin/pengaturan-tv/sholat-jumat" ||
        location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
        location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
        location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")) {
            setShowPengaturan(true);
            setShowManagement(false);
            setShowPelatihan(false);
        }
        document.body.style.overflow = "unset";
        setMount(true);
        return function cleanup() {};
        
    }, []);

    const getActiveNavbar = (routes) => {
        let activeNavbar = true;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].category) {
                let categoryActiveNavbar = getActiveNavbar(routes[i].views);
                if (categoryActiveNavbar !== activeNavbar) {
                    return categoryActiveNavbar;
                }
            } else {
                if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    if (routes[i].secondaryNavbar) {
                        return routes[i].secondaryNavbar;
                    }
                }
            }
        }
        return activeNavbar;
    };

    let navbarShadow = useColorModeValue(
        "-8px -7px 13px 4px rgb(106 90 163 / 71%);",
        "none"
    );

    const { onOpen } = useDisclosure();
    document.documentElement.dir = "ltr";

    return mount && (
        <AuthContent>
            <ChakraProvider theme={theme} resetCss={false}>
                <Box ref={mainPanel}>
                    <Box display={{ sm: "none", xl: "block" }} position="fixed">
                        <Box transition={variantChange} w="290px" maxW="290px"
                            h="calc(100vh)" ps="20px" pe="20px" m={sidebarMargins}
                            bg="white"
                            boxShadow={navbarShadow}
                            bgSize="100% 100%" bgPosition="100%"
                        >
                            <Box pt={2.5} pb={2.5}>
                                <Center>
                                    <Flex direction="column" 
                                        justify="center" align="center"
                                    >
                                        <Link pb={2.5} href={`${process.env.app_url}#/admin/dashboard`} w="40%">
                                            <Image alignContent={'center'} src="/logo_appbar.png"/>
                                        </Link>
                                        <Separator></Separator>
                                    </Flex>
                                </Center>
                            </Box>
                            <Flex direction="column"
                                overflowX="auto"
                                h="100%"
                                pb="100px"
                                sx={
                                    { 
                                    '::-webkit-scrollbar':{
                                        display:'none'
                                    }
                                    }
                                }
                            >
                                <Box>
                                    <NavLink to="/admin/dashboard">
                                        <Button boxSize="initial"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            boxShadow={ location.pathname == "/admin/dashboard" ? sidebarActiveShadow :  sidebarInactiveShadow }
                                            bg={ location.pathname == "/admin/dashboard" ? activeBg : inactiveBg}
                                            transition={variantChange}
                                            py={'8px'}
                                            px={'8px'}
                                            borderRadius="15px"
                                            _hover="none"
                                            w="100%"
                                            _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                            _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                        >
                                            <Flex flexDirection={'row'}>
                                                <IconButton
                                                    size={'sm'}
                                                    variant='outline'
                                                    bg={ location.pathname == "/admin/dashboard" ? purpleColor : inactiveBg }
                                                    borderRadius={25}
                                                    color={ location.pathname == "/admin/dashboard" ? 'white' : inactiveColor }
                                                    borderWidth={0.5}
                                                    mr={2.5}
                                                    borderColor={ location.pathname == "/admin/dashboard" ? 'white' : inactiveColor }
                                                    icon={<FaHome/>}
                                                />
                                                <Text color={ location.pathname == "/admin/dashboard" ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                    Dashboard
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </NavLink>
                                    <NavLink to="/admin/pengaturan">
                                        <Button boxSize="initial"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            boxShadow={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? sidebarActiveShadow :  sidebarInactiveShadow }
                                            bg={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? activeBg : inactiveBg}
                                            transition={variantChange}
                                            py={'8px'}
                                            px={'8px'}
                                            borderRadius="15px"
                                            _hover="none"
                                            w="100%"
                                            _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                            _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                        >
                                            <Flex flexDirection={'row'}>
                                                <IconButton
                                                    size={'sm'}
                                                    variant='outline'
                                                    bg={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? purpleColor : inactiveBg }
                                                    borderRadius={25}
                                                    color={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? 'white' : inactiveColor }
                                                    borderWidth={0.5}
                                                    mr={2.5}
                                                    borderColor={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? 'white' : inactiveColor }
                                                    icon={<ImProfile/>}
                                                />
                                                <Text color={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                    Pengaturan
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </NavLink>
                                    <Flex pt={'8px'} pb={'8px'} px={'8px'}
                                        w={'100%'}
                                        flexDirection={'row'}
                                        justify="start" align="center"
                                        cursor={'pointer'}
                                        onClick={() => handleToggleManagement()}
                                    >
                                        <IconButton
                                            size={'sm'}
                                            variant='outline'
                                            bg={
                                                location.pathname == "/admin/yayasan" ||
                                                (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ||
                                                (location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin")) ||
                                                
                                                (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel")
                                                ? purpleColor : inactiveBg
                                            }
                                            borderRadius={25}
                                            color={
                                                location.pathname == "/admin/yayasan" ||
                                                (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ||
                                                (location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin")) ||
                                                
                                                (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel")
                                                ? 'white' : inactiveColor
                                            }
                                            borderWidth={0.5}
                                            mr={2.5}
                                            borderColor={purpleColor}
                                            icon={<MdAdminPanelSettings/>}
                                        />
                                     
                                        <Text color={purpleColor} fontWeight="bold" fontSize={'sm'} type={'button'}>
                                            Manajemen
                                        </Text>
                                        <Flex justify="end" align="center" w={'100%'}>
                                            { showManagement ? <MdKeyboardArrowUp style={{ marginTop: '5px', color: purpleColor }}/> : <MdKeyboardArrowDown style={{ marginTop: '5px', color: purpleColor }}/>}
                                        </Flex>
                                    </Flex>
                                    {showManagement ?
                                        <Flex flexDirection={'column'} ml={10}>
                                            <NavLink to="/admin/yayasan">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/yayasan" ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/yayasan" ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/yayasan" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/yayasan" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/yayasan" ? 'white' : inactiveColor }
                                                            icon={<GiFamilyHouse/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/yayasan" ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Yayasan
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/manajemen/pengurus">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ? 'white' : inactiveColor }
                                                            icon={<FaUsers/>}
                                                            transition={variantChange}
                                                        />
                                                        <Text color={ (location.pathname == "/admin/manajemen/pengurus" || location.pathname == "/admin/manajemen/tambah-pengurus" || location.pathname.includes("manajemen/detail-pengurus")) ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Pengurus
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/event">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? 'white' : inactiveColor }
                                                            icon={<FaRegCalendarAlt/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Event
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                      
                                            <NavLink to="/admin/manajemen/artikel">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel") ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel") ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel") ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel") ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel") ? 'white' : inactiveColor }
                                                            icon={<RiArticleFill/>}
                                                        />
                                                        <Text color={ (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("manajemen/detail-artikel") || location.pathname == "/admin/manajemen/tambah-artikel") ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Artikel
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                        </Flex>
                                        :
                                        <></>
                                    }
                                    <Flex pt={'8px'} pb={'8px'} px={'8px'}
                                        w={'100%'}
                                        flexDirection={'row'}
                                        justify="start" align="center"
                                        cursor={'pointer'}
                                        onClick={() => handleTogglePelatihan()}
                                    >
                                        <IconButton
                                            size={'sm'}
                                            variant='outline'
                                            bg={
                                                location.pathname == "/admin/pelatihan"  ? purpleColor : inactiveBg
                                            }
                                            borderRadius={25}
                                            color={
                                                location.pathname == "/admin/pelatihan" ? 'white' : inactiveColor
                                            }
                                            borderWidth={0.5}
                                            mr={2.5}
                                            borderColor={purpleColor}
                                            icon={<GiTeacher/>}
                                        />
                                     
                                        <Text color={purpleColor} fontWeight="bold" fontSize={'sm'} type={'button'}>
                                            Pelatihan
                                        </Text>
                                        <Flex justify="end" align="center" w={'100%'}>
                                            { showPelatihan ? <MdKeyboardArrowUp style={{ marginTop: '5px', color: purpleColor }}/> : <MdKeyboardArrowDown style={{ marginTop: '5px', color: purpleColor }}/>}
                                        </Flex>
                                    </Flex>
                                    {showPelatihan ?
                                        <Flex flexDirection={'column'} ml={10}>
                                            <NavLink to="/admin/pelatihan">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/pelatihan" ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/pelatihan" ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/pelatihan" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/pelatihan" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/pelatihan" ? 'white' : inactiveColor }
                                                            icon={<GiTeacher/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/pelatihan" ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Pelatihan
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                        </Flex>
                                        :
                                        <></>
                                    }
                                    <Flex pt={'8px'} pb={'8px'} px={'8px'}
                                        w={'100%'}
                                        flexDirection={'row'}
                                        justify="start" align="center"
                                        cursor={'pointer'}
                                        onClick={() => handleTogglePengaturan()}
                                    >
                                        <IconButton
                                            size={'sm'}
                                            variant='outline'
                                            bg={
                                                location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ||
                                                location.pathname == "/admin/pengaturan-tv/sholat-jumat" ||
                                                location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                ? purpleColor : inactiveBg
                                            }
                                            borderRadius={25}
                                            color={
                                                location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ||
                                                location.pathname == "/admin/pengaturan-tv/sholat-jumat" ||
                                                location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                ? 'white' : inactiveColor
                                            }
                                            borderWidth={0.5}
                                            mr={2.5}
                                            borderColor={purpleColor}
                                            icon={<MdConnectedTv/>}
                                        />
                                     
                                        <Text color={purpleColor} fontWeight="bold" fontSize={'sm'} type={'button'}>
                                            Pengaturan TV
                                        </Text>
                                        <Flex justify="end" align="center" w={'100%'}>
                                            { showPengaturan ? <MdKeyboardArrowUp style={{ marginTop: '5px', color: purpleColor }}/> : <MdKeyboardArrowDown style={{ marginTop: '5px', color: purpleColor }}/>}
                                        </Flex>
                                    </Flex>
                                    {showPengaturan ?
                                        <Flex flexDirection={'column'} ml={10}>
                                            <NavLink to="/admin/pengaturan-tv/sholat-lima-waktu">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? 'white' : inactiveColor }
                                                            icon={<FaPray/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Sholat 5 Waktu
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/pengaturan-tv/sholat-jumat">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? 'white' : inactiveColor }
                                                            icon={<FaMosque/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Sholat Jumat
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/pengaturan-tv/konten-lainnya">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ (
                                                        location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                        location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                        location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                    ) ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ (
                                                        location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                        location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                        location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                    ) ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ (
                                                                location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                                location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                                location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                            ) ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ (
                                                                location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                                location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                                location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                            ) ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ (
                                                                location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                                location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                                location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                            ) ? 'white' : inactiveColor }
                                                            icon={<FaTv/>}
                                                        />
                                                        <Text color={ (
                                                            location.pathname == "/admin/pengaturan-tv/konten-lainnya" ||
                                                            location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" ||
                                                            location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")
                                                        ) ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Konten Lainnya
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                        </Flex>
                                        :
                                        <></>
                                        
                                    }

                                    <Flex pt={'8px'} pb={'8px'} px={'8px'}
                                        w={'100%'}
                                        flexDirection={'row'}
                                        justify="start" align="center"
                                        cursor={'pointer'}
                                        onClick={() => handleToggleBaiti()}
                                    >
                                        <IconButton
                                            size={'sm'}
                                            variant='outline'
                                            bg={
                                                location.pathname == "/admin/baiti/kajian" || 
                                                location.pathname == "/admin/baiti/tambah-kajian" ||
                                                location.pathname == "/admin/ustadz" ||
                                                location.pathname.includes("baiti/detail-kajian")  ? purpleColor : inactiveBg
                                            }
                                            borderRadius={25}
                                            color={
                                                location.pathname == "/admin/baiti/kajian" ||
                                                location.pathname == "/admin/baiti/tambah-kajian" ||
                                                location.pathname == "/admin/ustadz" ||
                                                location.pathname.includes("baiti/detail-kajian") ? 'white' : inactiveColor
                                            }
                                            borderWidth={0.5}
                                            mr={2.5}
                                            borderColor={purpleColor}
                                            icon={<FaClipboardList/>}
                                        />
                                     
                                        <Text color={purpleColor} fontWeight="bold" fontSize={'sm'} type={'button'}>
                                            BAITI
                                        </Text>
                                        <Flex justify="end" align="center" w={'100%'}>
                                            { showBaiti ? <MdKeyboardArrowUp style={{ marginTop: '5px', color: purpleColor }}/> : <MdKeyboardArrowDown style={{ marginTop: '5px', color: purpleColor }}/>}
                                        </Flex>
                                    </Flex>
                                    {showBaiti ?
                                        <Flex flexDirection={'column'} ml={10}>
                                            <NavLink to="/admin/pelatihan">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/pelatihan" ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/pelatihan" ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/pelatihan" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/pelatihan" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/pelatihan" ? 'white' : inactiveColor }
                                                            icon={<FaBook/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/pelatihan" ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Program
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>

                                            <NavLink to="/admin/baiti/kajian">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ 
                                                        location.pathname == "/admin/baiti/kajian" ||
                                                        location.pathname == "/admin/baiti/tambah-kajian" ||
                                                        location.pathname.includes("baiti/detail-kajian")  ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={
                                                         location.pathname == "/admin/baiti/kajian" ||
                                                         location.pathname == "/admin/baiti/tambah-kajian" ||
                                                         location.pathname.includes("baiti/detail-kajian") ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ 
                                                                location.pathname == "/admin/baiti/kajian" ||
                                                                location.pathname == "/admin/baiti/tambah-kajian" ||
                                                                location.pathname.includes("baiti/detail-kajian") ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ 
                                                                location.pathname == "/admin/baiti/kajian" ||
                                                                location.pathname == "/admin/baiti/tambah-kajian" ||
                                                                location.pathname.includes("baiti/detail-kajian") ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ 
                                                                location.pathname == "/admin/baiti/kajian" ||
                                                                location.pathname == "/admin/baiti/tambah-kajian" ||
                                                                location.pathname.includes("baiti/detail-kajian")  ? 'white' : inactiveColor }
                                                            icon={<FaBook/>}
                                                        />
                                                        <Text color={
                                                             location.pathname == "/admin/baiti/kajian" || 
                                                             location.pathname == "/admin/baiti/tambah-kajian" ||
                                                             location.pathname.includes("baiti/detail-kajian") ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Kajian
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/ustadz">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/ustadz" ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/ustadz" ? activeBg : inactiveBg}
                                                    py={'8px'}
                                                    px={'8px'}
                                                    borderRadius="15px"
                                                    _hover="none"
                                                    w="100%"
                                                    _active={{bg: "inherit", transform: "none", borderColor: "transparent"}}
                                                    _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
                                                >
                                                    <Flex flexDirection={'row'}>
                                                        <IconButton
                                                            size={'sm'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/ustadz" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/ustadz" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/ustadz" ? 'white' : inactiveColor }
                                                            icon={<FaUserInjured/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/ustadz" ? activeColor : inactiveColor } my="auto" fontSize="sm">
                                                            Ustadz
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                        </Flex>
                                        :
                                        <></>
                                    }
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
                <MainPanel ref={mainPanel} w={{base: "100%", xl: "calc(100% - 300px)"}}>
                    <Portal>
                        <PengurusNavbar
                            onOpen={onOpen}
                            logoText={"BAITI"}
                            brandText={
                                location.pathname == "/admin/dashboard" ?
                                    "Dashboard "
                                : location.pathname == "/admin/pengaturan" ?
                                    "Pengaturan" 
                                : location.pathname.includes("/pengaturan-rekening/detail-rekening") ?
                                    "Detail Rekening"
                                : location.pathname.includes("/pengaturan-rekening/tambah-rekening") ?
                                    "Tambah Rekening"   
                                : location.pathname == "/admin/yayasan" ?
                                    "Yayasan"
                                : location.pathname == "/admin/manajemen/pengurus" ?
                                    "Pengurus DKM"
                                : location.pathname.includes("/manajemen/detail-pengurus") ?
                                    "Detail Pengurus"
                                : location.pathname.includes("/manajemen/tambah-pengurus") ?
                                    "Tambah Pengurus"
                                : location.pathname == "/admin/event" ?
                                    "Event Masjid"
                                : location.pathname.includes("tambah-event-rutin") ?
                                    "Tambah Event"
                                : location.pathname == "/admin/ustadz" ?
                                    "Ustadz"
                                : location.pathname == "/admin/manajemen/artikel" ?
                                    "Artikel"
                                : location.pathname.includes("/manajemen/detail-artikel") ?
                                    "Detail Artikel"
                                : location.pathname == "/admin/manajemen/tambah-artikel" ?
                                    "Tambah Artikel"
                                : location.pathname == "/admin/pelatihan" ?
                                    "Pelatihan"
                                : location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ?
                                    "Sholat 5 Waktu"
                                : location.pathname == "/admin/pengaturan-tv/sholat-jumat" ?
                                    "Sholat Jumat"
                                : location.pathname == "/admin/pengaturan-tv/konten-lainnya" ?
                                    "Konten Lainnya"
                                : location.pathname.includes("/pengaturan-tv/edit-konten-lainnya") ?
                                    "Edit Konten Lainnya"
                                : location.pathname.includes("/pengaturan-tv/tambah-konten-lainnya") ?
                                    "Tambah Konten Lainnya"
                                : location.pathname.includes("/pengaturan-tv/tambah-konten-lainnya") ?
                                    "Tambah Konten Lainnya"
                                : location.pathname.includes("tambah-teks") ?
                                    "Tambah Teks"
                                : location.pathname.includes("tambah-gambar") ?
                                    "Tambah Gambar"
                                : location.pathname.includes("tambah-gambar-teks") ?
                                    "Tambah Gambar & Teks"
                                : location.pathname.includes("tambah-vidio") ?
                                    "Tambah Vidio"
                                : location.pathname.includes("tambah-vidio-teks") ?
                                    "Tambah Vidio dan Teks"
                                : location.pathname.includes("laporan-keuangan") ?
                                    "Tambah Laporan Keuangan"
                                : location.pathname.includes("laporanProyek") ?
                                    "Tambah Laporan Proyek"
                                : location.pathname.includes("jadwal-kegiatan") ?
                                    "Tambah Jadwal Kegiatan"
                                : location.pathname.includes("defaultImage") ?
                                    "Tambah Default Image"
                                : location.pathname.includes("list-display") ?
                                    "List Display"
                                : location.pathname == "/admin/baiti/kajian" ?
                                    "Kajian"
                                : location.pathname == "/admin/baiti/tambah-kajian" ?
                                    "Tambah Kajian"
                                : location.pathname.includes("/baiti/detail-kajian") ?
                                    "Detail Kajian"
                                : ""
                            }
                            fixed={fixed}
                            {...rest}
                        />
                    </Portal>
                    <PanelContent pr={{lg: '18px'}} pl={{lg: '9px'}}>
                        <PanelContainer
                            pl={{ sm: '10px' }}
                            pr={{ sm: '10px' }}
                            borderRadius={sidebarRadius}
                        >
                            <Switch>
                                <Route path="/admin/dashboard" component={Dashboards}/>
                                <Route path="/admin/manajemen/artikel" component={Artikels}/>
                                <Route path='/admin/manajemen/detail-artikel/:id+' component={DetailArtikel} exact/>
                                <Route path='/admin/manajemen/tambah-artikel' component={TambahArtikel}/>
                                <Route path="/admin/pengaturan-tv/sholat-lima-waktu" component={LimaWaktu}/>
                                <Route path="/admin/pengaturan-tv/sholat-jumat" component={SholatJumat}/>
                                <Route path="/admin/pengaturan-tv/tambah-konten-lainnya" component={TambahKontenLainnya}/>
                                <Route path="/admin/pengaturan-tv/konten-lainnya" component={KontenLainnya}/>
                                <Route path="/admin/pengaturan-tv/edit-konten-lainnya/:uid" component={EditKontenLainnya}/>
                                <Route path={'/admin/tambah-teks'} component={TambahTeks}/>
                                <Route path={'/admin/tambah-gambar'} component={TambahGambar}/>
                                <Route path={'/admin/tambah-gambar-teks'} component={TambahGambarTeks}/>
                                <Route path={'/admin/tambah-vidio'} component={TambahVidio}/>
                                <Route path={'/admin/tambah-vidio-teks'} component={TambahVidioTeks}/>
                                <Route path={'/admin/laporan-keuangan'} component={LaporanKeuangan}/>
                                <Route path={'/admin/laporanProyek'} component={LaporanProyek}/>
                                <Route path={'/admin/jadwal-kegiatan'} component={JadwalKegiatan}/>
                                <Route path={'/admin/defaultImage'} component={DefaultImage}/>
                                <Route path={'/admin/list-display'} component={ListDisplay}/>
                                <Route path="/admin/ustadz" component={Ustadz}/>
                                <Route path="/admin/yayasan" component={Yayasan}/>
                                <Route path="/admin/pelatihan" component={Pelatihan}/>
                                <Route path="/admin/manajemen/pengurus" component={Petugas}/>
                                <Route path="/admin/manajemen/tambah-pengurus" component={TambahPetugas}/>
                                <Route path='/admin/manajemen/detail-pengurus/:id+' component={DetailPetugas} exact/>
                                <Route path="/admin/event" component={Event}/>
                                <Route path={'/admin/tambah-event-rutin'} component={TambahEventRutin}/>
                                <Route path="/admin/pengaturan" component={Pengaturan}/>
                                <Route path={'/admin/pengaturan-rekening/detail-rekening/:uid'} component={DetailRekening}/>
                                <Route path={'/admin/pengaturan-rekening/tambah-rekening'} component={TambahRekening}/>
                                <Route path="/admin/baiti/kajian" component={Kajian}/>
                                <Route path="/admin/baiti/tambah-kajian" component={TambahKajian}/>
                                <Route path='/admin/baiti/detail-kajian/:id+' component={DetailKajian} exact/>

                                <Redirect from="/admin" to="/admin/dashboard" />
                            </Switch>
                        </PanelContainer>
                    </PanelContent>

                    <Flex
                        flexDirection={{ base: "column", xl: "row" }}
                        alignItems={{ base: "center", xl: "start" }}
                        justifyContent="space-between" px="30px"
                    >
                        <Center>
                            <Text textStyle='isi'>
                                &copy; {1900 + new Date().getYear()},{" "}
                                <Link color="teal.400" href="#" target="_blank">
                                    BAITI
                                </Link>
                            </Text>
                        </Center>
                    </Flex>
                    <Portal>
                        <FixedPlugin secondary={getActiveNavbar(routes)} fixed={fixed} onOpen={onOpen}/>
                    </Portal>
                </MainPanel>
            </ChakraProvider>
        </AuthContent>
    );
}
