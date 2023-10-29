import {Box, Button, TextField, Typography} from "@mui/material";
import MyPagePush from "./MyPagePush";

function MyPageSettings() {
  return (
    <>
      <>
        <Typography variant="h6" align={"left"}>
          Settings
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 0,
          }}
        >
          <MyPagePush/>
        </Box>
      </>
    </>
  )
}

export default MyPageSettings;