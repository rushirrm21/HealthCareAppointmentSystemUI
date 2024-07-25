import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function AppointmentCard({ appointment, onCancel }) {
  const navigate = useNavigate();

  const {
    appointmentId,
    appointmentWithDr,
    appointmentWithDrSpecality,
    appointmentDate,
    appointmentTime,
    appointmentStatus,
  } = appointment;

  return (
    <Card className="mb-2 pb-0">
      <Card.Body>
        <div className="d-flex align-items-start justify-content-between">
          <h5>
            {appointmentWithDr}{" "}
            <span className="text-muted" style={{ fontSize: "1rem" }}>
              ({appointmentWithDrSpecality})
            </span>
          </h5>
          <Badge pill bg="success">
            {appointmentStatus}
          </Badge>
        </div>

        <p className="text-muted d-flex pb-0">
          {appointmentDate} {appointmentTime}
        </p>
        <p style={{ paddingRight: "310px" }}>
          <Button variant="danger" onClick={() => onCancel(appointmentId)}>
            Cancel
          </Button>
        </p>
      </Card.Body>
    </Card>
  );
}

export default AppointmentCard;
