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

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    const path = "/api/v1/login";
    const body = {
      userEmail: email,
      password: password
    }

    axiosInstance.post(path, body)
      .then((response) => {
        console.log(response);
        dispatch(SET_TOKEN(response.data.data));
        navigate('/', {replace: true});
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          {/*<FormControlLabel*/}
          {/*  control={<Checkbox value="remember" color="primary"/>}*/}
          {/*  label="Remember me"*/}
          {/*/>*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          {/*<Grid container>*/}
          {/*  <Grid item xs={6} display="flex" justifyContent="start">*/}
          {/*    <Link href="#" variant="body2"*/}
          {/*          style={{*/}
          {/*            textDecoration: 'none', // 밑줄 제거*/}
          {/*            color: 'black', // 링크 텍스트 색상 설정*/}
          {/*          }}*/}
          {/*    >*/}
          {/*      비밀번호 찾기*/}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;