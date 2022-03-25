import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";

const LoginScreen = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hook to call useActions
  const dispatch = useDispatch();

  //hook to call a state
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //route to page if user login success
  useEffect(() => {
    if (userInfo) {
      history("/");
    }
    // if (userInfo.isAdmin === true) {
    //   history("/myposts");
    // } else if (userInfo.status === false) {
    //   history("/");
    // }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    //do action from Actions using Dispatch()
    dispatch(login(email, password));
  };

  return (
    <div className="banner login">
      <Row className="overlay d-flex align-items-center">
        <Col>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler} className="w-50 m-auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <Row className="py-3">
            <Col className="text-center">
              New Agent ? <Link to="/registration">Register Here</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LoginScreen;
