import {
  Box, Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import {Link} from "react-router-dom";

function SignIn() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <Grid container>
            <Grid item xs={6} display="flex" justifyContent="start">
              <Link href="#" variant="body2"
                    style={{
                      textDecoration: 'none', // 밑줄 제거
                      color: 'black', // 링크 텍스트 색상 설정
                    }}
              >
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
              <Link href="#" variant="body2"
                    style={{
                      textDecoration: 'none', // 밑줄 제거
                      color: 'black', // 링크 텍스트 색상 설정
                    }}
              >
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;