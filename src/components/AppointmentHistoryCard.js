import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function AppointmentHistoryCard({ appointment }) {
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
          {appointmentStatus === "Confirmed" ? (
            <Badge pill bg="success">
              {appointmentStatus}
            </Badge>
          ) : appointmentStatus === "Cancelled" ? (
            <Badge pill bg="danger">
              {appointmentStatus}
            </Badge>
          ) : (
            <Badge pill bg="info">
              {appointmentStatus}
            </Badge>
          )}
        </div>

        <p className="text-muted d-flex pb-0">
          {appointmentDate} {appointmentTime}
        </p>
      </Card.Body>
    </Card>
  );
}

export default AppointmentHistoryCard;
