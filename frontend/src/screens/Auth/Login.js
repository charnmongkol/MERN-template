import React, { useEffect, useState, lazy, Suspense } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/actions/userActions";
import Input from "../../components/Controls/Input";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import ErrorMessage from "../../components/ErrorMessage";
import ResponsiveAppBar from "../../components/Header/AppBar";
import Notification from "../../components/Notification/Notification";
import NotiPopup from "../../components/Modal/NotiPopup";

const Footer = lazy(() => import("../../components/Footer/Footer"));

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [popup, setPopup] = useState({
    openPopup: false,
    setOpenPopup: "",
    title: "",
    children: "",
  });

  //hook to call useActions
  const dispatch = useDispatch();

  //hook to call a state
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //password
  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //route to page if user login success
  useEffect(() => {
    if (userInfo) {
      if (userInfo.status === true) {
        history("/");
      } else if (userInfo.status === false) {
        dispatch(logout());
        setPopup({
          openPopup: true,
          setOpenPopup: "",
          title: "warning",
          children: "รอการอนุมัติบัญชีของคุณ",
        });
      }
    }
  }, [history, userInfo, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();

    //do action from Actions using Dispatch()
    if (email && password.password) {
      dispatch(login(email, password.password));
    }
  };

  return (
    <Container maxWidth="lg">
      <ResponsiveAppBar />
      <Paper
        elevation={10}
        sx={{
          mt: "100px",
          mx: "auto",
          flexGrow: 1,
          p: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 3,
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Box sx={{ alignSelf: "center" }}>
          <Typography variant="h2" component="h4">
            LOG IN
          </Typography>
          {error && <ErrorMessage variant="error">{error}</ErrorMessage>}
        </Box>
        <Box component="form" onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Input
                label="อีเมลล์"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  รหัสผ่าน
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={password.showPassword ? "text" : "password"}
                  value={password.password}
                  onChange={handleChange("password")}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="รหัสผ่าน"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
              >
                เข้าสู่ระบบ
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <Typography variant="subtitle1" gutterBottom component="div">
            สมัครเป็นAgent
            <Button href="/registration">คลิ๊กที่นี่</Button>
          </Typography>
        </Box>
      </Paper>
      <NotiPopup popup={popup} setPopup={setPopup} />
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default Login;
