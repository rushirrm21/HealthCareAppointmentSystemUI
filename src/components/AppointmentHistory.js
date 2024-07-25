import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import useFetch from "../api/useFetch";
import AppointmentHistoryCard from "./AppointmentHistoryCard";

const AppointmentHistory = (props) => {
  const { getAppointmentsHistory } = useFetch();

  const [appointmentList, setAppointmentList] = useState([]);

  const emailId = sessionStorage.getItem("email");

  const fetchAppointments = async (emailId) => {
    try {
      const response = await getAppointmentsHistory(emailId);
      setAppointmentList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  useEffect(() => {
    if (appointmentList.length === 0 && emailId) {
      fetchAppointments(emailId);
    }
  }, []);

  let appointmentContainer = <h5>No appointments history found</h5>;

  if (appointmentList.length > 0) {
    appointmentContainer = appointmentList.map((appointment) => {
      return <AppointmentHistoryCard appointment={appointment} />;
    });
  }

  return (
    <Container className="pt-5">
      <center>
        <Card
          border="secondary"
          style={{ width: "28rem", background: "#778da9" }}
        >
          <Card.Header style={{ background: "#415a77" }}>
            <h4>
              <b style={{ color: "white" }}>Your Appointments</b>
            </h4>
          </Card.Header>
          <Card.Body
            style={{ maxHeight: "calc(100vh - 180px)", overflowY: "scroll" }}
          >
            <Card.Text>
              <Form>{appointmentContainer}</Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </center>
    </Container>
  );
};

export default AppointmentHistory;
