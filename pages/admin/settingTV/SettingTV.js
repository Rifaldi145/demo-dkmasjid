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
    FormLabel,
    Input,
    chakra,
    Alert,
    AlertIcon,
    Switch,
    Grid,
    GridItem,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Center,
    Icon,
    HStack,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Textarea,
    IconButton,
    RadioGroup,
    Radio,
    Stack,
    Image,
    CloseButton
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import Loader from 'react-loader-spinner';
import {
    Select,
} from "chakra-react-select";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import IconBox from "../../../theme/components/Icons/IconBox";
import {
    FaHome,
    FaEdit,
    FaFileAudio,
    FaImage,
    FaPlay,
    FaTextHeight
} from "react-icons/fa";
import {
    BiLink,
    BiText
} from "react-icons/bi";
import {
    BsFileEarmarkRichtextFill
} from "react-icons/bs";
import { SketchPicker, BlockPicker, ChromePicker } from "react-color";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const { fontfam } = require('../../../theme/ListFontFamily')

export default function SettingTV() {
    let users = JSON.parse(localStorage.getItem('users'));
    const token = users.token;

    const [heightModal, setHeightModal] = useState(0);
    const [widthModal, setWidthModal] = useState(0);

    const [dateNow, setDateNow] = useState(new Date());
    const tgl_skrng = formatTgl(dateNow);

    const editorRef = useRef();
    const { CKEditor, DecoupledEditor } = editorRef.current || {};

    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);
    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);
    const [errorSimpan, setErrorSimpan] = useState(null);
    const [successSimpan, setSuccessSimpan] = useState(null);

    const [maxMenit, setMaxMenit] = useState(60);
    const [dataSetting, setDataSetting] = useState(null);

    const [dialogTidakAdaKontenOpen, setDialogTidakAdaKontenOpen] = useState(false);
    const [iklanIqamah, setIklanIqamah] = useState(null);
    
    // jeda waktu adzan
    const [jedaWaktuAdzan, setJedaWaktuAdzan] = useState(5);
    const [dialogJedaWaktuAdzanOpen, setDialogJedaWaktuAdzanOpen] = useState(false);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [kontenDisplayWarnaBgJedaWaktuAdzan, setKontenDisplayWarnaBgJedaWaktuAdzan] = useState(false);
    const [kontenWarnaBgJedaWaktuAdzan, setKontenWarnaBgJedaWaktuAdzan] = useState("#FFFFFF");
    const [kontenJedaWaktuAdzan, setKontenJedaWaktuAdzan] = useState("<p></p>");
    // jeda waktu adzan

    const [jedaWaktuMenujuAdzan, setJedaWaktuMenujuAdzan] = useState(5);

    const [waktuKhotbah, setWaktuKhotbah] = useState(30);

    // waktu sholat jumat
    const [waktuSholatJumat, setWaktuSholatJumat] = useState(10);
    const [dialogWaktuSholatJumatOpen, setDialogWaktuSholatJumatOpen] = useState(false);
    const [kontenDisplayWarnaBgWaktuSholatJumat, setKontenDisplayWarnaBgWaktuSholatJumat] = useState(false);
    const [kontenWarnaBgWaktuSholatJumat, setKontenWarnaBgWaktuSholatJumat] = useState(null);
    const [kontenWaktuSholatJumat, setKontenWaktuSholatJumat] = useState("");
    const [kontenTypeWaktuSholatJumat, setKontenTypeWaktuSholatJumat] = useState("1");
    const [kontenGambarWaktuSholatJumat, setKontenGambarWaktuSholatJumat] = useState(null);
    const kontenGambarWaktuSholatJumatRef = useRef(null);
    const handleClickKontenGambarWaktuSholatJumat = () => kontenGambarWaktuSholatJumatRef.current?.click();
    // waktu sholat jumat

    // jeda waktu syuruq
    const [dialogJedaWaktuSyuruqOpen, setDialogJedaWaktuSyuruqOpen] = useState(false);
    const [jedaWaktuSyuruq, setJedaWaktuSyuruq] = useState(8);
    // jeda waktu syuruq

    // jeda waktu tarhim
    const [jedaWaktuTarhim, setJedaWaktuTarhim] = useState(5);
    const [dialogJedaWaktuTarhimOpen, setDialogJedaWaktuTarhimOpen] = useState(false);
    const audioRef = useRef(null);
    const handleClickAudio = () => audioRef.current?.click();
    const [audioTarhim, setAudioTarhim] = useState("");
    const [audioNameTarhim, setAudioNameTarhim] = useState("");
    // jeda waktu tarhim

    // jeda waktu iqamah
    const [jedaWaktuIqamahSubuh, setJedaWaktuIqamahSubuh] = useState(12);
    const [jedaWaktuIqamahDzuhur, setJedaWaktuIqamahDzuhur] = useState(12);
    const [jedaWaktuIqamahAshar, setJedaWaktuIqamahAshar] = useState(12);
    const [jedaWaktuIqamahMaghrib, setJedaWaktuIqamahMaghrib] = useState(12);
    const [jedaWaktuIqamahIsya, setJedaWaktuIqamahIsya] = useState(12);
    const [dialogJedaWaktuIqamahOpen, setDialogJedaWaktuIqamahOpen] = useState(false);
    // jeda waktu iqamah

    // penyesuaian waktu
    const [penyesuaianWaktuSubuh, setPenyesuaianWaktuSubuh] = useState(0);
    const [penyesuaianWaktuDzuhur, setPenyesuaianWaktuDzuhur] = useState(0);
    const [penyesuaianWaktuAshar, setPenyesuaianWaktuAshar] = useState(0);
    const [penyesuaianWaktuMaghrib, setPenyesuaianWaktuMaghrib] = useState(0);
    const [penyesuaianWaktuIsya, setPenyesuaianWaktuIsya] = useState(0);
    // penyesuaian waktu

    // waktu sholat
    const [padamkanKontenSubuh, setPadamkanKontenSubuh] = useState(15);
    const [padamkanKontenDzuhur, setPadamkanKontenDzuhur] = useState(15);
    const [padamkanKontenAshar, setPadamkanKontenAshar] = useState(15);
    const [padamkanKontenMaghrib, setPadamkanKontenMaghrib] = useState(15);
    const [padamkanKontenIsya, setPadamkanKontenIsya] = useState(15);
    const [dialogWaktuSholatOpen, setDialogWaktuSholatOpen] = useState(false);
    const [kontenDisplayWarnaBgWaktuSholat, setKontenDisplayWarnaBgWaktuSholat] = useState(false);
    const [kontenWarnaBgWaktuSholat, setKontenWarnaBgWaktuSholat] = useState(null);
    const [kontenWaktuSholat, setKontenWaktuSholat] = useState("");
    const [kontenTypeWaktuSholat, setKontenTypeWaktuSholat] = useState("1");
    const [kontenGambarWaktuSholat, setKontenGambarWaktuSholat] = useState(null);
    const kontenGambarWaktuSholatRef = useRef(null);
    const handleClickKontenGambarWaktuSholat = () => kontenGambarWaktuSholatRef.current?.click();
    // waktu sholat

    // aktif tarhim
    const [tarhimSubuh, setTarhimSubuh] = useState(false);
    const [tarhimDzuhur, setTarhimDzuhur] = useState(false);
    const [tarhimAshar, setTarhimAshar] = useState(false);
    const [tarhimMaghrib, setTarhimMaghrib] = useState(false);
    const [tarhimIsya, setTarhimIsya] = useState(false);
    // aktif tarhim

    const textColor = useColorModeValue("black.600", "white");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let mainText = useColorModeValue("gray.700", "gray.200");
    const nameColor = useColorModeValue("gray.500", "white");
    const bgColor = useColorModeValue("#F8F9FA", "gray.800");

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
        let myDate = ` ${(dateObj.getUTCFullYear())}/${bulans}/${('0' + dateObj.getDate()).slice(-2)} `;
        return myDate;
    }

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
        }
        loadData();
    }, []);

    const divs = useCallback(node => {
        if (node !== null) {
          setHeightModal(node.getBoundingClientRect().height);
          setWidthModal(node.getBoundingClientRect().width);
        }
      }, []);

    async function loadData() {
        setLoading(true);
        setErrorLoading(null);
        await axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display?id=${users.user_detail.mosque_id}&dates=${tgl_skrng}`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            
        }).then(async (res) => {
            console.log("res", res);
            setLoading(false);
            setDataSetting(res.data);
            if(res.data.mosques.displays != null) {
                if(res.data.mosques.displays.jeda_waktu_syuruq != null) {
                    setJedaWaktuSyuruq(res.data.mosques.displays.jeda_waktu_syuruq);
                }
                if(res.data.mosques.displays.jeda_waktu_tarhim != null) {
                    setJedaWaktuTarhim(res.data.mosques.displays.jeda_waktu_tarhim);
                }
                if(res.data.mosques.displays.audio_tarhim != null) {
                    setAudioTarhim(res.data.mosques.displays.audio_tarhim);
                }
                if(res.data.mosques.displays.audio_tarhim_name != null) {
                    setAudioNameTarhim(res.data.mosques.displays.audio_tarhim_name);
                }
                if(res.data.mosques.displays.jeda_waktu_adzan != null) {
                    setJedaWaktuAdzan(res.data.mosques.displays.jeda_waktu_adzan);
                }
                if(res.data.mosques.displays.jeda_waktu_menuju_adzan != null) {
                    setJedaWaktuMenujuAdzan(res.data.mosques.displays.jeda_waktu_menuju_adzan);
                }
                if(res.data.mosques.displays.waktu_khotbah != null) {
                    setWaktuKhotbah(res.data.mosques.displays.waktu_khotbah);
                }
                if(res.data.mosques.displays.waktu_sholat_jumat != null) {
                    setWaktuSholatJumat(res.data.mosques.displays.waktu_sholat_jumat);
                }
                if(res.data.mosques.displays.adzans != null) {
                    if(res.data.mosques.displays.adzans.jeda_waktu_iqamah_subuh != null) {
                        setJedaWaktuIqamahSubuh(res.data.mosques.displays.adzans.jeda_waktu_iqamah_subuh);
                    }
                    if(res.data.mosques.displays.adzans.jeda_waktu_iqamah_dzuhur != null) {
                        setJedaWaktuIqamahDzuhur(res.data.mosques.displays.adzans.jeda_waktu_iqamah_dzuhur);
                    }
                    if(res.data.mosques.displays.adzans.jeda_waktu_iqamah_ashar != null) {
                        setJedaWaktuIqamahAshar(res.data.mosques.displays.adzans.jeda_waktu_iqamah_ashar);
                    }
                    if(res.data.mosques.displays.adzans.jeda_waktu_iqamah_maghrib != null) {
                        setJedaWaktuIqamahMaghrib(res.data.mosques.displays.adzans.jeda_waktu_iqamah_maghrib);
                    }
                    if(res.data.mosques.displays.adzans.jeda_waktu_iqamah_isya != null) {
                        setJedaWaktuIqamahIsya(res.data.mosques.displays.adzans.jeda_waktu_iqamah_isya);
                    }

                    if(res.data.mosques.displays.adzans.blank_screen_subuh != null) {
                        setPadamkanKontenSubuh(res.data.mosques.displays.adzans.blank_screen_subuh);
                    }
                    if(res.data.mosques.displays.adzans.blank_screen_dzuhur != null) {
                        setPadamkanKontenDzuhur(res.data.mosques.displays.adzans.blank_screen_dzuhur);
                    }
                    if(res.data.mosques.displays.adzans.blank_screen_ashar != null) {
                        setPadamkanKontenAshar(res.data.mosques.displays.adzans.blank_screen_ashar);
                    }
                    if(res.data.mosques.displays.adzans.blank_screen_maghrib != null) {
                        setPadamkanKontenMaghrib(res.data.mosques.displays.adzans.blank_screen_maghrib);
                    }
                    if(res.data.mosques.displays.adzans.blank_screen_isya != null) {
                        setPadamkanKontenIsya(res.data.mosques.displays.adzans.blank_screen_isya);
                    }

                    if(res.data.mosques.displays.adzans.penyesuaian_waktu_subuh != null) {
                        setPenyesuaianWaktuSubuh(res.data.mosques.displays.adzans.penyesuaian_waktu_subuh);
                    }
                    if(res.data.mosques.displays.adzans.penyesuaian_waktu_dzuhur != null) {
                        setPenyesuaianWaktuDzuhur(res.data.mosques.displays.adzans.penyesuaian_waktu_dzuhur);
                    }
                    if(res.data.mosques.displays.adzans.penyesuaian_waktu_ashar != null) {
                        setPenyesuaianWaktuAshar(res.data.mosques.displays.adzans.penyesuaian_waktu_ashar);
                    }
                    if(res.data.mosques.displays.adzans.penyesuaian_waktu_maghrib != null) {
                        setPenyesuaianWaktuMaghrib(res.data.mosques.displays.adzans.penyesuaian_waktu_maghrib);
                    }
                    if(res.data.mosques.displays.adzans.penyesuaian_waktu_isya != null) {
                        setPenyesuaianWaktuIsya(res.data.mosques.displays.adzans.penyesuaian_waktu_isya);
                    }
                }
                if(res.data.mosques.displays.tarhims != null) {
                    console.log("res", res.data.mosques.displays.tarhims.subuh);
                    if(res.data.mosques.displays.tarhims.subuh == 1) {
                        setTarhimSubuh(true);
                    } else {
                        setTarhimSubuh(false);
                    }
                    if(res.data.mosques.displays.tarhims.dzuhur == 1) {
                        setTarhimDzuhur(true);
                    } else {
                        setTarhimDzuhur(false);
                    }
                    if(res.data.mosques.displays.tarhims.ashar == 1) {
                        setTarhimAshar(true);
                    } else {
                        setTarhimAshar(false);
                    }
                    if(res.data.mosques.displays.tarhims.maghrib == 1) {
                        setTarhimMaghrib(true);
                    } else {
                        setTarhimMaghrib(false);
                    }
                    if(res.data.mosques.displays.tarhims.isya == 1) {
                        setTarhimIsya(true);
                    } else {
                        setTarhimIsya(false);
                    }
                }
            }
            if(res.data.iklan != null) {
                if(res.data.iklan.image != null) {
                    setIklanIqamah(`${process.env.NEXT_PUBLIC_API_BACKEND}/` + res.data.iklan.image.replace("public", "storage"));
                }
            }
            setEditorLoaded(true);
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

    // waktu khotbah
    async function minusWaktuKhotbah(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setWaktuKhotbah(minute);
        }
    };

    async function plusWaktuKhotbah(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setWaktuKhotbah(minute);
        }
    };

    const changeWaktuKhotbah = (event) => {
        if(event.target.value < 1) {
            setWaktuKhotbah(1);
        } else if(event.target.value > maxMenit) {
            setWaktuKhotbah(maxMenit);
        } else {
            setWaktuKhotbah(event.target.value);
        }
    };
    // waktu khotbah

    // waktu sholat jumat
    async function clickKontenDisplayWarnaBgWaktuSholatJumat() {
        if(kontenDisplayWarnaBgWaktuSholatJumat) {
            setKontenDisplayWarnaBgWaktuSholatJumat(false);
        } else {
            setKontenDisplayWarnaBgWaktuSholatJumat(true);
        }
    };

    const kontenGambarWaktuSholatJumatHandler = (event) => {
        let fileObj = event.target.files[0];
        // setFileGambar(fileObj);
        const objectUrl = URL.createObjectURL(fileObj)
        setKontenGambarWaktuSholatJumat(objectUrl)
    }

    async function minusWaktuSholatJumat(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setWaktuSholatJumat(minute);
        }
    };

    async function plusWaktuSholatJumat(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setWaktuSholatJumat(minute);
        }
    };

    const changeWaktuSholatJumat = (event) => {
        if(event.target.value < 1) {
            setWaktuSholatJumat(1);
        } else if(event.target.value > maxMenit) {
            setWaktuSholatJumat(maxMenit);
        } else {
            setWaktuSholatJumat(event.target.value);
        }
    };
    // waktu sholat jumat

    // jeda waktu adzan
    async function minusJedaWaktuAdzan(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuAdzan(minute);
        }
    };

    async function plusJedaWaktuAdzan(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuAdzan(minute);
        }
    };

    const changeJedaWaktuAdzan = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuAdzan(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuAdzan(maxMenit);
        } else {
            setJedaWaktuAdzan(event.target.value);
        }
    };
    async function clickKontenDisplayWarnaBgJedaWaktuAdzan() {
        if(kontenDisplayWarnaBgJedaWaktuAdzan) {
            setKontenDisplayWarnaBgJedaWaktuAdzan(false);
        } else {
            setKontenDisplayWarnaBgJedaWaktuAdzan(true);
        }
    };
    // jeda waktu adzan

    // jeda waktu menuju adzan
    async function minusJedaWaktuMenujuAdzan(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuMenujuAdzan(minute);
        }
    };

    async function plusJedaWaktuMenujuAdzan(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuMenujuAdzan(minute);
        }
    };

    const changeJedaWaktuMenujuAdzan = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuMenujuAdzan(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuMenujuAdzan(maxMenit);
        } else {
            setJedaWaktuMenujuAdzan(event.target.value);
        }
    };
    // jeda waktu menuju adzan

    // jeda waktu syuruq
    async function minusSyuruq(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuSyuruq(minute);
        }
    };

    async function plusSyuruq(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuSyuruq(minute);
        }
    };

    const changeJedaWaktuSyuruq = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuSyuruq(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuSyuruq(maxMenit);
        } else {
            setJedaWaktuSyuruq(event.target.value);
        }
    };
    // jeda waktu syuruq

    // jeda waktu tarhim
    async function minusTarhim(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuTarhim(minute);
        }
    };

    async function plusTarhim(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuTarhim(minute);
        }
    };

    const changeJedaWaktuTarhim = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuTarhim(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuTarhim(maxMenit);
        } else {
            setJedaWaktuTarhim(event.target.value);
        }
    };
    const audioHandler = (event) => {
        var file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setAudioTarhim(reader.result);
            setAudioNameTarhim(file['name']);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }
    // jeda waktu tarhim

    // jeda waktu iqamah
    async function minusIqamahSubuh(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuIqamahSubuh(minute);
        }
    };

    async function plusIqamahSubuh(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuIqamahSubuh(minute);
        }
    };

    const changeJedaWaktuIqamahSubuh = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuIqamahSubuh(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuIqamahSubuh(maxMenit);
        } else {
            setJedaWaktuIqamahSubuh(event.target.value);
        }
    };

    async function minusIqamahDzuhur(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuIqamahDzuhur(minute);
        }
    };

    async function plusIqamahDzuhur(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuIqamahDzuhur(minute);
        }
    };

    const changeJedaWaktuIqamahDzuhur = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuIqamahDzuhur(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuIqamahDzuhur(maxMenit);
        } else {
            setJedaWaktuIqamahDzuhur(event.target.value);
        }
    };

    async function minusIqamahAshar(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuIqamahAshar(minute);
        }
    };

    async function plusIqamahAshar(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuIqamahAshar(minute);
        }
    };

    const changeJedaWaktuIqamahAshar = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuIqamahAshar(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuIqamahAshar(maxMenit);
        } else {
            setJedaWaktuIqamahAshar(event.target.value);
        }
    };

    async function minusIqamahMaghrib(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuIqamahMaghrib(minute);
        }
    };

    async function plusIqamahMaghrib(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuIqamahMaghrib(minute);
        }
    };

    const changeJedaWaktuIqamahMaghrib = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuIqamahMaghrib(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuIqamahMaghrib(maxMenit);
        } else {
            setJedaWaktuIqamahMaghrib(event.target.value);
        }
    };

    async function minusIqamahIsya(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setJedaWaktuIqamahIsya(minute);
        }
    };

    async function plusIqamahIsya(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setJedaWaktuIqamahIsya(minute);
        }
    };

    const changeJedaWaktuIqamahIsya = (event) => {
        if(event.target.value < 1) {
            setJedaWaktuIqamahIsya(1);
        } else if(event.target.value > maxMenit) {
            setJedaWaktuIqamahIsya(maxMenit);
        } else {
            setJedaWaktuIqamahIsya(event.target.value);
        }
    };
    // jeda waktu iqamah

    // penyesuaian waktu
    async function minusPenyesuaianWaktuSubuh(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setPenyesuaianWaktuSubuh(minute);
        }
    };

    async function plusPenyesuaianWaktuSubuh(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setPenyesuaianWaktuSubuh(minute);
        }
    };

    const changePenyesuaianWaktuSubuh = (event) => {
        if(event.target.value < 1) {
            setPenyesuaianWaktuSubuh(1);
        } else if(event.target.value > maxMenit) {
            setPenyesuaianWaktuSubuh(maxMenit);
        } else {
            setPenyesuaianWaktuSubuh(event.target.value);
        }
    };

    async function minusPenyesuaianWaktuDzuhur(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setPenyesuaianWaktuDzuhur(minute);
        }
    };

    async function plusPenyesuaianWaktuDzuhur(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setPenyesuaianWaktuDzuhur(minute);
        }
    };

    const changePenyesuaianWaktuDzuhur = (event) => {
        if(event.target.value < 1) {
            setPenyesuaianWaktuDzuhur(1);
        } else if(event.target.value > maxMenit) {
            setPenyesuaianWaktuDzuhur(maxMenit);
        } else {
            setPenyesuaianWaktuDzuhur(event.target.value);
        }
    };

    async function minusPenyesuaianWaktuAshar(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setPenyesuaianWaktuAshar(minute);
        }
    };

    async function plusPenyesuaianWaktuAshar(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setPenyesuaianWaktuAshar(minute);
        }
    };

    const changePenyesuaianWaktuAshar = (event) => {
        if(event.target.value < 1) {
            setPenyesuaianWaktuAshar(1);
        } else if(event.target.value > maxMenit) {
            setPenyesuaianWaktuAshar(maxMenit);
        } else {
            setPenyesuaianWaktuAshar(event.target.value);
        }
    };

    async function minusPenyesuaianWaktuMaghrib(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setPenyesuaianWaktuMaghrib(minute);
        }
    };

    async function plusPenyesuaianWaktuMaghrib(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setPenyesuaianWaktuMaghrib(minute);
        }
    };

    const changePenyesuaianWaktuMaghrib = (event) => {
        if(event.target.value < 1) {
            setPenyesuaianWaktuMaghrib(1);
        } else if(event.target.value > maxMenit) {
            setPenyesuaianWaktuMaghrib(maxMenit);
        } else {
            setPenyesuaianWaktuMaghrib(event.target.value);
        }
    };

    async function minusPenyesuaianWaktuIsya(minutes) {
        var minute = parseInt(minutes);
        if(minute > 1) {
            minute = minute - 1;
            setPenyesuaianWaktuIsya(minute);
        }
    };

    async function plusPenyesuaianWaktuIsya(minutes) {
        var minute = parseInt(minutes);
        if(minute < maxMenit) {
            minute = minute + 1;
            setPenyesuaianWaktuIsya(minute);
        }
    };

    const changePenyesuaianWaktuIsya = (event) => {
        if(event.target.value < 1) {
            setPenyesuaianWaktuIsya(1);
        } else if(event.target.value > maxMenit) {
            setPenyesuaianWaktuIsya(maxMenit);
        } else {
            setPenyesuaianWaktuIsya(event.target.value);
        }
    };
    // penyesuaian waktu

    

    // tarhim
    const changeTarhimSubuh = (event) => {
        const isChecked = event.target.checked;
        setTarhimSubuh(isChecked);
    };
    const changeTarhimDzuhur = (event) => {
        const isChecked = event.target.checked;
        setTarhimDzuhur(isChecked);
    };
    const changeTarhimAshar = (event) => {
        const isChecked = event.target.checked;
        setTarhimAshar(isChecked);
    };
    const changeTarhimMaghrib = (event) => {
        const isChecked = event.target.checked;
        setTarhimMaghrib(isChecked);
    };
    const changeTarhimIsya = (event) => {
        const isChecked = event.target.checked;
        setTarhimIsya(isChecked);
    };
    // tarhim

    
    async function submitSimpan() {
        setErrorSimpan(null);
        setSuccessSimpan(null);
        setIsLoadingSimpan(true);

        var postData = {
            id: users.user_detail.mosque_id,
            jeda_waktu_syuruq: jedaWaktuSyuruq,
            jeda_waktu_tarhim: jedaWaktuTarhim,
            jeda_waktu_adzan: jedaWaktuAdzan,
            jeda_waktu_menuju_adzan: jedaWaktuMenujuAdzan,
            waktu_khotbah: waktuKhotbah,
            waktu_sholat_jumat: waktuSholatJumat,
            jeda_waktu_iqamah_subuh: jedaWaktuIqamahSubuh,
            jeda_waktu_iqamah_dzuhur: jedaWaktuIqamahDzuhur,
            jeda_waktu_iqamah_ashar: jedaWaktuIqamahAshar,
            jeda_waktu_iqamah_maghrib: jedaWaktuIqamahMaghrib,
            jeda_waktu_iqamah_isya: jedaWaktuIqamahIsya,
            penyesuaian_waktu_subuh: penyesuaianWaktuSubuh,
            penyesuaian_waktu_dzuhur: penyesuaianWaktuDzuhur,
            penyesuaian_waktu_ashar: penyesuaianWaktuAshar,
            penyesuaian_waktu_maghrib: penyesuaianWaktuMaghrib,
            penyesuaian_waktu_isya: penyesuaianWaktuIsya,
            blank_screen_subuh: padamkanKontenSubuh,
            blank_screen_dzuhur: padamkanKontenDzuhur,
            blank_screen_ashar: padamkanKontenAshar,
            blank_screen_maghrib: padamkanKontenMaghrib,
            blank_screen_isya: padamkanKontenIsya,
            tarhim_subuh: tarhimSubuh ? 1 : 0,
            tarhim_dzuhur: tarhimDzuhur ? 1 : 0,
            tarhim_ashar: tarhimAshar ? 1 : 0,
            tarhim_maghrib: tarhimMaghrib ? 1 : 0,
            tarhim_isya: tarhimIsya ? 1 : 0,
        };
        
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/api/baitiV1/edit-display/simpan-jadwal`,
            headers: {
                "Content-Type": `application/json`,
                "Accept": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            data: postData
            
        }).then(async (res) => {
            console.log("res", res);
            setIsLoadingSimpan(false);
            if(res.data.success) {
                setSuccessSimpan(res.data.message);
            } else {
                setErrorSimpan(res.data.message);
            }
        }, (error) => {
            setIsLoadingSimpan(false);
            if(error.response) {
                console.log("error.response", error.response.data);
                setErrorSimpan(JSON.stringify(error.response.data));
            } else {
                console.log("error.message", error.message);
                setErrorSimpan(JSON.stringify(error.message));
            }
        });
    };

    return (
        <Flex flexDirection="column" pt={{ base: "90px", md: "85px" }} w={'100%'}>
            <Center w={'100%'}>
                <Flex overflowX={{ sm: "scroll", xl: "hidden" }} w={'100%'}
                    justify="center" align="center"
                >
                {
                    loading ?
                    <Flex p={5}>
                        <Loader type="Circles" color="#00BFFF" height={40} width={40} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>

                        </Loader>
                    </Flex>
                    :
                    <chakra.form onSubmit={submitSimpan} w={{ lg: '70%' }}>
                        <Flex flexDirection="column">
                            <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                <GridItem colSpan={1}>
                                    <Flex
                                        pl={{ sm: '2.5px', lg: '8px' }}
                                        pr={{ sm: '5px', lg: '8px' }}
                                        pt={{ sm: '5px', lg: '8px' }}
                                        pb={{ sm: '5px', lg: '8px' }}
                                        direction="column" w="100%"
                                    >
                                        <CardBody
                                            bg={'white'}
                                            boxShadow='base'
                                            borderRadius="10px"
                                            h={{ sm: '280px', lg: '350px' }} maxH={{ sm: '280px', lg: '350px' }} minH={{ sm: '280px', lg: '350px' }}
                                        >
                                            <Flex direction="column" w="100%">
                                                <Box
                                                    cursor={'pointer'} onClick={() => setDialogTidakAdaKontenOpen(true)}
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}
                                                >
                                                    <Center h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}>
                                                        <Text
                                                            textAlign={'center'}
                                                            color={nameColor}
                                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                                            fontWeight="bold"
                                                        >
                                                            Penyesuaian Waktu<br/>Adzan
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Subuh
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPenyesuaianWaktuSubuh(penyesuaianWaktuSubuh)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={penyesuaianWaktuSubuh} onChange={changePenyesuaianWaktuSubuh}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPenyesuaianWaktuSubuh(penyesuaianWaktuSubuh)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Dzuhur
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPenyesuaianWaktuDzuhur(penyesuaianWaktuDzuhur)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={penyesuaianWaktuDzuhur} onChange={changePenyesuaianWaktuDzuhur}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPenyesuaianWaktuDzuhur(penyesuaianWaktuDzuhur)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Ashar
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPenyesuaianWaktuAshar(penyesuaianWaktuAshar)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={penyesuaianWaktuAshar} onChange={changePenyesuaianWaktuAshar}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPenyesuaianWaktuAshar(penyesuaianWaktuAshar)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Maghrib
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPenyesuaianWaktuMaghrib(penyesuaianWaktuMaghrib)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={penyesuaianWaktuMaghrib} onChange={changePenyesuaianWaktuMaghrib}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPenyesuaianWaktuMaghrib(penyesuaianWaktuMaghrib)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Isya
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPenyesuaianWaktuIsya(penyesuaianWaktuIsya)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={penyesuaianWaktuIsya} onChange={changePenyesuaianWaktuIsya}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPenyesuaianWaktuIsya(penyesuaianWaktuIsya)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                                justify="start" align="center"
                                                            ></Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <Flex size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <Text textAlign={'center'} color={nameColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight="normal">
                                                                        Menit
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                            </Flex>
                                        </CardBody>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Flex
                                        pl={{ sm: '5px', lg: '8px' }}
                                        pr={{ sm: '2.5px', lg: '8px' }}
                                        pt={{ sm: '5px', lg: '8px' }}
                                        pb={{ sm: '5px', lg: '8px' }}
                                        direction="column" w="100%"
                                    >
                                        <CardBody
                                            bg={'white'}
                                            boxShadow='base'
                                            borderRadius="10px"
                                            h={{ sm: '280px', lg: '350px' }} maxH={{ sm: '280px', lg: '350px' }} minH={{ sm: '280px', lg: '350px' }}
                                        >
                                            <Flex direction="column" w="100%">
                                                <Box
                                                    cursor={'pointer'} onClick={() => setDialogJedaWaktuIqamahOpen(true)}
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}
                                                >
                                                    <Center h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}>
                                                        <Text
                                                            textAlign={'center'}
                                                            color={nameColor}
                                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                                            fontWeight="bold"
                                                        >
                                                            Jeda Waktu<br/>Iqamah
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Subuh
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusIqamahSubuh(jedaWaktuIqamahSubuh)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={jedaWaktuIqamahSubuh} onChange={changeJedaWaktuIqamahSubuh}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusIqamahSubuh(jedaWaktuIqamahSubuh)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Dzuhur
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusIqamahDzuhur(jedaWaktuIqamahDzuhur)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={jedaWaktuIqamahDzuhur} onChange={changeJedaWaktuIqamahDzuhur}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusIqamahDzuhur(jedaWaktuIqamahDzuhur)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Ashar
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusIqamahAshar(jedaWaktuIqamahAshar)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={jedaWaktuIqamahAshar} onChange={changeJedaWaktuIqamahAshar}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusIqamahAshar(jedaWaktuIqamahAshar)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Maghrib
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusIqamahMaghrib(jedaWaktuIqamahMaghrib)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={jedaWaktuIqamahMaghrib} onChange={changeJedaWaktuIqamahMaghrib}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusIqamahMaghrib(jedaWaktuIqamahMaghrib)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Isya
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '40px', lg: '50px' }} maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusIqamahIsya(jedaWaktuIqamahIsya)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={jedaWaktuIqamahIsya} onChange={changeJedaWaktuIqamahIsya}
                                                                    />
                                                                    <InputRightAddon
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusIqamahIsya(jedaWaktuIqamahIsya)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                                justify="start" align="center"
                                                            ></Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <Flex size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <Text textAlign={'center'} color={nameColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight="normal">
                                                                        Menit
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                            </Flex>
                                        </CardBody>
                                    </Flex>
                                </GridItem>
                            </Grid>
                            <Grid templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}}>
                                <GridItem colSpan={1}>
                                    <Flex
                                        pl={{ sm: '2.5px', lg: '8px' }}
                                        pr={{ sm: '5px', lg: '8px' }}
                                        pt={{ sm: '5px', lg: '8px' }}
                                        pb={{ sm: '5px', lg: '8px' }}
                                        direction="column" w="100%"
                                    >
                                        <CardBody
                                            bg={'gray.100'}
                                            boxShadow='base'
                                            borderRadius="10px"
                                            h={{ sm: '280px', lg: '350px' }} maxH={{ sm: '280px', lg: '350px' }} minH={{ sm: '280px', lg: '350px' }}
                                        >
                                            <Flex direction="column" w="100%">
                                                <Box
                                                    cursor={'pointer'} onClick={() => setDialogWaktuSholatOpen(true)}
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}
                                                >
                                                    <Center h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}>
                                                        <Text
                                                            textAlign={'center'}
                                                            color={nameColor}
                                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                                            fontWeight="bold"
                                                        >
                                                            Waktu<br/>Sholat
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Subuh
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup boxShadow='sm' size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPadamkanKontenSubuh(padamkanKontenSubuh)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={padamkanKontenSubuh} onChange={changePadamkanKontenSubuh}
                                                                    />
                                                                    <InputRightAddon
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPadamkanKontenSubuh(padamkanKontenSubuh)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Dzuhur
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup boxShadow='sm' size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPadamkanKontenDzuhur(padamkanKontenDzuhur)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={padamkanKontenDzuhur} onChange={changePadamkanKontenDzuhur}
                                                                    />
                                                                    <InputRightAddon
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPadamkanKontenDzuhur(padamkanKontenDzuhur)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Ashar
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup boxShadow='sm' size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPadamkanKontenAshar(padamkanKontenAshar)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={padamkanKontenAshar} onChange={changePadamkanKontenAshar}
                                                                    />
                                                                    <InputRightAddon
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPadamkanKontenAshar(padamkanKontenAshar)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Maghrib
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup boxShadow='sm' size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPadamkanKontenMaghrib(padamkanKontenMaghrib)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={padamkanKontenMaghrib} onChange={changePadamkanKontenMaghrib}
                                                                    />
                                                                    <InputRightAddon
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPadamkanKontenMaghrib(padamkanKontenMaghrib)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="start" align="center"
                                                            >
                                                                <Text
                                                                    pl={{ sm: 2, lg: 5 }}
                                                                    textAlign={'start'}
                                                                    color={nameColor}
                                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                                    fontWeight="bold"
                                                                >
                                                                    Isya
                                                                </Text>
                                                            </Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <InputGroup boxShadow='sm' size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <InputLeftAddon 
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                        onClick={() => minusPadamkanKontenIsya(padamkanKontenIsya)} 
                                                                        children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >-</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                    <Input
                                                                        verticalAlign="center" textAlign={'center'}
                                                                        fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                        color={nameColor} bgColor="white"
                                                                        borderRadius="0"
                                                                        style={{ borderRadius: '0' }}
                                                                        value={padamkanKontenIsya} onChange={changePadamkanKontenIsya}
                                                                    />
                                                                    <InputRightAddon
                                                                        bg={'white'}
                                                                        w={'10px'}
                                                                        cursor={'pointer'}
                                                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                        onClick={() => plusPadamkanKontenIsya(padamkanKontenIsya)} children={
                                                                            <Flex w={'100%'} justify="center" align="center">
                                                                                <Text
                                                                                    verticalAlign="center" textAlign={'center'}
                                                                                    fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="text"
                                                                                    color={nameColor}
                                                                                >+</Text>
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                >
                                                    <Grid templateColumns={{ sm: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)'}}>
                                                        <GridItem colSpan={2}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="start" align="center"
                                                            ></Flex>
                                                        </GridItem>
                                                        <GridItem colSpan={3}>
                                                            <Flex w={'100%'}
                                                                h={{ sm: '35px', lg: '45px' }} maxH={{ sm: '35px', lg: '45px' }} minH={{ sm: '35px', lg: '45px' }}
                                                                justify="end" align="center"
                                                            >
                                                                <Flex size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '95%', lg: '70%' }} pr={{ sm: 2, lg: 5 }}>
                                                                    <Text textAlign={'center'} color={nameColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight="normal">
                                                                        Menit
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </GridItem>
                                                    </Grid>
                                                </Box>
                                            </Flex>
                                        </CardBody>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Flex
                                        pl={{ sm: '5px', lg: '8px' }}
                                        pr={{ sm: '2.5px', lg: '8px' }}
                                        pt={{ sm: '5px', lg: '8px' }}
                                        pb={{ sm: '5px', lg: '8px' }}
                                        direction="column" w="100%"
                                    >
                                        <CardBody
                                            bg={'white'}
                                            boxShadow='base'
                                            borderRadius="10px"
                                            mb={{ sm: '8px', lg: '16px' }}
                                            h={{ sm: '120px', lg: '150px' }} maxH={{ sm: '120px', lg: '150px' }} minH={{ sm: '120px', lg: '150px' }}
                                        >
                                            <Flex direction="column" w="100%">
                                                <Box
                                                    cursor={'pointer'} onClick={() => setDialogJedaWaktuAdzanOpen(true)}
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}
                                                >
                                                    <Center h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}>
                                                        <Text
                                                            textAlign={'center'}
                                                            color={nameColor}
                                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                                            fontWeight="bold"
                                                        >
                                                            Jeda Waktu<br/>Adzan
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }}maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Center mx={{ sm: '5px' }} h={{ sm: '40px', lg: '50px' }}maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}>
                                                        <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '80%', lg: '45%' }}>
                                                            <InputLeftAddon 
                                                                cursor={'pointer'}
                                                                style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                onClick={() => minusJedaWaktuAdzan(jedaWaktuAdzan)} 
                                                                children={
                                                                    <Center>
                                                                        <Text
                                                                            verticalAlign="center" textAlign={'center'}
                                                                            fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                            color={nameColor}
                                                                        >-</Text>
                                                                    </Center>
                                                                }
                                                            />
                                                            <Input
                                                                verticalAlign="center" textAlign={'center'}
                                                                fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                color={nameColor} bgColor="white"
                                                                borderRadius="0"
                                                                style={{ borderRadius: '0' }}
                                                                value={jedaWaktuAdzan} onChange={changeJedaWaktuAdzan}
                                                            />
                                                            <InputRightAddon
                                                                cursor={'pointer'}
                                                                style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                onClick={() => plusJedaWaktuAdzan(jedaWaktuAdzan)} children={
                                                                    <Center>
                                                                        <Text
                                                                            verticalAlign="center" textAlign={'center'}
                                                                            fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                            color={nameColor}
                                                                        >+</Text>
                                                                    </Center>
                                                                }
                                                            />
                                                        </InputGroup>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                >
                                                    <Center h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}>
                                                        <Text mt={{ sm: 2, lg: 2.5 }} textAlign={'center'} color={nameColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight="normal">
                                                            Menit
                                                        </Text>
                                                    </Center>
                                                </Box>
                                            </Flex>
                                        </CardBody>
                                        <CardBody
                                            bg={'white'}
                                            boxShadow='base'
                                            borderRadius="10px"
                                            h={{ sm: '120px', lg: '150px' }} maxH={{ sm: '120px', lg: '150px' }} minH={{ sm: '120px', lg: '150px' }}
                                        >
                                            <Flex direction="column" w="100%">
                                                <Box
                                                    cursor={'pointer'} onClick={() => setDialogJedaWaktuAdzanOpen(true)}
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}
                                                >
                                                    <Center h={{ sm: '50px', lg: '60px' }} maxH={{ sm: '50px', lg: '60px' }} minH={{ sm: '50px', lg: '60px' }}>
                                                        <Text
                                                            textAlign={'center'}
                                                            color={nameColor}
                                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                                            fontWeight="bold"
                                                        >
                                                            Jeda Waktu<br/>Adzan
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '40px', lg: '50px' }}maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}
                                                >
                                                    <Center mx={{ sm: '5px' }} h={{ sm: '40px', lg: '50px' }}maxH={{ sm: '40px', lg: '50px' }} minH={{ sm: '40px', lg: '50px' }}>
                                                        <InputGroup size={{ sm: 'xs', lg: 'md' }} justifyContent={'center'} w={{ sm: '80%', lg: '45%' }}>
                                                            <InputLeftAddon 
                                                                cursor={'pointer'}
                                                                style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                                                onClick={() => minusJedaWaktuAdzan(jedaWaktuAdzan)} 
                                                                children={
                                                                    <Center>
                                                                        <Text
                                                                            verticalAlign="center" textAlign={'center'}
                                                                            fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                            color={nameColor}
                                                                        >-</Text>
                                                                    </Center>
                                                                }
                                                            />
                                                            <Input
                                                                verticalAlign="center" textAlign={'center'}
                                                                fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                color={nameColor} bgColor="white"
                                                                borderRadius="0"
                                                                style={{ borderRadius: '0' }}
                                                                value={jedaWaktuAdzan} onChange={changeJedaWaktuAdzan}
                                                            />
                                                            <InputRightAddon
                                                                cursor={'pointer'}
                                                                style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                                onClick={() => plusJedaWaktuAdzan(jedaWaktuAdzan)} children={
                                                                    <Center>
                                                                        <Text
                                                                            verticalAlign="center" textAlign={'center'}
                                                                            fontSize={{sm: 'xs', md: 'md', lg: 'md'}} type="number"
                                                                            color={nameColor}
                                                                        >+</Text>
                                                                    </Center>
                                                                }
                                                            />
                                                        </InputGroup>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="10px" w={'100%'}
                                                    h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}
                                                >
                                                    <Center h={{ sm: '30px', lg: '40px' }}maxH={{ sm: '30px', lg: '40px' }} minH={{ sm: '30px', lg: '40px' }}>
                                                        <Text mt={{ sm: 2, lg: 2.5 }} textAlign={'center'} color={nameColor} fontSize={{ sm: 'xs', lg: 'sm' }} fontWeight="normal">
                                                            Menit
                                                        </Text>
                                                    </Center>
                                                </Box>
                                            </Flex>
                                        </CardBody>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </Flex>
                    </chakra.form>
                }
                </Flex>
            </Center>
            <Modal closeOnOverlayClick={false} isCentered size={'sm'} onClose={!dialogTidakAdaKontenOpen} isOpen={dialogTidakAdaKontenOpen}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader size="sm" bg="#ffffff" borderRadius={'5px'}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize={{ sm: 'xs', lg: 'md' }} color={textColor}>
                                Tidak Ada Tampilan
                            </Text>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setDialogTidakAdaKontenOpen(false)}/>
                        </Flex>
                    </ModalHeader>
                </ModalContent>
            </Modal>
            <Modal closeOnOverlayClick={false} isCentered size={'xl'} onClose={!dialogJedaWaktuSyuruqOpen} isOpen={dialogJedaWaktuSyuruqOpen}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader size="sm" bg="#B3A5DA" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize={{ sm: 'xs', lg: 'md' }} color={textColor}>
                                Konten Jeda Waktu Syuruq
                            </Text>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setDialogJedaWaktuSyuruqOpen(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody mb={5}>
                        <Alert rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                            <AlertIcon />
                            <Text color={textColor} textAlign="left" fontSize={{ sm: 'xs', lg: 'sm' }}>Konten ini akan tampil selama 1 menit setelah waktu syuruq berlalu { jedaWaktuSyuruq } menit</Text>
                        </Alert>
                        <Flex ref={divs} mt={5} w={'100%'} justify="center" align="center">
                            <Flex
                                bg={'#1C6F6E'}
                                style={{ border: '1px solid #c6c5c5' }}
                                borderRadius="5px"
                                w={ ((widthModal * 100) / 100) }
                                h={ (((widthModal * 100) / 100) / 2.5) }
                                justify="center" align="center"
                            >
                                <Text color={'#FFE606'} textAlign="center" fontSize={{ sm: 'lg', lg: '4xl' }}>Waktu Syuruq Sudah Berlalu</Text>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isCentered size={'xl'} onClose={!dialogJedaWaktuTarhimOpen} isOpen={dialogJedaWaktuTarhimOpen}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader size="sm" bg="#B3A5DA" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize={{ sm: 'xs', lg: 'md' }} color={textColor}>
                                Audio Jeda Waktu Tarhim
                            </Text>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setDialogJedaWaktuTarhimOpen(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody mb={5}>
                        <Alert rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                            <AlertIcon />
                            <Text color={textColor} textAlign="left" fontSize={{ sm: 'xs', lg: 'sm' }}>Akan memutar audio selama { (jedaWaktuTarhim - 2) } menit. Dimulai dari { jedaWaktuTarhim } menit sebelum waktu adzan</Text>
                        </Alert>
                        <Flex ref={divs} direction="column">
                            <Flex direction="row">
                                <Button onClick={(event)=> { 
                                        event.target.value = null;
                                        handleClickAudio();
                                    }}
                                    cursor="pointer"
                                    size="sm"
                                    borderRadius={'8px'}
                                    bg="#B3A5DA"
                                    color={textColor}
                                    fontSize="sm"
                                    _hover={{ bg: "gray.200", color: textColor }}
                                    type="button"
                                    alignContent={'center'}
                                    alignItems={'center'}
                                >
                                    <Flex justify="center" align="center" cursor="pointer">
                                        <Icon color={textColor} fontSize={{ sm: 'md', lg: 'lg' }}>
                                            <FaFileAudio/>
                                        </Icon>
                                        <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                            Upload Audio
                                        </Text>
                                        <input 
                                            type='file'
                                            accept=".mp3,audio/*"
                                            multiple={false}
                                            style={{ display: 'none' }}
                                            ref={audioRef}
                                            onChange={audioHandler.bind(this)}
                                        />
                                    </Flex>
                                </Button>
                            </Flex>
                            {
                                (audioTarhim != null && audioTarhim != "") ?
                                <AudioPlayer
                                    style={{ marginTop: '16px', borderRadius: '5px' }}
                                    false
                                    src={
                                        audioTarhim.includes('public/assets/mobile/') ? 
                                        `${process.env.NEXT_PUBLIC_API_BACKEND}/` + audioTarhim.replace("public", "storage")
                                        :
                                        audioTarhim
                                    }
                                    onPlay={(e) => console.log("onPlay")}
                                    showSkipControls={false}
                                    showJumpControls={false}
                                    header={`${ audioNameTarhim != null ? audioNameTarhim : '' }`}
                                />
                                : <></>
                            }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isCentered size={'xl'} onClose={!dialogJedaWaktuAdzanOpen} isOpen={dialogJedaWaktuAdzanOpen}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader size="sm" bg="#B3A5DA" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize={{ sm: 'xs', lg: 'md' }} color={textColor}>
                                Konten Jeda Waktu Adzan
                            </Text>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setDialogJedaWaktuAdzanOpen(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody mb={5}>
                        <Alert rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                            <AlertIcon />
                            <Text color={textColor} textAlign="justify" fontSize={{ sm: 'xs', lg: 'sm' }}>Konten ini akan tampil pada waktu adzan selama {jedaWaktuAdzan} menit</Text>
                        </Alert>
                        <Flex ref={divs} direction="column">
                            <Grid mb={5} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}} verticalAlign={'middle'}>
                                <GridItem colSpan={1}>
                                    <Flex w={'100%'}
                                        justify="start" align="center"
                                    >
                                        <Text
                                            textAlign={'start'}
                                            color={textColor}
                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                            fontWeight="bold"
                                        >
                                            Warna Background
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Flex flexDirection="column" w={'100%'}
                                        justify="end" align="end"
                                    >
                                        <Button size="sm" color={textColor}
                                            onClick={() => clickKontenDisplayWarnaBgJedaWaktuAdzan()}
                                            bg={kontenWarnaBgJedaWaktuAdzan}
                                            style={{ border: '1px solid #c6c5c5' }}
                                            fontSize={{ sm: 'xs', lg: 'sm' }}
                                        >{kontenWarnaBgJedaWaktuAdzan}</Button>
                                        {
                                            kontenDisplayWarnaBgJedaWaktuAdzan ?
                                            <ChromePicker
                                                style={{ position: 'absolutes'}}
                                                id="chromepickerrrr"
                                                color={kontenWarnaBgJedaWaktuAdzan}
                                                onChange={(color) => {
                                                    setKontenWarnaBgJedaWaktuAdzan(color.hex);
                                                }}
                                            />
                                            : <></>
                                        }
                                    </Flex>
                                </GridItem>
                            </Grid>
                            <Flex direction={'column'}>
                                {editorLoaded ? (
                                    <CKEditor
                                        config={{
                                            fontFamily: {
                                                options: fontfam,
                                                supportAllValues: true
                                            },
                                            fontSize: {
                                                options: [9, 11, 13, "default", 17, 19, 21],
                                            },
                                        }}
                                        onReady={ editorRef => {
                                            editorRef.ui.getEditableElement().parentElement.insertBefore(
                                                editorRef.ui.view.toolbar.element,
                                                editorRef.ui.getEditableElement()
                                            );
                    
                                            editorRef = editorRef;
                                        }}
                                        onError = {
                                            (error, { willEditorRestart } ) => {
                                                if(willEditorRestart ) {
                                                    editorRef.ui.view.toolbar.element.remove();
                                                }
                                            }
                                        }
                                        onChange={(event, editor) => {
                                            const data = editor.getData()
                                            setKontenJedaWaktuAdzan(data);
                                        }}
                                        editor={ DecoupledEditor }
                                        data = {kontenJedaWaktuAdzan}
                                    />
                                ) : (
                                    <></>
                                )}
                            </Flex>
                            <Flex mt={5} w={'100%'} justify="center" align="center">
                                <Flex
                                    bg={kontenWarnaBgJedaWaktuAdzan}
                                    style={{ border: '1px solid #c6c5c5' }}
                                    borderRadius="5px"
                                    w={ ((widthModal * 100) / 100) }
                                    h={ (((widthModal * 100) / 100) / 2.5) }
                                    justify="start" align="center"
                                >
                                    <Box m={5} w={'100%'} dangerouslySetInnerHTML={{__html: kontenJedaWaktuAdzan}}>
                                        
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isCentered size={'xl'} onClose={!dialogWaktuSholatJumatOpen} isOpen={dialogWaktuSholatJumatOpen}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader size="sm" bg="#B3A5DA" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize={{ sm: 'xs', lg: 'md' }} color={textColor}>
                                Konten Waktu Sholat Jumat
                            </Text>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setDialogWaktuSholatJumatOpen(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody mb={5}>
                        <Alert rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                            <AlertIcon />
                            <Text color={textColor} textAlign="justify" fontSize={{ sm: 'xs', lg: 'sm' }}>Konten ini akan tampil di hari jumat setelah khotbah selama {waktuSholatJumat} menit</Text>
                        </Alert>
                        <Flex ref={divs} direction='column'>
                            <RadioGroup mb={5} defaultValue={kontenTypeWaktuSholatJumat}>
                                <Stack spacing={4} direction='row'>
                                    <Radio value='1' 
                                        onClick={(event)=> { 
                                            setKontenTypeWaktuSholatJumat("1");
                                            // setKontenGambarWaktuSholatJumat(null);
                                        }}
                                    >
                                        <Button onClick={(event)=> { 
                                                    
                                            }}
                                            cursor="pointer"
                                            size="sm"
                                            borderRadius={'8px'}
                                            bg="gray.200"
                                            color={textColor}
                                            fontSize="sm"
                                            _hover={{ bg: "gray.200", color: textColor }}
                                            type="button"
                                            alignContent={'center'}
                                            alignItems={'center'}
                                            w={'auto'}
                                            h={'auto'}
                                        >
                                            <Flex direction={'column'} justify="center" align="center" cursor="pointer">
                                                <Icon fontSize={{ sm: 'md', lg: 'lg' }} mt={1.5}>
                                                    <BiText/>
                                                </Icon>
                                                <Text fontSize={{ sm: 'xs', lg: 'sm' }} mb={1.5}>
                                                    Teks
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Radio>
                                    <Radio value='2'
                                        onClick={(event)=> {
                                            setKontenTypeWaktuSholatJumat("2");
                                            // setKontenWaktuSholatJumat("");
                                            // setKontenWarnaBgWaktuSholatJumat(null);
                                            // setKontenDisplayWarnaBgWaktuSholatJumat(false);
                                        }}
                                    >
                                        <Button onClick={(event)=> { 
                                                    
                                            }}
                                            cursor="pointer"
                                            size="sm"
                                            borderRadius={'8px'}
                                            bg="gray.200"
                                            color={textColor}
                                            fontSize="sm"
                                            _hover={{ bg: "gray.200", color: textColor }}
                                            type="button"
                                            alignContent={'center'}
                                            alignItems={'center'}
                                            w={'auto'}
                                            h={'auto'}
                                        >
                                            <Flex direction={'column'} justify="center" align="center" cursor="pointer">
                                                <Icon fontSize={{ sm: 'md', lg: 'lg' }} mt={1.5}>
                                                    <BsFileEarmarkRichtextFill/>
                                                </Icon>
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} mb={1.5}>
                                                    Gambar
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            {
                                kontenTypeWaktuSholatJumat == '1' ?
                                    <Grid mb={5} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}} verticalAlign={'middle'}>
                                        <GridItem colSpan={1}>
                                            <Flex w={'100%'}
                                                justify="start" align="center"
                                            >
                                                <Text
                                                    textAlign={'start'}
                                                    color={textColor}
                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                    fontWeight="bold"
                                                >
                                                    Warna Background
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={'100%'}
                                                    justify="end" align="end"
                                                >
                                                <Button 
                                                    size="sm" color={textColor}
                                                    onClick={() => clickKontenDisplayWarnaBgWaktuSholatJumat()}
                                                    bg={kontenWarnaBgWaktuSholatJumat}
                                                    style={{ border: '1px solid #c6c5c5' }}
                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                >{ kontenWarnaBgWaktuSholatJumat == null ? "#FFFFFF" : kontenWarnaBgWaktuSholatJumat }</Button>
                                                {
                                                    kontenDisplayWarnaBgWaktuSholatJumat ?
                                                    <ChromePicker
                                                        style={{ position: 'absolutes'}}
                                                        id="chromepickerrrr"
                                                        color={ kontenWarnaBgWaktuSholatJumat == null ? "#FFFFFF" : kontenWarnaBgWaktuSholatJumat }
                                                        onChange={(color) => {
                                                            setKontenWarnaBgWaktuSholatJumat(color.hex);
                                                        }}
                                                    />
                                                    : <></>
                                                }
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                :
                                <Flex direction={'row'}>
                                    <Button onClick={(event)=> { 
                                            event.target.value = null;
                                            handleClickKontenGambarWaktuSholatJumat();
                                        }}
                                        cursor="pointer"
                                        size="sm"
                                        borderRadius={'8px'}
                                        bg="#B3A5DA"
                                        color="white"
                                        fontSize="sm"
                                        _hover={{ bg: "gray.200", color: "#B3A5DA" }}
                                        type="button"
                                        alignContent={'center'}
                                        alignItems={'center'}
                                    >
                                        <Flex h={'100%'} justify="center" align="center" cursor="pointer">
                                            <Center w={'100%'} h={'100%'}>
                                                <Icon color={textColor} fontSize={{ sm: 'md', lg: 'lg' }}>
                                                    <FaImage/>
                                                </Icon>
                                            </Center>
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Upload Gambar
                                            </Text>
                                            <input 
                                                type='file'
                                                accept="image/*"
                                                multiple={false}
                                                style={{ display: 'none' }}
                                                ref={kontenGambarWaktuSholatJumatRef}
                                                onChange={kontenGambarWaktuSholatJumatHandler.bind(this)}
                                            />
                                        </Flex>
                                    </Button>
                                </Flex> 
                            }
                            {
                                kontenTypeWaktuSholatJumat == '1' ?
                                <>
                                <Flex direction={'column'}>
                                    {editorLoaded ? (
                                        <CKEditor
                                            config={{
                                                fontFamily: {
                                                    options: fontfam,
                                                    supportAllValues: true
                                                },
                                                fontSize: {
                                                    options: [9, 11, 13, "default", 17, 19, 21],
                                                },
                                            }}
                                            onReady={ editorRef => {
                                                editorRef.ui.getEditableElement().parentElement.insertBefore(
                                                    editorRef.ui.view.toolbar.element,
                                                    editorRef.ui.getEditableElement()
                                                );
                        
                                                editorRef = editorRef;
                                            }}
                                            onError = {
                                                (error, { willEditorRestart } ) => {
                                                    if(willEditorRestart ) {
                                                        editorRef.ui.view.toolbar.element.remove();
                                                    }
                                                }
                                            }
                                            onChange={(event, editor) => {
                                                const data = editor.getData()
                                                setKontenWaktuSholatJumat(data);
                                            }}
                                            editor={ DecoupledEditor }
                                            data = {kontenWaktuSholatJumat}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Flex>
                                </>
                                :
                                <></>
                            }
                            <Flex direction={'column'}>
                                <Alert mt={5} rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                                    <AlertIcon />
                                    <Text color={textColor} textAlign="justify" fontSize={{ sm: 'xs', lg: 'sm' }}>Jika tidak ada konten, akan tampil gambar default</Text>
                                </Alert>
                                {
                                kontenTypeWaktuSholatJumat == '1' ?
                                    <Flex w={'100%'} justify="center" align="center">
                                        {
                                            ((kontenWarnaBgWaktuSholatJumat == null || kontenWarnaBgWaktuSholatJumat == "") &&
                                            (kontenWaktuSholatJumat == null || kontenWaktuSholatJumat == "")) ? 
                                            <Flex
                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                style={{ border: '1px solid #c6c5c5' }}
                                                borderRadius="5px"
                                                w={ ((widthModal * 100) / 100) }
                                                h={ (((widthModal * 100) / 100) / 2.5) }
                                                justify="center" align="center"
                                            >
                                                <Image
                                                    objectFit='fill'
                                                    h={ (((widthModal * 100) / 100) / 2.5) }
                                                    src={ '/kaligrafi.jpeg' }
                                                />
                                            </Flex>
                                            :
                                            <Flex
                                                bg={kontenWarnaBgWaktuSholatJumat}
                                                style={{ border: '1px solid #c6c5c5' }}
                                                borderRadius="5px"
                                                w={ ((widthModal * 100) / 100) }
                                                h={ (((widthModal * 100) / 100) / 2.5) }
                                                justify="start" align="center"
                                            >
                                                <Box m={5} w={'100%'} dangerouslySetInnerHTML={{__html: kontenWaktuSholatJumat}}>
                                                    
                                                </Box>
                                            </Flex>
                                        }
                                    </Flex>
                                    :
                                    <Flex w={'100%'} justify="center" align="center">
                                        <Flex
                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                            style={{ border: '1px solid #c6c5c5' }}
                                            borderRadius="5px"
                                            w={ ((widthModal * 100) / 100) }
                                            h={ (((widthModal * 100) / 100) / 2.5) }
                                            justify="center" align="center"
                                        >
                                            <Image
                                                objectFit='fill'
                                                h={ (((widthModal * 100) / 100) / 2.5) }
                                                src={ kontenGambarWaktuSholatJumat == null ? '/kaligrafi.jpeg' : kontenGambarWaktuSholatJumat }
                                            />
                                        </Flex>
                                    </Flex>
                                }
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isCentered size={'xl'} onClose={!dialogJedaWaktuIqamahOpen} isOpen={dialogJedaWaktuIqamahOpen}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader size="sm" bg="#B3A5DA" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize={{ sm: 'xs', lg: 'md' }} color={textColor}>
                                Konten Jeda Waktu Iqamah
                            </Text>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setDialogJedaWaktuIqamahOpen(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody mb={5}>
                        <Alert rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                            <AlertIcon />
                            <Text color={textColor} textAlign="left" fontSize={{ sm: 'xs', lg: 'sm' }}>Konten ini akan tampil selama waktu mundur iqamah</Text>
                        </Alert>
                        <Flex direction="column" ref={divs}>
                            <Flex w={'100%'} justify="center" align="center">
                                <Flex
                                    style={{ border: '1px solid #c6c5c5' }}
                                    borderRadius="5px"
                                    w={ ((widthModal * 100) / 100) }
                                    h={ (((widthModal * 100) / 100) / 2.5) }
                                    justify="center" align="center"
                                    direction={'row'}
                                >
                                    <Box
                                        borderLeftRadius="5px"
                                        w={ ((widthModal * 60) / 100) }
                                        h={ (((widthModal * 100) / 100) / 2.5) }
                                        backgroundImage="url('/bgadzan3.png')"
                                        bgPosition="center"
                                        bgRepeat="no-repeat"
                                    >
                                        <Flex direction="row"
                                            w={ ((widthModal * 60) / 100) }
                                            h={ (((((widthModal * 100) / 100) / 2.5) * 70) / 100) }
                                        >
                                            <Center
                                                w={ ((widthModal * 60) / 100) }
                                                h={ (((((widthModal * 100) / 100) / 2.5) * 70) / 100) }
                                            >
                                                <Box
                                                    borderRadius="5px"
                                                    bgColor={'#999e9e9e'}
                                                    w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                    h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                >
                                                    <Center
                                                        w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                        h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                    >
                                                        <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                            0
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="5px"
                                                    w={ ((((widthModal * 60) / 100) * 2) / 100) }
                                                    h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                >
                                                </Box>
                                                <Box
                                                    borderRadius="5px"
                                                    bgColor={'#999e9e9e'}
                                                    w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                    h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                >
                                                    <Center
                                                        w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                        h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                    >
                                                        <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                            0
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    w={ ((((widthModal * 60) / 100) * 6) / 100) }
                                                    h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                >
                                                    <Center
                                                        w={ ((((widthModal * 60) / 100) * 6) / 100) }
                                                        h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                    >
                                                        <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '6xl' }} color={"#FFE606"}>
                                                            :
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="5px"
                                                    bgColor={'#999e9e9e'}
                                                    w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                    h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                >
                                                    <Center
                                                        w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                        h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                    >
                                                        <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                            0
                                                        </Text>
                                                    </Center>
                                                </Box>
                                                <Box
                                                    borderRadius="5px"
                                                    w={ ((((widthModal * 60) / 100) * 2) / 100) }
                                                    h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                >
                                                </Box>
                                                <Box
                                                    borderRadius="5px"
                                                    bgColor={'#999e9e9e'}
                                                    w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                    h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                >
                                                    <Center
                                                        w={ ((((widthModal * 60) / 100) * 22.5) / 100) - 3 }
                                                        h={ ((((((widthModal * 100) / 100) / 2.5) * 70) / 100) - 24) }
                                                    >
                                                        <Text textAlign={"center"} fontSize={{ sm: '3xl', lg: '8xl' }} color={"#FFE606"}>
                                                            0
                                                        </Text>
                                                    </Center>
                                                </Box>
                                            </Center>
                                        </Flex>
                                        <Flex direction="column"
                                            w={ ((widthModal * 60) / 100) }
                                            h={ (((((widthModal * 100) / 100) / 2.5) * 30) / 100) }
                                        >
                                            <Center>
                                                <Text textAlign={"center"} fontSize={{ sm: 'lg', lg: '3xl' }} color={"#FFF9C2"}>
                                                    Menuju Iqamah
                                                </Text>
                                            </Center>
                                        </Flex>
                                    </Box>
                                    <Box
                                        bgGradient='linear(#23283a 0%, #41475d 50%)'
                                        borderRightRadius="5px"
                                        w={ ((widthModal * 40) / 100) }
                                        h={ (((widthModal * 100) / 100) / 2.5) }
                                    >
                                        {
                                            iklanIqamah != null ?
                                            <Image
                                                objectFit='fill'
                                                borderRightRadius="5px"
                                                w={ ((widthModal * 40) / 100) }
                                                h={ (((widthModal * 100) / 100) / 2.5) }
                                                src={ iklanIqamah }
                                            />
                                            :
                                            <></>
                                        }
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} isCentered size={'xl'} onClose={!dialogWaktuSholatOpen} isOpen={dialogWaktuSholatOpen}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader size="sm" bg="#B3A5DA" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                        <Flex justify="space-between" align="center">
                            <Text fontSize={{ sm: 'xs', lg: 'md' }} color={textColor}>
                                Konten Waktu Sholat
                            </Text>
                            <CloseButton color={textColor} size="sm" fontSize={{ sm: 'xs', lg: 'sm' }} onClick={() => setDialogWaktuSholatOpen(false)}/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody mb={5}>
                        <Alert rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                            <AlertIcon />
                            <Text color={textColor} textAlign="justify" fontSize={{ sm: 'xs', lg: 'sm' }}>Konten ini akan tampil setelah jeda waktu iqamah</Text>
                        </Alert>
                        <Flex ref={divs} direction='column'>
                            <RadioGroup mb={5} defaultValue={kontenTypeWaktuSholat}>
                                <Stack spacing={4} direction='row'>
                                    <Radio value='1' 
                                        onClick={(event)=> { 
                                            setKontenTypeWaktuSholat("1");
                                            // setKontenGambarWaktuSholat(null);
                                        }}
                                    >
                                        <Button onClick={(event)=> { 
                                                    
                                            }}
                                            cursor="pointer"
                                            size="sm"
                                            borderRadius={'8px'}
                                            bg="gray.200"
                                            color={textColor}
                                            fontSize="sm"
                                            _hover={{ bg: "gray.200", color: textColor }}
                                            type="button"
                                            alignContent={'center'}
                                            alignItems={'center'}
                                            w={'auto'}
                                            h={'auto'}
                                        >
                                            <Flex direction={'column'} justify="center" align="center" cursor="pointer">
                                                <Icon fontSize={{ sm: 'md', lg: 'lg' }} mt={1.5}>
                                                    <BiText/>
                                                </Icon>
                                                <Text fontSize={{ sm: 'xs', lg: 'sm' }} mb={1.5}>
                                                    Teks
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Radio>
                                    <Radio value='2'
                                        onClick={(event)=> {
                                            setKontenTypeWaktuSholat("2");
                                            // setKontenWaktuSholat("");
                                            // setKontenWarnaBgWaktuSholat(null);
                                            // setKontenDisplayWarnaBgWaktuSholat(false);
                                        }}
                                    >
                                        <Button onClick={(event)=> { 
                                                    
                                            }}
                                            cursor="pointer"
                                            size="sm"
                                            borderRadius={'8px'}
                                            bg="gray.200"
                                            color={textColor}
                                            fontSize="sm"
                                            _hover={{ bg: "gray.200", color: textColor }}
                                            type="button"
                                            alignContent={'center'}
                                            alignItems={'center'}
                                            w={'auto'}
                                            h={'auto'}
                                        >
                                            <Flex direction={'column'} justify="center" align="center" cursor="pointer">
                                                <Icon fontSize={{ sm: 'md', lg: 'lg' }} mt={1.5}>
                                                    <BsFileEarmarkRichtextFill/>
                                                </Icon>
                                                <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }} mb={1.5}>
                                                    Gambar
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            {
                                kontenTypeWaktuSholat == '1' ?
                                    <Grid mb={5} templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)'}} verticalAlign={'middle'}>
                                        <GridItem colSpan={1}>
                                            <Flex w={'100%'}
                                                justify="start" align="center"
                                            >
                                                <Text
                                                    textAlign={'start'}
                                                    color={textColor}
                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                    fontWeight="bold"
                                                >
                                                    Warna Background
                                                </Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Flex flexDirection="column" w={'100%'}
                                                    justify="end" align="end"
                                                >
                                                <Button 
                                                    size="sm" color={textColor}
                                                    onClick={() => clickKontenDisplayWarnaBgWaktuSholat()}
                                                    bg={kontenWarnaBgWaktuSholat}
                                                    style={{ border: '1px solid #c6c5c5' }}
                                                    fontSize={{ sm: 'xs', lg: 'sm' }}
                                                >{ kontenWarnaBgWaktuSholat == null ? "#FFFFFF" : kontenWarnaBgWaktuSholat }</Button>
                                                {
                                                    kontenDisplayWarnaBgWaktuSholat ?
                                                    <ChromePicker
                                                        style={{ position: 'absolutes'}}
                                                        id="chromepickerrrr"
                                                        color={ kontenWarnaBgWaktuSholat == null ? "#FFFFFF" : kontenWarnaBgWaktuSholat }
                                                        onChange={(color) => {
                                                            setKontenWarnaBgWaktuSholat(color.hex);
                                                        }}
                                                    />
                                                    : <></>
                                                }
                                            </Flex>
                                        </GridItem>
                                    </Grid>
                                :
                                <Flex direction={'row'}>
                                    <Button onClick={(event)=> { 
                                            event.target.value = null;
                                            handleClickKontenGambarWaktuSholat();
                                        }}
                                        cursor="pointer"
                                        size="sm"
                                        borderRadius={'8px'}
                                        bg="#B3A5DA"
                                        color="white"
                                        fontSize="sm"
                                        _hover={{ bg: "gray.200", color: "#B3A5DA" }}
                                        type="button"
                                        alignContent={'center'}
                                        alignItems={'center'}
                                    >
                                        <Flex h={'100%'} justify="center" align="center" cursor="pointer">
                                            <Center w={'100%'} h={'100%'}>
                                                <Icon color={textColor} fontSize={{ sm: 'md', lg: 'lg' }}>
                                                    <FaImage/>
                                                </Icon>
                                            </Center>
                                            <Text color={textColor} fontSize={{ sm: 'xs', lg: 'sm' }}>
                                                Upload Gambar
                                            </Text>
                                            <input 
                                                type='file'
                                                accept="image/*"
                                                multiple={false}
                                                style={{ display: 'none' }}
                                                ref={kontenGambarWaktuSholatRef}
                                                onChange={kontenGambarWaktuSholatHandler.bind(this)}
                                            />
                                        </Flex>
                                    </Button>
                                </Flex> 
                            }
                            {
                                kontenTypeWaktuSholat == '1' ?
                                <>
                                <Flex direction={'column'}>
                                    {editorLoaded ? (
                                        <CKEditor
                                            config={{
                                                fontFamily: {
                                                    options: fontfam,
                                                    supportAllValues: true
                                                },
                                                fontSize: {
                                                    options: [9, 11, 13, "default", 17, 19, 21],
                                                },
                                            }}
                                            onReady={ editorRef => {
                                                editorRef.ui.getEditableElement().parentElement.insertBefore(
                                                    editorRef.ui.view.toolbar.element,
                                                    editorRef.ui.getEditableElement()
                                                );
                        
                                                editorRef = editorRef;
                                            }}
                                            onError = {
                                                (error, { willEditorRestart } ) => {
                                                    if(willEditorRestart ) {
                                                        editorRef.ui.view.toolbar.element.remove();
                                                    }
                                                }
                                            }
                                            onChange={(event, editor) => {
                                                const data = editor.getData()
                                                setKontenWaktuSholat(data);
                                            }}
                                            editor={ DecoupledEditor }
                                            data = {kontenWaktuSholat}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Flex>
                                </>
                                :
                                <></>
                            }
                            <Flex direction={'column'}>
                                <Alert mt={5} rounded={'md'} status="warning" bg={"gray.200"} mb="6">
                                    <AlertIcon />
                                    <Text color={textColor} textAlign="justify" fontSize={{ sm: 'xs', lg: 'sm' }}>Jika tidak ada konten, akan tampil gambar default</Text>
                                </Alert>
                                {
                                kontenTypeWaktuSholat == '1' ?
                                    <Flex w={'100%'} justify="center" align="center">
                                        {
                                            ((kontenWarnaBgWaktuSholat == null || kontenWarnaBgWaktuSholat == "") &&
                                            (kontenWaktuSholat == null || kontenWaktuSholat == "")) ? 
                                            <Flex
                                                bgGradient='linear(#23283a 0%, #41475d 50%)'
                                                style={{ border: '1px solid #c6c5c5' }}
                                                borderRadius="5px"
                                                w={ ((widthModal * 100) / 100) }
                                                h={ (((widthModal * 100) / 100) / 2.5) }
                                                justify="center" align="center"
                                            >
                                                <Image
                                                    objectFit='fill'
                                                    h={ (((widthModal * 100) / 100) / 2.5) }
                                                    src={ '/kaligrafi.jpeg' }
                                                />
                                            </Flex>
                                            :
                                            <Flex
                                                bg={kontenWarnaBgWaktuSholat}
                                                style={{ border: '1px solid #c6c5c5' }}
                                                borderRadius="5px"
                                                w={ ((widthModal * 100) / 100) }
                                                h={ (((widthModal * 100) / 100) / 2.5) }
                                                justify="start" align="center"
                                            >
                                                <Box m={5} w={'100%'} dangerouslySetInnerHTML={{__html: kontenWaktuSholat}}>
                                                    
                                                </Box>
                                            </Flex>
                                        }
                                    </Flex>
                                    :
                                    <Flex w={'100%'} justify="center" align="center">
                                        <Flex
                                            bgGradient='linear(#23283a 0%, #41475d 50%)'
                                            style={{ border: '1px solid #c6c5c5' }}
                                            borderRadius="5px"
                                            w={ ((widthModal * 100) / 100) }
                                            h={ (((widthModal * 100) / 100) / 2.5) }
                                            justify="center" align="center"
                                        >
                                            <Image
                                                objectFit='fill'
                                                h={ (((widthModal * 100) / 100) / 2.5) }
                                                src={ kontenGambarWaktuSholat == null ? '/kaligrafi.jpeg' : kontenGambarWaktuSholat }
                                            />
                                        </Flex>
                                    </Flex>
                                }
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
}