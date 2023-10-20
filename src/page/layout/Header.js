import {Link} from "react-router-dom";
import {Box, Button, Container, Divider, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_TOKEN} from "../../store/Auth";

function Header(props) {

  const {authenticated} = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(REMOVE_TOKEN());
  }

  return (
    <>
      <Container maxWidth={false} disableGutters={true}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100vw',
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
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            {
              authenticated ?
                  <>
                    <Button
                      onClick={handleSignOut}
                      sx={{
                        color: 'white',
                        textTransform: 'none',
                      }}
                    >
                      <Typography variant="subtitle1">
                        SignOut
                      </Typography>
                    </Button>
                  </>
                  :
                <>
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
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: 'none', // 밑줄 제거
                      color: 'white', // 링크 텍스트 색상 설정
                    }}
                  >
                    <Typography variant="subtitle1">
                      SignUp
                    </Typography>
                  </Link>
                </>

            }
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default Header;