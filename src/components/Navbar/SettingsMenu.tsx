import React, { useContext } from "react";
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import '../../css/Navbar.css';
import { UserInformationContext } from "../../store/Login-context";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SettingsMenu = () => {
    const userContext = useContext(UserInformationContext);
    const isMobile = useMediaQuery('(max-width:600px)');

    if (!userContext) {
        return null;
    }

    const { logOutFunction } = userContext;

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logOutFunction();
        handleCloseUserMenu();
    };

    return (
        <Box className="navbar-settings">
            <Tooltip title={isMobile ? "" : "Open settings"}>
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={AccountCircleIcon}
                        className="navbar-avatar"
                        sx={isMobile ? { width: 30, height: 30 } : { width: 40, height: 40 }}
                    />
                </IconButton> */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        className="navbar-avatar"
                        sx={isMobile ? { width: 30, height: 30 } : { width: 40, height: 40 }}
                    >
                        <AccountCircleIcon sx={{ fontSize: isMobile ? 30 : 40 }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="navbar-settings-menu"
            >
                <MenuItem onClick={handleLogout}>
                    <Typography className="navbar-setting-item">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default SettingsMenu;
