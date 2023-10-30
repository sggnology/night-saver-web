import {Link} from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_TOKEN} from "../../store/Auth";

function Header(props) {

  const dispatch = useDispatch();

  const {authenticated} = useSelector((state) => state.token);

  function HideOnScroll(props) {
    const {children} = props;

    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const handleSignOut = () => {
    dispatch(REMOVE_TOKEN());
  }

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: '#6285dc',
            minHeight: '50px',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              minHeight: '50px !important',
            }}
          >
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
              divider={<Divider orientation="vertical" flexItem/>}
              spacing={2}
            >
              {
                authenticated ?
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Link
                        to="/myPage"
                        style={{
                          textDecoration: 'none', // 밑줄 제거
                          color: 'white', // 링크 텍스트 색상 설정
                        }}
                      >
                        <Typography variant="subtitle1">
                          MyPage
                        </Typography>
                      </Link>
                    </Box>
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
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar
        sx={{
          minHeight: '50px !important',
        }}
      />
    </>
  )
}

export default Header;