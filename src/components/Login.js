import React, { useState } from "react";
import useFetch from "../api/useFetch";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { ToastConfig } from "../utils/ToastConfig";

const Login = (props) => {
  const navigate = useNavigate();

  //for input errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { loginPatient } = useFetch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    let loginDetails = {
      emailId: email,
      password: password,
    };
    console.log(loginDetails);
    if (
      email !== "" &&
      password !== "" &&
      emailError === "" &&
      passwordError === ""
    ) {
      const response = await loginPatient(loginDetails)
        .then((response) => {
          if (response.data.status === true) {
            console.log(response.data);
            sessionStorage.setItem("email", response.data.emailId);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("firstName", response.data.firstName);
            sessionStorage.setItem("lastName", response.data.lastName);

            // Cookies.set('token', response.data.token, { signed: true })

            console.log(sessionStorage.getItem("email"));
            console.log(sessionStorage.getItem("token"));
            toast.success(
              "Login successfull, Welcome to Heathcare Appointment System",
              ToastConfig
            );
            navigate("/home");
          }
        })
        .catch((request) => {
          toast.error(
            "Invalid credentials, Please enter correct username or password",
            ToastConfig
          );
        });
    } else {
      toast.error("All the input fields are mandatory", ToastConfig);
    }
  };

  const isEmailValidRegex = (email) => {
    const pattern = /[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return pattern.test(email);
  };

  const isEmailValid = () => {
    const isEValid = email && isEmailValidRegex(email);
    setEmailError(isEValid ? "" : "Invalid Email Id");
  };

  const isPasswordvalidRegex = (password) => {
    const pattern =
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,20}).*$/;
    return pattern.test(password);
  };

  const isPasswordValid = () => {
    const isPassValid = password && isPasswordvalidRegex(password);
    setPasswordError(isPassValid ? "" : "Strong password required");
  };

  return (
    <Container className="pt-5">
      <center>
        {/* <ToastContainer /> */}
        <Card
          border="secondary"
          style={{ width: "21rem", background: "#74c4b6" }}
        >
          <Card.Header style={{ background: "#3ec2aa" }}>
            <h4>
              <b>Login</b>
            </h4>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ paddingRight: "230px" }}>
                    Email Id<span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onBlur={isEmailValid}
                    onFocus={() => setEmailError("")}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span>{emailError}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ paddingRight: "235px" }}>
                    Password<span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onBlur={isPasswordValid}
                    onFocus={() => setPasswordError("")}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span>{passwordError}</span>
                </Form.Group>

                <Button variant="success" type="submit" onClick={onSubmit}>
                  Submit
                </Button>
                <br />
                <a href="/">Sign up?</a>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </center>
    </Container>
  );
};

export default Login;
