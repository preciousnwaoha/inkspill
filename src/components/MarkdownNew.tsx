import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

interface MarkdownNewInterface {
  onHandleNew: (type: number) => void
}

const MarkdownNew = ({onHandleNew}: MarkdownNewInterface) => {

  const handleSelectType = (_newType: number) => {
    onHandleNew(_newType);
  }



  return (
    <Box sx={{
      border: "1px solid black",
      height: {sm: "calc(100vh - 64px)"},
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
      }}>
      
      {["Create AI Readme", "Use Template", "Start Blank"].map((type, index) => {
        return <Paper key={index} elevation={0} variant="outlined" sx={{
          p: 2,
          width: {xs: "80px", sm: "120px"},
          height: {xs: "80px", sm: "120px"},
          m: 2,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
  
        }} onClick={() => {handleSelectType(index)}}>
          {type}
        </Paper>
      })}
      
      
    </Box>
  )
}

export default MarkdownNew