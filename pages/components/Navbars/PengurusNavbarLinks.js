import { BellIcon } from "@chakra-ui/icons";
import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    Icon
} from "@chakra-ui/react";
import { ProfileIcon } from "../../../theme/components/Icons/Icons";
import { ItemContent } from "../../../theme/components/Menu/ItemContent";
import { SidebarResponsive } from "../../../theme/components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import routes from "../../../lib/routes.js";
// import { supabaseClient } from "../../../lib/client";
import {
    FaPowerOff,
    FaBell,
    FaIdBadge
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeaderLinks(props) {
    const { variant, children, fixed, secondary, onOpen, ...rest } = props;
    let mainText = useColorModeValue("gray.700", "gray.200");
    // let navbarIcon = useColorModeValue("gray.500", "gray.200");
    let navbarIcon = "white";

    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    let history = useHistory();

    if (secondary) {
        navbarIcon = "white";
        mainText = "white";
    }

    const logoutHandler = async () => {
        try {
            setIsLogoutLoading(true);
        await supabaseClient.auth.signOut();
            history.push('/auth/signin');
        } catch (error) {
            history.push('/auth/signin');
        } finally {
            localStorage.removeItem('users');
            localStorage.removeItem('cluster_id');
            setIsLogoutLoading(false);
        }
    };

    return (
        <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
        >
            <SidebarResponsive logoText={props.logoText} secondary={props.secondary} />
            <NavLink to="/auth/signin" style={{ paddingLeft: '16px' }}>
                <Button
                    variant="transparent-with-icon"
                    leftIcon={<Icon as={FaPowerOff} color={navbarIcon} w="16px" h="16px" me="0px" />}
                    onClick={logoutHandler} 
                    isLoading={isLogoutLoading}
                    color={'white'}
                >
                    Sign Out
                </Button>
            </NavLink>
        </Flex>
    );
}

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
};
