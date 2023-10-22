import {Box, CircularProgress} from "@mui/material";
import React from "react";

function Loading({isLoading}){
  return (
    <>
      {isLoading ?
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <CircularProgress size={30} />
        </Box>
        :
        <></>
      }
    </>
  )
}

export default Loading;