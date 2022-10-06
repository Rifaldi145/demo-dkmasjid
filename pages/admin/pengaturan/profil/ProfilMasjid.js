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
    FormControl,
    Input,
    chakra,
    Grid,
    GridItem,
    Center,
    Tooltip,
    Image,
    AspectRatio,
    Textarea,
    Stack
} from "@chakra-ui/react";
import { Separator } from "../../../../theme/components/Separator/Separator";
import axios from 'axios';
import toast from "../../../../components/Toast";
import {
    Select
} from "chakra-react-select";
import {
    FaMosque,
} from "react-icons/fa";
import Card from "../../../components/Card/Card.js";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export default function ProfilMasjid(props) {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const notifyProfilMasjid = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    
    const dismissProfilMasjid = useCallback(() => {
        toast.dismiss();
    }, []);

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLng, setCurrentLng] = useState(null);

    const autoCompleteRef = useRef();
    const alamatRef = useRef();

    const options = {
        fields: ["address_components", "formatted_address", "geometry", "icon", "name"],
        types: ["establishment"]
    };
    const [listKota, setListKota] = useState([]);

    const [openErrorNamaMasjid, setOpenErrorNamaMasjid] = useState(false);
    const [namaMasjid, setNamaMasjid] = useState("");

    const [openErrorKotaMasjid, setOpenErrorKotaMasjid] = useState(false);
    const [kotaMasjid, setKotaMasjid] = useState(null);

    const [openErrorAlamatMasjid, setOpenErrorAlamatMasjid] = useState(false);
    const [alamatMasjid, setAlamatMasjid] = useState("");

    const [openErrorLatMasjid, setOpenErrorLatMasjid] = useState(false);
    const [latMasjid, setLatMasjid] = useState("");

    const [openErrorLngMasjid, setOpenErrorLngMasjid] = useState(false);
    const [lngMasjid, setLngMasjid] = useState("");

    const [deskripsiMasjid, setDeskripsiMasjid] = useState("");
    const [badanHukumMasjid, setBadanHukumMasjid] = useState(null);
    const [luasTanahMasjid, setLuasTanahMasjid] = useState("");
    const [luasBangunanMasjid, setLuasBangunanMasjid] = useState("");
    const [jumlahLantaiMasjid, setJumlahLantaiMasjid] = useState("");
    const [kapasitasJamaah, setKapasitasJamaah] = useState("");
    const [dayaListrik, setDayaListrik] = useState("");

    const photoMasjidRef = useRef(null);
    const [filePhotoMasjid, setFilePhotoMasjid] = useState(null);
    const [photoMasjid, setPhotoMasjid] = useState(null);
    
    const [isLoadingSimpanProfilMasjid, setIsLoadingSimpanProfilMasjid] = useState(false);

    const textColor = useColorModeValue("gray.600", "white");

    const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
      
        if(script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
                }
            };
        } else {
            script.onload = () => callback();
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function handleScriptLoad(autoCompleteRef) {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            alamatRef.current,
            options,
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            setAlamatMasjid(place.formatted_address);
            let coords = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
            setLatMasjid(coords.lat);
            setLngMasjid(coords.lng);
        });
    }

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyAjDSV-6RaUaptCIl_NNKAZ5XQO_Geo_pE&libraries=places`,
            () => handleScriptLoad(autoCompleteRef)
        );
        if(!props.loading && props.errorLoading == null) {
            if(props.dataMasjid.profile != null) {
                if(props.dataMasjid.profile.name != null) {
                    setNamaMasjid(props.dataMasjid.profile.name);
                }
                if(props.dataMasjid.profile.city_char != null) {
                    const res = props.dataMasjid.kota.filter(val => val.id === props.dataMasjid.profile.city_char);
                    setKotaMasjid({
                        label: res[0].lokasi,
                        value: props.dataMasjid.profile.city_char,
                    });
                }
                if(props.dataMasjid.profile.address != null) {
                    setAlamatMasjid(props.dataMasjid.profile.address);
                }
                if(props.dataMasjid.profile.latitude != null) {
                    setLatMasjid(props.dataMasjid.profile.latitude);
                }
                if(props.dataMasjid.profile.longitude != null) {
                    setLngMasjid(props.dataMasjid.profile.longitude);
                }
                if(props.dataMasjid.profile.description != null) {
                    setDeskripsiMasjid(props.dataMasjid.profile.description);
                }
                if(props.dataMasjid.profile.badan_hukum != null) {
                    setBadanHukumMasjid({
                        label: props.dataMasjid.profile.badan_hukum,
                        value: props.dataMasjid.profile.badan_hukum,
                    });
                }
                if(props.dataMasjid.profile.luas_tanah != null) {
                    setLuasTanahMasjid(props.dataMasjid.profile.luas_tanah);
                }
                if(props.dataMasjid.profile.luas_bangunan != null) {
                    setLuasBangunanMasjid(props.dataMasjid.profile.luas_bangunan);
                }
                if(props.dataMasjid.profile.jumlah_lantai != null) {
                    setJumlahLantaiMasjid(props.dataMasjid.profile.jumlah_lantai);
                }
                if(props.dataMasjid.profile.kapasitas_jamaah != null) {
                    setKapasitasJamaah(props.dataMasjid.profile.kapasitas_jamaah);
                }
                if(props.dataMasjid.profile.photo != null) {
                    setPhotoMasjid(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + props.dataMasjid.profile.photo.replace("public", "storage"));
                }
                if(props.dataMasjid.profile.daya_listrik != null) {
                    setDayaListrik(props.dataMasjid.profile.daya_listrik);
                }
            }
            setListKota(props.dataMasjid.kota);
            getCurrentLocation();
        }
    }, []);

    async function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(async function(position) {
            setCurrentLat(position.coords.latitude);
            setCurrentLng(position.coords.longitude);
        });
    }

    async function handleChangeBadanHukum(selectedOptions) {
        setBadanHukumMasjid(selectedOptions);
    }

    async function handleChangeKota(selectedOptions) {
        setKotaMasjid(selectedOptions);
    }

    const submitSimpanProfilMasjid = async (event) => {
        event.preventDefault();
        setOpenErrorNamaMasjid(false);
        setOpenErrorKotaMasjid(false);
        setOpenErrorAlamatMasjid(false);
        setOpenErrorLatMasjid(false);
        setOpenErrorLngMasjid(false);

        var lanjut = true;
        if(namaMasjid == null || namaMasjid == "") {
            setOpenErrorNamaMasjid(true);
            lanjut = false;
        }
        if(kotaMasjid.value == null || kotaMasjid.value == "") {
            setOpenErrorKotaMasjid(true);
            lanjut = false;
        }
        if(alamatMasjid == null || alamatMasjid == "") {
            setOpenErrorAlamatMasjid(true);
            lanjut = false;
        }
        if(latMasjid == null || latMasjid == "") {
            setOpenErrorLatMasjid(true);
            lanjut = false;
        }
        if(lngMasjid == null || lngMasjid == "") {
            setOpenErrorLngMasjid(true);
            lanjut = false;
        }

        if(lanjut) {
            setIsLoadingSimpanProfilMasjid(true);
            try {
                var formData = new FormData();
                formData.append('name', namaMasjid);
                formData.append("address", alamatMasjid);
                formData.append("latitude", latMasjid);
                formData.append("longitude", lngMasjid);
                formData.append("city", kotaMasjid.value);
                
                if(deskripsiMasjid != "" && deskripsiMasjid != null) {
                    formData.append("description", deskripsiMasjid);
                }
                if(badanHukumMasjid.value != "" && badanHukumMasjid.value != null) {
                    formData.append("badan_hukum", badanHukumMasjid.value);
                }
                if(luasTanahMasjid != "" && luasTanahMasjid != null && luasTanahMasjid != 0) {
                    formData.append("luas_tanah", luasTanahMasjid);
                }
                if(luasBangunanMasjid != "" && luasBangunanMasjid != null && luasBangunanMasjid != 0) {
                    formData.append("luas_bangunan", luasBangunanMasjid);
                }
                if(jumlahLantaiMasjid != "" && jumlahLantaiMasjid != null && jumlahLantaiMasjid != 0) {
                    formData.append("jumlah_lantai", jumlahLantaiMasjid);
                }
                if(kapasitasJamaah != "" && kapasitasJamaah != null && kapasitasJamaah != 0) {
                    formData.append("kapasitas_jamaah", kapasitasJamaah);
                }
                if(dayaListrik != "" && dayaListrik != null) {
                    formData.append("daya_listrik", dayaListrik);
                }
                formData.append("photo", filePhotoMasjid);
    
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/profil-masjid/simpan`,
                    headers: {
                        "Content-Type": `multipart/form-data`,
                        "Accept": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    data: formData
                }).then(async (res) => {
                    props.setCallbackTab(res.data.tab);
                    if(res.data.success) {
                        showSucessProfilMasjid(res.data.message);
                        props.loadData();
                    } else {
                        showErrorProfilMasjid(res.data.message);
                    }
                    setIsLoadingSimpanProfilMasjid(false);
                });
            } catch (err) {
                console.log("err", err);
                setIsLoadingSimpanProfilMasjid(false);
                if(err.response.data != null) {
                    showErrorProfilMasjid(err.response.data.message);
                } else {
                    showErrorProfilMasjid(JSON.stringify(err.response));
                }
            }
        }
        
    };
    
    function showSucessProfilMasjid(message) {
        notifyProfilMasjid("success", message);
    }
    
    function showErrorProfilMasjid(message) {
        notifyProfilMasjid("error", message);
    }

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: parseFloat(latMasjid), lng: parseFloat(lngMasjid) }}
            center={{ lat: parseFloat(latMasjid), lng: parseFloat(lngMasjid) }}
        >
            <Marker
                draggable={true}
                onDragEnd={(e) => {
                    let coords = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    }
                    setLatMasjid(coords.lat);
                    setLngMasjid(coords.lng);
                }}
                name={`${namaMasjid}`}
                position={{ lat: parseFloat(latMasjid), lng: parseFloat(lngMasjid) }}
                icon={{
                    url: '/marker_mosque.png',
                    anchor: new google.maps.Point(17, 46),
                    scaledSize: new google.maps.Size(75, 75)
                }}
            />
            {/* <Marker position={{ lat: parseFloat(latMasjid), lng: parseFloat(lngMasjid) }} /> */}
        </GoogleMap>
    ))

    const chakraStyles = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            background: '#B3A5DA',
            p: { sm: 2, lg: 4 },
            fontSize: { sm: 'xs', lg: 'sm' },
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
        }),
        menuList: (provided, state) => ({
            ...provided,
            fontSize: { sm: 'xs', lg: 'sm' },
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: { sm: 'xs', lg: 'sm' },
            bgColor: state.isSelected ? '#B3A5DA' : 'white',
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
        }),
        control: (provided, state) => ({
            ...provided,
            fontSize: { sm: 'xs', lg: 'sm' },
            color: textColor,
            fontWeight:'medium',
            size: { sm: 'sm' , lg: 'md'},
            p: 0,
            m: 0,
        }),
    };

    return (
        <chakra.form onSubmit={submitSimpanProfilMasjid}>
            <FormControl pt={5}>
                <Flex flexDirection="column">
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'} pb={4}>
                        Detail Masjid
                    </Text>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Foto Masjid
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <AspectRatio w={'100%'} ratio={16/9} cursor={'pointer'}>
                                <Flex flexDirection={'row'} w={'100%'} h={'100%'} borderBottomRadius={{ sm: '5px', lg: '5px' }} justify="center" align="center">
                                    <Flex
                                        w={'100%'} h={'100%'}
                                        bg={'#B3A5DA'}
                                        style={{ border: '1px solid #c6c5c5' }}
                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                        justify="center" align="center"
                                        onClick={(event)=> { 
                                            event.target.value = null;
                                            photoMasjidRef.current?.click()
                                        }}
                                    >
                                        <input 
                                            type='file'
                                            accept="image/*"
                                            multiple={false}
                                            style={{ display: 'none' }}
                                            ref={photoMasjidRef}
                                            onChange={(event) => {
                                                let fileObj = event.target.files[0];
                                                setFilePhotoMasjid(fileObj);
                                                const objectUrl = URL.createObjectURL(fileObj)
                                                setPhotoMasjid(objectUrl)
                                            }}
                                        />
                                        {
                                            photoMasjid != null ?
                                                <Image borderRadius={{ sm: '7.5px', lg: '7.5px' }} p={'2.5px'} w={'100%'} h={'100%'} src={photoMasjid} fallbackSrc='/broken-image.png'/>
                                            :
                                                <FaMosque style={{ width: '50%', height: '50%', color: 'white' }} />
                                        }
                                    </Flex>
                                </Flex>
                            </AspectRatio>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Nama Masjid (*)
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Isi nama masjid!' placement='bottom-start' isOpen={openErrorNamaMasjid}>
                                    <Input
                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                        size={{ sm: 'sm' , lg: 'md'}}
                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                        bgColor="white"
                                        color={textColor}
                                        verticalAlign={'middle'}
                                        type="text" placeholder="Isi nama masjid"
                                        value={namaMasjid}
                                        onChange={(event) => {
                                            setNamaMasjid(event.target.value);
                                        }}
                                    />
                                </Tooltip>
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Kota
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Tooltip hasArrow bg='red.600' color={'white'} label='Pilih kota!' placement='bottom-start' isOpen={openErrorKotaMasjid}>
                                <Stack w={'100%'} h={'100%'}>
                                    <Select
                                        w={'100%'} h={'100%'} 
                                        cursor="pointer"
                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                        focusBorderColor="#B3A5DA"
                                        selectedOptionColor="purple"
                                        chakraStyles={chakraStyles}
                                        placeholder="Pilih kota" 
                                        value={kotaMasjid}
                                        onChange={handleChangeKota}
                                        options={
                                            listKota.map(function(kota, i) {
                                                return (
                                                    {
                                                        label: kota.lokasi,
                                                        value: kota.id,
                                                    }
                                                );
                                            })
                                        }
                                    />
                                </Stack>
                            </Tooltip>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Alamat (*)
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Isi alamat masjid!' placement='bottom-start' isOpen={openErrorAlamatMasjid}>
                                    <Textarea
                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                        bgColor="white"
                                        color={textColor}
                                        verticalAlign={'middle'}
                                        type="text" placeholder="Isi alamat masjid"
                                        value={alamatMasjid}
                                        rows={3}
                                        ref={alamatRef}
                                        onChange={(event) => {
                                            setAlamatMasjid(event.target.value);
                                        }}
                                    />
                                </Tooltip>
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1}></GridItem>
                        <GridItem colSpan={3}>
                            <Card p="0px" bg={'#F8F9FA'} minH={{ sm: 150, lg: 200 }} maxH={{ sm: 150, lg: 200 }} borderRadius={{ sm: '5px', lg: '5px' }}>
                                <MyMapComponent
                                    isMarkerShown
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjDSV-6RaUaptCIl_NNKAZ5XQO_Geo_pE&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: `100%`, borderRadius: '5px', border: '1px solid #c6c5c5' }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%`, borderRadius: '5px', border: '1px solid #c6c5c5' }} />}
                                />
                            </Card>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Latitude (*)
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Isi latitude masjid!' placement='bottom-start' isOpen={openErrorLatMasjid}>
                                    <Input
                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                        size={{ sm: 'sm' , lg: 'md'}}
                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                        bgColor="white"
                                        color={textColor}
                                        verticalAlign={'middle'}
                                        type="text" placeholder="Isi latitude"
                                        value={latMasjid}
                                        onChange={(event) => {
                                            setLatMasjid(event.target.value);
                                        }}
                                    />
                                </Tooltip>
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Longitude (*)
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                <Tooltip hasArrow bg='red.600' color={'white'} label='Isi longitude masjid!' placement='bottom-start' isOpen={openErrorLngMasjid}>
                                    <Input
                                        borderRadius={{ sm: '5px', lg: '5px' }}
                                        size={{ sm: 'sm' , lg: 'md'}}
                                        fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                        bgColor="white"
                                        color={textColor}
                                        verticalAlign={'middle'}
                                        type="text" placeholder="Isi longitude"
                                        value={lngMasjid}
                                        onChange={(event) => {
                                            setLngMasjid(event.target.value);
                                        }}
                                    />
                                </Tooltip>
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Box pb={4} pt={4}>
                        <Separator></Separator>
                    </Box>
                    <Text color={textColor} fontSize={{ lg: 'lg', md: 'md', sm: 'sm' }} fontWeight={'bold'} pb={4}>
                        Info Lainnya
                    </Text>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Deskripsi
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Textarea
                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                    bgColor="white"
                                    color={textColor}
                                    verticalAlign={'middle'}
                                    type="text" placeholder="Isi deskripsi"
                                    value={deskripsiMasjid}
                                    rows={3}
                                    onChange={(event) => {
                                        setDeskripsiMasjid(event.target.value);
                                    }}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Badan Hukum
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Select
                                w={'100%'} h={'100%'} 
                                cursor="pointer"
                                size={{ sm: 'sm' , lg: 'md'}}
                                fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                focusBorderColor="#B3A5DA"
                                selectedOptionColor="purple"
                                chakraStyles={chakraStyles}
                                placeholder="Pilih badan hukum" 
                                value={badanHukumMasjid}
                                onChange={handleChangeBadanHukum}
                                options={
                                    [
                                        {
                                            label: "Yayasan",
                                            value: "Yayasan",
                                        },
                                        {
                                            label: "Koperasi",
                                            value: "Koperasi",
                                        },
                                        {
                                            label: "Lain-lain",
                                            value: "Lain-lain",
                                            },
                                    ]
                                }
                            />
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Luas Tanah
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                <Input
                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                    size={{ sm: 'sm' , lg: 'md'}}
                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                    bgColor="white"
                                    color={textColor}
                                    verticalAlign={'middle'}
                                    type="text" placeholder="Isi luas tanah"
                                    value={luasTanahMasjid}
                                    onChange={(event) => {
                                        setLuasTanahMasjid(event.target.value);
                                    }}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Luas Bangunan
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                <Input
                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                    size={{ sm: 'sm' , lg: 'md'}}
                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                    bgColor="white"
                                    color={textColor}
                                    verticalAlign={'middle'}
                                    type="text" placeholder="Isi luas bangunan"
                                    value={luasBangunanMasjid}
                                    onChange={(event) => {
                                        setLuasBangunanMasjid(event.target.value);
                                    }}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Jumlah Lantai
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                <Input
                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                    size={{ sm: 'sm' , lg: 'md'}}
                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                    bgColor="white"
                                    color={textColor}
                                    verticalAlign={'middle'}
                                    type="text" placeholder="Isi jumlah lantai"
                                    value={jumlahLantaiMasjid}
                                    onChange={(event) => {
                                        setJumlahLantaiMasjid(event.target.value);
                                    }}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}} pb={2}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Kapasitas Jamaah
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                <Input
                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                    size={{ sm: 'sm' , lg: 'md'}}
                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                    bgColor="white"
                                    color={textColor}
                                    verticalAlign={'middle'}
                                    type="text" placeholder="Isi kapasitas jamaah"
                                    value={kapasitasJamaah}
                                    onChange={(event) => {
                                        setKapasitasJamaah(event.target.value);
                                    }}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)'}}>
                        <GridItem colSpan={1} pb={{ sm: 1, lg: 0 }}>
                            <Flex flexDirection="column" w={'100%'} h={'100%'} justify="start" align="start">
                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight={'medium'}>
                                    Daya Listrik
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Flex flexDirection="column" w={{ sm: '60%', lg: '100%' }} h={'100%'} justify="start" align="start">
                                <Input
                                    borderRadius={{ sm: '5px', lg: '5px' }}
                                    size={{ sm: 'sm' , lg: 'md'}}
                                    fontSize={{ sm: 'xs', md: 'sm', lg: 'sm' }}
                                    bgColor="white"
                                    color={textColor}
                                    verticalAlign={'middle'}
                                    type="text" placeholder="Isi daya listrik"
                                    value={dayaListrik}
                                    onChange={(event) => {
                                        setDayaListrik(event.target.value);
                                    }}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                </Flex>
            </FormControl>
            <Center>
                <Flex justify="space-between" align="center" pt={7} w="100%">
                    <Flex></Flex>
                    {
                        props.errorLoading == null ?
                        <Button
                            isLoading={isLoadingSimpanProfilMasjid}
                            type="submit"
                            size={{ sm: 'sm', lg: 'sm' }}
                            fontSize={{ sm: 'xs', lg: 'sm' }}
                            bg="#6a5aa3"
                            color="white"
                            _hover={{ bg: "#B3A5DA", color: textColor }}
                        >
                            Simpan
                        </Button>
                        : <></>
                    }
                </Flex>
            </Center>
        </chakra.form>
    );
}