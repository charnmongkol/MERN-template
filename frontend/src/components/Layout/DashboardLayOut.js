import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ReceiptIcon from "@mui/icons-material/Receipt";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";

const adminMenus = [
  {
    display: "หน้าหลัก",
    icon: <HomeRoundedIcon />,
    to: "/",
    cName: "nav-text",
    section: "started",
  },
  {
    display: "โปรไฟล์",
    icon: <AccountCircleRoundedIcon />,
    to: "/admin/profile",
    cName: "nav-text",
    section: "started",
  },
  {
    display: "โปรแกรมทัวร์",
    icon: <ListAltIcon />,
    to: "/admin/myposts",
    cName: "nav-text",
    section: "started",
  },
  {
    display: "เอเจนซี่",
    icon: <GroupIcon />,
    to: "/admin/all-users",
    cName: "nav-text",
    section: "calendar",
  },
  {
    display: "คำสั่งจอง",
    icon: <ReceiptIcon />,
    to: "/admin/allbills",
    cName: "nav-text",
    section: "user",
  },
];

const drawerWidth = 240;

function DashboardLayOut(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        {adminMenus.map((menu, index) => (
          <Link to={menu.to} key={index}>
            <ListItem button key={menu}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.display} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {props.title && (
            <Typography variant="h6" noWrap component="div">
              {props.title}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

DashboardLayOut.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashboardLayOut;
