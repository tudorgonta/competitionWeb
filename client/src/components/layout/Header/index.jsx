import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Logo + Icons + Button
import Button from "../../UI/Button";
import { LogoNew } from "../../logo/LogoNew";
import Lock from "../../svg/Lock";
import Logout from "../../svg/Logout";
import User from "../../svg/User";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

// Drawer Footer components and constants
import Payments from "../Footer/Payments";
import Socials from "../Footer/Socials";
import FOOTER_LINKS from "../Footer/constants";

// Constants
import { DRAWER_MENU, HEADER_MENU, PUBLIC_MENU } from "./constants";

// Styles
import styles from "./styles.module.css";

const Header = () => {

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorSettings, setAnchorSettings] = useState(null);

  // TODO: take from user redux after persist was added
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const isAuth = !!currentUser?.user_id;

  const menuOptions = useMemo(
    () => [
      {
        label: "User Dashboard",
        path: `/profile/${currentUser?.user_id || ""}`,
        icon: <User />,
      },
      ...HEADER_MENU,
    ],
    [isAuth, currentUser]
  );


  const drawerMenuOptions = useMemo(
    () => [
      {
        label: "User Dashboard",
        path: `/profile/${currentUser?.user_id || ""}`,
        icon: <AccountCircleOutlinedIcon />,
      },
      ...DRAWER_MENU,
    ],
    [isAuth]
  );

  const handleOpenUserMenu = (event) => {
    setAnchorSettings(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorSettings(null);
  };

  const content = isMobile ? (
    <Box className={styles.rightSideContainer}>
      <IconButton
        className={styles.menuButton}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  ) : (
    <>
      <Box className={styles.rightSideContainer}>

        <Divider orientation="vertical" />

        {isAuth && (
          <Box>
            <Tooltip title={'Open Settings'}>
              <IconButton
                color="secondary"
                onClick={handleOpenUserMenu}
                aria-label={'Open Settings'}
              >
                <Avatar alt="User avatar" src={currentUser?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              data-mui-color-scheme={theme.palette.mode}
              className={styles.userMenu}
              classes={{
                paper: styles.userMenu__paper,
                list: styles.userMenu__list,
              }}
              anchorEl={anchorSettings}
              open={Boolean(anchorSettings)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                className={clsx(
                  styles.userMenu__item,
                  styles.userMenu__item_user
                )}
              >
                <Avatar alt="User avatar" src={currentUser?.avatar} />
              </MenuItem>
              {menuOptions.map(({ label, path, icon }) => (
                <MenuItem
                  key={label}
                  className={styles.userMenu__item}
                  onClick={handleCloseUserMenu}
                >
                  <Link className={styles.userMenu__anchor} to={path}>
                    {icon} {label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {!isAuth && (
          <Button
            onClick={() => navigate("/login")}
            aria-label={'Login'}
          >
            Login
          </Button>
        )}
      </Box>
    </>
  );

  return (
    <AppBar className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <Container className={styles.container} disableGutters>
          <Box
            className={styles.logoContainer}
            component={Link}
            to={"/"}
            aria-label="Homepage"
          >
            <LogoNew />
            <Box>
              <Typography variant="h1" className={styles.heading}>
                WinComps
              </Typography>
              <Typography className={styles.subheading}>
                Buy tickets and Win prizes
              </Typography>
            </Box>
          </Box>
          {content}
          <Drawer
            data-mui-color-scheme="dark"
            classes={{ paper: styles.drawerPaper }}
            variant="temporary"
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box className={styles.drawerContainer}>
              <Box className={styles.drawerContainer__header}>
                <Box>
                  <Typography variant="h1" className={styles.heading}>
                    WinComps
                  </Typography>
                  <Typography className={styles.subheading}>
                    Buy tickets and Win prizes
                  </Typography>
                </Box>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <CloseIcon className={styles.drawerContainer__closeIcon} />
                </IconButton>
              </Box>
              {!isAuth && (
                <Box className={styles.drawerContainer__createAccountContainer}>
                  <Typography
                    variant="body1"
                    className={styles.drawerContainer__createAccount}
                  >
                    <Link
                      to="/register"
                      className={styles.drawerContainer__createAccountAnchor}
                    >
                      Register
                    </Link>
                    , to be able to use all the features of the site
                  </Typography>
                </Box>
              )}

              <Box
                className={clsx(
                  styles.drawerContainer__drawerMenu,
                  !isAuth && styles.drawerContainer__drawerMenu_border
                )}
              >
                <MenuList>
                  {drawerMenuOptions.map(({ label, path, icon, color }) => (
                    <MenuItem
                      key={label}
                      sx={{ color }}
                      className={styles.drawerContainer__drawerMenuItem}
                    >
                      <Link to={isAuth ? path : "#"}>
                        {icon}
                        {label}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
                {!isAuth && (
                  <Box className={styles.drawerContainer__lock}>
                    <Lock />
                  </Box>
                )}
              </Box>

              <Divider className={styles.drawerFooter__drawerDivider} />

              {!!PUBLIC_MENU.length && (
                <MenuList className={styles.drawerContainer__drawerPublicMenu}>
                  {PUBLIC_MENU.map(({ label, path, icon }) => (
                    <MenuItem
                      key={label}
                      className={styles.drawerContainer__drawerMenuItem}
                    >
                      <Link to={path}>
                        {icon}
                        {label}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
              )}

              {!isAuth && (
                <Button
                  className={styles.drawerContainer__loginButton}
                  onClick={() => {
                    navigate("/login");
                    setDrawerOpen(false);
                  }}
                  fullWidth
                >
                  Login
                </Button>
              )}

              <Box className={styles.drawerFooter}>
                {isAuth && (
                  <Box className={styles.drawerFooter__logout}>
                    <Link to="/logout">
                      <Logout />
                        Logout
                    </Link>
                  </Box>
                )}
                <Divider className={styles.drawerFooter__drawerDivider} />
                <Box
                  className={styles.drawerFooter__bottomAnchors}
                  component="nav"
                >
                  {FOOTER_LINKS.main.map(({ label, path }) => (
                    <Link
                      key={label}
                      className={styles.drawerFooter__bottomAnchor}
                      to={path}
                    >
                      {label}
                    </Link>
                  ))}
                </Box>
                <Socials className={styles.drawerFooter__socials} />
                <Payments />
                <Box className={styles.drawerFooter__placeholder} />
              </Box>
            </Box>
          </Drawer>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
