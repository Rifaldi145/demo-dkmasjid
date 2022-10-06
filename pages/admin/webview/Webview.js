import React, { useState, useEffect } from "react";
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Text,
    Tr,
    Td,
    Th,
    useColorModeValue,
    Button,
    Center,
    Icon,
    InputGroup,
    Input,
    Box,
    Image,
    Select,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import Loader from 'react-loader-spinner';
import {
    FaSearch
} from "react-icons/fa";
import axios from 'axios';

function Webview() {
    const [width, setWidth] = useState(window.innerWidth);

    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const [dataWebview, setDataWebview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);

    let inputBg = useColorModeValue("white", "gray.800");
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let mainText = useColorModeValue("gray.700", "gray.200");
    const nameColor = useColorModeValue("gray.500", "white");
    const bgColor = useColorModeValue("#F8F9FA", "gray.800");
    const textColor = useColorModeValue("gray.700", "white");

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        loadData();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    async function loadData() {
        setLoading(true);
        setErrorLoading(null);
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/webview/index`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            
        }).then(async (res) => {
            console.log("dataWebview", res.data.webview);
            setLoading(false);
            setDataWebview(res.data.webview);
        }, (error) => {
            setLoading(false);
            if(error.response) {
                console.log("error.response", error.response.data);
                setErrorLoading(JSON.stringify(error.response.data));
            } else {
                console.log("error.message", error.message);
                setErrorLoading(JSON.stringify(error.message));
            }
        });
    }

    return (
        <Flex direction="column" pt={{ base: "120px", md: "85px" }}>
            {
                loading ?
                    <Loader type="Circles" color="#00BFFF" height={50} width={50} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
                :
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                        <Box p="16px" bg={bgColor} borderRadius="10px">
                            <Flex direction={{ sm: 'column', lg: 'row' }} justify="space-between" align="center" minWidth="100%" flexWrap="nowrap">
                                <Flex direction="row" align="center" w="100%">
                                </Flex>
                                <Link align="right" to={`/admin/pengaturan-tv/tambah-konten-lainnya`}>
                                    <Button
                                        size={{ lg: 'md', sm: 'sm' }}
                                        fontSize={{ lg: 'sm', md: 'sm', sm: 'xs' }}
                                        bg="#6a5aa3"
                                        color="white"
                                        _hover={{ bg: "gray.200", color: "#6a5aa3" }}
                                    >
                                        Tambah Konten Lainnya
                                    </Button>
                                </Link>
                            </Flex>
                        </Box>
                        <CardBody>
                            <Table direction="column" rounded="md" mt="10px">
                                <Thead bg="#6a5aa3">
                                    <Tr>
                                        <Th w="10%" style={{ borderRight: '1px solid white' }} color="white" textAlign="center" borderTopLeftRadius="8px">Urut</Th>
                                        <Th style={{ borderRight: '1px solid white' }} color="white" textAlign="center">Url</Th>
                                        <Th w="15%" style={{ borderRight: '1px solid white' }} color="white" textAlign="center">Durasi Slide (Detik)</Th>
                                        <Th w="15%" style={{ borderRight: '1px solid white' }} color="white" textAlign="center">Durasi Tayang (Hari)</Th>
                                        <Th w="10%" color="white" textAlign="center" borderTopRightRadius="8px"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody border="1px" borderColor="gray.200" borderRadius="0px" borderBottomRadius="8px">
                                    {dataWebview.map(function(rows, i) {
                                        return (
                                            <Tr key={i} style={{ cursor: 'pointer' }}>
                                                <Td fontSize="sm" textAlign="center">
                                                    <Text fontSize="sm" color={nameColor} fontWeight="normal">
                                                        { rows.urut }
                                                    </Text>
                                                </Td>
                                                <Td fontSize="sm" textAlign="left">
                                                    <Text fontSize="sm" color={nameColor} fontWeight="normal">
                                                        { rows.url }
                                                    </Text>
                                                </Td>
                                                <Td fontSize="sm" textAlign="center">
                                                    <Text fontSize="sm" color={nameColor} fontWeight="normal">
                                                        { rows.durasi_slide }
                                                    </Text>
                                                </Td>
                                                <Td fontSize="sm" textAlign="center">
                                                    <Text fontSize="sm" color={nameColor} fontWeight="normal">
                                                        { rows.durasi_tayang != null ? rows.durasi_tayang : '-' }
                                                    </Text>
                                                </Td>
                                                <Td textAlign="center">
                                                    <Link style={{ marginLeft: '5px' }} to={`/admin/detail-webview/${rows.id}`}>
                                                        <Button
                                                            p="0px" 
                                                            bg="gray.200"
                                                            borderRadius="8px"
                                                            size="sm"
                                                            fontSize="sm"
                                                            _hover={{ bg: "gray.200" }}
                                                        >
                                                            <Flex p="10px" align="right" py="10px" cursor="pointer">
                                                                <Text color="#6a5aa3" fontWeight="bold">
                                                                    Detail
                                                                </Text>
                                                            </Flex>
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        );
                                        })}
                                </Tbody>
                            </Table>
                        </CardBody>
                    </Card>
            }
        </Flex>
    );
}

export default Webview;
