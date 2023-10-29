import {Box, Button, Divider, Typography} from "@mui/material";

function MyPagePush() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="subtitle1" align={"left"} gutterBottom={true}>
          Push
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="button"
            fullWidth
            variant="contained"
          >
            신고 알림 허용
          </Button>
          <div style={{width: '10px'}}></div>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: '#9f9f9f'
            }}
          >
            신고 알림 취소
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default MyPagePush;