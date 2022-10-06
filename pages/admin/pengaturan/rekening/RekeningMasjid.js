/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    useColorModeValue,
    chakra,
    Grid,
    GridItem,
    Center,
    CloseButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
} from "@chakra-ui/react";
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";
import {
    MdModeEdit
} from "react-icons/md";
import { Link } from "react-router-dom";

export default function RekeningMasjid(props) {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const notifyHapusRekeningMasjid = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissHapusRekeningMasjid = useCallback(() => {
        toast.dismiss();
    }, []);

    const [rekeningMasjid, setRekeningMasjid] = useState([]);

    const [openDialogHapusRekeningMasjid, setOpenDialogHapusRekeningMasjid] = useState(false);
    const [idHapusRekeningMasjid, setIdHapusRekeningMasjid] = useState(null);
    const [isLoadingHapusRekeningMasjid, setIsLoadingHapusRekeningMasjid] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
        if(!props.loading && props.errorLoading == null) {
            if(props.dataMasjid.profile != null) {
                setRekeningMasjid(props.dataMasjid.profile.m_mosque_reks);
            }
        }
    }, []);

    const hapusRekeningMasjid = async (event) => {
        event.preventDefault();
        setIsLoadingHapusRekeningMasjid(true);
        try {
            var postData = {
                id: JSON.stringify([idHapusRekeningMasjid]),
            };
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/rekening/hapus`,
                headers: {
                    "Content-Type": `application/json`,
                    "Accept": `application/json`,
                    "Authorization": `Bearer ${token}`
                },
                data: postData
            }).then(async (res) => {
                props.setCallbackTab(res.data.tab);
                if(res.data.success) {
                    showSucessHapusRekeningMasjid(res.data.message);
                    props.loadData();
                } else {
                    showErrorHapusRekeningMasjid(res.data.message);
                }
                setIsLoadingHapusRekeningMasjid(false);
            });
        } catch (err) {
            console.log("err", err);
            setIsLoadingHapusRekeningMasjid(false);
            if(err.response.data != null) {
                showErrorHapusRekeningMasjid(err.response.data.message);
            } else {
                showErrorHapusRekeningMasjid(JSON.stringify(err.response));
            }
        }
    }

    function showSucessHapusRekeningMasjid(message) {
        setIdHapusRekeningMasjid(null);
        setOpenDialogHapusRekeningMasjid(false);
        notifyHapusRekeningMasjid("success", message);
    }
    function showErrorHapusRekeningMasjid(message) {
        setIdHapusRekeningMasjid(null);
        setOpenDialogHapusRekeningMasjid(false);
        notifyHapusRekeningMasjid("error", message);
    }

    return (
        <Flex flexDirection="column" w={'100%'}>
            <Center>
                <Flex justify="space-between" align="center" pt={4} w="100%">
                    <Flex></Flex>
                    <Link to={`/admin/pengaturan-rekening/tambah-rekening`}>
                        <Button
                            type="button"
                            size={{ sm: 'sm', lg: 'sm' }}
                            fontSize={{ sm: 'xs', lg: 'sm' }}
                            bg="#6a5aa3"
                            color="white"
                            _hover={{ bg: "#B3A5DA", color: textColor }}
                        >
                            Tambah Rekening
                        </Button>
                    </Link>
                </Flex>
            </Center>
            <Box pb={4} pt={4}>
                <Separator></Separator>
            </Box>
            <Grid templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)'}}>
                {rekeningMasjid.map(function(rekening, i) {
                    return (
                        <GridItem key={i} colSpan={1} p={1}>
                            <Box boxShadow='base' borderRadius={{ sm: '5px', lg: '5px' }} bg={'gray.100'} p={{ sm: 2, lg: 4 }}>
                                <Flex flexDirection="column" w={'100%'} position={'relative'}>
                                    <Flex
                                        top={0}
                                        right={0}
                                        position={'absolute'}
                                        m={1.5}
                                        size={'xs'}
                                    >
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
                                                <Link to={`/admin/pengaturan-rekening/detail-rekening/${rekening.uid}`}>
                                                    <MenuItem fontSize={{ sm: '2xs', lg: 'xs' }}>
                                                        Edit
                                                    </MenuItem>
                                                </Link>
                                                <MenuItem
                                                    fontSize={{ sm: '2xs', lg: 'xs' }}
                                                    onClick={() => {
                                                        setIdHapusRekeningMasjid(rekening.id);
                                                        setOpenDialogHapusRekeningMasjid(true);
                                                    }}
                                                >Hapus</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Flex>
                                    <Flex flexDirection="column" w={'100%'}>
                                        <Text pb={1} color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'bold'}>
                                            {rekening.nama_bank}
                                        </Text>
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                            {rekening.no_rek}
                                        </Text>
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                            {rekening.nama_rek}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </GridItem>
                    );
                })}
            </Grid>
            <Modal closeOnOverlayClick={false} isCentered size={'xs'} isOpen={openDialogHapusRekeningMasjid}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <chakra.form onSubmit={hapusRekeningMasjid}>
                    <ModalContent ml={{ sm: 4, lg: 0 }} mr={{ sm: 4, lg: 0 }} padding={0} margin={0}>
                        <ModalHeader size="xs" borderTopRadius={{ sm: '5px', lg: '5px' }} p={{ sm: 2, lg: 3 }}>
                            <Flex justify="space-between" align="center">
                                <Text fontSize={{ sm: 'xs', lg: 'sm' }} color={textColor} fontWeight={'bold'}>
                                    Hapus Rekening Masjid?
                                </Text>
                                <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => {
                                    setIdHapusRekeningMasjid(null);
                                    setOpenDialogHapusRekeningMasjid(false);
                                }}/>
                            </Flex>
                        </ModalHeader>
                        <ModalFooter size="xs" borderBottomRadius={{ sm: '5px', lg: '5px' }} pb={{ sm: 1, lg: 2 }} p={{ sm: 2, lg: 3 }}>
                            <Flex justify="space-between" align="end">
                                <Button
                                    isLoading={isLoadingHapusRekeningMasjid}
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