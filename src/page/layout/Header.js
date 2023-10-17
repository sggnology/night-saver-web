import {Link} from "react-router-dom";
import {Box, Container, Typography} from "@mui/material";

function Header(props) {
  return (
    <>
      <Container maxWidth={false} disableGutters={true}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'calc(100vw - 40px)',
          height: '50px',
          backgroundColor: '#6285dc',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}>
          <Box>
            <Link
              to="/"
              style={{
                textDecoration: 'none', // 밑줄 제거
                color: 'white', // 링크 텍스트 색상 설정
              }}
            >
              <Typography variant="subtitle1">
                Night Saver
              </Typography>
            </Link>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            <Link
              to="/signin"
              style={{
                textDecoration: 'none', // 밑줄 제거
                color: 'white', // 링크 텍스트 색상 설정
              }}
            >
              <Typography variant="subtitle1">
                SignIn
              </Typography>
            </Link>
            <div style={{ width: '20px' }}></div>
            <Link
              to="/singup"
              style={{
                textDecoration: 'none', // 밑줄 제거
                color: 'white', // 링크 텍스트 색상 설정
              }}
            >
              <Typography variant="subtitle1">
                SignUp
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Header;