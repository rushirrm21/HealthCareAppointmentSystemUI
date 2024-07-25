import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import useFetch from "../api/useFetch";
import AppointmentCard from "./AppointmentCard";
import { ToastConfig } from "../utils/ToastConfig";

export default function UpcomingAppoinments() {
  const { getAppointmentsScheduled, deleteAppointmentsScheduled } = useFetch();

  const [appointmentList, setAppointmentList] = useState([]);

  const emailId = sessionStorage.getItem("email");

  const fetchAppointments = async (emailId) => {
    try {
      const response = await getAppointmentsScheduled(emailId);
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

  const cancelAppointment = async (cancelId) => {
    const confirmation = window.confirm(
      "Do you want to cancel this appointment, this can't be undone"
    );
    if (confirmation) {
      console.log(cancelId);
      const response = await deleteAppointmentsScheduled(cancelId);
      if (response.data) {
        setAppointmentList(
          appointmentList.filter(
            (appointment) => appointment.appointmentId !== cancelId
          )
        );
        toast.success("Appointment has been cancelled", ToastConfig);
      }
    }
  };

  let appointmentContainer = <h5>No appointments scheduled</h5>;

  if (appointmentList.length > 0) {
    appointmentContainer = appointmentList.map((appointment) => {
      return (
        <AppointmentCard
          appointment={appointment}
          onCancel={cancelAppointment}
        />
      );
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
              <b style={{ color: "white" }}>Your Upcoming Appointments</b>
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
}
