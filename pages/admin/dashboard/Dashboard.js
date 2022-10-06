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
    Box,
    Alert,
    AlertIcon,
    SimpleGrid
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import Loader from 'react-loader-spinner';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
    PointElement,
    LineElement
);

export default function Dashboard() {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(null);

    const [dataDashboard, setDataDashboard] = useState(null);

    const textColor = useColorModeValue("gray.600", "white");

    const data = {
        labels: [
            'Januari',
            'Febuari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus'
        ],
        datasets: [{
            label: 'Stastitik data setahun',
            data: [300, 50, 100,10,20,120,300,150],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FFF',
                '#000',
                '#6a5aa3',
                '#3a03ff',
                '#2fff7e'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FFF',
                '#000',
                '#6a5aa3',
                '#3a03ff',
                '#2fff7e'
            ]
        }]
    };

    useEffect(() => {
        
    }, []);

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
                            <SimpleGrid columns={{ sm: 1, lg: 3 }} mt="2" spacing={5}>
                                <Box
                                    border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                    _hover={{ bgColor:"#f7f7f7",color:"black" }}
                                >
                                    <Center>
                                        <Text fontSize={{ sm: "15pt", lg: "13pt" }} fontWeight="bold" mb="5">Diagram Event Pertahun</Text>
                                    </Center>
                                    <Bar
                                        data={data}
                                        width={400}
                                        height={400}
                                    />

                                </Box>  

                                <Box
                                    border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                    _hover={{ bgColor:"#f7f7f7",color:"black" }}
                                >
                                    <Center>
                                        <Text fontSize={{ sm: "15pt", lg: "13pt" }} fontWeight="bold" mb="5">Diagram Artikel Pertahun</Text>
                                    </Center>
                                    <Bar
                                        data={data}
                                        width={400}
                                        height={400}
                                    />
                                </Box> 
                                <Box border="1px solid rgba(0, 0, 0, 0.125)" p="10" borderRadius="5px"  
                                    _hover={{ bgColor:"#f7f7f7",color:"black" }}
                                >
                                    <Center>
                                        <Text fontSize={{ sm: "15pt", lg: "13pt" }} fontWeight="bold" mb="5">Diagram Artikel Pertahun</Text>
                                    </Center>

                                    <Bar
                                        data={data}
                                        width={400}
                                        height={400}
                                    />
                                </Box> 
                            </SimpleGrid>
                        </Flex>
                    </Card>
                }
                </Flex>
            </Center>
        </Flex>
    );
}