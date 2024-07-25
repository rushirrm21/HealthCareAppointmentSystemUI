import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavigationBar() {
  const userName =
    sessionStorage.getItem("firstName") +
    " " +
    sessionStorage.getItem("lastName");
  const emailId = sessionStorage.getItem("email");
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand
          href="#home"
          style={{ marginLeft: "-70px", color: "white" }}
        >
          <b>Healthcare Appointment System</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={userName} id="username">
              <NavDropdown.Item disabled="true">{emailId}</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
