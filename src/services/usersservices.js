// import
import axios from "axios";
// base url
const BASE_URL = "https://vacalooserver-1.onrender.com";
// axios services
export const getalluser = () => {
  const url = `${BASE_URL}/users`;
  return axios.get(url);
};
export const getuser = (username, password) => {
  const url = `${BASE_URL}/users/login?username=${username}&password=${password}`;
  return axios.get(url);
};
export const getuserwithid = (userid) => {
  const url = `${BASE_URL}/users/${userid}`;
  return axios.get(url);
};
export const adduser = (userdata) => {
  const url = `${BASE_URL}/users`;
  return axios.post(url, userdata);
};
export const edituser = (userId, userdata) => {
  const url = `${BASE_URL}/users/${userId}`;
  return axios.put(url, userdata);
};
export const deleteuser = (userid) => {
  const url = `${BASE_URL}/users/${userid}`;
  return axios.delete(url);
};
// offer add word
export const getalladdoffer = () => {
  const url = `${BASE_URL}/offeraddwords`;
  return axios.get(url);
};
export const postaddoffer = (word) => {
  const url = `${BASE_URL}/offeraddwords`;
  return axios.post(url, word);
};
export const deleteaddoffer = (offerId) => {
  const url = `${BASE_URL}/offeraddwords/${offerId}`;
  return axios.delete(url);
};
// offer remove word
export const getallremoveoffer = () => {
  const url = `${BASE_URL}/offerremovewords`;
  return axios.get(url);
};
export const postremoveoffer = (word) => {
  const url = `${BASE_URL}/offerremovewords`;
  return axios.post(url, word);
};
export const deleteremoveoffer = (offerId) => {
  const url = `${BASE_URL}/offerremovewords/${offerId}`;
  return axios.delete(url);
};
// words
// four letter
export const getallfourletter = () => {
  const url = `${BASE_URL}/fourletterwords`;
  return axios.get(url);
};
export const postfourletter = (word) => {
  const url = `${BASE_URL}/fourletterwords`;
  return axios.post(url, word);
};
export const deletefourletter = (wordId) => {
  const url = `${BASE_URL}/fourletterwords/${wordId}`;
  return axios.delete(url);
};
// five letter
export const getallfiveletter = () => {
  const url = `${BASE_URL}/fiveletterwords`;
  return axios.get(url);
};
export const postfiveletter = (word) => {
  const url = `${BASE_URL}/fiveletterwords`;
  return axios.post(url, word);
};
export const deletefiveletter = (wordId) => {
  const url = `${BASE_URL}/fiveletterwords/${wordId}`;
  return axios.delete(url);
};
// six letter
export const getallsixletter = () => {
  const url = `${BASE_URL}/sixletterwords`;
  return axios.get(url);
};
export const postsixletter = (word) => {
  const url = `${BASE_URL}/sixletterwords`;
  return axios.post(url, word);
};
export const deletesixletter = (wordId) => {
  const url = `${BASE_URL}/sixletterwords/${wordId}`;
  return axios.delete(url);
};
