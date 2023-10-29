import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axiosInstance from "../../../config/api/AxiosInstance";
import {useSelector} from "react-redux";

function MyPage() {

  const {token} = useSelector((state) => state.token);

  const [nickName, setNickName] = useState("");
  const [carPlateNumber, setCarPlateNumber] = useState("");

  const handleNickNameTextField = (event) => {
    setNickName(event.target.value);
  }

  const handleCarPlateNumberTextField = (event) => {
    setCarPlateNumber(event.target.value);
  }

  const getMyPageInfo = () => {
    const path = "/api/v1/myPage/info"
    const config = {
      headers: {
        Authorization: `${token}`
      }
    }

    axiosInstance.get(path, config)
      .then((response) => {
        if (response.code === 200) {
          setNickName(response.data.nickName);
          setCarPlateNumber(response.data.carPlateNumber);
        } else if (400 <= response.code) {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  useEffect(() => {
    getMyPageInfo();
  }, []);

  const handleMyPageInfoSubmit = (event) => {
    event.preventDefault();

    const path = "/api/v1/myPage/info"
    const body = {
      nickName: nickName,
      carPlateNumber: carPlateNumber,
    }
    const config = {
      headers: {
        Authorization: `${token}`
      }
    }

    axiosInstance.put(path, body, config)
      .then((response) => {
        if (response.code === 200) {
          alert("마이페이지 정보를 수정했습니다.");
        } else if (400 <= response.code) {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <Container maxWidth="xs"
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: 'calc(100vh - 50px)'
               }}
    >
      <Typography variant="h5" sx={{mb: 4}}>
        My Page
      </Typography>

      <Stack
        spacing={2}
      >
        <Typography variant="h6" align={"left"}>
          Info
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 0,
          }}
        >

          <Box component="form" onSubmit={handleMyPageInfoSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="nickName"
              label="Nickname"
              name="nickName"
              value={nickName}
              onChange={handleNickNameTextField}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="carPlateNumber"
              label="Car Plate Number"
              name="carPlateNumber"
              value={carPlateNumber}
              onChange={handleCarPlateNumberTextField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              마이페이지 정보 수정
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  )
}

export default MyPage;