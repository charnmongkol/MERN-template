import { CardMedia } from "@mui/material";
import { List } from "@mui/material";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneEnabledRoundedIcon from "@mui/icons-material/PhoneEnabledRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Sidebar.css";
import { Card } from "@mui/material";
import { Link } from "@mui/material";

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(userInfo);

  return (
    <Box
      display={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          alt={userInfo.name}
          height="300"
          image={userInfo.pic}
          sx={{ p: 2 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {userInfo.name}
          </Typography>
          <List>
            <ListItem disablePadding sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <EmailRoundedIcon />
              </ListItemIcon>
              <ListItemText secondary={userInfo.email} />
            </ListItem>
            <ListItem disablePadding sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <PhoneEnabledRoundedIcon />
              </ListItemIcon>
              <ListItemText secondary={userInfo.phoneNumber} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: "24px" }}>
                  <WebRoundedIcon />
                </ListItemIcon>
                <Link href={userInfo.website} underline="hover" target="_blank">
                  <ListItemText secondary={userInfo.website} />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Sidebar;
