import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography, Link, useMediaQuery, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from "react";
import '../../css/Navbar.css';
import SettingsMenu from "./SettingsMenu";
import { UserInformationContext } from "../../store/Login-context";

const Navbar = () => {
    const userContext = useContext(UserInformationContext);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const isMobile = useMediaQuery('(max-width:900px)');

    if (!userContext) {
        return null;
    }

    const { isAuthenticated } = userContext;

    const pages = ['Home', 'About', 'Services'];
    const pageLinks = ['/Resume_filter_project/', '/Resume_filter_project/about', '/Resume_filter_project/services'];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" className="navbar-appbar">
            <Container maxWidth="xl">
                <Toolbar disableGutters className="navbar-toolbar">
                    <Box className="navbar-main-root">
                        <h2 className="navbar-logo-text">Resume Filteration</h2>
                        {/* <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            className="navbar-logo-text"
                        >
                            Resume Filteration
                        </Typography> */}
                    </Box>

                    {isMobile ? (
                        <>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link href={pageLinks[index]}>
                                            <Typography>{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                                {!isAuthenticated && (
                                    <>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Link href="/signup">
                                                <Typography>SignUp</Typography>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Link href="/login">
                                                <Typography>LogIn</Typography>
                                            </Link>
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </>
                    ) : (
                        <Box className="navbar-links">
                            {pages.map((page, index) => (
                                <Link href={pageLinks[index]}>
                                    <Button key={page} className="navbar-link-btn">
                                        {page}
                                    </Button>
                                </Link>
                            ))}
                            {!isAuthenticated && (
                                <>
                                    <Link href="/Resume_filter_project/signup">
                                        <Button className="navbar-link-btn">SignUp</Button>
                                    </Link>
                                    <Link href="/Resume_filter_project/login">
                                        <Button className="navbar-link-btn">LogIn</Button>
                                    </Link>
                                </>
                            )}
                        </Box>
                    )}
                    {isAuthenticated && <SettingsMenu />}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
