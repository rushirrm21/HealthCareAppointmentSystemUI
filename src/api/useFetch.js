import axios from "axios";

const API_URL = "http://localhost:8085/healthcareappsys/api/v1";

const sendRequest = async ({ url, body, method, authorized = false }) => {
  const requestConfig = {
    method,
    url: `${API_URL}${url}`,
    data: body,
  };

  if (authorized) {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    requestConfig.headers = headers;
  }

  const data = await axios(requestConfig);
  console.log("data from token", data);
  return data;
};

const useFetch = () => {
  // register patient api
  const registerPatient = async (body) => {
    const data = await sendRequest({
      url: "/patientregistration",
      body,
      method: "post",
    });
    return data;
  };

  //login patient api
  const loginPatient = async (body) => {
    const data = await sendRequest({
      url: "/patientlogin",
      method: "post",
      body,
    });
    return data;
  };

  const getProviders = async (body) => {
    const data = await sendRequest({
      url: "/providers",
      method: "get",
      body,
      authorized: true,
    });
    return data;
  };

  const bookAppointment = async (body) => {
    const data = await sendRequest({
      url: "/bookappointment",
      method: "post",
      body,
      authorized: true,
    });
    return data;
  };

  const getTimeSlots = async (body) => {
    const data = await sendRequest({
      url: "/appointmenttimeslots",
      method: "post",
      body,
      authorized: true,
    });
    return data;
  };

  const getAppointmentsScheduled = async (emailId) => {
    const data = await sendRequest({
      url: `/upcomingappointments/${emailId}`,
      method: "get",
      authorized: true,
    });
    return data;
  };

  const deleteAppointmentsScheduled = async (appointmentId) => {
    const data = await sendRequest({
      url: `/updateappointment/${appointmentId}`,
      method: "put",
      authorized: true,
    });
    return data;
  };

  const getAppointmentsHistory = async (emailId) => {
    const data = await sendRequest({
      url: `/appointments/${emailId}`,
      method: "get",
      authorized: true,
    });
    return data;
  };

  const getTreatmentHistory = async (emailId) => {
    const data = await sendRequest({
      url: `/treatmenthistory/${emailId}`,
      method: "get",
      authorized: true,
    });
    return data;
  };

  return {
    registerPatient,
    loginPatient,
    getProviders,
    bookAppointment,
    getTimeSlots,
    getAppointmentsScheduled,
    deleteAppointmentsScheduled,
    getAppointmentsHistory,
    getTreatmentHistory,
  };
};

export default useFetch;
