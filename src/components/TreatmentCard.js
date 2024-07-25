import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

function TreatmentCard({ treatment }) {
  const navigate = useNavigate();

  const {
    providerName,
    providerSpecality,
    treatmentGiven,
    treatmentDiagnosis,
    treatmentDateTime,
    treatmentStatus,
  } = treatment;

  return (
    <Card className="mb-2 pb-0">
      <Card.Body>
        <div className="d-flex align-items-start justify-content-between">
          <h5>
            {providerName}{" "}
            <span className="text-muted" style={{ fontSize: "1rem" }}>
              ({providerSpecality})
            </span>
          </h5>
          <Badge pill bg="success">
            {treatmentStatus}
          </Badge>
        </div>

        <p className="text-muted d-flex pb-0">
          {treatmentDiagnosis}
          <br />
          {treatmentGiven}
        </p>
        {treatmentDateTime}
      </Card.Body>
    </Card>
  );
}

export default TreatmentCard;
