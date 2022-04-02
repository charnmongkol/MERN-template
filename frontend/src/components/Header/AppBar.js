import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/logos/Logo Navy Blue BG-01.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { useState } from "react";
import styled from "@emotion/styled";

const PRIMARYLIGHT = "#335377";
const Item = styled(Button)`
  background-color: ${PRIMARYLIGHT};
  color: #ffffff;
  &:hover,
  &:active,
  &:visited,
  &:link,
  &:focus {
    background-color: ${PRIMARYLIGHT};
    color: #ffffff;
  }
`;

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //navbar scroll when active state
  const [navbar, setNavbar] = useState(false);

  //navbar scroll changeBackground function
  // const changeBackground = () => {
  //   // console.log(window.scrollY);
  //   if (window.scrollY >= 66) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log(userInfo);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // useEffect(() => {
  //   changeBackground();
  //   // adding the event when scroll change background
  //   window.addEventListener("scroll", changeBackground);
  // }, [userInfo]);

  return (
    <AppBar
      position="fixed"
      color={"primary"}
      sx={{
        transition: "500ms",
        padding: 0,
        boxShadow: "none",
        height: "80px",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <img
                src={Logo}
                alt="Top of the world"
                width="100%"
                height="80px"
                style={{
                  transition: "1s",
                  objectFit: navbar ? "cover" : "fill",
                }}
              />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/posts">
                  <Typography variant="h6" textAlign="center">
                    โปรแกรมทัวร์
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link to="/">
              <img
                src={Logo}
                alt="Top of the world"
                width="90px"
                height="60px"
                style={{ objectFit: "cover" }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              href="/posts"
            >
              โปรแกรมทัวร์
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!userInfo ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Item href="/registration">REGISTER</Item>
                <Item href="/login">LOG-IN</Item>
              </Box>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={userInfo.pic} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userInfo.isAdmin == false ? (
                    <Box>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/agent/dashboard">
                          <Typography textAlign="center">Dashboard</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Button onClick={logoutHandler}>
                          <Typography textAlign="center">ออกจากระบบ</Typography>
                        </Button>
                      </MenuItem>
                    </Box>
                  ) : (
                    <Box>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/admin/myposts">
                          <Typography textAlign="center">Dashboardd</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Button onClick={logoutHandler}>
                          <Typography textAlign="center">ออกจากระบบ</Typography>
                        </Button>
                      </MenuItem>
                    </Box>
                  )}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
