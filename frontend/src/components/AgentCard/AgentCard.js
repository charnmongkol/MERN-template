import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import Box from "@mui/material/Box";
import { minHeight } from "@mui/system";

const CardTitle = ({ children }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h6">{children}</Typography>
    </Box>
  );
};
const AgentCard = ({ agents }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {agents &&
        agents.map((agent, index) => (
          <Grid item xs={4} sm={12} md={3} key={index}>
            <Card
              sx={{
                borderRadius: "12px",
                backgroundColor: "#e8f4fd",
                height: "500px",
              }}
            >
              <CardHeader
                sx={{ height: "68px" }}
                title={<CardTitle>{agent.name}</CardTitle>}
              />

              <CardMedia
                component="img"
                height="194"
                alt={agent.name}
                image={agent.pic}
              />
              <CardContent>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{ flexWrap: "wrap" }}
                      component="a"
                      href={`tel:${agent.phoneNumber}`}
                    >
                      <ListItemIcon>
                        <PhoneAndroidRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={agent.phoneNumber} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ flexWrap: "wrap" }}>
                      <ListItemIcon>
                        <EmailRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={agent.email} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ flexWrap: "wrap" }}>
                      <ListItemIcon>
                        <LanguageRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={agent.website} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default AgentCard;
