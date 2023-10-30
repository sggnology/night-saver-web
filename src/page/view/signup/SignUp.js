import {
  Box, Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../config/api/AxiosInstance";

function SignUp() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailCertificationCode, setEmailCertificationCode] = useState('');
  const [nickName, setNickName] = useState(null);
  const [carPlateNumber, setCarPlateNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isEmailCertificationCodeRequested, setIsEmailCertificationCodeRequested] = useState(false);
  const [isEmailCertificated, setIsEmailCertificated] = useState(false);

  const handleEmailTextField = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailCertificationCodeTextField = (event) => {
    setEmailCertificationCode(event.target.value);
  };

  const handleNickNameTextField = (event) => {
    setNickName(event.target.value);
  }

  const handleCarPlateNumberTextField = (event) => {
    setCarPlateNumber(event.target.value);
  }

  const handlePasswordTextField = (event) => {
    setPassword(event.target.value);
  }

  const handleConfirmPasswordTextField = (event) => {
    setConfirmPassword(event.target.value);
  }

  const requestEmailCertificationCode = () => {

    const path = `/api/v1/certification/signup?userEmail=${email}`;

    axiosInstance.get(path)
      .then((response) => {
        if (response.code === 200) {
          setIsEmailCertificationCodeRequested(true);
          console.log("email 인증 코드 전송 완료");
        } else if (400 <= response.code) {
          alert(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const certificateEmailCode = () => {
    const path = `/api/v1/certification/signup`;
    const body = {
      userEmail: email,
      certificationCode: emailCertificationCode
    }

    axiosInstance.post(path, body)
      .then((response) => {
        console.log(response);
        if (response.code === 200) {
          setIsEmailCertificated(true);
          alert("이메일 인증이 완료되었습니다.");
        } else {
          alert("이메일 인증에 실패하였습니다. 다시 시도하여 주세요.");
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    const path = `/api/v1/signup`;
    const body = {
      userEmail: email,
      nickName: nickName,
      carPlateNumber: carPlateNumber,
      password: password,
      passwordConfirm: confirmPassword
    }

    axiosInstance.post(path, body)
      .then((response) => {
        if (response.code === 200) {
          alert("회원가입이 완료되었습니다.");
          navigate('/signin', {replace: true});
        } else if (400 <= response.code) {
          alert(response.message)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container
      maxWidth="xs"
      disableGutters={true}
      sx={{
        display: 'flex',
        height: 'calc(100vh - 50px)'
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        <Typography component="h1" variant="h5" sx={{mt: 4}}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleEmailTextField}
            autoComplete="email"
            disabled={isEmailCertificated}
            autoFocus
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={requestEmailCertificationCode}
            disabled={isEmailCertificated}
            sx={{mt: 1, mb: 3, backgroundColor: '#9eb7f6'}}
          >
            이메일 인증 코드 요청
          </Button>
          {
            isEmailCertificationCodeRequested &&
            (
              <>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'start',
                }}>
                  <Typography variant="subtitle2">
                    이메일을 확인하여 주세요.
                  </Typography>
                </Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="emailCertificaionCode"
                  label="Email Certification Code"
                  name="emailCertificaionCode"
                  value={emailCertificationCode}
                  onChange={handleEmailCertificationCodeTextField}
                  disabled={isEmailCertificated}
                  sx={{mt: 1}}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={certificateEmailCode}
                  disabled={isEmailCertificated}
                  sx={{mt: 1, mb: 3, backgroundColor: '#9eb7f6'}}
                >
                  이메일 인증 코드 확인
                </Button>
              </>
            )
          }
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
            required
            fullWidth
            name="carPlateNumber"
            label="CarPlate Number"
            id="carPlateNumber"
            value={carPlateNumber}
            onChange={handleCarPlateNumberTextField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordTextField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordTextField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>

        </Box>
      </Box>
    </Container>
  )
    ;
}

export default SignUp;