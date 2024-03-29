import React, { lazy, Suspense } from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import zones from "../../conf/zones.json";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allUsersForAdmin } from "../../redux/actions/userActions";
import { useState } from "react";
import ResponsiveAppBar from "../../components/Header/AppBar";

const AgentCard = lazy(() => import("../../components/AgentCard/AgentCard"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
  borderRadius: "30px",
}));

const AllAgents = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.allUsers);
  const { loading, allUsers, error } = users;

  useEffect(() => {
    dispatch(allUsersForAdmin());
  }, [dispatch]);

  const [agents, setAgents] = useState("");

  useEffect(() => {
    if (allUsers) {
      setAgents(allUsers);
    }
  }, [allUsers]);

  const filterResult = (zoneCode) => {
    const result = allUsers.filter((data) => {
      return data.zone === zoneCode;
    });
    setAgents(result);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1, mt: "100px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {zones.map((item, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <Button
                variant="text"
                onClick={() => filterResult(`${item.code}`)}
                fullWidth
                sx={{
                  boxShadow: "none",
                  backgroundColor: "none",
                  borderRadius: "30px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Item>{item.zone}</Item>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider light sx={{ my: 5 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <AgentCard agents={agents} />
        </Suspense>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default AllAgents;
