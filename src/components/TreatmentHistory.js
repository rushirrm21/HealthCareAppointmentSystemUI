import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import useFetch from "../api/useFetch";
import AppointmentHistoryCard from "./AppointmentHistoryCard";
import TreatmentCard from "./TreatmentCard";

const TreatementHistory = (props) => {
  const { getTreatmentHistory } = useFetch();

  const [treatmentList, setTreatmentList] = useState([]);

  const emailId = sessionStorage.getItem("email");

  const fetchTreatments = async (emailId) => {
    try {
      const response = await getTreatmentHistory(emailId);
      setTreatmentList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  useEffect(() => {
    if (treatmentList.length === 0 && emailId) {
      fetchTreatments(emailId);
    }
  }, []);

  let treatmentContainer = <h5>No treatment history found</h5>;

  if (treatmentList.length > 0) {
    treatmentContainer = treatmentList.map((treatment) => {
      return <TreatmentCard treatment={treatment} />;
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
              <b style={{ color: "white" }}>Your Treatment History</b>
            </h4>
          </Card.Header>
          <Card.Body
            style={{ maxHeight: "calc(100vh - 180px)", overflowY: "scroll" }}
          >
            <Card.Text>
              <Form>{treatmentContainer}</Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </center>
    </Container>
  );
};

export default TreatementHistory;
