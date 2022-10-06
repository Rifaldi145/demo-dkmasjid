/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
	Image,
	Icon,
    Center,
    IconButton
} from "@chakra-ui/react";
import IconBox from "../Icons/IconBox";
import { CreativeTimLogo } from "../Icons/Icons";
import { Separator } from "../Separator/Separator";
import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    FaHome,
    FaUserTie,
    FaTv,
    FaBookOpen,
    FaCogs,
    FaBullhorn,
    FaUserInjured,
    FaHouseUser,
    FaMosque,
    FaUsers,
    FaRegCalendarAlt,
    FaPray
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

const bgBg = "/bg.png";


function Sidebar(props) {
	let location = useLocation();
	const [state, setState] = useState({});
	const mainPanel = useRef();
	let variantChange = "0.2s linear";
	let greenColor = "#6a5aa3";
	
	const activeRoute = (routeName) => {
		return location.pathname === routeName ? "active" : "";
	};
	
	const createLinks = (routes) => {
		const { sidebarVariant } = props;

		let activeBg = useColorModeValue("white", "gray.700");
		let inactiveBg = useColorModeValue("white", "gray.700");
		let activeColor = useColorModeValue("gray.700", "white");
		let inactiveColor = useColorModeValue("gray.400", "gray.400");
		let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
		
		if (sidebarVariant === "opaque") {
			activeBg = "transparent";
			inactiveBg = useColorModeValue("gray.100", "gray.600");
			activeColor = useColorModeValue("gray.700", "white");
			inactiveColor = useColorModeValue("gray.400", "gray.400");
			sidebarActiveShadow = "none";
		}

		return routes.map((prop, key) => {
			if (prop.redirect) {
				return null;
			}
			if (prop.category) {
				var st = {};
				st[prop["state"]] = !state[prop.state];
				return (
					<Flex key={key}>
						<Text key={key} color={activeColor} fontWeight="bold" mb={{xl: "12px"}} mx="auto" ps={{sm: "10px", xl: "16px"}} py="12px">
						{document.documentElement.dir === "rtl"
							? prop.rtlName
							: prop.name}
						</Text>
						{createLinks(prop.views)}
					</Flex>
				);
			}
			return (
				<NavLink key={key} to={prop.layout + prop.path}>
					{activeRoute(prop.layout + prop.path) === "active" ? (
						<Button boxSize="initial" justifyContent="flex-start" alignItems="center" boxShadow={sidebarActiveShadow} bg={activeBg}
							transition={variantChange} mb={{xl: "12px"}} mx={{xl: "auto"}} ps={{sm: "10px", xl: "16px"}} py="12px" borderRadius="15px"
							_hover="none" w="100%" _active={{bg: "inherit", transform: "none", borderColor: "transparent"}} _focus={{boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)"}}
						>
							<Flex>
								{typeof prop.icon === "string" ? (
								<Icon>{prop.icon}</Icon>
								) : (
								<IconBox bg={greenColor} color="white" h="30px" w="30px" me="12px" transition={variantChange}>
									{prop.icon}
								</IconBox>
								)}
								<Text color={activeColor} my="auto" fontSize="sm">
								{document.documentElement.dir === "rtl"
									? prop.rtlName
									: prop.name}
								</Text>
							</Flex>
						</Button>
					) : (
						<Button boxSize="initial" justifyContent="flex-start" alignItems="center" bg="transparent" mb={{xl: "12px"}}
							mx={{xl: "auto"}} py="12px" ps={{sm: "10px", xl: "16px"}} borderRadius="15px" _hover="none" w="100%"
							_active={{bg: "inherit", transform: "none", borderColor: "transparent"}} _focus={{boxShadow: "none"}}
						>
							<Flex>
								{typeof prop.icon === "string" ? (
								<Icon>{prop.icon}</Icon>
								) : (
								<IconBox bg={inactiveBg} color="teal.300" h="30px" w="30px" me="12px" transition={variantChange}>
									{prop.icon}
								</IconBox>
								)}
								<Text color={inactiveColor} my="auto" fontSize="sm">
								{document.documentElement.dir === "rtl"
									? prop.rtlName
									: prop.name}
								</Text>
							</Flex>
						</Button>
					)}
				</NavLink>
			);
		});
	};

	const { logoText, routes, sidebarVariant } = props;

	var links = <>{createLinks(routes)}</>;
	
	const mainText = useColorModeValue("gray.700", "gray.200");
	let sidebarBg = "none";
	let sidebarRadius = "0px";
	let sidebarMargins = "0px";
	if (sidebarVariant === "opaque") {
		sidebarBg = useColorModeValue("white", "gray.700");
		sidebarRadius = "16px";
		sidebarMargins = "16px 0px 16px 16px";
	}
	var brand = (
		<Box pt={"25px"} mb="12px">
			<Link href={`${process.env.app_url}#/dashboard`} display="flex" lineHeight="100%" mb="30px" fontWeight="bold" justifyContent="center" alignItems="center" fontSize="11px">
				<Image src="/logo_appbar.png" w="50%"/>
			</Link>
			<Separator></Separator>
		</Box>
	);

	return (
		<Box ref={mainPanel}>
			<Box display={{ sm: "none", xl: "block" }} position="fixed">
				<Box bg={sidebarBg} transition={variantChange} w="260px" maxW="260px" ms={{sm: "16px"}} my={{sm: "16px"}}
					h="calc(100vh - 32px)" ps="20px" pe="20px" m={sidebarMargins} borderRadius={sidebarRadius}
				>
				<Box>{brand}</Box>
					<Stack direction="column" mb="40px">
						<Box>{links}</Box>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}

export function SidebarResponsive(props) {
    let location = useLocation();
	const [state, setState] = useState({});
	const mainPanel = useRef();
    
    let sidebarBg = "gray.100";
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
        }
    };

    useEffect(() => {
        if(location.pathname == "/admin/yayasan" ||
        (location.pathname == "/admin/petugas" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas")) ||
        (location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin")) ||
        (location.pathname == "/admin/ustadz") ||
        (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel"))) {
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
        
    }, []);

	const createLinks = (routes) => {
		const activeBg = useColorModeValue("white", "gray.700");
		const inactiveBg = useColorModeValue("white", "gray.700");
		// const activeColor = useColorModeValue("gray.700", "white");
		// const inactiveColor = useColorModeValue("gray.400", "gray.400");
		let activeColor = "#6a5aa3";
		let inactiveColor = "#6a5aa3";
		let greenColor = "#6a5aa3";
	};
	
	const { logoText, routes, ...rest } = props;
	var links = <>{createLinks(routes)}</>;
	const mainText = useColorModeValue("gray.700", "gray.200");
	let hamburgerColor = "white";
	if (props.secondary === true) {
		hamburgerColor = "white";
	}

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	return (
		<Flex pr="10px" display={{ sm: "flex", xl: "none" }} ref={mainPanel} alignItems="center">
			<HamburgerIcon color={hamburgerColor} w="18px" h="18px" ref={btnRef} colorScheme="teal" onClick={onOpen}/>
			<Drawer isOpen={isOpen} onClose={onClose} placement={document.documentElement.dir === "rtl"} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent
                    bgSize="cover"
                    bgPosition="100%"
                    w="250px" maxW="250px"
                    ms={{sm: "4px"}}
                    my={{sm: "4px"}}
                    borderRadius="3px"
                    // overflow={'none'}
                >
					<DrawerCloseButton color={purpleColor} _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }}/>
					<DrawerBody maxW="250px" px="10px" minH={'95%'}>
						<Box maxW="100%" h="100%">
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
                                                    size={'xs'}
                                                    variant='outline'
                                                    bg={ location.pathname == "/admin/dashboard" ? purpleColor : inactiveBg }
                                                    borderRadius={25}
                                                    color={ location.pathname == "/admin/dashboard" ? 'white' : inactiveColor }
                                                    borderWidth={0.5}
                                                    mr={2.5}
                                                    borderColor={ location.pathname == "/admin/dashboard" ? 'white' : inactiveColor }
                                                    icon={<FaHome/>}
                                                />
                                                <Text color={ location.pathname == "/admin/dashboard" ? activeColor : inactiveColor } my="auto" fontSize="xs">
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
                                                    size={'xs'}
                                                    variant='outline'
                                                    bg={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? purpleColor : inactiveBg }
                                                    borderRadius={25}
                                                    color={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? 'white' : inactiveColor }
                                                    borderWidth={0.5}
                                                    mr={2.5}
                                                    borderColor={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? 'white' : inactiveColor }
                                                    icon={<ImProfile/>}
                                                />
                                                <Text color={ location.pathname == "/admin/pengaturan" || location.pathname.includes("/pengaturan-rekening/detail-rekening") || location.pathname.includes("/pengaturan-rekening/tambah-rekening") ? activeColor : inactiveColor } my="auto" fontSize="xs">
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
                                            size={'xs'}
                                            variant='outline'
                                            bg={
                                                location.pathname == "/admin/yayasan" ||
                                                (location.pathname == "/admin/petugas" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas")) ||
                                                (location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin")) ||
                                                (location.pathname == "/admin/ustadz") ||
                                                (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel"))
                                                ? purpleColor : inactiveBg
                                            }
                                            borderRadius={25}
                                            color={
                                                location.pathname == "/admin/yayasan" ||
                                                (location.pathname == "/admin/petugas" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas")) ||
                                                (location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin")) ||
                                                (location.pathname == "/admin/ustadz") ||
                                                (location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel"))
                                                ? 'white' : inactiveColor
                                            }
                                            borderWidth={0.5}
                                            mr={2.5}
                                            borderColor={purpleColor}
                                            icon={<MdAdminPanelSettings/>}
                                        />
                                     
                                        <Text color={purpleColor} fontWeight="bold" fontSize={'xs'} type={'button'}>
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/yayasan" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/yayasan" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/yayasan" ? 'white' : inactiveColor }
                                                            icon={<GiFamilyHouse/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/yayasan" ? activeColor : inactiveColor } my="auto" fontSize="xs">
                                                            Yayasan
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/manajemen/pengurus">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/manajemen/pengurus" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas") ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/manajemen/pengurus" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas") ? activeBg : inactiveBg}
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/manajemen/pengurus" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas") ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/manajemen/pengurus" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas") ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/manajemen/pengurus" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas") ? 'white' : inactiveColor }
                                                            icon={<FaUsers/>}
                                                            transition={variantChange}
                                                        />
                                                        <Text color={ location.pathname == "/admin/manajemen/pengurus" || location.pathname.includes("tambah-petugas") || location.pathname.includes("detail-petugas") ? activeColor : inactiveColor } my="auto" fontSize="xs">
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? 'white' : inactiveColor }
                                                            icon={<FaRegCalendarAlt/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/event" || location.pathname.includes("tambah-event-rutin") ? activeColor : inactiveColor } my="auto" fontSize="xs">
                                                            Event
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/ustadz" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/ustadz" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/ustadz" ? 'white' : inactiveColor }
                                                            icon={<FaUserInjured/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/ustadz" ? activeColor : inactiveColor } my="auto" fontSize="xs">
                                                            Ustadz
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/manajemen/artikel">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel") ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel") ? activeBg : inactiveBg}
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel") ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel") ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel") ? 'white' : inactiveColor }
                                                            icon={<RiArticleFill/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/manajemen/artikel" || location.pathname.includes("detail-artikel") || location.pathname.includes("tambah-artikel") ? activeColor : inactiveColor } my="auto" fontSize="xs">
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
                                            size={'xs'}
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
                                     
                                        <Text color={purpleColor} fontWeight="bold" fontSize={'xs'} type={'button'}>
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/pelatihan" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/pelatihan" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/pelatihan" ? 'white' : inactiveColor }
                                                            icon={<GiTeacher/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/pelatihan" ? activeColor : inactiveColor } my="auto" fontSize="xs">
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
                                            size={'xs'}
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
                                     
                                        <Text color={purpleColor} fontWeight="bold" fontSize={'xs'} type={'button'}>
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? 'white' : inactiveColor }
                                                            icon={<FaPray/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/pengaturan-tv/sholat-lima-waktu" ? activeColor : inactiveColor } my="auto" fontSize="xs">
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? 'white' : inactiveColor }
                                                            icon={<FaMosque/>}
                                                        />
                                                        <Text color={ location.pathname == "/admin/pengaturan-tv/sholat-jumat" ? activeColor : inactiveColor } my="auto" fontSize="xs">
                                                            Sholat Jumat
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            </NavLink>
                                            <NavLink to="/admin/pengaturan-tv/konten-lainnya">
                                                <Button boxSize="initial"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    boxShadow={ (location.pathname == "/admin/pengaturan-tv/konten-lainnya" || location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" || location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")) ? sidebarActiveShadow :  sidebarInactiveShadow }
                                                    bg={ (location.pathname == "/admin/pengaturan-tv/konten-lainnya" || location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" || location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")) ? activeBg : inactiveBg}
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
                                                            size={'xs'}
                                                            variant='outline'
                                                            bg={ (location.pathname == "/admin/pengaturan-tv/konten-lainnya" || location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" || location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")) ? purpleColor : inactiveBg }
                                                            borderRadius={25}
                                                            color={ (location.pathname == "/admin/pengaturan-tv/konten-lainnya" || location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" || location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")) ? 'white' : inactiveColor }
                                                            borderWidth={0.5}
                                                            mr={2.5}
                                                            borderColor={ (location.pathname == "/admin/pengaturan-tv/konten-lainnya" || location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" || location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")) ? 'white' : inactiveColor }
                                                            icon={<FaTv/>}
                                                        />
                                                        <Text color={ (location.pathname == "/admin/pengaturan-tv/konten-lainnya" || location.pathname == "/admin/pengaturan-tv/tambah-konten-lainnya" || location.pathname.includes("/pengaturan-tv/edit-konten-lainnya")) ? activeColor : inactiveColor } my="auto" fontSize="xs">
                                                            Konten Lainnya
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
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}

Sidebar.propTypes = {
	logoText: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
	variant: PropTypes.string,
};
SidebarResponsive.propTypes = {
	logoText: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
};

export default Sidebar;