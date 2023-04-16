import React, {useState} from 'react'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MarkdownText from './MarkdownText';
import MarkdownRender from './MarkdownRender';
import MarkdownAI from "./MarkdownAI";

// interface MarkdownAreaInterface {
//     id: string
// }
const MarkdownArea = () => {
  const [useAI, setUseAI] = useState<boolean>(true)

  const handleToggleUseAI = () => {
    setUseAI(prevState => !prevState)
  }

  return (
    <Grid container sx={{
      border: "1px solid red",
      height: "100%",
      // overflow: "hidden"
    }}>
        <Grid item xs={12} sm={6} md={6} sx={{
          outline: "1px solid blue",
          height: "100%",
          overflowY: "auto",
      
        }}>
        {useAI ? <MarkdownAI /> : <MarkdownText />}
        {/* <MarkdownText /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6} sx={{
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