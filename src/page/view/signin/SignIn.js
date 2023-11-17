import {
  Box, Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../../config/api/AxiosInstance";
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_TOKEN, SET_TOKEN} from "../../../store/Auth";
import Loading from "../../util/loading/Loading";

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInLoading, setSignInLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(REMOVE_TOKEN());
  }, []);

  const handleEmailTextField = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordTextField = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setSignInLoading(true);

    const path = "/api/v1/login";
    const body = {
      userEmail: email,
      password: password
    }

    axiosInstance.post(path, body)
      .then((response) => {

        setSignInLoading(false);

        if (response.code === 200) {
          dispatch(SET_TOKEN(response.data.accessToken));
          localStorage.setItem("refresh-token", response.data.refreshToken);
          navigate('/', {replace: true});
        } else if (400 <= response.code) {
          alert(response.message);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Container
      maxWidth="xs"
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
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailTextField}
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={signInLoading}
          >
            {signInLoading ? <Loading isLoading={signInLoading}/> : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;