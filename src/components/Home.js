import React from "react";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import BookAppointment from "./BookAppointment";
import TreatmentHistory from "./TreatmentHistory";
import AppointmentHistory from "./AppointmentHistory";
import { useLocation } from "react-router-dom";
import Logout from "./Logout";
import UpcomingAppointments from "./UpcomingAppointments";

const links = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Book Appointment",
    href: "/home/bookappointment",
  },
  {
    text: "Appointment History",
    href: "/home/appointmenthistory",
  },
  {
    text: "Treatment History",
    href: "/home/treatmenthistory",
  },
];

const Home = (props) => {
  const { pathname } = useLocation();

  const sectionName = pathname.replace("/home/", "");
  console.log({ sectionName });
  let sectionContainer = null;

  switch (sectionName) {
    case "bookappointment": {
      sectionContainer = <BookAppointment />;
      break;
    }
    case "treatmenthistory": {
      sectionContainer = <TreatmentHistory />;
      break;
    }
    case "appointmenthistory": {
      sectionContainer = <AppointmentHistory />;
      break;
    }
    case "logout": {
      sectionContainer = <Logout />;
      break;
    }
    default: {
      sectionContainer = <UpcomingAppointments />;
      break;
    }
  }

  return (
    <>
      <NavigationBar />
      <div className="d-flex">
        <Sidebar links={links} activeLink={sectionName} />
        {sectionContainer}
      </div>
    </>
  );
};

export default Home;
