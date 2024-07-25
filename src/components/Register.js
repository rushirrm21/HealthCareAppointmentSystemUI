import React, { useState } from "react";
import useFetch from "../api/useFetch";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Register.css";
import { ToastConfig } from "../utils/ToastConfig";

const Register = (props) => {
  const { registerPatient } = useFetch();

  const navigate = useNavigate();

  //for input values
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  //for input errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

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

  const isNamevalidRegex = (name) => {
    const pattern = /^[A-Z,a-z]+$/;
    return pattern.test(name);
  };

  const isFirstNameValid = () => {
    const isNameV = firstName && isNamevalidRegex(firstName);
    setFirstNameError(isNameV ? "" : "Invalid First Name");
  };

  const isLastNameValid = () => {
    const isNameV = lastName && isNamevalidRegex(lastName);
    setLastNameError(isNameV ? "" : "Invalid Last Name");
  };

  const onSubmit = async () => {
    let registrationDetails = {
      emailId: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    console.log(registrationDetails);
    if (
      email !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      password !== "" &&
      emailError === "" &&
      passwordError === "" &&
      firstNameError === "" &&
      lastNameError === ""
    ) {
      const response = await registerPatient(registrationDetails);
      console.log(response);
      if (response.data.status === "Registered") {
        toast.success("Patient registered successfully", ToastConfig);
        navigate("/login");
      } else if (response.data.status === "AlreadyRegistered") {
        toast.error("You are already registered, Please sign in", ToastConfig);
        navigate("/");
      } else {
        toast.error("Patient registration unsuccessfull", ToastConfig);
      }
    } else {
      toast.error("All the input fileds are mandatory", ToastConfig);
    }
  };

  return (
    <>
      <Container className="pt-3">
        <center>
          <Card
            border="secondary"
            style={{ width: "21rem", background: "#74c4b6" }}
          >
            <Card.Header style={{ background: "#3ec2aa" }}>
              <h4>
                <b>Register</b>
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
                      type="text"
                      placeholder="Enter email"
                      value={email}
                      onBlur={isEmailValid}
                      onFocus={() => setEmailError("")}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>{emailError}</span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ paddingRight: "225px" }}>
                      Password<span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onBlur={isPasswordValid}
                      onFocus={() => setPasswordError("")}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>{passwordError}</span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ paddingRight: "210px" }}>
                      First Name<span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="firstName"
                      value={firstName}
                      onBlur={isFirstNameValid}
                      onFocus={() => setFirstNameError("")}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span>{firstNameError}</span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ paddingRight: "210px" }}>
                      Last Name<span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="lastName"
                      value={lastName}
                      onBlur={isLastNameValid}
                      onFocus={() => setLastNameError("")}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <span>{lastNameError}</span>
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={onSubmit}>
                    Submit
                  </Button>
                  <br />
                  <a href="/login">Already have an account ?</a>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </center>
      </Container>
    </>
  );
};

export default Register;
