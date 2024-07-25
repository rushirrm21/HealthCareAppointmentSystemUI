import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../api/useFetch";
import "../styles/Appointment.css";
import { useNavigate } from "react-router-dom";
import { ToastConfig } from "../utils/ToastConfig";

function convertTo12(time) {
  const [hours, minutes, seconds] = time.split(":");
  let convertedTime = "";
  let period = "";

  if (hours > 12) {
    convertedTime = hours - 12;
    period = "PM";
  } else if (hours === "00") {
    convertedTime = 12;
    period = "AM";
  } else if (hours === "12") {
    convertedTime = 12;
    period = "PM";
  } else {
    convertedTime = hours;
    period = "AM";
  }

  return `${convertedTime}:${minutes} ${period}`;
}

function convertTo24(time) {
  const [hours, minutesPeriod] = time.split(":");
  const [minutes, period] = minutesPeriod.split(" ");
  let convertedTime = "";

  if (period === "PM" && hours !== "12") {
    convertedTime = Number(hours) + 12;
  } else if (period === "AM" && hours === "12") {
    convertedTime = "00";
  } else {
    convertedTime = hours;
  }

  return `${convertedTime}:${minutes}:00`;
}

const BookAppointment = (props) => {
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [selectedProvider, setSelectedProvider] = useState("Select Provider");
  const [selectedTime, setSelectedTime] = useState("defaultSelection");
  const [selectedDate, setSelectedDate] = useState(null);

  const [disabledProvider, setDisabledProvider] = useState(false);
  const [disabledDatePicker, setDisabledDatePicker] = useState(true);
  const [disabledTimePicker, setDisabledTimePicker] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

  const { getProviders, bookAppointment, getTimeSlots } = useFetch();

  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response.data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const HandleReset = async () => {
    if (disabledProvider) {
      window.location.reload();
    }
  };

  const handleOnProviderClick = (providerId) => {
    setSelectedProvider(providerId);
    if (providerId !== "defaultSelection") {
      setDisabledDatePicker(false);
    }
  };

  const handleOnTimeClick = (time) => {
    setSelectedTime(time);
    setDisabledButton(false);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots();
    }
  }, [selectedDate]);

  const fetchTimeSlots = async () => {
    let appointmentDetailsForTimeSlots = {
      providerId: selectedProvider,
      appointmentDate: selectedDate,
    };

    const { data } = await getTimeSlots(appointmentDetailsForTimeSlots);
    const convertedTimes = data.map(({ appointmentTime }) => {
      return { appointmentTime: convertTo12(appointmentTime) };
    });
    setTimeSlots(convertedTimes);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setDisabledTimePicker(false);
    setDisabledProvider(true);
    setSelectedTime("defaultSelection");
  };

  const onSubmit = async () => {
    setDisabledButton(true);
    let appointmentDetails = {
      patientEmail: sessionStorage.getItem("email"),
      providerId: selectedProvider,
      appointmentDate: selectedDate,
      appointmentTime: convertTo24(selectedTime),
    };
    if (
      selectedProvider === "Select Provider" ||
      selectedTime === "defaultSelection"
    ) {
      toast.warn("Please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const response = await bookAppointment(appointmentDetails)
        .then((response) => {
          if (response.data.appointmentStatus === "Confirmed") {
            toast.success("Appointment booked successfully", ToastConfig);
            navigate("/home");
          } else if (response.data.appointmentStatus === "SameDayTime") {
            toast.error(
              "Sorry, your appointment booking has been declined as you can't meet more than one provider on same day and same time",
              ToastConfig
            );
          } else if (response.data.appointmentStatus === "BeforeCurrentTime") {
            toast.error(
              "Please select Date and Time that is after current date and time",
              ToastConfig
            );
          } else if (response.data.appointmentStatus === "AfterThreeMonths") {
            toast.error(
              "Please select Date and Time that is in between 3 months from now",
              ToastConfig
            );
          } else if (response.data.appointmentStatus === "SameProvider") {
            toast.error(
              "You have already booked appointment with the same provider",
              ToastConfig
            );
          }
          else {
            toast.error(
              "Somethings went wrong please try again",
              ToastConfig
            );
          }
        })
        .catch((request) => {
          toast.error("Appointment booking unsuccessfull", ToastConfig);
        });
    }
  };

  return (
    <>
      <Container className="pt-5">
        <center>
          {/* <ToastContainer /> */}
          <Card
            border="secondary"
            style={{ width: "21rem", background: "#778da9" }}
          >
            <Card.Header style={{ background: "#415a77" }}>
              <h4>
                <b>Book Appointment</b>
              </h4>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <select
                      className="w-100 py-2"
                      disabled={disabledProvider}
                      onChange={(e) => handleOnProviderClick(e.target.value)}
                      defaultValue="defaultSelection"
                    >
                      <option value="defaultSelection" disabled>
                        Select Provider
                      </option>
                      {providers.map((provider) => {
                        const {
                          providerId,
                          providerFirstName,
                          providerLastName,
                          providerSpecailty,
                        } = provider;
                        return (
                          <option value={providerId} key={providerId}>
                            {providerFirstName} {providerLastName} (
                            {providerSpecailty})
                          </option>
                        );
                      })}
                    </select>

                    <br />
                    <br />
                    <label htmlFor="date">
                      Select a Date
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                      type="date"
                      id="date"
                      disabled={disabledDatePicker}
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                    <br />
                    <br />
                    <select
                      className="w-100 py-2"
                      value={selectedTime}
                      onChange={(e) => handleOnTimeClick(e.target.value)}
                      disabled={disabledTimePicker}
                    >
                      <option value="defaultSelection">Select Time Slot</option>
                      {timeSlots.map(({ appointmentTime }) => {
                        return (
                          <option value={appointmentTime} key={appointmentTime}>
                            {appointmentTime}
                          </option>
                        );
                      })}
                    </select>
                  </Form.Group>
                  <Button variant="danger" type="submit" onClick={HandleReset}>
                    Reset
                  </Button>{" "}
                  &nbsp;
                  <Button
                    variant="success"
                    type="submit"
                    onClick={onSubmit}
                    disabled={disabledButton}
                  >
                    Book
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </center>
      </Container>
    </>
  );
};

export default BookAppointment;
