const BASE_URL = "http://localhost:8080";



export const API_ENDPOINTS = {
  CREATE_ACCOUNT: `${BASE_URL}/account/createAccount`,
  LOGIN: `${BASE_URL}/account/getAccountByCredentials/`,
  GET_ACCOUNTS: `${BASE_URL}/account/getAccounts`,
  UPDATE_ACCOUNT: `${BASE_URL}/account/updateAccount`,
  UPLOAD_PROFILE: `${BASE_URL}/account/uploadPicture/`,
  GET_PROFILE: `${BASE_URL}/account/getProfilePicture/`,
  GET_ACCOUNTBYID: `${BASE_URL}/account/getAccountById/`,
  DELETE_ACCOUNTBYID: `${BASE_URL}/account/deleteAccount/`,
  UPDATE_ROLEBYID: `${BASE_URL}/account/updateUserRole/`,
  CREATE_EVENT: `${BASE_URL}/event/makeEvent`,
  DELETE_EVENTBYID: `${BASE_URL}/event/deleteEvent/`,
  UPLOAD_EVENT_PICTURE: `${BASE_URL}/event/uploadPicture/`,
  GET_ALL_EVENTS: `${BASE_URL}/event/getAllEvents`,
  GET_EVENTBYID: `${BASE_URL}/event/getEventById/`,
  UPDATE_EVENT: `${BASE_URL}/event/updateEvent/`,
  GET_EVENTS_JOINED: `${BASE_URL}/eventHandler/getEventsJoined`,
  GET_EVENTS_JOINEDBYID: `${BASE_URL}/eventHandler/getEventsJoinById/`,
  JOIN_EVENT: `${BASE_URL}/eventHandler/joinEvent`,
  WITHDRAW_EVENT: `${BASE_URL}/eventHandler/withdrawEvent`,
  GETALLDATA: `${BASE_URL}/admin/getAllData`
};

