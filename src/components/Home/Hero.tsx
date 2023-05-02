import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const Hero = () => {

  const handleCreateNew = () => {
    console.log('create new .md')
  }


  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 64px)",
      border: "1px solid black",
      width: "100%",
      px: {
        xs: "2rem",
        sm: "4rem",
        md: "8rem"
      }
    }}>
      <Box sx={{
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black"
      }}>
      <Typography variant="h1" sx={{
        fontWeight: 700,
      }}>
        Your README.md files for Github, in seconds.
      </Typography>
      <Typography variant="body1" sx={{
        mb: 2,

        fontWeight: 500,
        fontSize: "1rem"
      }}>
        Inkspill is the tool for creating markdown documents faster and better.
      </Typography>
      <Button variant="contained" onClick={handleCreateNew} sx={{
        my: 2,
        minHeight: "32px",
        padding: "0.25rem, 0.875rem",
        fontSize: "1rem",
        lineHeight: "1.4375rem",
      }} size="small">Create New .md</Button>
      </Box>
      
    </Box>
  )
}

export default Hero