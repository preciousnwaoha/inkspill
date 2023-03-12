import React from 'react'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MarkdownText from './MarkdownText';
import MarkdownRender from './MarkdownRender';

// interface MarkdownAreaInterface {
//     id: string
// }
const MarkdownArea = () => {
  return (
    <Grid container sx={{
      border: "1px solid red",
      height: "100%"
    }}>
        <Grid item xs={12} md={6} sx={{
          outline: "1px solid blue",
          height: "100%",
          overflowY: "auto",
      
        }}>
        <MarkdownText /> 
        </Grid>
        <Grid item xs={12} md={6} sx={{
          outline: "1px solid red",
          height: "100%",
          overflowY: "auto",
        }}>
       <MarkdownRender />
        </Grid>
    </Grid>
  )
}

export default MarkdownArea