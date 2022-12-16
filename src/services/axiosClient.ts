import axios from "axios";

const KEY_API = "62c56b5d87972aeae63a6e1bfdfd3972";
const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "content-type": "application/json",
  },
  params: {
    api_key: KEY_API,
    language: "en-US",
  },
});
axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    throw err;
  }
);
export default axiosClient;
