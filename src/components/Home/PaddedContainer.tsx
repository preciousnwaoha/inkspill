import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

interface PaddedContainerInterface {
    children?: React.ReactNode;
}

const PaddedContainer = ({children}: PaddedContainerInterface) => {

  return (

     <Box sx={{
        padding: {
            xs: "2rem",
            sm: "4rem",
            md: "8rem"
          }
     }}>

      {children}

    </Box>
  )
}

export default PaddedContainer