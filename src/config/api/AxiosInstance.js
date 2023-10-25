import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
})

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(function(response){
  if(response.data.code === 401){
    alert("로그인이 필요합니다.");
    window.location.replace("/signin");
  }

  return response.data;
});

export default axiosInstance;

