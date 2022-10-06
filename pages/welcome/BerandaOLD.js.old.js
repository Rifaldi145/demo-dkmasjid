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
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    List,
    ListItem,
    ListIcon,
    Drawer,
    AspectRatio,
    CloseButton,
    Fade
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
    FaCheck,
    FaRegCheckCircle,
} from "react-icons/fa";
import Iframe from 'react-iframe';

export default function Beranda() {
    
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })

    useEffect(() => {
        
    }, []);

    return (     
        <Flex position="relative" bg="white">
            <Fade in={isOpen}>
                <Drawer placement={'bottom'} isOpen={isOpen}>
                    <Flex maxW={{ sm: '90%', lg: '50%' }} flexDirection={'column'} justify={'center'} align={'center'} p={{ sm: 2, lg: 4 }} position={'fixed'} bottom={{ sm: 2, lg: 4 }} right={{ sm: 4, lg: 8 }} bg={'white'} boxShadow={'0 1px 8px 0 #c2c2c2'} borderRadius={'5px'}>
                        <CloseButton onClick={onClose} position={'absolute'} right={0} top={0} color={'black'} fontSize={{ sm: '2xs', lg: 'xs' }}/>
                        <Center>
                            <Flex position={'relative'} mt={{ sm:'-35px', lg: '-60px' }} className="logo_pfda_right">
                                <Image src="/baiti_logo.jpg" w={{ sm: '60px', lg: '90px' }} borderRadius="5px" boxShadow="0 1px 8px 0 #c2c2c2" />
                            </Flex>
                        </Center>
                        <Flex pb={{ sm: 1, lg: 4 }} pt={{ sm: 0, lg: 2 }}>
                            <Text color={'black'} fontSize={{ sm: "xs", lg: "sm" }} lineHeight={1.2} fontWeight={'normal'} textAlign="center">
                                Download Aplikasi Baiti Untuk Mendapatkan<br></br>
                                Benefit DKM MASJID
                            </Text>
                        </Flex>
                        <Links href={`${process.env.NEXT_PUBLIC_PLAYSTORE_BAITI}`} target="_blank" p={0} m={0}>
                            <Button colorScheme='white' size='sm' p={0} m={0}>
                                <Image src="/logo_gplay.png" w={{ sm: '80px', lg: '110px' }} borderRadius="5px" boxShadow="0 1px 8px 0 #c2c2c2" />
                            </Button>
                        </Links>
                    </Flex>
                </Drawer>
            </Fade>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                pt={{ base: "90px", lg: "100px" }}
                pr={{ sm: 4, lg: 8 }}
                pl={{ sm: 4, lg: 8 }}
            >
                <Flex direction="column" w="100%" h={'100%'}>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} w={'100%'} pb={{ sm: 4, lg: 8 }}>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="center" align="center">
                                <Image src="/DKM-02.png" h={'200px'}></Image>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={3} pl={{ sm: 0, lg: 10 }} pt={{ sm: 4, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="center" align="center">
                                <Center>
                                    <Stat>
                                        <StatLabel pb={4}>
                                            <Text textStyle='judul'>
                                                Anda Pengurus Masjid? Gunakan Aplikasi Baiti
                                            </Text>
                                        </StatLabel>
                                        <StatHelpText align="justify">
                                            <Text textStyle='isi'>
                                                Aplikasi yang Memudahkan pengurus masjid/DKM untuk mengelola dan menyiarkan informasi secara efektif melalui tampilan TV masjid.
                                                Dengan menggunakan BAITI, jadwal sholat, iqamah dan waktu syuruq yang akurat/realtime, 
                                                ibadah sholat di masjid dapat ditampilkan secara mudah dan tepat. Pengurus dapat dengan mudah menyebarkan pengumuman dan 
                                                informasi lainnya melalui ponsel pengurus masjid/DKM untuk ditampilkan di TV masjid serta terkirim ke ponsel jama&apos;ah melalui aplikasi GHIRAH.
                                            </Text>
                                        </StatHelpText>
                                    </Stat> 
                                </Center>    
                            </Flex>
                        </GridItem>
                    </Grid>
                    <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ sm: 4, lg: 8 }} pb={{ sm: 4, lg: 8 }}>
                        <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" _hover={{ bgColor:"#f7f7f7", color:"black" }}>
                            <Stat>
                                <StatLabel pb={2}>
                                    <Text textStyle='judul'>
                                        Benefit Baiti
                                    </Text>
                                </StatLabel>
                                <StatHelpText px={4} align="left">
                                    <List spacing={{ sm: 2, lg: 2 }}>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaCheck} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Pengaturan TV
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaCheck} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Petugas Masjid
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaCheck} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Artikel
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaCheck} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Urun Dana
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaCheck} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Qurban
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                    </List>
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" _hover={{ bgColor:"#f7f7f7", color:"black" }}>
                            <Stat>
                                <StatLabel pb={2}>
                                    <Text textStyle='judul'>
                                        Langkah-langkah gabung
                                    </Text>
                                </StatLabel>
                                <StatHelpText px={4} align="left">
                                    <List spacing={{ sm: 2, lg: 2 }}>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaRegCheckCircle} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Download Aplikasi Baiti
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaRegCheckCircle} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Lakukan Pendaftaran Menggunakan Email atau No HP DKM
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaRegCheckCircle} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Masukan Nama Masjid 
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%" h={'100%'}>
                                                <ListIcon as={FaRegCheckCircle} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Masukan Alamat Sesuai Masjid
                                                </Text>
                                            </Flex>
                                        </ListItem>
                                        <ListItem>
                                            <Flex direction="row" w="100%">
                                                <ListIcon as={FaRegCheckCircle} color='green.500' mt={0.5}/>
                                                <Text textStyle='isi'>
                                                    Atau Download Panduan Pendaftaraan Baiti Klik Panduan ini
                                                </Text>
                                                {/* <Badge variant='solid' h={'auto'} colorScheme='green' ml="1">
                                                    Panduan
                                                </Badge> */}
                                            </Flex>
                                        </ListItem>
                                    </List>
                                </StatHelpText>
                            </Stat>
                        </Box>
                    </SimpleGrid>
                    <div className="background-custom">
                        <Box borderBottom="2px solid #d7d7d7" pb={2}>
                            <Text textStyle={'judul'}>
                                Biaya Pemasangan (STB dan Lainnya)
                            </Text>
                        </Box>
                        <SimpleGrid columns={{ sm: 1, lg: 3 }} pt={{ sm: 2, lg: 4 }} spacing={5}>
                            <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" _hover={{ bgColor:"#f7f7f7",color:"black" }}>
                                <Stat>
                                    <StatLabel>
                                        <Text textStyle={'sub_judul'}>
                                            Alat STB dan Pemasangan
                                        </Text>
                                    </StatLabel>
                                    <StatNumber pt={1}>
                                        <Text textStyle={'sub_judul'}>
                                            Rp 1.000.000
                                        </Text>
                                    </StatNumber>
                                    <StatHelpText pt={1}>
                                        <Text textStyle={'isi'}>
                                            Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan 
                                            untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                                        </Text>
                                    </StatHelpText>
                                </Stat>
                            </Box>
                            <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" _hover={{ bgColor:"#f7f7f7",color:"black" }}>
                                <Stat>
                                    <StatLabel>
                                        <Text textStyle={'sub_judul'}>
                                            Alat STB dan Pemasangan
                                        </Text>
                                    </StatLabel>
                                    <StatNumber pt={1}>
                                        <Text textStyle={'sub_judul'}>
                                            Rp 1.000.000
                                        </Text>
                                    </StatNumber>
                                    <StatHelpText pt={1}>
                                        <Text textStyle={'isi'}>
                                            Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan 
                                            untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                                        </Text>
                                    </StatHelpText>
                                </Stat>
                            </Box>
                            <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" _hover={{ bgColor:"#f7f7f7",color:"black" }}>
                                <Stat>
                                    <StatLabel>
                                        <Text textStyle={'sub_judul'}>
                                            Alat STB dan Pemasangan
                                        </Text>
                                    </StatLabel>
                                    <StatNumber pt={1}>
                                        <Text textStyle={'sub_judul'}>
                                            Rp 1.000.000
                                        </Text>
                                    </StatNumber>
                                    <StatHelpText pt={1}>
                                        <Text textStyle={'isi'}>
                                            Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan 
                                            untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                                        </Text>
                                    </StatHelpText>
                                </Stat>
                            </Box>
                        </SimpleGrid>
                    </div>
                    <Box borderBottom="2px solid #d7d7d7" pt={{ sm: 6, lg: 10 }}>
                        <Text pb={4} textStyle={'judul'}>
                            Masjid yang sudah terdaftar
                        </Text>
                    </Box>
                    <SimpleGrid columns={{ sm: 1, lg: 3 }} pt={4} gap={{ sm: 4, lg: 8 }} pb={{ sm: 4, lg: 8 }}>
                        <Flex flexDirection={'column'} w={'100%'} bg={'white'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                            <AspectRatio w={'100%'} ratio={16/7}>
                                <Image h={'full'} w={'full'}
                                    src="./masjid.png"
                                    objectFit={'cover'}
                                />
                            </AspectRatio>
                            <Flex p={{ sm: 2, lg: 4 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                <Center pb={{ sm: 1, lg: 2 }}>
                                    <Text textStyle={'sub_judul'} textAlign="center">
                                        Masjid As Sa&apos;aadah
                                    </Text>
                                </Center>
                                <Center pb={{ sm: 2, lg: 4 }}>
                                    <Text textStyle={'isi'} noOfLines={2} overflow={"hidden"} textAlign="center">
                                        Masjid As Sa&apos;aadah Pondok Safari Indah, Jalan Kaca Piring Pondok Safari Indah, Jurang Mangu Barat, Kota Tangerang Selatan, Banten, Indonesia
                                    </Text>
                                </Center>
                                <Center pb={{ sm: 1, lg: 2 }}>
                                    <Text textStyle={'sub_judul'} textAlign="center">
                                        58
                                    </Text>
                                </Center>
                                <Center>
                                    <Text textStyle={'isi'} textAlign="center">
                                        Pengikut
                                    </Text>
                                </Center>
                            </Flex>
                        </Flex>
                        <Flex flexDirection={'column'} w={'100%'} bg={'white'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                            <AspectRatio w={'100%'} ratio={16/7}>
                                <Image h={'full'} w={'full'}
                                    src="./masjid.png"
                                    objectFit={'cover'}
                                />
                            </AspectRatio>
                            <Flex p={{ sm: 2, lg: 4 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                <Center pb={{ sm: 1, lg: 2 }}>
                                    <Text textStyle={'sub_judul'} textAlign="center">
                                        Masjid Darussalam Kota Wisata
                                    </Text>
                                </Center>
                                <Center pb={{ sm: 2, lg: 4 }}>
                                    <Text textStyle={'isi'} noOfLines={2} overflow={"hidden"} textAlign="center">
                                        Jl. Wisata Utama No. 1, Ciangsana, Kec. Gunung Putri, Kab. Bogor, Jawa Barat.
                                    </Text>
                                </Center>
                                <Center pb={{ sm: 1, lg: 2 }}>
                                    <Text textStyle={'sub_judul'} textAlign="center">
                                        118
                                    </Text>
                                </Center>
                                <Center>
                                    <Text textStyle={'isi'} textAlign="center">
                                        Pengikut
                                    </Text>
                                </Center>
                            </Flex>
                        </Flex>
                        <Flex flexDirection={'column'} w={'100%'} bg={'white'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                            <AspectRatio w={'100%'} ratio={16/7}>
                                <Image h={'full'} w={'full'}
                                    src="./masjid.png"
                                    objectFit={'cover'}
                                />
                            </AspectRatio>
                            <Flex p={{ sm: 2, lg: 4 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                <Center pb={{ sm: 1, lg: 2 }}>
                                    <Text textStyle={'sub_judul'} textAlign="center">
                                        Masjid Al I&apos;tisham
                                    </Text>
                                </Center>
                                <Center pb={{ sm: 2, lg: 4 }}>
                                    <Text textStyle={'isi'} noOfLines={2} overflow={"hidden"} textAlign="center">
                                        Al-I&apos;tisham, RT.01/RW.18, Menteng, Bogor Barat, Kota Bogor, Jawa Barat, Indonesia
                                    </Text>
                                </Center>
                                <Center pb={{ sm: 1, lg: 2 }}>
                                    <Text textStyle={'sub_judul'} textAlign="center">
                                        16
                                    </Text>
                                </Center>
                                <Center>
                                    <Text textStyle={'isi'} textAlign="center">
                                        Pengikut
                                    </Text>
                                </Center>
                            </Flex>
                        </Flex>
                    </SimpleGrid>
                    <Center>
                        <Link to={`/masjid-terdekat`}>
                            <Button variant={'normal'}>
                                Lihat Semua Masjid
                            </Button>
                        </Link>
                    </Center>
                    <Box borderBottom="2px solid #d7d7d7" pt={{ sm: 6, lg: 10 }}>
                        <Text pb={4} textStyle={'judul'}>
                            Video
                        </Text>
                    </Box>
                    <SimpleGrid columns={{ sm: 1, lg: 4 }} pt={4} gap={{ sm: 4, lg: 4 }}>
                        <Flex flexDirection={'column'} w={'100%'} bg={'white'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                            <Flex flexDirection={'column'} w={'100%'} h={'100%'} p={2} borderRadius={'5px'}>
                                <AspectRatio w={'100%'} ratio={16/9} borderRadius={'5px'}>
                                    <Iframe
                                        title='Ghirah'
                                        src='https://www.youtube.com/embed/fVxLbW8zyew'
                                        allowFullScreen
                                    />
                                </AspectRatio>
                            </Flex>
                            <Flex p={{ sm: 2, lg: 4 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                <Text textStyle={'isi'} textAlign={'left'}>
                                    Renungkan! Kita semua pasti akan meninggal dunia
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex flexDirection={'column'} w={'100%'} bg={'white'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                            <Flex flexDirection={'column'} w={'100%'} h={'100%'} p={2} borderRadius={'5px'}>
                                <AspectRatio w={'100%'} ratio={16/9} borderRadius={'5px'}>
                                    <Iframe
                                        title='Ghirah'
                                        src='https://www.youtube.com/embed/fVxLbW8zyew'
                                        allowFullScreen
                                    />
                                </AspectRatio>
                            </Flex>
                            <Flex p={{ sm: 2, lg: 4 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                <Text textStyle={'isi'} textAlign={'left'}>
                                    Renungkan! Kita semua pasti akan meninggal dunia
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex flexDirection={'column'} w={'100%'} bg={'white'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                            <Flex flexDirection={'column'} w={'100%'} h={'100%'} p={2} borderRadius={'5px'}>
                                <AspectRatio w={'100%'} ratio={16/9} borderRadius={'5px'}>
                                    <Iframe
                                        title='Ghirah'
                                        src='https://www.youtube.com/embed/fVxLbW8zyew'
                                        allowFullScreen
                                    />
                                </AspectRatio>
                            </Flex>
                            <Flex p={{ sm: 2, lg: 4 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                <Text textStyle={'isi'} textAlign={'left'}>
                                    Renungkan! Kita semua pasti akan meninggal dunia
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex flexDirection={'column'} w={'100%'} bg={'white'} border='1px' borderColor='gray.200' rounded={'md'} overflow={'hidden'}>
                            <Flex flexDirection={'column'} w={'100%'} h={'100%'} p={2} borderRadius={'5px'}>
                                <AspectRatio w={'100%'} ratio={16/9} borderRadius={'5px'}>
                                    <Iframe
                                        title='Ghirah'
                                        src='https://www.youtube.com/embed/fVxLbW8zyew'
                                        allowFullScreen
                                    />
                                </AspectRatio>
                            </Flex>
                            <Flex p={{ sm: 2, lg: 4 }} flexDirection={'column'} w={'100%'} h={'100%'}>
                                <Text textStyle={'isi'} textAlign={'left'}>
                                    Renungkan! Kita semua pasti akan meninggal dunia
                                </Text>
                            </Flex>
                        </Flex>
                    </SimpleGrid>
                    <Box borderBottom="2px solid #d7d7d7" pt={{ sm: 6, lg: 10 }}>
                        <Text pb={4} textStyle={'judul'}>
                            Fitur Aplikasi Baiti Secara Garis Besar
                        </Text>
                    </Box>
                    <SimpleGrid columns={{ sm: 1, lg: 3 }} pt={4} gap={{ sm: 4, lg: 8 }} pb={{ sm: 4, lg: 8 }}>
                        <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" bg="purple2.soft" color="white">
                            <Stat color={'white'}>
                                <StatLabel pb={2}>
                                    <Text textStyle={'judul'} color={'white'}>
                                        Pengaturan TV
                                    </Text>
                                </StatLabel>
                                <StatHelpText>
                                    <Text textStyle={'isi'} color={'white'}>
                                        Menampilkan informasi seperti jadwal shalat, jeda iqamah, banner kegiatan, 
                                        laporan keuangan, jadwal kegiatan berupa teks, gambar dan video.
                                    </Text>
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" bg="purple2.soft" color="white">
                            <Stat color={'white'}>
                                <StatLabel pb={2}>
                                    <Text textStyle={'judul'} color={'white'}>
                                        Petugas Masjid
                                    </Text>
                                </StatLabel>
                                <StatHelpText>
                                    <Text textStyle={'isi'} color={'white'}>
                                        Membantu pembagian tugas pengurus masjid/DKM agar program masjid dapat terlaksana sesuai dengan yang diinginkan.
                                    </Text>
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px" bg="purple2.soft" color="white">
                            <Stat color={'white'}>
                                <StatLabel pb={2}>
                                    <Text textStyle={'judul'} color={'white'}>
                                        Artikel
                                    </Text>
                                </StatLabel>
                                <StatHelpText>
                                    <Text textStyle={'isi'} color={'white'}>
                                        Menyampaikan tulisan-tulisan serta pesan yang bermanfaat untuk jamaah
                                    </Text>
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px">
                            <Stat color={'white'}>
                                <StatLabel pb={2}>
                                    <Text textStyle={'judul'}>
                                        Urun Dana
                                    </Text>
                                </StatLabel>
                                <StatHelpText>
                                    <Text textStyle={'isi'}>
                                        Dengan aplikasi Baiti, Masjid dapat dengan mudah dan cepat menginformasikan program-program 
                                        pembangunan yang membutuhkan biaya melalui urun dana yang langsung terkirim ke ponsel jama&apos;ah. 
                                        Usulan serta saran dari jama&apos;ah juga dapat diterima pengurus masjid dengan mudah melalui aplikasi GHIRAH.
                                    </Text>
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box border="1px solid rgba(0, 0, 0, 0.125)" p={{ sm: 4, lg: 8 }} borderRadius="5px">
                            <Stat color={'white'}>
                                <StatLabel pb={2}>
                                    <Text textStyle={'judul'}>
                                        Qurban
                                    </Text>
                                </StatLabel>
                                <StatHelpText>
                                    <Text textStyle={'isi'}>
                                        Baiti menyediakan solusi berqurban dengan mudah dan terpantau mulai dari pembelian hewan qurban 
                                        hingga pendistribusian paket qurban. Jama&apos;ah yang berqurban (muqorib)
                                        pun dapat memantau status hewan qurbannya dari rumah melalui ponsel, 
                                        sehingga dapat hadir pada saat hewan siap disembelih.
                                    </Text>
                                </StatHelpText>
                            </Stat>
                        </Box>
                    </SimpleGrid>
                </Flex>
            </Flex>
        </Flex>
    );
}